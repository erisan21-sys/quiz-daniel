-- ============================================================================
--  MIGRAÇÃO 2026-09-14 · v1.x (Daniel) → v2.0 (multi-livro)
-- ----------------------------------------------------------------------------
--  Executar UMA vez no banco de PRODUÇÃO (Supabase SQL Editor), nesta ordem:
--     1) database/migracoes/2026-09-14_multi_book.sql  (este arquivo)
--     2) database/seed_books.sql                       (3 livros + 150 perguntas + 21 conquistas)
--     3) database/rls.sql                              (atualiza policies p/ tabela books)
--
--  O que esta migração faz:
--    • cria a tabela public.books (catálogo; 'daniel' entra como legado inativo)
--    • adiciona book_id em questions, quiz_attempts e achievements
--    • preserva TODO o histórico v1.x marcando-o como book_id = 'daniel'
--    • amplia o intervalo de capítulos (Oséias tem 14) + trigger por livro
--    • reforça o trigger anti-fraude (questão precisa ser do livro da partida)
--    • atualiza as RPCs leaderboard / player_rank / global_stats / player_stats
--    • cria índices por livro
--
--  REVERSÍVEL? A estrutura pode ser revertida removendo as colunas, mas o
--  histórico novo (pós-migração) depende de book_id. Faça backup antes
--  (pg_dump) — ver docs/SUPABASE.md.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0) Segurança: trava escrita concorrente durante a migração (transação curta)
-- ---------------------------------------------------------------------------
begin;

-- ---------------------------------------------------------------------------
-- 1) Tabela de livros
-- ---------------------------------------------------------------------------
create table if not exists public.books (
  id            text primary key,
  name          varchar(40)  not null,
  short_name    varchar(12)  not null,
  chapters      smallint     not null,
  testament     varchar(24)  not null default 'Antigo Testamento',
  icon          varchar(16)  not null default '📖',
  color         varchar(16)  not null default '#38bdf8',
  order_index   integer      not null default 0,
  description   text         not null default '',
  active        boolean      not null default true,
  created_at    timestamptz  not null default now(),
  constraint books_chapters_range check (chapters between 1 and 150)
);

insert into public.books (id, name, short_name, chapters, icon, color, order_index, description, active) values
  ('daniel',  'Daniel',  'DANIEL',  12, '📖', '#a78bfa', 0, 'Livro legado da v1.x. Preservado para histórico; fora da interface pública.', false),
  ('oseias',  'Oséias',  'OSÉIAS',  14, '💧', '#38bdf8', 1, 'O profeta do amor fiel de Deus.', true),
  ('obadias', 'Obadias', 'OBADIAS',  1, '🦅', '#fbbf24', 2, 'A visão contra Edom; o reino será do Senhor.', true),
  ('jonas',   'Jonas',   'JONAS',    4, '🐋', '#34d399', 3, 'O profeta fujão e a misericórdia de Deus.', true)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, chapters = excluded.chapters,
  icon = excluded.icon, color = excluded.color, order_index = excluded.order_index,
  description = excluded.description, active = excluded.active;

-- ---------------------------------------------------------------------------
-- 2) questions.book_id (default 'daniel' preserva o acervo v1.x)
-- ---------------------------------------------------------------------------
alter table public.questions
  add column if not exists book_id text not null default 'daniel'
  references public.books(id) on delete restrict;

-- amplia o intervalo de capítulos (Oséias vai até 14)
alter table public.questions drop constraint if exists questions_chapter_range;
alter table public.questions
  add constraint questions_chapter_range check (chapter between 1 and 150);

create index if not exists questions_book_idx      on public.questions (book_id) where active;
create index if not exists questions_book_diff_idx on public.questions (book_id, difficulty) where active;

-- ---------------------------------------------------------------------------
-- 3) quiz_attempts.book_id (histórico v1.x vira 'daniel')
-- ---------------------------------------------------------------------------
alter table public.quiz_attempts
  add column if not exists book_id text not null default 'daniel'
  references public.books(id) on delete restrict;

create index if not exists attempts_user_book_idx on public.quiz_attempts (user_id, book_id, created_at desc);
create index if not exists attempts_book_idx      on public.quiz_attempts (book_id, status);
create index if not exists attempts_finished_book_idx on public.quiz_attempts (book_id, score desc, percentage desc, finished_at desc)
  where status = 'FINISHED';

-- ---------------------------------------------------------------------------
-- 4) achievements.book_id (conquistas v1.x viram 'daniel')
-- ---------------------------------------------------------------------------
alter table public.achievements
  add column if not exists book_id text references public.books(id) on delete restrict;

update public.achievements set book_id = 'daniel' where book_id is null;

create index if not exists achievements_book_idx on public.achievements (book_id);

-- ---------------------------------------------------------------------------
-- 5) Trigger: capítulo válido para o livro
-- ---------------------------------------------------------------------------
create or replace function public.check_question_book_chapter()
returns trigger language plpgsql as $$
declare
  v_max smallint;
begin
  select chapters into v_max from public.books where id = new.book_id;
  if v_max is null then
    raise exception 'livro desconhecido: %', new.book_id;
  end if;
  if new.chapter < 1 or new.chapter > v_max then
    raise exception 'capítulo % inválido para o livro % (1..%)', new.chapter, new.book_id, v_max;
  end if;
  return new;
end $$;

drop trigger if exists trg_questions_book_chapter on public.questions;
create trigger trg_questions_book_chapter before insert or update of book_id, chapter on public.questions
  for each row execute function public.check_question_book_chapter();

-- ---------------------------------------------------------------------------
-- 6) Trigger anti-fraude: resposta precisa ser do LIVRO da partida
-- ---------------------------------------------------------------------------
create or replace function public.protect_answer_insert()
returns trigger language plpgsql as $$
declare
  v_attempt public.quiz_attempts%rowtype;
  v_expected uuid;
  v_question_book text;
begin
  select * into v_attempt from public.quiz_attempts where id = new.attempt_id for update;
  if not found then
    raise exception 'partida inexistente';
  end if;
  if v_attempt.status <> 'STARTED' then
    raise exception 'não é possível responder: partida com status %', v_attempt.status using errcode = '23505';
  end if;
  if new.user_id <> v_attempt.user_id then
    raise exception 'resposta pertence a outro usuário' using errcode = '23505';
  end if;
  if v_attempt.total_questions > 0 and new.position <> (v_attempt.answered_count + 1) then
    raise exception 'ordem de resposta inválida' using errcode = '23505';
  end if;
  v_expected := (v_attempt.question_order ->> (new.position - 1))::uuid;
  if v_expected is not null and v_expected <> new.question_id then
    raise exception 'questão fora da ordem sorteada da partida' using errcode = '23505';
  end if;
  select q.book_id into v_question_book from public.questions q where q.id = new.question_id and q.active;
  if v_question_book is null then
    raise exception 'questão inexistente ou inativa';
  end if;
  -- ISOLAMENTO ENTRE LIVROS
  if v_attempt.book_id is not null and v_question_book <> v_attempt.book_id then
    raise exception 'questão de outro livro não pode entrar nesta partida' using errcode = '23505';
  end if;
  return new;
end $$;

drop trigger if exists trg_answers_guard on public.quiz_answers;
create trigger trg_answers_guard before insert on public.quiz_answers
  for each row execute function public.protect_answer_insert();

-- ---------------------------------------------------------------------------
-- 7) RPCs com filtro por livro (assinaturas novas; as antigas são removidas)
-- ---------------------------------------------------------------------------
drop function if exists public.leaderboard(text, text, integer, integer);
drop function if exists public.player_rank(uuid, text, text);
drop function if exists public.global_stats();
drop function if exists public.player_stats(uuid);

create or replace function public.leaderboard(
  p_book   text default null,
  p_period text default 'all',
  p_mode   text default 'all',
  p_limit  integer default 100,
  p_offset integer default 0
)
returns table (
  rank             bigint,
  user_id          uuid,
  name             varchar,
  nickname         text,
  best_score       integer,
  best_percentage  numeric,
  best_correct     integer,
  best_total       integer,
  attempts_count   bigint,
  total_correct    bigint,
  last_played_at   timestamptz
)
language sql stable as $$
  with filtered as (
    select a.*
    from public.quiz_attempts a
    where a.status = 'FINISHED'
      and a.total_questions > 0
      and (p_book is null or a.book_id = p_book)
      and (
            p_period = 'all'
         or (p_period = 'today' and a.finished_at >= date_trunc('day', now()))
         or (p_period = 'week'  and a.finished_at >= date_trunc('week', now()))
         or (p_period = 'month' and a.finished_at >= date_trunc('month', now()))
      )
      and (p_mode = 'all' or a.mode = p_mode::public.quiz_mode)
  ),
  best as (
    select distinct on (f.user_id)
           f.user_id, f.score, f.percentage, f.correct_answers, f.total_questions, f.finished_at
    from filtered f
    order by f.user_id, f.score desc, f.percentage desc, f.correct_answers desc, f.finished_at desc
  ),
  agg as (
    select f.user_id,
           count(*)              as attempts_count,
           coalesce(sum(f.correct_answers), 0) as total_correct,
           max(f.finished_at)    as last_played_at
    from filtered f
    group by f.user_id
  )
  select row_number() over (
           order by b.score desc, b.percentage desc, b.correct_answers desc, b.finished_at desc
         )                                   as rank,
         b.user_id,
         u.name,
         u.nickname::text                    as nickname,
         b.score                             as best_score,
         b.percentage                        as best_percentage,
         b.correct_answers                   as best_correct,
         b.total_questions                   as best_total,
         a.attempts_count,
         a.total_correct,
         a.last_played_at
  from best b
  join public.users u on u.id = b.user_id
  join agg a          on a.user_id = b.user_id
  where u.share_profile = true
  order by b.score desc, b.percentage desc, b.correct_answers desc, b.finished_at desc
  limit greatest(1, least(p_limit, 200)) offset greatest(0, p_offset);
$$;

create or replace function public.player_rank(p_user uuid, p_book text default null, p_period text default 'all', p_mode text default 'all')
returns table (rank bigint, total_players bigint, beaten_percentage numeric)
language sql stable as $$
  with lb as (select * from public.leaderboard(p_book, p_period, p_mode, 200, 0)),
       me as (select * from lb where lb.user_id = p_user)
  select coalesce(me.rank, 0)::bigint                       as rank,
         (select count(*) from lb)::bigint                  as total_players,
         case
           when me.rank is null then 0
           when (select count(*) from lb) <= 1 then 100
           else round(100.0 * ((select count(*) from lb) - me.rank) / ((select count(*) from lb) - 1), 1)
         end                                                as beaten_percentage
  from me
  union all
  select 0, (select count(*) from public.leaderboard(p_book, p_period, p_mode, 200, 0)), 0
  where not exists (select 1 from me);
$$;

create or replace function public.global_stats(p_book text default null)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'book_id',            p_book,
    'total_players',      case when p_book is null
                             then (select count(*) from public.users)
                             else (select count(distinct user_id) from public.quiz_attempts
                                   where status = 'FINISHED' and book_id = p_book) end,
    'total_attempts',     (select count(*) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'total_answers',      (select count(*) from public.quiz_answers qa
                           join public.quiz_attempts a on a.id = qa.attempt_id
                           where (p_book is null or a.book_id = p_book)),
    'total_questions',    (select count(*) from public.questions
                           where active and (p_book is null or book_id = p_book)),
    'best_score',         (select coalesce(max(score), 0) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'best_percentage',    (select coalesce(max(percentage), 0) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'avg_score',          (select coalesce(round(avg(score)), 0) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'avg_correct',        (select coalesce(round(avg(correct_answers)::numeric, 1), 0) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'avg_percentage',     (select coalesce(round(avg(percentage), 1), 0) from public.quiz_attempts
                           where status = 'FINISHED' and (p_book is null or book_id = p_book)),
    'most_correct_question', (
        select coalesce(jsonb_agg(jsonb_build_object(
                 'question_id', q.id, 'book_id', q.book_id, 'text', q.question, 'correct', s.correct, 'wrong', s.wrong,
                 'accuracy', round(100.0 * s.correct / nullif(s.correct + s.wrong, 0), 1))
               order by (s.correct::numeric / nullif(s.correct + s.wrong, 0)) desc nulls last)
               filter (where rn <= 5), '[]'::jsonb)
        from (
          select qa.question_id,
                 count(*) filter (where qa.is_correct)     as correct,
                 count(*) filter (where not qa.is_correct) as wrong,
                 row_number() over (order by (count(*) filter (where qa.is_correct))::numeric
                                      / nullif(count(*), 0) desc) as rn
          from public.quiz_answers qa
          join public.quiz_attempts a on a.id = qa.attempt_id
          where (p_book is null or a.book_id = p_book)
          group by qa.question_id
        ) s join public.questions q on q.id = s.question_id
    ),
    'most_wrong_question', (
        select coalesce(jsonb_agg(jsonb_build_object(
                 'question_id', q.id, 'book_id', q.book_id, 'text', q.question, 'correct', s.correct, 'wrong', s.wrong,
                 'accuracy', round(100.0 * s.correct / nullif(s.correct + s.wrong, 0), 1))
               order by (s.wrong::numeric / nullif(s.correct + s.wrong, 0)) desc nulls last)
               filter (where rn <= 5), '[]'::jsonb)
        from (
          select qa.question_id,
                 count(*) filter (where qa.is_correct)     as correct,
                 count(*) filter (where not qa.is_correct) as wrong,
                 row_number() over (order by (count(*) filter (where not qa.is_correct))::numeric
                                      / nullif(count(*), 0) desc) as rn
          from public.quiz_answers qa
          join public.quiz_attempts a on a.id = qa.attempt_id
          where (p_book is null or a.book_id = p_book)
          group by qa.question_id
        ) s join public.questions q on q.id = s.question_id
    )
  );
$$;

create or replace function public.player_stats(p_user uuid, p_book text default null)
returns jsonb language sql stable as $$
  select jsonb_build_object(
    'book_id',         p_book,
    'attempts',        (select count(*) from public.quiz_attempts a
                        where a.user_id = p_user and a.status = 'FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'total_correct',   (select coalesce(sum(correct_answers),0) from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'total_wrong',     (select coalesce(sum(wrong_answers),0)   from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'best_score',      (select coalesce(max(score),0)           from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'best_percentage', (select coalesce(max(percentage),0)      from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'avg_score',       (select coalesce(round(avg(score)),0)    from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'avg_correct',     (select coalesce(round(avg(correct_answers)::numeric,1),0) from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'total_duration',  (select coalesce(sum(duration_seconds),0) from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'last_attempt_at', (select max(finished_at) from public.quiz_attempts a
                        where a.user_id = p_user and a.status='FINISHED'
                          and (p_book is null or a.book_id = p_book)),
    'evolution', (
        select coalesce(jsonb_agg(jsonb_build_object(
                 'book_id', a.book_id,
                 'date', to_char(a.finished_at, 'DD/MM/YYYY'),
                 'score', a.score, 'percentage', a.percentage, 'correct', a.correct_answers,
                 'total', a.total_questions) order by a.finished_at asc), '[]'::jsonb)
        from (select * from public.quiz_attempts
              where user_id = p_user and status = 'FINISHED'
                and (p_book is null or book_id = p_book)
              order by finished_at desc limit 30) a
    )
  );
$$;

-- ---------------------------------------------------------------------------
-- 8) Grants
-- ---------------------------------------------------------------------------
grant select on public.books to anon, authenticated;
grant all on all tables in schema public to service_role;

commit;

-- ---------------------------------------------------------------------------
-- Conferência pós-migração
-- ---------------------------------------------------------------------------
select id, name, active from public.books order by order_index;
select book_id, count(*) as perguntas from public.questions group by book_id order by book_id;
select book_id, status, count(*) as partidas from public.quiz_attempts group by book_id, status order by book_id, status;
select book_id, count(*) as conquistas from public.achievements group by book_id order by book_id;
