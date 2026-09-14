/**
 * QUIZ BÍBLICO · Catálogo oficial de livros (multi-book)
 * ---------------------------------------------------------------------------
 * Fonte única de verdade sobre os livros jogáveis. Usado pelo backend
 * (validação, seleção de questões, ranking, estatísticas) e espelhado no
 * frontend em `frontend/src/lib/books.js` (apenas para exibição — nenhuma
 * decisão de jogo é tomada no navegador).
 *
 * `book_id` é um slug estável (chave primária textual da tabela `books`):
 *   'oseias' | 'obadias' | 'jonas'
 *
 * O livro 'daniel' existiu na v1.x e foi preservado no banco como legado
 * (active=false) apenas para não quebrar o histórico antigo — ele NÃO é
 * aceito em novas partidas e NÃO aparece na interface pública.
 */

export const BOOKS = Object.freeze([
  Object.freeze({
    id: 'oseias',
    name: 'Oséias',
    short_name: 'OSÉIAS',
    chapters: 14,
    testament: 'Antigo Testamento',
    icon: '💧',
    color: '#38bdf8',
    order_index: 1,
    description:
      'O profeta do amor fiel de Deus: casamento com Gômer, chamado ao arrependimento e promessas de restauração para Israel.',
  }),
  Object.freeze({
    id: 'obadias',
    name: 'Obadias',
    short_name: 'OBADIAS',
    chapters: 1,
    testament: 'Antigo Testamento',
    icon: '🦅',
    color: '#fbbf24',
    order_index: 2,
    description:
      'O menor livro do Antigo Testamento: a visão contra Edom, o Dia do Senhor e a certeza de que o reino será do Senhor.',
  }),
  Object.freeze({
    id: 'jonas',
    name: 'Jonas',
    short_name: 'JONAS',
    chapters: 4,
    testament: 'Antigo Testamento',
    icon: '🐋',
    color: '#34d399',
    order_index: 3,
    description:
      'O profeta fujão: a tempestade, o grande peixe, o arrependimento de Nínive e a lição da misericórdia de Deus.',
  }),
]);

/** Livro legado da v1.x — mantido no banco, fora da interface pública. */
export const LEGACY_BOOK = Object.freeze({
  id: 'daniel',
  name: 'Daniel',
  short_name: 'DANIEL',
  chapters: 12,
  testament: 'Antigo Testamento',
  icon: '📖',
  color: '#a78bfa',
  order_index: 0,
  active: false,
  description: 'Livro legado da v1.x (capítulos 1 a 12). Preservado para histórico.',
});

export const BOOK_IDS = Object.freeze(BOOKS.map((book) => book.id));

const BY_ID = new Map(BOOKS.map((book) => [book.id, book]));

/** Normaliza e valida um book_id. Retorna o slug ou null quando inválido. */
export function normalizeBookId(value) {
  if (typeof value !== 'string') return null;
  const slug = value.trim().toLowerCase();
  return BY_ID.has(slug) ? slug : null;
}

/** Normaliza aceitando também o legado 'daniel' (apenas leitura/histórico). */
export function normalizeBookIdWithLegacy(value) {
  if (typeof value !== 'string') return null;
  const slug = value.trim().toLowerCase();
  if (slug === LEGACY_BOOK.id) return slug;
  return normalizeBookId(slug);
}

/** Devolve os metadados do livro (ou null). */
export function getBook(bookId) {
  if (!bookId) return null;
  const slug = String(bookId).trim().toLowerCase();
  if (BY_ID.has(slug)) return BY_ID.get(slug);
  if (slug === LEGACY_BOOK.id) return LEGACY_BOOK;
  return null;
}

/** true quando o livro pode receber novas partidas. */
export function isPlayableBook(bookId) {
  return normalizeBookId(bookId) !== null;
}

/** Valida o capítulo (1..N) conforme o livro. */
export function isValidChapter(bookId, chapter) {
  const book = getBook(bookId);
  if (!book) return false;
  const number = Number(chapter);
  return Number.isInteger(number) && number >= 1 && number <= book.chapters;
}

/** Rótulo curto para exibição: "Oséias 4", "Obadias 7", "Jonas 2". */
export function bookChapterLabel(bookId, chapter) {
  const book = getBook(bookId);
  if (!book) return `Capítulo ${chapter}`;
  // Obadias tem capítulo único: exibe "Obadias" + versículo implícito no capítulo 1.
  if (book.id === 'obadias') return 'Obadias';
  return `${book.name} ${chapter}`;
}

export default { BOOKS, BOOK_IDS, LEGACY_BOOK, normalizeBookId, getBook, isPlayableBook, isValidChapter, bookChapterLabel };
