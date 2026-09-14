# Arquitetura — Quiz Bíblico v2.0 (multi-livro)

## 1. Fluxo geral

```
CELULAR / COMPUTADOR  (React + Vite + PWA)
        ↓  HTTPS (JSON)
BACKEND / API  (Node.js + Express)   ← única autoridade de pontuação
        ↓  (service_role key)
SUPABASE  →  POSTGRESQL
```

O navegador **não é autoridade** sobre: respostas corretas, pontuação, ranking, percentual,
duração oficial e resultado final. Ele envia apenas `attempt_id`, `question_id` e
`selected_answer`; tudo o mais é calculado/validado no servidor e gravado no banco.

## 2. Modelo multi-livro

* Tabela `books`: `oseias` (14 cap.), `obadias` (1 cap.), `jonas` (4 cap.) + metadados
  (nome, ícone, cor, descrição, ordem). O livro `daniel` existe apenas como legado inativo
  da migração v1 (preserva o histórico antigo; nunca aparece na UI pública).
* `book_id` em `questions`, `quiz_attempts` e `achievements` (FK → `books`), com índices
  por livro em todas as leituras quentes (ranking, histórico, stats).
* Cada partida usa **exatamente um livro**: 20 questões (6/8/6) sorteadas só daquele livro,
  sem repetição; o jogador pode ter partidas paralelas em livros diferentes.
* Ranking, estatísticas, histórico, conquistas e admin são **separados por livro**.
* Capítulo validado por livro no backend (`utils/books.js`), no banco (trigger
  `check_question_book_chapter`) e no painel admin (limite dinâmico 14/1/4).

## 3. Camadas do backend

| Camada        | Arquivos                  | Responsabilidade |
| ------------- | ------------------------- | ---------------- |
| HTTP/segurança| `app.js`, `middleware/*`  | helmet, CORS, rate limit, sessão HMAC, erros |
| Rotas         | `routes/*`                | contratos da API e validação de entrada (inclui `books`) |
| Serviços      | `services/*`              | regras de negócio puras (pontuação, conquistas por livro) |
| Regras        | `utils/rules.js`          | pontos, bônus, percentual, sanitização (fonte única) |
| Livros        | `utils/books.js`          | metadados, validação de `book_id`/capítulo (fonte única) |
| Sementes      | `db/seeds/*`              | 150 perguntas + 21 conquistas (fonte do SQL gerado) |
| Persistência  | `db/*`                    | interface de repositório com 2 drivers |

### Drivers de banco

* `supabaseRepo.js` — produção: PostgREST + RPCs SQL (`leaderboard(p_book, …)`, `player_rank`,
  `global_stats(p_book)`, `player_stats`). `p_book = NULL` agrega todos os livros.
* `localRepo.js` — desenvolvimento/testes: mesma interface, memória + JSON.
  Os testes de integração sobem o **app HTTP real** contra este driver.

### Geração do seed SQL

`scripts/build-seed-sql.mjs` lê `db/seeds/*.js` e gera `database/seed_books.sql`
(idempotente via `ON CONFLICT`). Edite sempre os arquivos `.js` e regenere o SQL —
nunca o contrário.

## 4. Ciclo de uma partida

1. `POST /api/quiz/start` com `{mode, book_id}` — sorteia 20 questões (6/8/6) **do livro**,
   grava `question_order` (JSON) e devolve as questões **sem gabarito**.
2. `POST /api/quiz/answer` — valida dono, status `STARTED`, pertinência, **livro da questão =
   livro da partida**, **ordem sorteada**, duplicidade e cadência mínima; compara com o
   gabarito no servidor; grava `quiz_answers` e atualiza contadores da partida.
3. `POST /api/quiz/finish` — recalcula tudo a partir das respostas gravadas (nunca confia nos
   contadores do cliente), define `FINISHED`, duração pelo relógio do servidor, bônus de
   aproveitamento, posição **no ranking do livro** e conquistas **do livro** desbloqueadas.
4. A partida `FINISHED` torna-se **imutável** (constraint + trigger no banco).

## 5. Anti-fraude (defesa em profundidade)

1. Gabarito nunca sai antes da resposta (`publicQuestion()` remove `correct_answer`/`explanation`).
2. Isolamento entre livros: questão de outro livro é rejeitada e auditada (`FRAUD_BOOK_MISMATCH`).
3. Ordem sorteada por partida + verificação de posição (audita violações em `audit_log`).
4. `unique(attempt_id, question_id)` impede resposta duplicada no banco.
5. Trigger `protect_answer_insert`: só partida `STARTED`, só o dono, só a questão da vez,
   só questão do livro da partida.
6. Trigger `protect_finished_attempt`: resultado imutável após o fim.
7. Cadência mínima entre respostas (`MIN_ANSWER_INTERVAL_MS`) contra macros.
8. Payloads com campos injetados (`is_correct`, `score`, `points`, `percentage`) são ignorados.
9. Rate limits por IP/sessão em todos os fluxos (geral, cadastro, start, answer, admin).
10. RLS: anon não escreve em nenhuma tabela; leituras públicas só do que é público.
11. `service_role key` e `ADMIN_TOKEN` vivem apenas no backend.

## 6. Identidade e sessão (v2.0 → v2.1)

* v2.0: cadastro por nome/apelido; o servidor emite token `v1.<userId>.<iat>.<exp>.<hmac>`
  (HMAC-SHA256 com `TOKEN_SECRET`). Sem senha.
* v2.1 (preparado): colunas `users.email` e `users.auth_id` já existem; policies sugeridas
  para `auth.uid()` estão comentadas em `database/rls.sql`. A troca é localizada em
  `middleware/auth.js` + `utils/token.js`.

## 7. Ranking

Calculado por `leaderboard(p_book, …)` no PostgreSQL (e espelhado no driver local):
agrega a **melhor partida** por jogador no livro/período/modo e ordena por
`score desc, percentage desc, correct_answers desc, finished_at desc`.
Livros: Oséias/Obadias/Jonas · Períodos: hoje/semana/mês/geral · Modos: todas/fácil/médio/difícil.

## 8. PWA e offline

* `manifest.webmanifest` + ícones (any/maskable) + splash por `background_color`.
* `sw.js`: assets em cache-first, navegação e `GET /api` em network-first com fallback.
* Offline: interface e leituras continuam funcionando; **pontuação offline não existe** —
  o frontend enfileira respostas/finish localmente (`pendingQueueStore`) e sincroniza ao
  reconectar, respeitando a ordem e a cadência do servidor. Falhas de sincronização avisam
  o usuário e mantêm a fila.

## 9. Roadmap suportado pela arquitetura

| Versão | Mudança prevista | Onde encostar |
| ------ | ---------------- | ------------- |
| v2.1 | Auth Supabase (e-mail/Google) | `users.auth_id`, `rls.sql`, `middleware/auth.js` |
| v2.2 | Quiz diário | `quiz_attempts.mode` + nova rota `/api/daily` |
| v2.3 | Desafios 1×1 | nova tabela `challenges` + service |
| v2.4 | Grupos | tabela `groups` + filtro no `leaderboard()` |
| v3.0 | Multiplayer tempo real | WebSocket/SSE sobre `quiz_attempts` |
| futuro | Novos livros | + linha em `books` + 50 perguntas em `db/seeds/` + regenerar seed SQL |

Nada disso foi implementado agora — apenas deixamos espaço limpo (campos, enums e policies).
