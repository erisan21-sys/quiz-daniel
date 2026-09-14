-- ============================================================================
--  QUIZ BÍBLICO · rls.sql (v2.0 multi-livro)
--  Row Level Security (defesa em profundidade)
-- ----------------------------------------------------------------------------
--  MODELO DE SEGURANÇA DA v2.0
--  • O frontend (navegador) NÃO acessa nenhuma tabela de jogo diretamente:
--    todas as operações passam pela API Express.
--  • O backend usa a `service_role key`, que ignora RLS (fica apenas no servidor).
--  • O RLS é habilitado em TODAS as tabelas e as policies abaixo liberam apenas
--    leituras estritamente públicas, bloqueando qualquer escrita anônima.
--  • A tabela `questions` NÃO tem policy de leitura: correct_answer/explanation
--    jamais podem ser consultados com a anon key (só via API, sem gabarito).
--    Resultado: mesmo que a anon key vaze, ninguém altera pontuação nem lê gabarito.
-- ============================================================================

alter table public.users             enable row level security;
alter table public.questions         enable row level security;
alter table public.quiz_attempts     enable row level security;
alter table public.quiz_answers      enable row level security;
alter table public.achievements      enable row level security;
alter table public.user_achievements enable row level security;
alter table public.books             enable row level security;
alter table public.admin_tokens      enable row level security;
alter table public.audit_log         enable row level security;

-- Limpa policies antigas (idempotente) ---------------------------------------
do $$
declare t text; p record;
begin
  foreach t in array array['books','users','questions','quiz_attempts','quiz_answers',
                           'achievements','user_achievements','admin_tokens','audit_log']
  loop
    for p in select policyname from pg_policies where schemaname='public' and tablename=t loop
      execute format('drop policy if exists %I on public.%I', p.policyname, t);
    end loop;
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- BOOKS: catálogo público de livros ATIVOS (sem o legado Daniel).
-- ---------------------------------------------------------------------------
create policy books_select_public on public.books
  for select to anon, authenticated
  using (active = true);

-- ---------------------------------------------------------------------------
-- QUESTIONS: SEM LEITURA PÚBLICA DIRETA (correção de segurança v2.0).
-- A tabela contém correct_answer/explanation/hint em texto claro; QUALQUER
-- policy de SELECT para anon/authenticated vazaria o gabarito por consulta
-- direta ao Supabase (basta a anon key + PostgREST).
-- As perguntas chegam ao navegador SOMENTE via API Express (service_role,
-- que ignora o RLS), montadas por publicQuestion(), que remove
-- correct_answer e explanation antes da resposta.
-- RLS continua HABILITADO e, sem nenhuma policy aqui, anon/authenticated
-- não leem nem escrevem NADA nesta tabela.
-- ---------------------------------------------------------------------------
-- (intencionalmente sem `create policy ... on public.questions`)

-- Nenhuma policy de insert/update/delete => escrita anônima bloqueada.

-- ---------------------------------------------------------------------------
-- USERS: leitura pública apenas dos campos exibidos no ranking/perfil.
-- ---------------------------------------------------------------------------
create policy users_select_public on public.users
  for select to anon, authenticated
  using (share_profile = true);

-- ---------------------------------------------------------------------------
-- ACHIEVEMENTS: catálogo público.
-- ---------------------------------------------------------------------------
create policy achievements_select_public on public.achievements
  for select to anon, authenticated using (true);

-- ---------------------------------------------------------------------------
-- USER_ACHIEVEMENTS: leitura pública (conquistas de quem compartilha perfil).
-- ---------------------------------------------------------------------------
create policy user_achievements_select_public on public.user_achievements
  for select to anon, authenticated
  using (exists (select 1 from public.users u where u.id = user_id and u.share_profile = true));

-- ---------------------------------------------------------------------------
-- QUIZ_ATTEMPTS: apenas partidas FINALIZADAS de quem compartilha o perfil.
-- Partidas STARTED/ABANDONED nunca são públicas (anti-fraude).
-- ---------------------------------------------------------------------------
create policy attempts_select_public on public.quiz_attempts
  for select to anon, authenticated
  using (
    status = 'FINISHED'
    and exists (select 1 from public.users u where u.id = user_id and u.share_profile = true)
  );

-- ---------------------------------------------------------------------------
-- QUIZ_ANSWERS: respostas públicas somente de partidas FINALIZADAS.
-- ---------------------------------------------------------------------------
create policy answers_select_public on public.quiz_answers
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = attempt_id and a.status = 'FINISHED'
        and exists (select 1 from public.users u where u.id = a.user_id and u.share_profile = true)
    )
  );

-- ---------------------------------------------------------------------------
-- ADMIN_TOKENS e AUDIT_LOG: nunca acessíveis por anon/authenticated.
-- (RLS ligado + nenhuma policy = bloqueio total. Só a service_role acessa.)
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- v1.2 — Supabase Auth (estrutura já preparada)
-- Quando o login por e-mail/Google for ativado, adicione:
--
--   alter table public.users add column auth_id uuid references auth.users(id);
--   create policy users_self_update on public.users
--     for update to authenticated using (auth.uid() = auth_id) with check (auth.uid() = auth_id);
--   create policy attempts_self_select on public.quiz_attempts
--     for select to authenticated using (exists (
--        select 1 from public.users u where u.id = user_id and u.auth_id = auth.uid()));
--
-- Nada disso é necessário na v1.0: a identidade vem do user_id emitido pela API.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Confirmação: RLS ativo em todas as tabelas
-- ---------------------------------------------------------------------------
select relname as tabela, relrowsecurity as rls_ativo
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('books','users','questions','quiz_attempts','quiz_answers',
                  'achievements','user_achievements','admin_tokens','audit_log')
order by relname;
