-- Sobremesa: esquema inicial. Ejecutar en Supabase > SQL Editor.

create table editions (
  slug text primary key,
  city text not null,
  country text not null,
  is_active boolean not null default false
);

create table sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text,
  url text,
  category text not null default 'otro' check (category in ('equipo','insumos','distribucion','otro')),
  created_at timestamptz not null default now()
);

create table restaurants (
  id uuid primary key default gen_random_uuid(),
  edition_slug text not null references editions(slug),
  slug text not null,
  name text not null,
  cuisine text not null,
  neighborhood text not null,
  price_level smallint not null check (price_level between 1 and 4),
  address text,
  hours text,
  good_for text,
  reservation_url text,
  image_urls text[] not null default '{}',
  is_featured boolean not null default false, -- espacio pagado, siempre visible como "Destacado"
  created_at timestamptz not null default now(),
  unique (edition_slug, slug)
);

-- Las reseñas viven aparte para que ningún restaurante pueda editarlas.
create table reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  verdict text not null,
  body text not null,
  author text not null,
  published_at date not null default current_date
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  edition_slug text not null references editions(slug),
  slug text not null,
  kind text not null check (kind in ('reportaje','guia','resena')),
  title text not null,
  dek text not null,
  body text not null, -- párrafos separados por una línea en blanco
  author text not null,
  image_url text,
  sponsor_id uuid references sponsors(id),
  sponsor_format text check (sponsor_format in ('presentado','colaboracion')),
  published_at timestamptz not null default now(),
  unique (edition_slug, slug),
  check ((sponsor_id is null) = (sponsor_format is null))
);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  edition_slug text references editions(slug),
  created_at timestamptz not null default now(),
  unique (email, edition_slug)
);

create table sponsor_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  category text not null default 'otro',
  created_at timestamptz not null default now()
);

-- Seguridad: el público solo lee contenido y solo puede insertar en formularios.
alter table editions enable row level security;
alter table sponsors enable row level security;
alter table restaurants enable row level security;
alter table reviews enable row level security;
alter table articles enable row level security;
alter table newsletter_subscribers enable row level security;
alter table sponsor_leads enable row level security;

create policy "lectura publica" on editions for select using (true);
create policy "lectura publica" on sponsors for select using (true);
create policy "lectura publica" on restaurants for select using (true);
create policy "lectura publica" on reviews for select using (true);
create policy "lectura publica articulos publicados" on articles for select using (published_at <= now());
create policy "suscribirse" on newsletter_subscribers for insert with check (true);
create policy "pedir media kit" on sponsor_leads for insert with check (true);
