import express from 'express';
import { ApiError, normalizeMode } from '../utils/rules.js';
import { BOOKS, bookChapterLabel, getBook, normalizeBookId } from '../utils/books.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * Catálogo público de questões — SEM gabarito e SEM explicação.
 *   GET /api/questions             → todos os livros (com bloco `per_book`)
 *   GET /api/questions?book_id=jonas → somente o livro
 */
export function createQuestionsRoutes({ repo }) {
  const router = express.Router();

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const mode = normalizeMode(req.query.difficulty ?? req.query.mode);
      if (req.query.difficulty !== undefined && req.query.difficulty !== '' && !mode) {
        throw new ApiError(400, 'Dificuldade inválida.');
      }

      const rawBook = req.query.book_id ?? req.query.book;
      let bookId = null;
      if (rawBook !== undefined && rawBook !== '') {
        bookId = normalizeBookId(rawBook);
        if (!bookId) throw new ApiError(400, 'Livro inválido. Escolha oseias, obadias ou jonas.');
      }

      const questions = await repo.listActiveQuestions({ bookId });
      const filtered = mode && mode !== 'mixed'
        ? questions.filter((q) => q.difficulty === mode)
        : questions;

      const countBy = (list) => list.reduce(
        (acc, q) => ({ ...acc, [q.difficulty]: (acc[q.difficulty] || 0) + 1 }),
        { facil: 0, medio: 0, dificil: 0 },
      );

      const perBook = {};
      for (const book of BOOKS) {
        if (bookId && book.id !== bookId) continue;
        const list = filtered.filter((q) => q.book_id === book.id);
        perBook[book.id] = {
          book: getBook(book.id),
          total: list.length,
          distribution: countBy(list),
          chapters: [...new Set(list.map((q) => q.chapter))].sort((a, b) => a - b),
        };
      }

      res.json({
        total: filtered.length,
        book_id: bookId,
        distribution: countBy(filtered),
        per_book: perBook,
        chapters: [...new Set(filtered.map((q) => q.chapter))].sort((a, b) => a - b),
        items: filtered.map((q, index) => ({
          id: q.id,
          position: index + 1,
          book_id: q.book_id,
          book: getBook(q.book_id),
          chapter: q.chapter,
          chapter_label: bookChapterLabel(q.book_id, q.chapter),
          difficulty: q.difficulty,
          source_type: q.source_type || 'texto_biblico',
          question: q.question,
        })),
      });
    }),
  );

  return router;
}

export default createQuestionsRoutes;
