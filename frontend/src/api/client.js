import { sessionStore } from '../lib/storage.js';

/**
 * Cliente da API do Quiz Bíblico (multi-livro: Oséias · Obadias · Jonas).
 * ---------------------------------------------------------------------------
 * • Base: VITE_API_URL (produção) ou mesma origem (dev usa o proxy do Vite).
 * • O token de sessão vai no cabeçalho Authorization.
 * • O navegador NUNCA recebe o gabarito antes de responder e NUNCA calcula
 *   a pontuação oficial: apenas exibe o que o servidor devolve.
 * • Quase tudo é separado por livro: o `book_id` viaja na query (?book_id=)
 *   ou no corpo do POST /api/quiz/start.
 */

const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export class OfflineError extends Error {
  constructor(message = 'Sem conexão com o servidor.') {
    super(message);
    this.name = 'OfflineError';
  }
}

async function request(method, path, { body, token, retry = true, signal } = {}) {
  const headers = { 'content-type': 'application/json' };
  const authToken = token === undefined ? sessionStore.read()?.token : token;
  if (authToken) headers.authorization = `Bearer ${authToken}`;

  let response;
  try {
    response = await fetch(`${BASE}/api${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    throw new OfflineError();
  }

  if (response.status === 429 && retry) {
    const data = await safeJson(response);
    const retryAfter = Number(data?.retry_after_seconds || 1);
    await new Promise((resolve) => setTimeout(resolve, Math.min(retryAfter, 5) * 1000));
    return request(method, path, { body, token, retry: false, signal });
  }

  const data = await safeJson(response);
  if (!response.ok) {
    throw new ApiError(response.status, data?.error || `Erro ${response.status}`, data?.details);
  }
  return data;
}

async function safeJson(response) {
  try {
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

/** Monta ?a=1&b=2 ignorando valores vazios. */
function qs(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );
  const text = search.toString();
  return text ? `?${text}` : '';
}

const withBook = (bookId) => (bookId ? { book_id: bookId } : {});

export const api = {
  /* ------------------------------------------------------------ sessão */
  register: (payload) => request('POST', '/users', { body: payload, token: null }),
  rejoin: (payload) => request('POST', '/users/rejoin', { body: payload, token: null }),
  myProfile: (bookId) => request('GET', `/users/me/profile${qs(withBook(bookId))}`),
  myAchievements: (bookId) => request('GET', `/users/me/achievements${qs(withBook(bookId))}`),
  updateMe: (payload) => request('PATCH', '/users/me', { body: payload }),
  deleteMe: (mode) => request('DELETE', `/users/me?mode=${mode}`),

  /* ------------------------------------------------------------- livros */
  books: () => request('GET', '/books', { token: null }),

  /* ------------------------------------------------------------- público */
  profile: (id, bookId) => request('GET', `/users/${id}${qs(withBook(bookId))}`),
  history: (id, params = {}) => request('GET', `/users/${id}/history${qs(params)}`),
  stats: (bookId) => request('GET', `/stats${qs(withBook(bookId))}`),
  publicAttempts: (bookId) => request('GET', `/attempts/public${qs(withBook(bookId))}`),
  attempt: (id) => request('GET', `/attempts/${id}`),
  questionsCatalog: (bookId) => request('GET', `/questions${qs(withBook(bookId))}`),
  rules: (bookId) => request('GET', `/quiz/rules${qs(withBook(bookId))}`),
  achievementsCatalog: (bookId) => request('GET', `/stats/achievements${qs(withBook(bookId))}`),
  health: () => request('GET', '/health', { token: null }),

  /* ------------------------------------------------------------- ranking */
  ranking: (params = {}) => request('GET', `/ranking${qs(params)}`),
  myRank: (params = {}) => request('GET', `/ranking/me${qs(params)}`),

  /* ---------------------------------------------------------------- jogo */
  start: (mode, bookId) => request('POST', '/quiz/start', { body: { mode, book_id: bookId } }),
  answer: (payload) => request('POST', '/quiz/answer', { body: payload, retry: false }),
  finish: (attemptId) => request('POST', '/quiz/finish', { body: { attempt_id: attemptId } }),

  /* --------------------------------------------------------------- admin */
  adminOverview: (token) => request('GET', '/admin/overview', { token }),
  adminUsers: (params, token) => request('GET', `/admin/users${qs(params)}`, { token }),
  adminSetRole: (id, role, token) => request('PATCH', `/admin/users/${id}/role`, { body: { role }, token }),
  adminRemoveUser: (id, mode, token) => request('DELETE', `/admin/users/${id}?mode=${mode}`, { token }),
  adminQuestions: (token, params = {}) => request('GET', `/admin/questions${qs(params)}`, { token }),
  adminCreateQuestion: (payload, token) => request('POST', '/admin/questions', { body: payload, token }),
  adminUpdateQuestion: (id, payload, token) => request('PUT', `/admin/questions/${id}`, { body: payload, token }),
  adminDeleteQuestion: (id, token) => request('DELETE', `/admin/questions/${id}`, { token }),
  adminAttempts: (params, token) => request('GET', `/admin/attempts${qs(params)}`, { token }),
  adminRanking: (params, token) => request('GET', `/admin/ranking${qs(params)}`, { token }),
  adminStats: (token) => request('GET', '/admin/stats', { token }),
};

/* ---------------------------------------------------------------------------
 * Compartilhamento (WhatsApp / copiar)
 * ------------------------------------------------------------------------- */

export function buildShareUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export async function shareResult(message, bookName) {
  if (navigator.share) {
    try {
      await navigator.share({ title: bookName ? `Quiz Bíblico — ${bookName}` : 'Quiz Bíblico', text: message });
      return 'shared';
    } catch (err) {
      if (err?.name === 'AbortError') return 'cancelled';
    }
  }
  window.open(buildShareUrl(message), '_blank', 'noopener');
  return 'whatsapp';
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}
