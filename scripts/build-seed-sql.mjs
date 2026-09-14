#!/usr/bin/env node
/**
 * Gera database/seed_books.sql a partir do seed canônico do backend.
 * ---------------------------------------------------------------------------
 * Uso: node scripts/build-seed-sql.mjs
 *
 * Garante que o banco Supabase (SQL) e o driver local (JS) tenham EXATAMENTE
 * as mesmas 150 perguntas (50 por livro) e 21 conquistas (7 por livro).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const { BOOKS, QUESTIONS, ACHIEVEMENTS } = await import('../backend/src/db/seedData.js');

const sql = (value) => `'${String(value ?? '').replace(/'/g, "''")}'`;

const lines = [];
lines.push(`-- ============================================================================`);
lines.push(`--  QUIZ BÍBLICO · seed_books.sql  (GERADO — não edite à mão)`);
lines.push(`--  Gerado por: node scripts/build-seed-sql.mjs`);
lines.push(`--  Fonte canônica: backend/src/db/seeds/*.js`);
lines.push(`--  150 perguntas (50 por livro: 15 fáceis · 20 médias · 15 difíceis)`);
lines.push(`--  + 21 conquistas (7 por livro)`);
lines.push(`-- ----------------------------------------------------------------------------`);
lines.push(`--  Idempotente: pode ser executado mais de uma vez sem duplicar dados.`);
lines.push(`-- ============================================================================`);
lines.push(``);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`-- LIVROS`);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`insert into public.books (id, name, short_name, chapters, testament, icon, color, order_index, description, active) values`);
lines.push(
  BOOKS.map(
    (b) =>
      `  (${sql(b.id)}, ${sql(b.name)}, ${sql(b.short_name)}, ${b.chapters}, ${sql(b.testament)}, ${sql(b.icon)}, ${sql(b.color)}, ${b.order_index}, ${sql(b.description)}, true)`,
  ).join(',\n'),
);
lines.push(`on conflict (id) do update set`);
lines.push(`  name = excluded.name, short_name = excluded.short_name, chapters = excluded.chapters,`);
lines.push(`  testament = excluded.testament, icon = excluded.icon, color = excluded.color,`);
lines.push(`  order_index = excluded.order_index, description = excluded.description, active = excluded.active;`);
lines.push(``);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`-- PERGUNTAS`);
lines.push(`-- ---------------------------------------------------------------------------`);
for (const book of BOOKS) {
  const qs = QUESTIONS.filter((q) => q.book_id === book.id).sort((a, b) => a.order_index - b.order_index);
  lines.push(`-- ===== ${book.name.toUpperCase()} (${qs.length}) =====`);
  lines.push(`insert into public.questions`);
  lines.push(`  (id, book_id, chapter, question, difficulty, option_a, option_b, option_c, option_d,`);
  lines.push(`   correct_answer, explanation, hint, source_type, order_index)`);
  lines.push(`values`);
  lines.push(
    qs
      .map(
        (q) =>
          `(${sql(q.id)}, ${sql(q.book_id)}, ${q.chapter}, ${sql(q.question)}, ${sql(q.difficulty)}, ` +
          `${sql(q.option_a)}, ${sql(q.option_b)}, ${sql(q.option_c)}, ${sql(q.option_d)}, ` +
          `${sql(q.correct_answer)}, ${sql(q.explanation)}, ${sql(q.hint)}, ${sql(q.source_type)}, ${q.order_index})`,
      )
      .join(',\n'),
  );
  lines.push(`on conflict (id) do nothing;`);
  lines.push(``);
}
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`-- CONQUISTAS`);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`insert into public.achievements (id, code, book_id, name, description, icon, criteria) values`);
lines.push(
  ACHIEVEMENTS.map(
    (a) =>
      `  (${sql(a.id)}, ${sql(a.code)}, ${sql(a.book_id)}, ${sql(a.name)}, ${sql(a.description)}, ${sql(a.icon)}, '${JSON.stringify(a.criteria).replace(/'/g, "''")}'::jsonb)`,
  ).join(',\n'),
);
lines.push(`on conflict (code) do nothing;`);
lines.push(``);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`-- CONFERÊNCIA`);
lines.push(`-- ---------------------------------------------------------------------------`);
lines.push(`select b.id as livro, b.name,`);
lines.push(`  count(*) filter (where q.difficulty = 'facil')   as faceis,`);
lines.push(`  count(*) filter (where q.difficulty = 'medio')   as medias,`);
lines.push(`  count(*) filter (where q.difficulty = 'dificil') as dificeis,`);
lines.push(`  count(*) as total`);
lines.push(`from public.books b join public.questions q on q.book_id = b.id`);
lines.push(`where b.active and q.active group by b.id, b.name order by b.order_index;`);

const outPath = path.join(ROOT, 'database', 'seed_books.sql');
fs.writeFileSync(outPath, `${lines.join('\n')}\n`);

// eslint-disable-next-line no-console
console.log(`OK: ${outPath}`);
for (const book of BOOKS) {
  const qs = QUESTIONS.filter((q) => q.book_id === book.id);
  // eslint-disable-next-line no-console
  console.log(
    `  ${book.id}: ${qs.length} perguntas ` +
      `(${qs.filter((q) => q.difficulty === 'facil').length}/` +
      `${qs.filter((q) => q.difficulty === 'medio').length}/` +
      `${qs.filter((q) => q.difficulty === 'dificil').length})`,
  );
}
// eslint-disable-next-line no-console
console.log(`  conquistas: ${ACHIEVEMENTS.length}`);
