/* ==========================================================================
 * QUIZ BÍBLICO · Service Worker (PWA)
 * --------------------------------------------------------------------------
 * Estratégia:
 *  • assets estáticos  -> cache-first com atualização em segundo plano
 *  • navegação (HTML)  -> network-first, caindo para o cache quando offline
 *  • GET /api/* PÚBLICO -> network-first + cópia em cache (leitura offline)
 *  • GET /api/* PRIVADO -> passthrough puro (NUNCA toca no Cache API)
 *  • POST/PUT/DELETE   -> NUNCA interceptado (pontuação oficial é online)
 *
 * PRIVACIDADE (correção de segurança v2.0): o Cache API é persistente e
 * compartilhado por origem. Por isso, NUNCA cacheamos:
 *  • qualquer requisição com cabeçalho Authorization;
 *  • /api/users/me/* e /api/users/* (dados do jogador);
 *  • /api/admin/* (área administrativa);
 *  • /api/ranking/me, /api/attempts/:id (personalizados por usuário);
 *  • qualquer endpoint fora da allowlist pública abaixo (negação padrão).
 *
 * Nenhuma pontuação é registrada offline: o SW apenas preserva a interface e
 * os dados de leitura. O app avisa o usuário e sincroniza quando reconecta.
 * ========================================================================== */

const VERSION = 'quiz-biblico-v2.0.0-sw2';
const STATIC_CACHE = `${VERSION}-static`;
const API_CACHE = `${VERSION}-api`;

const PRECACHE = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon.svg'];

/* ---------------------------------------------------------------------------
 * Política de cache da API (função pura — coberta por testes em Node).
 * ------------------------------------------------------------------------- */

/** Caminhos públicos com correspondência exata. */
const PUBLIC_API_EXACT = new Set(['/api', '/api/health', '/api/attempts/public']);

/** Prefixos públicos (catálogos, regras, stats e ranking geral — sem gabarito). */
const PUBLIC_API_PREFIXES = [
  '/api/books',
  '/api/questions',
  '/api/quiz/rules',
  '/api/stats',
  '/api/ranking',
];

/** Prefixos que NUNCA podem ser cacheados (privados ou personalizados). */
const NEVER_CACHE_PREFIXES = [
  '/api/users/',
  '/api/admin/',
  '/api/quiz/start',
  '/api/quiz/answer',
  '/api/quiz/finish',
  '/api/ranking/me',
  '/api/attempts/',
];

/**
 * Decide se um GET da API pode usar o Cache API.
 * Negação por padrão: só entra o que é comprovadamente público.
 */
function isApiCacheable(method, pathname, hasAuth) {
  if (method !== 'GET') return false;
  if (hasAuth) return false;
  if (PUBLIC_API_EXACT.has(pathname)) return true;
  if (!pathname.startsWith('/api/')) return false;
  if (NEVER_CACHE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  return PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/* ---------------------------------------------------------------------------
 * Ciclo de vida e rede (só executa dentro de um Service Worker de verdade).
 * O `typeof self` permite carregar este arquivo em Node (vm) para testes.
 * ------------------------------------------------------------------------- */

const SW = typeof self !== 'undefined' && self.addEventListener ? self : null;

if (SW) {
  SW.addEventListener('install', (event) => {
    event.waitUntil(
      caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(PRECACHE).catch(() => undefined))
        .then(() => SW.skipWaiting()),
    );
  });

  SW.addEventListener('activate', (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys
              .filter((key) => !key.startsWith(VERSION))
              .map((key) => caches.delete(key)),
          ),
        )
        .then(() => SW.clients.claim()),
    );
  });

  SW.addEventListener('message', (event) => {
    if (event.data === 'skip-waiting') SW.skipWaiting();
  });

  SW.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    if (url.origin !== SW.location.origin) return;

    const isApi = url.pathname === '/api' || url.pathname.startsWith('/api/');
    if (isApi) {
      // API: só GET público entra no cache; TUDO o mais é passthrough puro.
      const hasAuth = Boolean(request.headers.get('authorization'));
      if (isApiCacheable(request.method, url.pathname, hasAuth)) {
        event.respondWith(networkFirst(request, API_CACHE));
      }
      return;
    }

    if (request.method !== 'GET') return; // POST/PUT/DELETE seguem para a rede

    if (request.mode === 'navigate') {
      event.respondWith(
        networkFirst(request, STATIC_CACHE).catch(async () => {
          const cached = await caches.match('/index.html');
          return cached || new Response('Offline', { status: 503, headers: { 'content-type': 'text/plain' } });
        }),
      );
      return;
    }

    event.respondWith(cacheFirst(request, STATIC_CACHE));
  });
}

/** Notifica a interface quando o estado online/offline muda de fato. */
function notifyClients(payload) {
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
    clients.forEach((client) => client.postMessage(payload));
  });
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type === 'basic') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    notifyClients({ type: 'sw:online' });
    return response;
  } catch (err) {
    notifyClients({ type: 'sw:offline' });
    const cached = await caches.match(request);
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}
