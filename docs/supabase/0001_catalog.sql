-- BORRADOR de esquema para Mash Racing Store. NO está aplicado a ningún proyecto.
-- Ver docs/SUPABASE.md. Probar primero en un proyecto de pruebas del propietario.

create table public.categories (
  slug  text primary key,
  label text not null,
  sort  int  not null default 0
);

create table public.teams (
  slug  text primary key,          -- mismo valor que p.team hoy: Ferrari, RedBull, ...
  label text not null,
  color text
);

create table public.products (
  id           integer primary key,  -- se conservan los ids actuales (los usa el carrito guardado en localStorage)
  name         text    not null,
  category     text    not null references public.categories(slug),
  tipo         text,                 -- camisa | polo | chaqueta | gorra | llavero | jersey
  team         text    references public.teams(slug),
  price_cop    integer not null check (price_cop > 0),
  badge        text,
  featured     boolean not null default false,
  emoji        text,
  image_url    text,
  description  text,
  published    boolean not null default true,
  sort         int     not null default 0,
  updated_at   timestamptz not null default now()
);

create table public.product_variants (
  id         bigint generated always as identity primary key,
  product_id integer not null references public.products(id) on delete cascade,
  size       text    not null,        -- S, M, L, XL, Única, 1:64
  stock      integer check (stock >= 0),  -- null = sin control de stock (comportamiento actual)
  sku        text,
  unique (product_id, size)
);

create table public.site_content (
  key   text primary key,             -- p. ej. 'announcements'
  value jsonb not null
);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create index on public.products (category, published);
create index on public.product_variants (product_id);

-- ── RLS ───────────────────────────────────────────────────────────────
alter table public.categories        enable row level security;
alter table public.teams             enable row level security;
alter table public.products          enable row level security;
alter table public.product_variants  enable row level security;
alter table public.site_content      enable row level security;
alter table public.admins            enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Lectura pública solo de lo publicado
create policy "public read categories" on public.categories for select to anon, authenticated using (true);
create policy "public read teams"      on public.teams      for select to anon, authenticated using (true);
create policy "public read content"    on public.site_content for select to anon, authenticated using (true);
create policy "public read products"   on public.products  for select to anon, authenticated using (published or public.is_admin());
create policy "public read variants"   on public.product_variants for select to anon, authenticated
  using (exists (select 1 from public.products p where p.id = product_id and (p.published or public.is_admin())));

-- Escritura solo administradores
create policy "admin write categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin write teams"      on public.teams      for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin write products"   on public.products   for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin write variants"   on public.product_variants for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin write content"    on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Cada admin solo ve su propia fila; la gestión de admins se hace desde el panel de Supabase / service_role.
create policy "admin sees self" on public.admins for select to authenticated using (user_id = (select auth.uid()));

-- ── Storage (ejecutar en el panel o con la API de Storage) ────────────
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
-- create policy "public read images" on storage.objects for select using (bucket_id = 'product-images');
-- create policy "admin write images" on storage.objects for all to authenticated
--   using (bucket_id = 'product-images' and public.is_admin())
--   with check (bucket_id = 'product-images' and public.is_admin());

-- ── Reversión ─────────────────────────────────────────────────────────
-- drop table public.product_variants, public.products, public.teams, public.categories,
--            public.site_content, public.admins cascade;
-- drop function public.is_admin();
