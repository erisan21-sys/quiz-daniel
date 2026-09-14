# Auditoria final — v2.0 (multi-livro)

Executada em 14/09/2026 sobre o repositório completo.
Comandos: `npm test` (backend, 92 testes), `npm run build` (frontend), inspeção manual de
SQL/RLS/PWA e teste de fumaça (`/api/health`, `/api/books`, `/api/ranking` sem `book_id` → 400).

Resultado: **102/102 testes passando · build de produção sem erros · nenhum TODO/FIXME/placeholder**
· **nenhuma referência a Daniel na UI pública** (só legado documentado: migração, seed v1 e auditoria v1).

| # | Item auditado | Onde verificar | Resultado |
| - | ------------- | -------------- | --------- |
| 1 | Banco: livros, tabelas, enums, timestamps | `database/schema.sql` | ✅ books + users, questions, quiz_attempts, quiz_answers, achievements, user_achievements (+ admin_tokens, audit_log) com created_at/updated_at |
| 2 | Relacionamentos (FK) | schema.sql | ✅ book_id → books (restrict); attempts→users cascade; answers→attempts cascade; answers→questions restrict; user_achievements→users/achievements cascade |
| 3 | Índices e constraints | schema.sql | ✅ índices por livro + ranking (score/percentage/correct/finished), histórico por usuário, unique(attempt_id, question_id), checks de não-negatividade e percentual 0–100 |
| 4 | SQL (ranking/stats no banco) | schema.sql (`leaderboard(p_book,…)`, `player_rank`, `global_stats(p_book)`, `player_stats`) | ✅ cálculo server-side por livro, estável e paginável |
| 5 | Perguntas por livro | `db/seeds/*.js` + `seed_books.sql` | ✅ 150 no total: 50/livro (15 fáceis · 20 médias · 15 difíceis); capítulos Os 1–14, Ob 1, Jn 1–4 |
| 6 | API completa do escopo | `docs/API.md` + `routes/*` | ✅ 12+ endpoints + books, rejoin, rules, attempts/public, ranking/me, admin — todos com `book_id` |
| 7 | Frontend: 9 telas | `frontend/src/pages/*` | ✅ Home (escolha do livro), Cadastro, Quiz, Resultado, Ranking, Histórico, Perfil, Estatísticas, Admin |
| 8 | Backend: autoridade de pontuação | `services/quizService.js` | ✅ is_correct/score/percentage/duration calculados só no servidor; gabarito nunca sai antes da resposta |
| 9 | Pontuação e bônus | `utils/rules.js` + testes | ✅ 100/200/300 · +500/+300/+150 · sem pontuação negativa · máx. 4.500 |
| 10 | Ranking: critérios e filtros | `leaderboard(p_book)` + RankingPage | ✅ separado por livro; pontos → % → acertos → recência; HOJE/SEMANA/MÊS/GERAL × TODAS/FÁCIL/MÉDIO/DIFÍCIL; 🥇🥈🥉 |
| 11 | Histórico próprio e público | HistoryPage + `/api/attempts/public` | ✅ data/livro/pontos/acertos/erros/%/duração; público só apelido+resultado; abertura de partida anterior com revisão |
| 12 | Cadastro simples + UUID | `/api/users` | ✅ nome/apelido, UUID server-side, token HMAC, sem senha; campos de auth futura prontos |
| 13 | Segurança | helmet/CORS/rate limit/validação/RLS | ✅ CSP em produção, CORS por origem, 6 limitadores, sanitização de entrada, service_role só no backend, `.env.example` sem segredos; `questions` sem leitura pública (anti-vazamento de gabarito) |
| 14 | RLS | `database/rls.sql` | ✅ RLS em 9 tabelas (inclui books); anon só lê o público; escrita anônima inexistente; admin_tokens/audit_log fechados |
| 15 | Responsividade | `styles/global.css` | ✅ mobile-first; breakpoints 768/1024; nav vira barra inferior <768px; tabelas com scroll; cartões de livro em grade fluida |
| 16 | PWA | manifest + sw.js + ícones | ✅ instalável (standalone), nome Quiz Bíblico, ícones any/maskable 192/512 + SVG, splash por background_color, shortcuts, screenshot; cache v2 |
| 17 | Offline | sw.js + QuizPage | ✅ leitura cacheada; aviso de queda; fila local de respostas/finish com sincronização ordenada; pontuação offline nunca é oficial |
| 18 | Conquistas | achievements + achievementService | ✅ 21 conquistas (7/livro) com critérios em JSON no banco; desbloqueio server-side por livro no finish |
| 19 | Estatísticas | global_stats + StatsPage/Admin | ✅ totais, médias, melhor/%, pergunta mais acertada/errada, últimos resultados — geral e por livro |
| 20 | Área administrativa | `/admin` + `/api/admin/*` | ✅ token ADMIN_TOKEN ou admin_tokens; CRUD de perguntas (livro obrigatório + capítulo por livro + desativação segura), usuários, partidas, ranking, stats |
| 21 | Compartilhamento | ResultPage + `shareResult` | ✅ mensagem com nome do livro, botões COMPARTILHAR (Web Share → wa.me) e COPIAR |
| 22 | Anti-fraude | triggers + service + testes | ✅ isolamento entre livros, ordem sorteada, duplicidade, dono, status, cadência, payload ignorado, imutabilidade, auditoria |
| 23 | Privacidade/LGPD | users.share_profile + DELETE /users/me | ✅ anonimizar ou apagar; ranking respeita opt-out |
| 24 | Testes | `backend/test/*` | ✅ 102 testes (56 integração HTTP real + 35 regras + 10 segurança + infra), incluindo isolamento entre livros e anti-vazamento de gabarito |
| 25 | Documentação | README + docs/* | ✅ instalação, Supabase, migração v1→v2, env, execução, testes, deploy, admin, backup |
| 26 | Migração v1→v2 | `database/migracoes/2026-09-14_multi_book.sql` | ✅ preserva histórico como `daniel` inativo; `SELECT`s de conferência; ordem de aplicação documentada |

## Revisão de segurança pós-auditoria (14/09/2026)

Auditoria externa do PR #1 pediu 3 correções antes do merge — todas aplicadas nesta branch:

1. **Gabarito via Supabase (🔴):** removida a policy `questions_select_public`. A tabela
   `questions` segue com RLS habilitado e **zero** policies para `anon`/`authenticated`;
   perguntas só via API (`service_role` + `publicQuestion()` sem gabarito). Coberta por
   3 testes estáticos do SQL + 2 testes de não-vazamento via HTTP.
2. **Service Worker (🔴):** `sw.js` reescrito com negação padrão — só GETs de endpoints
   comprovadamente públicos entram no Cache API; qualquer `Authorization`, `/users/*`,
   `/admin/*`, `/ranking/me`, `/attempts/:id` e não-GETs são passthrough puro. Versão do
   cache bumped (`sw2`) para descartar cópias antigas. Coberta por 4 testes que carregam
   o `sw.js` real em `vm` no Node.
3. **Conteúdo das perguntas (🟡):** corrigido 1 gabarito/enunciado incompatível
   (Os 4:15: verbo "subir" → questão agora usa "não venhais a Gilgal"), 1 inconsistência
   de unidade (siclos → peças, igual à citação) e suavizadas 14 explicações com leitura
   interpretativa, agora atribuídas ("muitos estudiosos veem…", "muitos entendem…") ou
   ancoradas no versículo. `seed_books.sql` regenerado das seeds.
4. **Extras:** limpas as referências desnecessárias a Daniel na UI (placeholders,
   `VITE_APP_NAME`, cabeçalhos); adicionado CI do GitHub (`.github/workflows/ci.yml`)
   para comprovar testes + build no PR.

## Pontos de atenção conscientes (decisões de projeto)

1. **Exemplo "4.100 pontos" do briefing:** com a distribuição oficial 6/8/6, 18 acertos valem
   3.700–4.100 conforme o nível das questões erradas (2 fáceis erradas = 4.100). O servidor
   sempre calcula o valor exato; a tabela de regras é pública em `/api/quiz/rules`.
2. **Sem senha na v2.0** (decisão do escopo): a recuperação de sessão é pelo apelido
   (`/api/users/rejoin`); o login real entra na v2.1 com Supabase Auth (campos já reservados).
3. **Cronômetro do navegador é apenas visual** — a duração oficial é `finished_at − started_at`
   no servidor, com teto configurável.
4. **Questão já respondida em partidas não é excluída**: `DELETE /api/admin/questions`
   desativa (`active=false`) para preservar histórico e integridade das FKs.
5. **Modo por dificuldade sorteia até 15 questões** (todo o nível do livro), enquanto o modo
   misto oficial tem sempre 20 (6/8/6).
6. **Histórico v1 (Daniel)** é preservado no banco como livro inativo e não aparece na UI
   pública; pode ser consultado internamente via `book_id='daniel'`.
