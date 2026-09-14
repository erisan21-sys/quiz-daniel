import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

import { startTestApp, applyTestConfig } from './helpers/testKit.js';
import { resetLimiters } from '../src/middleware/rateLimit.js';

/**
 * Testes de segurança (auditoria v2.0):
 *  • RLS: a tabela questions NÃO pode ter policy de leitura para anon/authenticated
 *    (correct_answer/explanation/hint jamais saem por consulta direta ao Supabase);
 *  • HTTP: nenhum payload de pergunta (start ou catálogo) revela correct_answer
 *    ou explanation antes da resposta, em nenhum dos 3 livros;
 *  • Isolamento: nenhum livro recebe questão de outro, em nenhuma direção;
 *  • Service Worker: NUNCA cacheia requisição autenticada ou rota privada.
 */

const here = path.dirname(fileURLToPath(import.meta.url));
const RLS_PATH = path.join(here, '..', '..', 'database', 'rls.sql');
const SW_PATH = path.join(here, '..', '..', 'frontend', 'public', 'sw.js');

/** Lê o SQL sem comentários de linha (policies comentadas não contam). */
function rlsWithoutComments() {
  return fs
    .readFileSync(RLS_PATH, 'utf8')
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('--'))
    .join('\n');
}

/** Carrega o sw.js real num contexto vm e devolve a função de decisão de cache. */
function loadSwCachePolicy() {
  const src = fs.readFileSync(SW_PATH, 'utf8');
  const context = { console, URL, Set, Map, Promise };
  vm.createContext(context);
  vm.runInContext(src, context, { filename: 'sw.js' });
  const fn = vm.runInContext('isApiCacheable', context);
  assert.equal(typeof fn, 'function', 'sw.js deve expor isApiCacheable() testável');
  return fn;
}

describe('Segurança · gabarito, RLS e Service Worker', { concurrency: 1 }, () => {
  let api;

  beforeEach(async () => {
    applyTestConfig();
    resetLimiters();
    api = await startTestApp();
  });

  afterEach(async () => {
    await api.close();
    applyTestConfig();
    resetLimiters();
  });

  /* ------------------------------------------------------------------ RLS */
  test('RLS: questions NÃO tem nenhuma policy para anon/authenticated', () => {
    const sql = rlsWithoutComments();
    assert.ok(
      !/create\s+policy\s+\S+\s+on\s+public\.questions\b/i.test(sql),
      'qualquer SELECT em questions vazaria correct_answer/explanation pela anon key',
    );
  });

  test('RLS: continua habilitado na tabela questions', () => {
    const sql = rlsWithoutComments();
    assert.match(sql, /alter\s+table\s+public\.questions\s+enable\s+row\s+level\s+security/i);
  });

  test('RLS: books expõe só ativos; admin_tokens e audit_log seguem fechados', () => {
    const sql = rlsWithoutComments();
    assert.match(
      sql,
      /create\s+policy\s+books_select_public\s+on\s+public\.books[\s\S]*?using\s*\(\s*active\s*=\s*true\s*\)/i,
    );
    assert.ok(!/create\s+policy\s+\S+\s+on\s+public\.admin_tokens\b/i.test(sql));
    assert.ok(!/create\s+policy\s+\S+\s+on\s+public\.audit_log\b/i.test(sql));
  });

  /* ------------------------------------------------- gabarito via HTTP */
  test('start não vaza gabarito em nenhum dos 3 livros', async () => {
    for (const bookId of ['oseias', 'obadias', 'jonas']) {
      const { token } = await api.register({ nickname: `noleak_${bookId}` });
      const res = await api.start(token, { bookId });
      assert.equal(res.status, 201, bookId);
      assert.equal(res.body.questions.length, 20, bookId);
      for (const q of res.body.questions) {
        assert.equal(q.book_id, bookId);
        assert.ok(!('correct_answer' in q), `${bookId}: correct_answer vazou no start`);
        assert.ok(!('explanation' in q), `${bookId}: explanation vazou no start`);
        assert.ok(!('option_a' in q), `${bookId}: option_a vazou no start`);
        for (const option of q.options) {
          assert.deepEqual(Object.keys(option).sort(), ['letter', 'text']);
        }
      }
    }
  });

  test('catálogo /api/questions não vaza gabarito (geral + por livro)', async () => {
    const all = await api.get('/api/questions');
    assert.equal(all.body.total, 150);
    for (const item of all.body.items) {
      assert.ok(!('correct_answer' in item));
      assert.ok(!('explanation' in item));
    }
    for (const bookId of ['oseias', 'obadias', 'jonas']) {
      const scoped = await api.get(`/api/questions?book_id=${bookId}`);
      assert.equal(scoped.body.total, 50, bookId);
      assert.ok(scoped.body.items.every((item) => item.book_id === bookId), bookId);
      assert.ok(
        !JSON.stringify(scoped.body.items).includes('correct_answer'),
        `${bookId}: correct_answer no catálogo`,
      );
    }
  });

  /* ------------------------------------------------- isolamento total */
  test('nenhum livro recebe questão de outro, em nenhuma direção', async () => {
    const idsByBook = {};
    for (const bookId of ['oseias', 'obadias', 'jonas']) {
      const { token } = await api.register({ nickname: `isol_${bookId}` });
      const res = await api.start(token, { bookId });
      assert.ok(res.body.questions.every((q) => q.book_id === bookId), bookId);
      idsByBook[bookId] = new Set(res.body.questions.map((q) => q.id));
      assert.equal(idsByBook[bookId].size, 20, `${bookId}: sem repetição`);
    }
    const pairs = [['oseias', 'jonas'], ['oseias', 'obadias'], ['jonas', 'obadias']];
    for (const [a, b] of pairs) {
      const overlap = [...idsByBook[a]].filter((id) => idsByBook[b].has(id));
      assert.equal(overlap.length, 0, `${a} x ${b}: questões compartilhadas`);
    }
  });

  /* ----------------------------------------------------- Service Worker */
  test('SW: cacheia GETs públicos sem autenticação', () => {
    const isApiCacheable = loadSwCachePolicy();
    for (const pathname of [
      '/api', '/api/health', '/api/books', '/api/questions',
      '/api/quiz/rules', '/api/stats', '/api/ranking', '/api/attempts/public',
    ]) {
      assert.equal(isApiCacheable('GET', pathname, false), true, pathname);
    }
  });

  test('SW: NUNCA cacheia requisição com Authorization', () => {
    const isApiCacheable = loadSwCachePolicy();
    for (const pathname of [
      '/api', '/api/health', '/api/books', '/api/questions',
      '/api/quiz/rules', '/api/stats', '/api/ranking', '/api/attempts/public',
    ]) {
      assert.equal(isApiCacheable('GET', pathname, true), false, `${pathname} + auth`);
    }
  });

  test('SW: NUNCA cacheia rotas privadas ou personalizadas', () => {
    const isApiCacheable = loadSwCachePolicy();
    for (const pathname of [
      '/api/users/me/profile',
      '/api/users/me/achievements',
      '/api/users/00000000-0000-0000-0000-000000000000',
      '/api/users/00000000-0000-0000-0000-000000000000/history',
      '/api/admin/overview',
      '/api/admin/questions',
      '/api/ranking/me',
      '/api/attempts/00000000-0000-0000-0000-000000000000',
      '/api/quiz/start',
      '/api/quiz/answer',
      '/api/quiz/finish',
    ]) {
      assert.equal(isApiCacheable('GET', pathname, false), false, pathname);
      assert.equal(isApiCacheable('GET', pathname, true), false, `${pathname} + auth`);
    }
  });

  test('SW: NUNCA cacheia POST/PUT/PATCH/DELETE', () => {
    const isApiCacheable = loadSwCachePolicy();
    for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
      assert.equal(isApiCacheable(method, '/api/books', false), false, method);
      assert.equal(isApiCacheable(method, '/api/quiz/start', true), false, `${method} + auth`);
    }
  });
});
