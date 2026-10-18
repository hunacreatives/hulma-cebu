-- Hulma website admin (hulmacebu.com/admin): content tables, access rules,
-- photo storage. Safe to re-run: every policy is dropped and recreated, so
-- the policies below are always the only ones.
--
-- Access model: one shared admin login. Only users listed in site_admins can
-- write; there is no "first user becomes admin" fallback. Public visitors can
-- read published rows only.

-- ---------------------------------------------------------------- helpers

create table if not exists public.site_admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;
drop policy if exists "site_admins self read" on public.site_admins;
create policy "site_admins self read" on public.site_admins
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_site_admin()
returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(exists (select 1 from public.site_admins where user_id = auth.uid()), false);
$$;
revoke execute on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to anon, authenticated;

create or replace function public.site_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------- tables

-- Contact details, socials, Calendly link, stats. One row per key.
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Editable sections of each page (hero image, headline, intro). Key like 'home.hero'.
create table if not exists public.site_page_sections (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_projects (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  location        text,
  map_query       text,
  category        text,
  year            text,
  status          text default 'Completed',
  project_type    text,
  scope           text,
  description     text,
  cover_image     text,
  cover_alt       text,
  cover_position  text,                          -- e.g. 'center 30%'
  gallery         jsonb not null default '[]',   -- [{src, caption, alt}]
  featured        boolean not null default false,
  dark_header     boolean not null default false,
  sort_order      int not null default 0,
  published       boolean not null default true,
  seo_title       text,
  seo_description text,
  old_slugs       text[] not null default '{}',  -- previous URLs, for redirects
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.site_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  body            text not null default '',      -- markdown
  cover_image     text,
  cover_alt       text,
  tags            text[] not null default '{}',
  author          text,
  published_at    timestamptz not null default now(),
  published       boolean not null default false,
  seo_title       text,
  seo_description text,
  old_slugs       text[] not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.site_clients (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  logo       text,
  url        text,
  sort_order int not null default 0,
  published  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product catalogue: material categories → products. Hidden until published.
create table if not exists public.site_material_categories (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  tagline         text,
  description     text,
  hero_image      text,
  image           text,
  specs           jsonb not null default '[]',   -- [{label, value}]
  faqs            jsonb not null default '[]',   -- [{q, a}]
  sort_order      int not null default 0,
  published       boolean not null default false,
  seo_title       text,
  seo_description text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.site_products (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.site_material_categories(id) on delete cascade,
  slug        text not null,
  name        text not null,
  series      text,
  color       text,
  image       text,
  image_alt   text,
  description text,
  specs       jsonb not null default '[]',
  sort_order  int not null default 0,
  published   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (category_id, slug)
);
create index if not exists site_products_category_idx on public.site_products (category_id, sort_order);

-- Enquiries inbox: the table already exists (submit-contact writes to it).
alter table public.contact_submissions
  add column if not exists status text not null default 'new';
do $$ begin
  alter table public.contact_submissions
    add constraint contact_submissions_status_check check (status in ('new', 'replied', 'archived'));
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------- triggers

do $$
declare t text;
begin
  foreach t in array array['site_settings','site_page_sections','site_projects','site_posts',
                           'site_clients','site_material_categories','site_products'] loop
    execute format('drop trigger if exists %I_touch on public.%I', t, t);
    execute format('create trigger %I_touch before update on public.%I
                    for each row execute function public.site_touch_updated_at()', t, t);
  end loop;
end $$;

-- ---------------------------------------------------------------- access rules

do $$
declare t text;
begin
  -- Tables with a published flag: visitors see published rows only.
  foreach t in array array['site_projects','site_posts','site_clients',
                           'site_material_categories','site_products'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin all" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (published)', t);
    execute format('create policy "admin all" on public.%I for all to authenticated
                    using (public.is_site_admin()) with check (public.is_site_admin())', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;

  -- Settings and page sections are public content: everyone reads, admin writes.
  foreach t in array array['site_settings','site_page_sections'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin all" on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "admin all" on public.%I for all to authenticated
                    using (public.is_site_admin()) with check (public.is_site_admin())', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

-- Enquiries: admin only (the form writes through the edge function).
drop policy if exists "admin read" on public.contact_submissions;
drop policy if exists "admin update" on public.contact_submissions;
drop policy if exists "admin delete" on public.contact_submissions;
create policy "admin read" on public.contact_submissions
  for select to authenticated using (public.is_site_admin());
create policy "admin update" on public.contact_submissions
  for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());
create policy "admin delete" on public.contact_submissions
  for delete to authenticated using (public.is_site_admin());
grant select, update, delete on public.contact_submissions to authenticated;

-- ---------------------------------------------------------------- photo storage

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 10485760,
        array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update
  set public = true, file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "site media read" on storage.objects;
drop policy if exists "site media admin insert" on storage.objects;
drop policy if exists "site media admin update" on storage.objects;
drop policy if exists "site media admin delete" on storage.objects;
create policy "site media read" on storage.objects
  for select using (bucket_id = 'site-media');
create policy "site media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media' and public.is_site_admin());
create policy "site media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'site-media' and public.is_site_admin());
create policy "site media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media' and public.is_site_admin());

-- ---------------------------------------------------------------- admin login
-- Run AFTER creating the shared login in Authentication → Users → Add user.
insert into public.site_admins (user_id)
select id from auth.users where email = 'hulmacebu@gmail.com'
on conflict do nothing;
