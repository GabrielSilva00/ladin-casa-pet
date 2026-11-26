-- ─────────────────────────────────────────────────────────────
-- Cabana Pet Café — schema inicial
-- Rode:  supabase db push   (ou cole no SQL Editor do dashboard)
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ── Clientes (tutores) ─────────────────────────────────────
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  source text,
  notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists clients_phone_key on public.clients (phone);

-- ── Pets ────────────────────────────────────────────────────
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  species text not null check (species in ('cao', 'gato')),
  size text not null check (size in ('mini','pequeno','medio','grande','gigante')),
  coat text not null check (coat in ('curta','media','longa','dupla')),
  birth_year int,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists pets_client_idx on public.pets (client_id);

-- ── Catálogo de serviços ────────────────────────────────────
create table if not exists public.services (
  id text primary key,
  name text not null,
  slug text not null unique,
  duration_min int not null,
  base_price_cents int not null default 0,
  parallel boolean not null default true,
  price_by_coat_size jsonb not null default '{}'::jsonb,
  featured boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Itens do café/cozinha (cardápio) ────────────────────────
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price_cents int not null,
  category text not null check (category in ('cafe','comida','pet','sobremesa')),
  featured boolean not null default false,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);

-- ── Agendamentos ────────────────────────────────────────────
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete restrict,
  client_id uuid not null references public.clients(id) on delete restrict,
  service_ids text[] not null,
  scheduled_at timestamptz not null,
  duration_min int not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','in_progress','finished','no_show','cancelled')),
  total_price_cents int not null default 0,
  notes text,
  external_calendar_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_scheduled_idx on public.bookings (scheduled_at);
create index if not exists bookings_pet_idx on public.bookings (pet_id);
create index if not exists bookings_status_idx on public.bookings (status);

-- ── Bloqueios de disponibilidade ────────────────────────────
create table if not exists public.availability_blocks (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  created_by uuid,
  created_at timestamptz not null default now()
);

create index if not exists blocks_range_idx on public.availability_blocks (starts_at, ends_at);

-- ── Settings (key/value) ────────────────────────────────────
create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Trigger de updated_at
create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists bookings_touch on public.bookings;
create trigger bookings_touch before update on public.bookings
  for each row execute function public.touch_updated_at();

-- ── RLS ─────────────────────────────────────────────────────
-- Agendamentos públicos são criados via service-role (API route),
-- então ativamos RLS e deixamos leitura só para usuários admin.

alter table public.clients enable row level security;
alter table public.pets enable row level security;
alter table public.bookings enable row level security;
alter table public.availability_blocks enable row level security;
alter table public.settings enable row level security;
alter table public.services enable row level security;
alter table public.menu_items enable row level security;

-- Catálogo público (serviços + cardápio)
create policy "services are public" on public.services for select using (true);
create policy "menu items are public" on public.menu_items for select using (true);

-- Tudo o mais exige admin (auth.jwt() payload com 'admin' = true)
create policy "admins see clients" on public.clients for all
  using (coalesce(auth.jwt() ->> 'role','') = 'admin')
  with check (true);

create policy "admins see pets" on public.pets for all
  using (coalesce(auth.jwt() ->> 'role','') = 'admin')
  with check (true);

create policy "admins see bookings" on public.bookings for all
  using (coalesce(auth.jwt() ->> 'role','') = 'admin')
  with check (true);

create policy "admins see blocks" on public.availability_blocks for all
  using (coalesce(auth.jwt() ->> 'role','') = 'admin')
  with check (true);

create policy "admins see settings" on public.settings for all
  using (coalesce(auth.jwt() ->> 'role','') = 'admin')
  with check (true);
