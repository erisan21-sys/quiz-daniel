import express from 'express';
import { asyncHandler } from '../middleware/error.js';

/**
 * Catálogo público de livros (/api/books).
 * Devolve os livros jogáveis com metadados, distribuição de questões,
 * total de partidas e melhor pontuação de cada um.
 */
export function createBooksRoutes({ repo }) {
  const router = express.Router();

  router.get(
    '/',
    asyncHandler(async (_req, res) => {
      const items = await repo.listBooks();
      res.json({ total: items.length, items });
    }),
  );

  return router;
}

export default createBooksRoutes;
