create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  platform text not null default 'Etsy',
  cost numeric(12,2) default 0,
  price numeric(12,2) default 0,
  shipping numeric(12,2) default 0,
  ads numeric(12,2) default 0,
  fee_percent numeric(5,2) default 0,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
create policy "Users can view own products" on public.products for select using (auth.uid() = user_id);
create policy "Users can insert own products" on public.products for insert with check (auth.uid() = user_id);
create policy "Users can update own products" on public.products for update using (auth.uid() = user_id);
create policy "Users can delete own products" on public.products for delete using (auth.uid() = user_id);
