/**
 * Sementes usadas pelo driver `local` (DB_DRIVER=local).
 * Conteúdo idêntico ao de database/seed_books.sql (gerado por
 * `scripts/build-seed-sql.mjs` a partir destes arquivos).
 *
 *   150 perguntas: 50 por livro (15 fáceis · 20 médias · 15 difíceis)
 *   21 conquistas: 7 por livro
 *
 * O `id` é determinístico para facilitar testes e migrações locais.
 */
import { OSEIAS_QUESTIONS } from './seeds/oseias.js';
import { OBADIAS_QUESTIONS } from './seeds/obadias.js';
import { JONAS_QUESTIONS } from './seeds/jonas.js';
import { ACHIEVEMENTS } from './seeds/achievements.js';
import { BOOKS } from '../utils/books.js';

export const QUESTIONS = [...OSEIAS_QUESTIONS, ...OBADIAS_QUESTIONS, ...JONAS_QUESTIONS];

export { ACHIEVEMENTS, BOOKS };
export { OSEIAS_QUESTIONS, OBADIAS_QUESTIONS, JONAS_QUESTIONS };

export default { QUESTIONS, ACHIEVEMENTS, BOOKS };
