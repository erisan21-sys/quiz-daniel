# Supabase — banco, RLS, administrador e backup

## 1. Criação do projeto

1. <https://supabase.com> → **New project** (região próxima: `sa-east-1` quando disponível).
2. Guarde a senha do banco e aguarde o provisionamento.

## 2. Aplicar o esquema v2.0 (SQL Editor, nesta ordem)

### Instalação limpa

1. `database/schema.sql`
   * tabela `books` (id, nome, capítulos, ícone, cor, ordem, descrição, ativo);
   * enums (`question_difficulty`, `answer_letter`, `attempt_status`, `quiz_mode`, `user_role`);
   * tabelas `users`, `questions`, `quiz_attempts`, `quiz_answers`, `achievements`,
     `user_achievements`, `admin_tokens`, `audit_log`;
   * `book_id` (FK → `books`) em `questions`, `quiz_attempts` e `achievements`;
   * chaves estrangeiras com `on delete cascade/restrict`;
   * índices (por livro, ranking, histórico, respostas) e constraints (pontuação ≥ 0,
     percentual 0–100, alternativas distintas, `unique(attempt_id, question_id)`);
   * triggers:
     * `set_updated_at` (timestamps);
     * `check_question_book_chapter` — capítulo dentro do limite do livro (Os 1–14, Ob 1, Jn 1–4);
     * `protect_finished_attempt` — **partida FINISHED/ABANDONED é imutável**;
     * `protect_answer_insert` — resposta só em partida STARTED, do dono, na ordem sorteada
       **e no livro da partida**;
   * funções de leitura agregada: `leaderboard(p_book, …)`, `player_rank()`,
     `global_stats(p_book)`, `player_stats()` (`NULL` = todos os livros).
2. `database/seed_books.sql` — 3 livros + 150 perguntas (50 por livro: 15/20/15) + 21
   conquistas (7 por livro). Idempotente (`on conflict do nothing`/`do update`).
   Gerado por `node scripts/build-seed-sql.mjs` a partir de `backend/src/db/seeds/*.js`.
3. `database/rls.sql` — habilita RLS em todas as tabelas e cria as policies públicas.

### Migração v1 (Daniel) → v2 (produção existente)

1. **Backup primeiro:** `pg_dump` completo (seção 6).
2. Execute `database/migracoes/2026-09-14_multi_book.sql`: cria `books` (inclui `daniel`
   inativo para preservar o histórico), adiciona `book_id` com default temporário, recria
   triggers/RPCs e confere com `SELECT`s de verificação no final do arquivo.
3. Execute `database/seed_books.sql` e `database/rls.sql`.
4. Valide: `/api/health` deve informar 150 perguntas (50/50/50); o ranking antigo de Daniel
   continua consultável internamente via `book_id='daniel'`, mas não aparece na UI pública.

> `database/seed.sql` é o legado da v1.0 (Daniel, 20 perguntas) — mantido apenas para
> histórico; instalações novas usam `seed_books.sql`.

## 3. Modelo de segurança (RLS)

| Tabela             | anon/authenticated                     | service_role |
| ------------------ | -------------------------------------- | ------------ |
| `books`            | SELECT apenas de `active=true`         | tudo |
| `questions`        | SELECT apenas de ativas                | tudo |
| `users`            | SELECT apenas de `share_profile=true`  | tudo |
| `quiz_attempts`    | SELECT apenas de `FINISHED` públicas   | tudo |
| `quiz_answers`     | SELECT apenas de partidas `FINISHED`   | tudo |
| `achievements`     | SELECT                                  | tudo |
| `user_achievements`| SELECT (perfis públicos)                | tudo |
| `admin_tokens`     | **nenhum acesso**                       | tudo |
| `audit_log`        | **nenhum acesso**                       | tudo |

Consequência prática: mesmo que a `anon key` vaze, **não existe caminho para alterar
pontuação pelo banco**. Toda escrita passa pela API, que usa a `service_role key`
(exclusiva do backend) e revalida tudo em `services/quizService.js`.

> O gabarito (`correct_answer`, `explanation`) nunca é enviado pelo backend antes da resposta:
> as rotas públicas montam as questões com `publicQuestion()`, que remove esses campos.

## 4. Chaves

* **Project Settings → API**
  * `SUPABASE_URL` = Project URL
  * `SUPABASE_SERVICE_ROLE_KEY` = `service_role` → **somente no backend** (`backend/.env`,
    variáveis do Render/Railway). Nunca no frontend, nunca no repositório.
  * `SUPABASE_ANON_KEY` = `anon` → informativa (o frontend só fala com a API).

## 5. Criar o administrador

**Opção A — token de configuração:** defina `ADMIN_TOKEN` no backend. Nada a fazer no
banco.

**Opção B — registro em banco:**

```bash
npm run make-admin -- --nickname "MeuApelido" --name "Meu Nome"
# opcional: --token MEU_TOKEN_SENHA_FORTE
```

O script imprime dois `INSERT` (usuário `role='admin'` + hash SHA-256 do token em
`admin_tokens`, com expiração de 1 ano). Cole no SQL Editor e use o token impresso na tela
`/admin`.

Para rotacionar: exclua a linha de `admin_tokens` e gere outra.

## 6. Backup e restauração

```bash
# exportação completa (esquema + dados)
pg_dump "$DATABASE_URL" --format=custom --file=backup-$(date +%F).dump

# restauração
pg_restore --clean --if-exists -d "$DATABASE_URL" backup-2026-09-14.dump

# apenas dados (CSV) de uma tabela
psql "$DATABASE_URL" -c "\copy public.quiz_attempts TO 'attempts.csv' CSV HEADER"
```

* Backups automáticos: Dashboard → Database → Backups (planos pagos) — restaure por PITR.
* O `schema.sql` + `seed_books.sql` + `migracoes/*` versionados garantem recriar a estrutura
  a qualquer momento.
* Antes de mudanças de esquema: dump → aplicar migração → dump de conferência.

## 7. Evolução do esquema (v2.1+)

* Login por e-mail/Google: use `auth.users` do Supabase e ligue `users.auth_id`
  (coluna já existente). As policies sugeridas estão comentadas no final de `database/rls.sql`.
* Novas conquistas: `INSERT` em `achievements` com `criteria` JSON e `book_id` — o motor de
  regras (`services/achievementService.js`) já interpreta `attempts_count`, `perfect_attempt`,
  `leaderboard_position`, `accuracy` e `expert`.
* Novos livros: `INSERT` em `books` + 50 perguntas em `backend/src/db/seeds/` +
  `node scripts/build-seed-sql.mjs` + aplicar o SQL gerado.
