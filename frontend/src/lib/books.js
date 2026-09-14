import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

/**
 * Livros da plataforma (Oséias · Obadias · Jonas).
 * ---------------------------------------------------------------------------
 * Os metadados oficiais vêm de GET /api/books; este módulo mantém uma cópia
 * local idêntica para renderizar a interface antes da resposta (ou offline).
 */

export const BOOK_IDS = ['oseias', 'obadias', 'jonas'];

export const BOOKS_FALLBACK = [
  {
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
    active: true,
    questions: { total: 50, facil: 15, medio: 20, dificil: 15 },
  },
  {
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
    active: true,
    questions: { total: 50, facil: 15, medio: 20, dificil: 15 },
  },
  {
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
    active: true,
    questions: { total: 50, facil: 15, medio: 20, dificil: 15 },
  },
];

/** Normaliza ?livro= / ?book_id= para um id válido (ou null). */
export function normalizeBookId(raw) {
  const value = String(raw ?? '').trim().toLowerCase();
  return BOOK_IDS.includes(value) ? value : null;
}

/** Metadados de um livro (lista do servidor ou reserva local). */
export function bookMeta(books, id) {
  const list = books?.length ? books : BOOKS_FALLBACK;
  return list.find((book) => book.id === id) || BOOKS_FALLBACK.find((book) => book.id === id) || null;
}

let cache = null;

/** Busca GET /api/books uma vez e reaproveita (com reserva offline). */
export async function fetchBooks() {
  if (cache?.length) return cache;
  try {
    const data = await api.books();
    cache = data?.items?.length ? data.items : BOOKS_FALLBACK;
  } catch {
    cache = BOOKS_FALLBACK;
  }
  return cache;
}

/** Hook: livros com carregamento preguiçoso. */
export function useBooks() {
  const [books, setBooks] = useState(cache?.length ? cache : BOOKS_FALLBACK);
  useEffect(() => {
    let alive = true;
    fetchBooks().then((list) => {
      if (alive) setBooks(list);
    });
    return () => {
      alive = false;
    };
  }, []);
  return books;
}
