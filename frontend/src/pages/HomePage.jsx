import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { Link } from '../components/Link.jsx';
import { ErrorState, Loading, StatsGrid } from '../components/ui.jsx';
import { formatNumber, formatPercent } from '../lib/format.js';
import { useApp } from '../context/AppContext.jsx';

/** Tela inicial: título, indicadores globais e ações principais. */
export function HomePage() {
  const { user, notify } = useApp();
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
        const cached = window.localStorage.getItem('quiz-daniel:v1:cached-stats');
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
        window.localStorage.setItem('quiz-daniel:v1:cached-stats', JSON.stringify(stats));
      } catch {
        /* ignora */
      }
    }
  }, [stats]);

  return (
    <div className="rise">
      <section className="hero">
        <div className="kicker">Livro do profeta · capítulos 1 a 12</div>
        <h1>
          QUIZ BÍBLICO
          <span>DANIEL</span>
        </h1>
        <p>Teste seus conhecimentos sobre o livro de Daniel</p>
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
            <Link to={user ? '/quiz' : '/entrar?next=/quiz'} className="btn btn-primary">
              🎯 ENTRAR NO QUIZ
            </Link>
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
                  to="/quiz"
                  className="btn btn-sm btn-primary"
                  onClick={() => notify('Boa sorte! Lembre-se: a pontuação oficial é do servidor. 🛡️')}
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
