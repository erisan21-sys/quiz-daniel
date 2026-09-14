import express from 'express';
import { ApiError } from '../utils/rules.js';
import { getBook, normalizeBookId } from '../utils/books.js';
import { asyncHandler } from '../middleware/error.js';
import { attemptSummary } from '../services/quizService.js';

/**
 * Estatísticas públicas + catálogo de conquistas — por LIVRO.
 *   GET /api/stats              → agregado geral + bloco `per_book`
 *   GET /api/stats?book_id=jonas → somente o livro
 */
export function createStatsRoutes({ repo }) {
  const router = express.Router();

  function parseBook(query = {}) {
    const rawBook = query.book_id ?? query.book;
    if (rawBook === undefined || rawBook === '') return null;
    const bookId = normalizeBookId(rawBook);
    if (!bookId) throw new ApiError(400, 'Livro inválido. Escolha oseias, obadias ou jonas.');
    return bookId;
  }

  /* GET /api/stats — dashboard público */
  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const bookId = parseBook(req.query);
      const [stats, recent] = await Promise.all([
        repo.globalStats({ bookId }),
        repo.publicRecentAttempts({ limit: 10, bookId }).catch(() => []),
      ]);
      res.json({
        ...stats,
        book: bookId ? getBook(bookId) : null,
        recent_attempts: recent.map((item) => {
          const book = getBook(item.book_id);
          return {
            nickname: item.nickname,
            book_id: item.book_id,
            book: book ? { id: book.id, name: book.name, short_name: book.short_name, icon: book.icon } : null,
            score: item.score,
            score_label: item.score.toLocaleString('pt-BR'),
            percentage: item.percentage,
            correct_answers: item.correct_answers,
            total_questions: item.total_questions,
            date_label: new Date(item.finished_at).toLocaleDateString('pt-BR'),
          };
        }),
      });
    }),
  );

  /* GET /api/stats/attempts — últimas partidas */
  router.get(
    '/attempts',
    asyncHandler(async (req, res) => {
      const bookId = parseBook(req.query);
      const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
      const { items, total } = await repo.listAttempts({ status: 'FINISHED', limit, bookId });
      res.json({
        total,
        book_id: bookId,
        items: items.map((attempt) => attemptSummary(attempt, { nickname: attempt.nickname })),
      });
    }),
  );

  /* GET /api/stats/achievements — catálogo público (?book_id= opcional) */
  router.get(
    '/achievements',
    asyncHandler(async (req, res) => {
      const bookId = parseBook(req.query);
      const items = await repo.listAchievements({ bookId });
      res.json({ total: items.length, book_id: bookId, items });
    }),
  );

  return router;
}

export default createStatsRoutes;
