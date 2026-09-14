import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { Link } from '../components/Link.jsx';
import { ErrorState, Loading, StatsGrid } from '../components/ui.jsx';
import { formatNumber, formatPercent } from '../lib/format.js';
import { useBooks } from '../lib/books.js';
import { lastBookStore } from '../lib/storage.js';
import { useApp } from '../context/AppContext.jsx';

/** Tela inicial: escolha do livro, indicadores globais e ações principais. */
export function HomePage() {
  const { user, notify } = useApp();
  const books = useBooks();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [waking, setWaking] = useState(false);

  // Carrega com insistência: no plano gratuito o Render pode levar ~40-60 s
  // para "acordar" no primeiro acesso do dia. Em vez de mostrar erro cedo
  // demais, aguardamos com aviso amigável e só então exibimos o ErrorState.
  const load = async () => {
    setError(null);
    setWaking(false);
    const waits = [0, 3000, 5000, 8000, 12000, 15000, 20000];
    for (let attempt = 0; attempt < waits.length; attempt += 1) {
      if (waits[attempt]) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, waits[attempt]));
        setWaking(true);
      }
      try {
        // eslint-disable-next-line no-await-in-loop
        setStats(await api.stats());
        setWaking(false);
        return;
      } catch (err) {
        if (attempt < waits.length - 1) continue;
        setError(err);
        const cached = window.localStorage.getItem('quiz-biblico:v2:cached-stats');
        if (cached) {
          try {
            setStats(JSON.parse(cached));
          } catch {
            /* cache ilegível: segue com o estado de erro */
          }
        }
      }
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (stats) {
      try {
        window.localStorage.setItem('quiz-biblico:v2:cached-stats', JSON.stringify(stats));
      } catch {
        /* ignora */
      }
    }
  }, [stats]);

  const playHref = (bookId) => {
    const quizUrl = `/quiz?livro=${bookId}`;
    return user ? quizUrl : `/entrar?next=${encodeURIComponent(quizUrl)}`;
  };

  return (
    <div className="rise">
      <section className="hero">
        <div className="kicker">Antigo Testamento · 3 livros · 150 perguntas</div>
        <h1>
          QUIZ BÍBLICO
          <span>ESCOLHA O LIVRO</span>
        </h1>
        <p>20 perguntas por partida · 6 fáceis + 8 médias + 6 difíceis · ranking separado por livro</p>
      </section>

      <section className="book-grid" aria-label="Escolha o livro">
        {books.map((book) => (
          <article key={book.id} className="card book-card">
            <div className="book-icon" aria-hidden="true">{book.icon}</div>
            <h2>{book.short_name}</h2>
            <p className="muted book-desc">{book.description}</p>
            <p className="faint mb-8">
              {book.questions?.total ?? 50} perguntas · {book.chapters === 1 ? 'capítulo único' : `${book.chapters} capítulos`}
            </p>
            {stats?.per_book?.[book.id] && (
              <p className="faint mb-8">
                🎮 {formatNumber(stats.per_book[book.id].total_attempts)} partidas jogadas
              </p>
            )}
            <Link
              to={playHref(book.id)}
              className="btn btn-primary btn-block"
              onClick={() => {
                lastBookStore.save(book.id);
                notify(`Boa sorte no livro de ${book.name}! A pontuação oficial é do servidor. 🛡️`, 'info');
              }}
            >
              🎯 {book.short_name} — JOGAR
            </Link>
            <Link to={`/ranking?livro=${book.id}`} className="btn btn-block mt-8">
              🏆 Ranking de {book.name}
            </Link>
          </article>
        ))}
      </section>

      {error && !stats && <ErrorState error={error} onRetry={load} />}
      {!stats && !error && (
        <Loading
          label={
            waking
              ? 'Acordando o servidor (plano gratuito)… já já carrega 🙏'
              : 'Carregando indicadores…'
          }
        />
      )}
      {error && stats && (
        <p className="faint mb-8" style={{ fontSize: 13 }}>
          ⚠️ O servidor não respondeu agora; exibindo os últimos indicadores salvos neste
          aparelho.{' '}
          <button type="button" className="linklike" onClick={load}>
            Tentar de novo
          </button>
        </p>
      )}

      {stats && (
        <>
          <StatsGrid
            items={[
              { icon: '👥', label: 'Jogadores', value: formatNumber(stats.total_players) },
              { icon: '🎮', label: 'Partidas', value: formatNumber(stats.total_attempts) },
              { icon: '🏆', label: 'Maior pontuação', value: formatNumber(stats.best_score) },
              { icon: '📊', label: 'Melhor percentual', value: formatPercent(stats.best_percentage) },
            ]}
          />

          <div className="home-actions">
            <Link to="/ranking" className="btn">🏆 RANKING</Link>
            <Link to={user ? '/historico' : '/entrar?next=/historico'} className="btn">📜 HISTÓRICO</Link>
            <Link to="/estatisticas" className="btn">📊 ESTATÍSTICAS</Link>
          </div>

          {stats.most_wrong_question?.[0] && (
            <div className="card mt-24">
              <h3 className="card-title">🔥 A pergunta que mais derruba jogadores</h3>
              <p className="mb-8">“{stats.most_wrong_question[0].text}”</p>
              <p className="faint mb-0">
                Acerto de apenas {stats.most_wrong_question[0].accuracy}% entre todas as respostas
                registradas. Você consegue?
              </p>
              <div className="mt-8">
                <Link
                  to="/"
                  className="btn btn-sm btn-primary"
                  onClick={() => notify('Escolha um livro acima e aceite o desafio! 🎯')}
                >
                  Aceitar o desafio
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
