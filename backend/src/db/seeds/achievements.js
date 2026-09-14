/**
 * QUIZ BÍBLICO · Catálogo de conquistas — 7 por livro (21 no total)
 * Cada conquista pertence a um livro (`book_id`) e é avaliada com as
 * estatísticas DAQUELE livro (partidas, posição no ranking, precisão).
 */

const uuid = (n) => `22222222-2222-4222-8222-${String(n).padStart(12, '0')}`;

function buildBookAchievements(bookId, prefix, bookName, base) {
  return [
    {
      id: uuid(base + 1), code: `${prefix}_FIRST_GAME`, book_id: bookId,
      name: `Primeira Partida — ${bookName}`, icon: '🎯',
      description: `Complete a sua primeira partida no Quiz de ${bookName}.`,
      criteria: { type: 'attempts_count', value: 1 },
    },
    {
      id: uuid(base + 2), code: `${prefix}_FIVE_GAMES`, book_id: bookId,
      name: `5 Partidas — ${bookName}`, icon: '🔥',
      description: `Complete 5 partidas no Quiz de ${bookName}.`,
      criteria: { type: 'attempts_count', value: 5 },
    },
    {
      id: uuid(base + 3), code: `${prefix}_TEN_GAMES`, book_id: bookId,
      name: `10 Partidas — ${bookName}`, icon: '⚡',
      description: `Complete 10 partidas no Quiz de ${bookName}.`,
      criteria: { type: 'attempts_count', value: 10 },
    },
    {
      id: uuid(base + 4), code: `${prefix}_PERFECT_SCORE`, book_id: bookId,
      name: `100% de Acertos — ${bookName}`, icon: '💯',
      description: `Termine uma partida de ${bookName} com todas as respostas corretas.`,
      criteria: { type: 'perfect_attempt', value: true },
    },
    {
      id: uuid(base + 5), code: `${prefix}_TOP_TEN`, book_id: bookId,
      name: `Top 10 — ${bookName}`, icon: '🏅',
      description: `Entre no top 10 do ranking de ${bookName}.`,
      criteria: { type: 'leaderboard_position', value: 10 },
    },
    {
      id: uuid(base + 6), code: `${prefix}_FIRST_PLACE`, book_id: bookId,
      name: `1º Lugar — ${bookName}`, icon: '👑',
      description: `Alcance o 1º lugar do ranking de ${bookName}.`,
      criteria: { type: 'leaderboard_position', value: 1 },
    },
    {
      id: uuid(base + 7), code: `${prefix}_EXPERT`, book_id: bookId,
      name: `Especialista em ${bookName}`, icon: '📖',
      description: `Acumule 100 respostas corretas em ${bookName} com 85% ou mais de acerto.`,
      criteria: { type: 'expert', correct: 100, min_accuracy: 85 },
    },
  ];
}

export const ACHIEVEMENTS = [
  ...buildBookAchievements('oseias', 'OSEIAS', 'Oséias', 222222220100),
  ...buildBookAchievements('obadias', 'OBADIAS', 'Obadias', 222222220200),
  ...buildBookAchievements('jonas', 'JONAS', 'Jonas', 222222220300),
];

export default ACHIEVEMENTS;
