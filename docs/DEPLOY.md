# Publicação em produção

## Opção A — Frontend na Vercel + Backend no Render/Railway (recomendada)

### 1. Banco (Supabase)

Siga `docs/SUPABASE.md`:
* projeto novo → schema → seed_books → rls;
* **produção v1 existente → aplicar a migração `database/migracoes/2026-09-14_multi_book.sql`
  + `seed_books.sql` + `rls.sql` ANTES de publicar o backend v2.0** (faça `pg_dump` antes).

### 2. Backend (Render)

1. New → **Web Service** → repositório → root directory `backend`.
2. Build: `npm install` · Start: `npm start`.
3. Variáveis de ambiente:

```
NODE_ENV=production
DB_DRIVER=supabase
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=***   # service_role!
TOKEN_SECRET=<64+ chars aleatórios>
ADMIN_TOKEN=<token forte>
CORS_ORIGIN=https://seu-app.vercel.app
PORT=10000            # Render injeta PORT automaticamente; padrão interno ok
MIN_ANSWER_INTERVAL_MS=1200
```

4. Anote a URL pública: `https://quiz-daniel-api.onrender.com`.

**Railway:** mesmo princípio (service Node, root `backend`, start `npm start`).

### 3. Frontend (Vercel)

1. New Project → repositório → root directory `frontend`.
2. Framework: **Vite** · Build `npm run build` · Output `dist`.
3. Variável: `VITE_API_URL=https://quiz-daniel-api.onrender.com`.
4. Deploy. O app usa hash router → **não precisa de rewrite** para SPA.
5. Confirme em `CORS_ORIGIN` o domínio exato da Vercel (com `https://`, sem barra final).

### 4. Checagens finais

* `https://api.../api/health` → `{"ok":true,...,"driver":"supabase"}` com 150 perguntas.
* `/api/books` → 3 livros ativos.
* Escolher livro → cadastro → partida → resultado → ranking do livro funcionando.
* DevTools → Application → Manifest: ícones e “Adicionar à tela inicial” disponíveis
  (HTTPS obrigatório — automático nessas plataformas).

## Opção B — Monolito (backend serve o frontend)

```bash
npm run build                      # gera frontend/dist
# no servidor (Render/Railway/VPS), com NODE_ENV=production:
npm run start:backend              # Express serve frontend/dist na mesma origem
```

Vantagens: zero CORS, PWA com escopo perfeito, uma única URL.
Na Vercel Functions também é possível (API route proxy + static), mas a Opção A é mais simples.

## Opção C — VPS próprio (nginx + pm2)

```nginx
server {
  listen 443 ssl http2;
  server_name quiz.seudominio.com.br;
  ssl_certificate     /etc/letsencrypt/live/quiz.seudominio.com.br/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/quiz.seudominio.com.br/privkey.pem;

  location /api/ { proxy_pass http://127.0.0.1:8787; proxy_set_header X-Forwarded-For $remote_addr; }
  location /     { root /var/www/quiz-daniel/frontend/dist; try_files $uri /index.html; }
}
```

`pm2 start backend/src/server.js --name quiz-api` + `certbot` para HTTPS.

## Notas de segurança em produção

* `NODE_ENV=production` ativa CSP rígida (helmet) e mensagens de erro sem stack.
* Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` fora do backend (a Vercel não recebe essa variável).
* Gire `TOKEN_SECRET` invalida sessões antigas (comportamento esperado).
* Monitore `429` e a tabela `audit_log` (tentativas de fraude ficam registradas).

---

## Publicação sem E2B / sem sandbox (guia definitivo)

O projeto **não contém nenhuma dependência de E2B**: nada no código referencia sandbox,
`sandboxId`, `e2b.app`, `Sandbox.create()` ou `E2B_API_KEY`. URLs `*.e2b.app` que possam ter
aparecido antes eram apenas o *preview temporário do ambiente de desenvolvimento do agente* —
infraestrutura externa ao projeto, nunca parte dele. A hospedagem permanente usa somente
Vercel + Render/Railway + Supabase.

### Checklist pré-deploy (roda em qualquer máquina)

```bash
npm run setup        # instala backend e frontend
npm test             # 92 testes do backend
npm run build        # build de produção do frontend
node scripts/preflight.mjs   # verificações de configuração p/ produção
```

### Passo 1 — Banco (Supabase)

* Projeto novo: aplique `schema.sql`, `seed_books.sql` e `rls.sql` uma única vez
  (docs/SUPABASE.md).
* Produção v1: aplique a migração `2026-09-14_multi_book.sql` + `seed_books.sql` + `rls.sql`
  (com backup prévio). O backend usa a conexão existente.

### Passo 2 — Backend no Render

1. Suba o repositório para GitHub/GitLab.
2. Render → **New + → Blueprint** → selecione o repositório: o `render.yaml` da raiz cria o
   serviço `quiz-daniel-api` com `healthCheckPath: /health`.
3. Preencha as variáveis pedidas (`CORS_ORIGIN` ainda sem valor final; Supabase; segredos).
4. Deploy → anote a URL: `https://quiz-daniel-api.onrender.com`.
5. Teste: `curl https://quiz-daniel-api.onrender.com/health` → `{"status":"ok"}`.

### Passo 3 — Frontend na Vercel

1. Vercel → **Add New → Project** → mesmo repositório.
2. Root Directory: `frontend` · Framework: **Vite** · Build: `npm run build` · Output: `dist`.
   (**Não é necessário `vercel.json`**: o app usa hash router (`#/...`), então não há rotas de
   servidor para reescrever; manifest, sw.js e ícones são arquivos estáticos servidos normalmente.)
3. Environment Variables: `VITE_API_URL=https://quiz-daniel-api.onrender.com`.
4. Deploy → anote a URL: `https://SEU-PROJETO.vercel.app`.
5. Volte no Render e ajuste `CORS_ORIGIN=https://SEU-PROJETO.vercel.app` → redeploy do backend.

### Passo 4 — Validação final (18 itens)

Home com 3 livros · cadastro · partida completa por livro · pontuação · ranking por livro ·
histórico · estatísticas · conquistas · admin · frontend→backend (DevTools/Network sem erros
CORS) · backend→Supabase (`/api/health` com `driver: supabase`) · `/health` · console do
navegador limpo · logs do Render · instalação do PWA no celular · modo offline (aviação) com
aviso e fila.

### Como atualizar no futuro

* `git push` na branch principal → Vercel e Render reconstroem automaticamente.
* Mudanças de banco: novo arquivo `database/migracoes/XXXX.sql` aplicado no SQL Editor
  (nunca editar tabelas na mão sem registrar a migração no repositório).
* Rollback: Vercel e Render mantêm deploys anteriores com botão de promoção instantânea.

---

## Ambiente de PRODUÇÃO real (publicado e testado em 2026-09-02, v1.0)

| Camada | Onde | URL / identificador |
|---|---|---|
| Frontend (Vite+React, PWA) | Vercel | https://quiz-daniel.vercel.app |
| Backend (Express, Node 22) | Render (web service, região virginia) | https://quiz-daniel-api.onrender.com |
| Banco (Postgres + RLS) | Supabase (projeto `quiz-daniel`) | via `SUPABASE_URL` (segredo no Render) |
| Código-fonte | GitHub (privado) | github.com/erisan21-sys/quiz-daniel |

Validações executadas nas URLs finais: home/PWA 200 · `/health` e `/api/health` (driver
supabase) · partida completa em ritmo humano (20 respostas 200, score e ranking do servidor,
conquistas no finish) · rankings today/week/month/all/me · perfil/histórico sem vazar nome ·
stats · admin (200 com token, 401 sem, 403 errado) · CORS aceita somente o domínio Vercel ·
Helmet · rate limit (`ratelimit: limit=400...`) · anonimização e exclusão de conta (LGPD).

> A v2.0 (multi-livro) ainda **não** foi publicada: quando for, aplique primeiro a migração
> `database/migracoes/2026-09-14_multi_book.sql` no Supabase e só então promova backend +
> frontend novos.

### Peculiaridades da API da Render descobertas no deploy (útil p/ recriar)

1. `POST /v1/services` usa `type: "web_service"` (não `web`) e `repo` como URL completa;
   comandos de build/start vão em `serviceDetails.envSpecificDetails`; `runtime` dentro de
   `serviceDetails`.
2. **`envVars`, `rootDir` e `openPorts` passados na CRIAÇÃO são descartados silenciosamente.**
   Aplique depois: `PATCH /v1/services/{id}` (rootDir) e `PUT /v1/services/{id}/env-vars`
   (lista completa). Sem as variáveis, o deploy morre em ~20 s com `update_failed` porque o
   `assertConfig` de produção barra o boot sem segredos — comportamento correto do app.
3. Regiões do plano free: oregon, frankfurt, ohio, singapore, virginia (São Paulo é pago).

### Migrações de banco

* `database/migracoes/2026-09-02_users_updated_at.sql` — adiciona `updated_at` em `public.users`
  (o trigger `trg_users_updated_at` referencia a coluna; sem ela, updates de usuário falhavam no
  Postgres). Já aplicada no projeto Supabase de produção.
* `database/migracoes/2026-09-14_multi_book.sql` — migração v1 → v2 (tabela `books`, `book_id`,
  triggers/RPCs por livro; preserva histórico como `daniel` inativo). **Ainda não aplicada em
  produção** — aplicar antes do deploy da v2.0.
