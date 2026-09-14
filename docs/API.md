# Referência da API — Quiz Bíblico v2.0 (multi-livro)

Base: `/api` · Respostas sempre em JSON · Erros: `{ "error": "mensagem", "details": ... }`

**Autenticação do jogador:** cabeçalho `Authorization: Bearer <token>` obtido em `POST /users`
(ou `/users/rejoin`). O token é assinado (HMAC-SHA256) pelo servidor.

**Autenticação administrativa:** `Authorization: Bearer <ADMIN_TOKEN>` (ou token registrado em
`admin_tokens`).

**Livros:** `book_id` é `oseias` | `obadias` | `jonas`. Rotas de jogo/ranking exigem o livro;
rotas de leitura aceitam `?book_id=` opcional para filtrar (sem ele, agregam todos os livros).

---

## Saúde e metadados

| Método | Rota          | Descrição                                  |
| ------ | ------------- | ------------------------------------------ |
| GET    | `/api`        | lista de endpoints                          |
| GET    | `/api/health` | status + driver + contagens (inclui `questions_per_book`) |

## Livros

| Método | Rota          | Descrição |
| ------ | ------------- | --------- |
| GET    | `/api/books`  | catálogo público dos 3 livros ativos (metadados + distribuição 15/20/15 + agregados) |

## Jogadores

| Método | Rota                      | Auth | Descrição |
| ------ | ------------------------- | ---- | --------- |
| POST   | `/api/users`              | —    | cadastro simples `{name, nickname}` → `{user, token, expires_at}` |
| POST   | `/api/users/rejoin`       | —    | recupera sessão pelo apelido `{nickname}` |
| GET    | `/api/users/me/profile?book_id=` | ✅ | perfil + estatísticas + ranks por livro + conquistas + histórico (filtro opcional) |
| GET    | `/api/users/me/achievements?book_id=` | ✅ | conquistas do jogador (filtro opcional) |
| PATCH  | `/api/users/me`           | ✅   | `{name?, share_profile?}` |
| DELETE | `/api/users/me?mode=anonymize\|delete` | ✅ | exclusão/anonimização |
| GET    | `/api/users/:id?book_id=` | —    | perfil público (403 se `share_profile=false` e não for o dono) |
| GET    | `/api/users/:id/history?book_id=&limit=` | — | histórico (mesma regra de privacidade + filtro por livro) |

## Jogo (autoridade do servidor)

| Método | Rota               | Auth | Descrição |
| ------ | ------------------ | ---- | --------- |
| GET    | `/api/quiz/rules?book_id=` | — | tabela pública de pontuação/bônus (+ metadados do livro, se informado) |
| POST   | `/api/quiz/start`  | ✅   | `{mode?, book_id}` → partida + 20 questões **sem gabarito, só do livro**; se houver partida aberta **naquele livro**, retorna `resumed: true` (livros diferentes têm partidas paralelas) |
| POST   | `/api/quiz/answer` | ✅   | `{attempt_id, question_id, selected_answer}` → `{is_correct, points_earned, progress, reveal}` (gabarito e explicação só depois da resposta) |
| POST   | `/api/quiz/finish` | ✅   | `{attempt_id}` → resultado oficial + rank no livro + conquistas do livro + mensagem de compartilhamento + revisão |

### Validações de `/api/quiz/answer`

* partida existe, pertence ao jogador e está `STARTED`;
* questão pertence à ordem sorteada da partida;
* questão **é do mesmo livro da partida** (400 + auditoria `FRAUD_BOOK_MISMATCH` caso contrário);
* questão é **exatamente a da vez** (ordem obrigatória);
* questão ainda não respondida (`409` caso contrário; constraint no banco é a garantia final);
* cadência mínima entre envios (`MIN_ANSWER_INTERVAL_MS`, padrão 1200 ms) → `429`;
* campos extras no payload (`is_correct`, `score`, `points`…) são **ignorados**.

## Partidas

| Método | Rota                     | Auth | Descrição |
| ------ | ------------------------ | ---- | --------- |
| GET    | `/api/attempts/public?book_id=` | — | histórico público (livro, apelido, pontos, acertos, %, data) |
| GET    | `/api/attempts/:id`      | opc. | detalhe; revisão com gabarito apenas para partidas `FINISHED` ou para o dono |

## Ranking (sempre de UM livro)

| Método | Rota                                  | Descrição |
| ------ | ------------------------------------- | --------- |
| GET    | `/api/ranking?book_id=&period=&difficulty=` | `book_id` **obrigatório** · `period`: `all\|today\|week\|month` (aceita `geral\|hoje\|semana\|mes`) · `difficulty`: `all\|facil\|medio\|dificil` |
| GET    | `/api/ranking/today?book_id=` · `/week` · `/month` · `/all` | atalhos de período (exigem `book_id`) |
| GET    | `/api/ranking/me?book_id=&period=&difficulty=` | ✅ posição, total de jogadores e percentual superado **no livro** |

Ordenação (no banco, nunca no cliente): **pontos → percentual → acertos → recência**.

## Estatísticas e catálogo

| Método | Rota                     | Descrição |
| ------ | ------------------------ | --------- |
| GET    | `/api/stats?book_id=`    | dashboard público (totais, médias, pergunta mais acertada/errada, últimos resultados) + `per_book` quando sem filtro |
| GET    | `/api/stats/attempts`    | últimas partidas finalizadas |
| GET    | `/api/stats/achievements?book_id=` | catálogo de conquistas (21 no total, 7 por livro) |
| GET    | `/api/questions?book_id=`| catálogo público **sem gabarito** (+ distribuição por dificuldade e `per_book`) |

## Admin (`/api/admin/*`)

| Método | Rota                        | Descrição |
| ------ | --------------------------- | --------- |
| GET    | `/admin/overview`           | dashboard + distribuição de questões + `by_book` + últimos cadastros/partidas |
| GET    | `/admin/users`              | usuários com agregados (`?search=&limit=&offset=`) |
| PATCH  | `/admin/users/:id/role`     | `{role: "admin"\|"player"}` |
| DELETE | `/admin/users/:id?mode=`    | `anonymize` ou `delete` |
| GET    | `/admin/questions?book_id=` | todas as questões (com gabarito), com filtro por livro |
| POST   | `/admin/questions`          | cria questão (**exige `book_id`**; capítulo validado por livro: Os 1–14, Ob 1, Jn 1–4) |
| PUT    | `/admin/questions/:id`      | edição parcial (ex.: só `difficulty`) |
| DELETE | `/admin/questions/:id`      | remove; se já respondida, **desativa** preservando histórico |
| GET    | `/admin/attempts?book_id=&status=&user_id=` | partidas com filtro por livro |
| GET    | `/admin/ranking?book_id=&period=&difficulty=` | ranking completo (exige `book_id`) |
| GET    | `/admin/stats`              | estatísticas |
| GET    | `/admin/health`             | saúde do banco |

## Rate limit

Todos os endpoints passam por limitadores por IP/sessão: geral (`RATE_MAX`), cadastro
(`RATE_MAX_AUTH`), criação de partidas (`RATE_MAX_START`), respostas (`RATE_MAX_ANSWER`) e
admin (`RATE_MAX_ADMIN`). Resposta `429` inclui `retry_after_seconds`.

## Códigos de erro comuns

| Código | Quando |
| ------ | ------ |
| 400 | payload inválido / IDs malformados / `book_id` ausente ou inválido / capítulo fora do livro / questão de outro livro |
| 401 | sem sessão ou sessão inválida/expirada |
| 403 | partida/perfil de outro jogador · credencial admin inválida · perfil privado |
| 404 | recurso inexistente |
| 409 | apelido duplicado · resposta duplicada · partida encerrada · ordem violada |
| 429 | rate limit ou cadência mínima entre respostas |
