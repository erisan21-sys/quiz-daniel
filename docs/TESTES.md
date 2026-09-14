# Testes — como rodar e o que é coberto

```bash
cd backend
npm test                 # suíte completa (node:test, sem dependências externas)
npm run test:watch       # modo watch
```

A suíte sobe o **aplicativo Express real** (mesmas rotas, middlewares e serviços da produção)
contra o repositório local e faz requisições HTTP de verdade — ou seja, testa o contrato da
API, não apenas funções isoladas.

Resultado atual: **102/102 passando** (56 integração + 35 regras + 10 segurança + 1 infra).

## test/rules.test.js — regras oficiais (35 testes)

* pontos por dificuldade (100/200/300) e ausência de pontuação negativa;
* bônus de aproveitamento (100% → +500 · 90–99% → +300 · 80–89% → +150 · <80% → 0);
* gabarito perfeito = 4.000 + 500 = 4.500 (partida de um livro);
* 18/20 com diferentes níveis de erro (4.100 / 3.900 / 3.700) e 16/20 (bônus +150);
* percentual com 2 casas e teto de 100%;
* duração oficial pelo relógio do servidor, com teto configurável;
* distribuição oficial 6/8/6 = 20 e `QUIZ_DISTRIBUTION` configurável;
* seleção de questões **por livro** (sem repetição, sem inativas, sem misturar livros,
  erro claro com banco incompleto);
* sanitização/XSS, validação de cadastro, normalizações, formatação pt-BR;
* conquistas (critérios por tipo) e token HMAC (adulteração, segredo errado, expiração);
* mensagem de compartilhamento com o nome do livro.

## test/api.test.js — integração HTTP (56 testes)

| Grupo | Casos |
| ----- | ----- |
| Saúde/meta | `/api/health` (150 perguntas, 50/50/50), `/api/books` (3 livros ativos), listagem de endpoints |
| Cadastro | criação com UUID+token, nome curto, apelido inválido, XSS, duplicado (409), case-insensitive, rejoin |
| Sessão | rotas protegidas sem token / token inválido (401) |
| Início | `book_id` obrigatório (400 sem ele), 20 questões 6/8/6 **de um livro**, **nenhum gabarito/explicação no payload**, modo por dificuldade filtrado por livro, retomada de partida aberta, **partidas paralelas em livros diferentes sem misturar** |
| Respostas | correta (pontos por nível), incorreta (zero), **duplicada (409)**, fora de ordem (409), questão estranha (400 + auditoria), **questão de outro livro (400 + auditoria `FRAUD_BOOK_MISMATCH`)**, letra inválida (400), partida alheia (403 + auditoria), **anti-macro (429)** |
| Finalização | partida completa com placar oficial, 100% = 4.500 + conquistas do livro, sem respostas → ABANDONED, **imutabilidade ao repetir o finish** |
| Manipulação | payload com `is_correct/points/score` injetados é ignorado; finish com campos adulterados não muda nada; update direto no banco é bloqueado; finish de partida alheia (403 + auditoria) |
| Ranking | **`book_id` obrigatório**, separação por livro, ordenação por pontos/percentual/acertos/recência, melhor partida por jogador, desempate por recência, períodos + dificuldade, `/ranking/me` por livro |
| Histórico | próprio (data/pontos/duração + livro), filtro `?book_id=`, público (só apelido+resultado), detalhe com revisão, partida em andamento não pública |
| Perfil | posição, recordes, médias, evolução, conquistas, `ranks` por livro, `per_book`, `/users/me/profile` |
| Conquistas | acumulação em 5 partidas (códigos por livro), catálogo público (21 conquistas, filtro por livro) |
| Estatísticas | dashboard público (150 perguntas + `per_book`), filtro `?book_id=`, catálogo sem gabarito, regras publicadas (com contexto do livro) |
| Admin | 401 sem token, 403 token errado, 403 token de jogador; CRUD de questões (**exige `book_id`**, capítulo por livro, validações 400), usuários/partidas/ranking com filtro por livro, promoção de papel |
| Privacidade | ocultar perfil sai do ranking e das listas públicas; dono continua acessando; exclusão anonimizadora e exclusão total |
| Rate limit | excesso de cadastros → 429 |

## test/security.test.js — segurança (10 testes)

* RLS: `questions` sem nenhuma policy para `anon`/`authenticated`; RLS habilitado;
  `books` só ativos; `admin_tokens`/`audit_log` fechados (leitura estática do SQL);
* start não vaza `correct_answer`/`explanation` em nenhum dos 3 livros;
* catálogo sem gabarito (geral + filtro por livro);
* isolamento total: nenhum livro recebe questão de outro, em nenhuma direção;
* Service Worker (carrega o `sw.js` real em `vm`): cacheia GETs públicos sem auth;
  NUNCA cacheia com `Authorization`, rotas privadas (`/users/*`, `/admin/*`,
  `/ranking/me`, `/attempts/:id`, `/quiz/*`) ou POST/PUT/PATCH/DELETE.

## Cobrindo o fluxo no navegador (checklist manual)

1. Home: 3 cartões de livro → jogar 20 questões → feedback por questão com explicação e fonte.
2. Resultado: números, posição no ranking do livro, “superou X%”, compartilhar/copiar, revisão.
3. Ranking: abas de livro + filtros HOJE/SEMANA/MÊS/GERAL e TODAS/FÁCIL/MÉDIO/DIFÍCIL.
4. Histórico: filtro por livro, abrir partida anterior com gabarito.
5. Perfil: posições por livro + gráfico de evolução + conquistas + privacidade + exclusão.
6. Estatísticas: visão geral e por livro.
7. `/admin`: token → visão geral por livro, criar/editar/excluir pergunta (livro + capítulo), usuários, partidas.
8. PWA: DevTools → Application → Manifest e “Install app”; testar offline (Network offline)
   e confirmar o aviso e a fila de sincronização.
