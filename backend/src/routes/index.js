import express from 'express';
import { createUserRoutes } from './users.js';
import { createQuizRoutes, createAttemptsRoutes } from './quiz.js';
import { createRankingRoutes } from './ranking.js';
import { createStatsRoutes } from './stats.js';
import { createQuestionsRoutes } from './questions.js';
import { createBooksRoutes } from './books.js';
import { createAdminRoutes } from './admin.js';
import { optionalUser } from '../middleware/auth.js';

/**
 * Monta todas as rotas da API em um único Router.
 * `optionalUser` roda antes de tudo: quando existe um token válido ele popula
 * req.userId, o que permite personalizar respostas públicas (ex.: destacar a
 * própria posição no ranking ou liberar o histórico privado ao dono).
 */
export function createApiRouter({ repo, quiz, achievements }) {
  const api = express.Router();

  api.get('/', (_req, res) => {
    res.json({
      name: 'Quiz Bíblico',
      version: '2.0.0',
      books: ['oseias', 'obadias', 'jonas'],
      docs: '/api/health',
      endpoints: [
        'GET    /api/books',
        'POST   /api/users',
        'POST   /api/users/rejoin',
        'GET    /api/users/me/profile (?book_id=)',
        'GET    /api/users/me/achievements (?book_id=)',
        'PATCH  /api/users/me',
        'DELETE /api/users/me',
        'GET    /api/users/:id (?book_id=)',
        'GET    /api/users/:id/history (?book_id=)',
        'GET    /api/quiz/rules (?book_id=)',
        'POST   /api/quiz/start {book_id, mode?}',
        'POST   /api/quiz/answer',
        'POST   /api/quiz/finish',
        'GET    /api/attempts/public (?book_id=)',
        'GET    /api/attempts/:id',
        'GET    /api/ranking?book_id= (?period=hoje|semana|mes|geral&difficulty=todas|facil|medio|dificil)',
        'GET    /api/ranking/today?book_id=',
        'GET    /api/ranking/week?book_id=',
        'GET    /api/ranking/month?book_id=',
        'GET    /api/ranking/me?book_id=',
        'GET    /api/stats (?book_id=)',
        'GET    /api/stats/attempts (?book_id=)',
        'GET    /api/stats/achievements (?book_id=)',
        'GET    /api/questions (?book_id=&difficulty=)',
        'ANY    /api/admin/*   (Authorization: Bearer ADMIN_TOKEN)',
      ],
    });
  });

  api.use(optionalUser(repo));

  api.use('/books', createBooksRoutes({ repo }));
  api.use('/users', createUserRoutes({ repo, achievements }));
  api.use('/quiz', createQuizRoutes({ repo, quiz, achievements }));
  api.use('/attempts', createAttemptsRoutes({ repo }));
  api.use('/ranking', createRankingRoutes({ repo }));
  api.use('/stats', createStatsRoutes({ repo }));
  api.use('/questions', createQuestionsRoutes({ repo }));
  api.use('/admin', createAdminRoutes({ repo }));

  return api;
}

export default createApiRouter;
