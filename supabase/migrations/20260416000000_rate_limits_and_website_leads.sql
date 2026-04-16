create table if not exists public.website_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  company text,
  notes text,
  source text not null default 'contact-form',
  created_at timestamptz not null default now()
);
alter table public.website_leads enable row level security;
create policy "anon insert website_leads"
  on public.website_leads for insert to anon with check (true);

create table if not exists public.rate_limits (
  id bigserial primary key,
  ip text not null,
  action text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_rate_limits_lookup on public.rate_limits(ip, action, created_at);
alter table public.rate_limits enable row level security;
-- no public policies; accessed with service_role only from Edge Function
