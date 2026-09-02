# 📖 QUIZ BÍBLICO — DANIEL · v1.0

Sistema completo de perguntas e respostas sobre o livro de **Daniel (capítulos 1 a 12)**, com
cadastro de jogadores, pontuação oficial no servidor, ranking público, histórico, perfil,
conquistas, estatísticas, área administrativa, compartilhamento para WhatsApp, proteção
anti-fraude e PWA instalável no Android.

> **Regra de ouro:** a pontuação oficial pertence ao **servidor**. O navegador nunca recebe o
> gabarito antes de responder e nunca calcula score, percentual, posição ou duração oficial.
>
> **Hospedagem:** Vercel (frontend) + Render/Railway (backend) + Supabase (banco).
> **Zero dependência de E2B/sandbox**: não há `e2b.app`, `sandboxId`, `Sandbox.create()` ou
> `E2B_API_KEY` em nenhum arquivo do projeto (guia completo em `docs/DEPLOY.md`).

---

## 1. Estrutura final do projeto

```
quiz-daniel/
├── backend/                     # API Node.js + Express (autoridade oficial)
│   ├── .env.example             # variáveis de ambiente (modelo)
│   ├── package.json
│   ├── src/
│   │   ├── server.js            # ponto de entrada (HTTP + seed + graceful shutdown)
│   │   ├── app.js               # fábrica do Express (helmet, cors, rate limit, rotas)
│   │   ├── config/index.js      # configuração tipada a partir do .env
│   │   ├── db/
│   │   │   ├── index.js         # seleção do driver (supabase | local)
│   │   │   ├── supabaseRepo.js  # repositório PostgreSQL/Supabase (produção)
│   │   │   ├── localRepo.js     # repositório em memória/JSON (dev e testes)
│   │   │   └── seedData.js      # 20 perguntas + 7 conquistas (driver local)
│   │   ├── middleware/          # auth (HMAC), rate limit, erros
│   │   ├── routes/              # users, quiz, attempts, ranking, stats, questions, admin
│   │   ├── services/            # quizService (pontuação) e achievementService
│   │   └── utils/               # rules (regras oficiais), token, validation
│   └── test/                    # 85 testes (node:test) — unitários + integração HTTP
├── frontend/                    # React + Vite + PWA
│   ├── index.html               # shell + registro do service worker
│   ├── vite.config.js           # proxy /api → backend em dev
│   ├── public/
│   │   ├── manifest.webmanifest # PWA (nome, ícones, shortcuts, screenshots)
│   │   ├── sw.js                # service worker (offline de leitura)
│   │   └── icons/               # ícones PNG/SVG + screenshot
│   └── src/
│       ├── api/client.js        # cliente HTTP + share/copy
│       ├── context/AppContext   # sessão, conexão, toasts, install PWA
│       ├── components/          # Layout, ui, LineChart, Achievements, Link
│       ├── lib/                 # router (hash), format, storage
│       ├── pages/               # Home, Cadastro, Quiz, Resultado, Ranking,
│       │                        # Histórico, Perfil, Estatísticas, Admin
│       └── styles/global.css    # design system mobile-first
├── database/
│   ├── schema.sql               # tabelas, FKs, índices, constraints, triggers, RPCs
│   ├── seed.sql                 # 20 perguntas (6/8/6) + 7 conquistas
│   └── rls.sql                  # Row Level Security + policies
├── docs/
│   ├── ARQUITETURA.md           # fluxo, segurança, anti-fraude, roadmap v1.x–v2.0
│   ├── API.md                   # referência completa da API
│   ├── SUPABASE.md              # configuração do banco, admin, backup
│   ├── DEPLOY.md                # Vercel + Render/Railway + HTTPS/CORS
│   ├── TESTES.md                # como rodar e o que cada teste cobre
│   └── AUDITORIA.md             # auditoria final item a item
├── scripts/
│   ├── generate-icons.py        # gera ícones do PWA (sem dependências)
│   └── make-admin.mjs           # gera SQL do administrador
├── package.json                 # scripts de orquestração
└── README.md
```

---

## 2. Comandos de instalação

Pré-requisitos: **Node.js ≥ 20**, npm ≥ 10 e (opcionalmente) Python 3 apenas para regenerar ícones.

```bash
# 1) clone e entre na pasta
cd quiz-daniel

# 2) instala backend e frontend
npm run setup

# 3) configure o backend
cp backend/.env.example backend/.env
#    edite backend/.env (veja a seção 5)

# 4) suba tudo
npm run dev:backend     # API em http://localhost:8787
npm run dev:frontend    # site em http://localhost:5173 (proxy /api → 8787)
```

Atalhos:

| Comando              | O que faz                                            |
| -------------------- | ---------------------------------------------------- |
| `npm test`           | roda os 85 testes do backend                          |
| `npm run build`      | build de produção do frontend (`frontend/dist`)       |
| `npm run start:backend` | backend em modo produção (serve `frontend/dist` se existir) |
| `npm run icons`      | regenera os ícones do PWA                             |
| `npm run make-admin` | gera o SQL do administrador                           |

---

## 3. Configuração do Supabase (banco real)

1. Crie um projeto em <https://supabase.com> (grátis).
2. No **SQL Editor**, execute **nesta ordem**:
   1. `database/schema.sql` — tabelas, enums, índices, constraints, triggers anti-fraude e as
      funções `leaderboard()`, `player_rank()`, `global_stats()` e `player_stats()`;
   2. `database/seed.sql` — as 20 perguntas e as 7 conquistas;
   3. `database/rls.sql` — Row Level Security + policies (leituras públicas, escrita bloqueada).
3. Em **Project Settings → API**, copie:
   * `Project URL` → `SUPABASE_URL`
   * `service_role` (**secret**) → `SUPABASE_SERVICE_ROLE_KEY` (somente no backend!)
   * `anon public` → `SUPABASE_ANON_KEY` (informativo na v1.0)
4. No `backend/.env`, defina `DB_DRIVER=supabase`.
5. Reinicie o backend: `npm run dev:backend`.

> O driver `local` (padrão do `.env.example`) roda sem banco externo, persistindo em
> `backend/data/local-db.json` — ideal para desenvolvimento e para a suíte de testes.

Detalhes completos (RLS, admin, backup, migrações futuras): **`docs/SUPABASE.md`**.

---

## 4. Variáveis de ambiente

### backend/.env

| Variável                    | Padrão            | Descrição                                                        |
| --------------------------- | ----------------- | ---------------------------------------------------------------- |
| `PORT`                      | `8787`            | Porta da API                                                      |
| `NODE_ENV`                  | `development`     | `production` ativa validações rígidas e CSP                       |
| `CORS_ORIGIN`               | localhost:5173    | Origens permitidas (vírgula); `*` só em dev                       |
| `DB_DRIVER`                 | `local`           | `local` ou `supabase`                                             |
| `LOCAL_DB_FILE`             | `./data/local-db.json` | Arquivo do driver local                                       |
| `SUPABASE_URL`              | —                 | URL do projeto                                                    |
| `SUPABASE_SERVICE_ROLE_KEY` | —                 | **secret** — nunca vai para o frontend                            |
| `SUPABASE_ANON_KEY`         | —                 | informativa (v1.0 não usa no navegador)                           |
| `TOKEN_SECRET`              | —                 | segredo HMAC dos tokens de sessão (gere com `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`) |
| `ADMIN_TOKEN`               | —                 | token da área `/admin`                                            |
| `RATE_WINDOW_MINUTES` / `RATE_MAX` | `15` / `400` | rate limit geral                                            |
| `RATE_MAX_QUIZ` / `RATE_MAX_AUTH` / `RATE_MAX_START` / `RATE_MAX_ANSWER` | ver `.env.example` | limites por fluxo |
| `MIN_ANSWER_INTERVAL_MS`    | `1200`            | cadência mínima entre respostas (anti-macro)                      |
| `ATTEMPT_TTL_SECONDS`       | `14400`           | partida aberta expira e vira `ABANDONED`                          |
| `MAX_DURATION_SECONDS`      | `7200`            | teto da duração oficial                                           |
| `QUIZ_SIZE`                 | `20`              | questões por partida (modo mixed)                                 |
| `QUIZ_DISTRIBUTION`         | `facil:6,medio:8,dificil:6` | distribuição do modo mixed                           |
| `HTTP_LOG`                  | `dev`             | `combined`, `common`, `dev` ou `off`                              |

### frontend/.env (opcional)

| Variável       | Padrão | Descrição                                                              |
| -------------- | ------ | ---------------------------------------------------------------------- |
| `VITE_API_URL` | vazio  | URL da API em produção; vazio = mesma origem (backend servindo o build) |

---

## 5. Como executar localmente

```bash
# terminal 1 — API
cd quiz-daniel/backend
cp .env.example .env          # DB_DRIVER=local já vem pronto para testar
npm install
npm run dev                   # http://localhost:8787/api/health

# terminal 2 — site
cd quiz-daniel/frontend
npm install
npm run dev                   # http://localhost:5173
```

Fluxo manual rápido (sem interface):

```bash
TOKEN=$(curl -s -X POST localhost:8787/api/users -H 'content-type: application/json' \
  -d '{"name":"Daniel","nickname":"daniel"}' | sed -E 's/.*"token":"([^"]+)".*/\1/')
curl -s -X POST localhost:8787/api/quiz/start -H "authorization: Bearer $TOKEN" \
  -H 'content-type: application/json' -d '{"mode":"mixed"}'
```

---

## 6. Como testar

```bash
cd quiz-daniel/backend
npm test          # 85 testes: regras, pontuação, anti-fraude, ranking, admin…
```

Cobertura funcional (detalhes em `docs/TESTES.md`): cadastro · início de partida · resposta
correta · resposta incorreta · resposta duplicada · ordem das questões · finalização ·
pontuação oficial · imutabilidade da partida · ranking (critérios e filtros) · histórico ·
perfil · conquistas · estatísticas · administração · rate limit · tentativas de manipulação.

Teste manual no navegador: cadastre-se, jogue uma partida completa, confira o resultado, o
ranking, o histórico, o perfil com gráfico e a área `/admin` (token do `.env`).

---

## 7. Como publicar

Guia completo em **`docs/DEPLOY.md`**. Resumo:

* **Frontend (Vercel):** importe `frontend/`, build `npm run build`, output `dist`,
  variável `VITE_API_URL=https://sua-api.onrender.com`.
* **Backend (Render/Railway):** root `backend/`, comando `npm start`, defina
  `NODE_ENV=production`, `DB_DRIVER=supabase`, credenciais do Supabase, `TOKEN_SECRET`,
  `ADMIN_TOKEN` e `CORS_ORIGIN=https://seu-app.vercel.app`.
* **Alternativa monolítica:** `npm run build` e o backend serve `frontend/dist` na mesma
  origem (CORS desaparece e o PWA fica perfeito).
* **HTTPS:** automático na Vercel/Render. O PWA e o `navigator.share` exigem HTTPS.

---

## 8. Como criar o administrador

Duas opções:

1. **Token de configuração (recomendado na v1.0):** defina `ADMIN_TOKEN=<valor forte>` no
   backend. Na tela `/admin`, cole esse token. Ele vale para a interface e para chamadas
   diretas (`Authorization: Bearer <ADMIN_TOKEN>`).
2. **Administração por banco:** rode `npm run make-admin -- --nickname "SeuApelido"`,
   execute o SQL gerado no Supabase e use o token impresso na tela `/admin`. O registro fica
   em `admin_tokens` (hash SHA-256, com expiração), e o usuário recebe `role = 'admin'`.

---

## 9. Como fazer backup do banco

* **Supabase (produção):** Dashboard → Database → Backups (automáticos no plano pago) ou
  `supabase db dump` / `pg_dump` com a connection string do painel:
  ```bash
  pg_dump "$DATABASE_URL" --format=custom --file=quiz-daniel-$(date +%F).dump
  # restauração:
  pg_restore --clean --if-exists -d "$DATABASE_URL" quiz-daniel-2026-09-02.dump
  ```
* **Driver local (dev):** o banco é o arquivo `backend/data/local-db.json` — copie-o.

Rotina sugerida: dump diário + versão do `schema.sql`/`seed.sql` no repositório.

---

## 10. Regras oficiais do jogo

| Item                          | Valor                                                       |
| ----------------------------- | ----------------------------------------------------------- |
| Questões por partida (mixed)  | 20 (6 fáceis · 8 médias · 6 difíceis)                        |
| Pontos por acerto             | fácil 100 · médio 200 · difícil 300                          |
| Bônus de aproveitamento       | 100% → +500 · 90–99% → +300 · 80–89% → +150                  |
| Pontuação negativa            | não existe                                                   |
| Máximo teórico (6/8/6)        | 4.000 de base + 500 de bônus = **4.500**                     |
| Critério de ranking           | pontos → percentual → acertos → resultado mais recente       |
| Duração oficial               | relógio do servidor (`finished_at − started_at`)             |
| Partida finalizada            | imutável (constraint + trigger no banco)                     |
| Resposta por questão          | única (constraint `unique(attempt_id, question_id)`)         |

Observação: com a distribuição oficial 6/8/6, uma partida com 18 acertos vale entre 3.700 e
4.100 pontos dependendo do nível das questões erradas (ex.: 2 fáceis erradas = 3.800 de base
+ 300 de bônus = **4.100**). O valor exato é sempre calculado pelo servidor a partir das
dificuldades reais das questões erradas.

---

## 11. Roadmap (arquitetura preparada)

| Versão | Entrega                                                          | Estado        |
| ------ | ---------------------------------------------------------------- | ------------- |
| v1.0   | quiz + cadastro + ranking + histórico                             | ✅ incluído    |
| v1.1   | conquistas + estatísticas + PWA                                   | ✅ incluído    |
| v1.2   | login Google/e-mail (campos `email`/`auth_id` + policies prontos) | 🔜 preparado   |
| v1.3   | quiz diário (base: `quiz_attempts.mode` + agendador)              | 🔜 preparado   |
| v1.4   | desafios entre jogadores                                          | 🔜 preparado   |
| v1.5   | ranking por grupos                                                | 🔜 preparado   |
| v2.0   | multiplayer em tempo real                                         | 🔜 preparado   |

---

## 12. Privacidade

* Coletamos apenas **nome, apelido e estatísticas de jogo**.
* O ranking público exibe somente apelido, pontuação e estatísticas.
* “Excluir minha conta” oferece **anonimizar** (preserva agregados) ou **apagar tudo**.
* Partidas em andamento nunca são públicas; o RLS bloqueia escrita anônima no banco.

Feito com ❤️ para quem ama o livro de Daniel. “Bem-aventurado o que espera e chega até mil
trezentos e trinta e cinco dias.” (Dn 12:12)
