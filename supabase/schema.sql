-- Approva database schema
-- Run in Supabase SQL editor or via CLI

-- ============================================================
-- Updated-at trigger function (shared across all tables)
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- agencies
-- ============================================================
create table public.agencies (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  slug                  text not null unique,
  logo_url              text,
  custom_domain         text,
  plan                  text not null default 'free' check (plan in ('free', 'growth', 'agency')),
  stripe_customer_id    text,
  stripe_subscription_id text,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

alter table public.agencies enable row level security;

create trigger agencies_updated_at
  before update on public.agencies
  for each row execute function public.handle_updated_at();

-- ============================================================
-- agency_users
-- ============================================================
create table public.agency_users (
  id           uuid primary key default gen_random_uuid(),
  agency_id    uuid not null references public.agencies(id) on delete cascade,
  auth_user_id uuid not null references auth.users(id) on delete cascade,
  role         text not null default 'member' check (role in ('owner', 'member')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (agency_id, auth_user_id)
);

alter table public.agency_users enable row level security;

create index agency_users_agency_id_idx on public.agency_users(agency_id);
create index agency_users_auth_user_id_idx on public.agency_users(auth_user_id);

create trigger agency_users_updated_at
  before update on public.agency_users
  for each row execute function public.handle_updated_at();

-- ============================================================
-- clients
-- ============================================================
create table public.clients (
  id          uuid primary key default gen_random_uuid(),
  agency_id   uuid not null references public.agencies(id) on delete cascade,
  name        text not null,
  email       text not null,
  brand_color text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.clients enable row level security;

create index clients_agency_id_idx on public.clients(agency_id);

create trigger clients_updated_at
  before update on public.clients
  for each row execute function public.handle_updated_at();

-- ============================================================
-- workspaces
-- ============================================================
create table public.workspaces (
  id         uuid primary key default gen_random_uuid(),
  agency_id  uuid not null references public.agencies(id) on delete cascade,
  client_id  uuid not null references public.clients(id) on delete cascade,
  title      text not null,
  status     text not null default 'draft' check (status in ('draft', 'sent', 'approved', 'changes_requested')),
  due_date   date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.workspaces enable row level security;

create index workspaces_agency_id_idx on public.workspaces(agency_id);
create index workspaces_client_id_idx on public.workspaces(client_id);

create trigger workspaces_updated_at
  before update on public.workspaces
  for each row execute function public.handle_updated_at();

-- ============================================================
-- posts
-- ============================================================
create table public.posts (
  id             uuid primary key default gen_random_uuid(),
  workspace_id   uuid not null references public.workspaces(id) on delete cascade,
  platform       text not null check (platform in ('instagram', 'facebook', 'linkedin', 'tiktok', 'x')),
  caption        text,
  media_url      text,
  scheduled_date date,
  status         text not null default 'pending' check (status in ('pending', 'approved', 'changes_requested')),
  position       integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table public.posts enable row level security;

create index posts_workspace_id_idx on public.posts(workspace_id);

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

-- ============================================================
-- approval_links
-- ============================================================
create table public.approval_links (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  token         text not null unique,
  client_email  text not null,
  expires_at    timestamptz,
  last_viewed_at timestamptz,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.approval_links enable row level security;

create index approval_links_workspace_id_idx on public.approval_links(workspace_id);
create index approval_links_token_idx on public.approval_links(token);

create trigger approval_links_updated_at
  before update on public.approval_links
  for each row execute function public.handle_updated_at();

-- ============================================================
-- approval_actions  (append-only audit log — never UPDATE or DELETE)
-- ============================================================
create table public.approval_actions (
  id               uuid primary key default gen_random_uuid(),
  post_id          uuid not null references public.posts(id) on delete cascade,
  approval_link_id uuid not null references public.approval_links(id) on delete cascade,
  action           text not null check (action in ('approved', 'changes_requested')),
  client_name      text,
  created_at       timestamptz not null default now()
  -- intentionally no updated_at — this table is append-only
);

alter table public.approval_actions enable row level security;

create index approval_actions_post_id_idx on public.approval_actions(post_id);
create index approval_actions_approval_link_id_idx on public.approval_actions(approval_link_id);

-- ============================================================
-- comments
-- ============================================================
create table public.comments (
  id               uuid primary key default gen_random_uuid(),
  post_id          uuid not null references public.posts(id) on delete cascade,
  approval_link_id uuid references public.approval_links(id) on delete set null,
  body             text not null,
  author_type      text not null check (author_type in ('client', 'agency')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.comments enable row level security;

create index comments_post_id_idx on public.comments(post_id);
create index comments_approval_link_id_idx on public.comments(approval_link_id);

create trigger comments_updated_at
  before update on public.comments
  for each row execute function public.handle_updated_at();

-- ============================================================
-- RLS policies
-- NOTE: These are permissive stubs to get the schema deployed.
-- Lock them down per table once auth is wired up in Phase 0.
-- ============================================================

-- agencies: agency members can read their own agency
create policy "Agency members can view their agency"
  on public.agencies for select
  using (
    id in (
      select agency_id from public.agency_users
      where auth_user_id = auth.uid()
    )
  );

create policy "Agency members can update their agency"
  on public.agencies for update
  using (
    id in (
      select agency_id from public.agency_users
      where auth_user_id = auth.uid()
    )
  );

-- agency_users: members can view their own agency roster
create policy "Agency members can view agency_users"
  on public.agency_users for select
  using (
    agency_id in (
      select agency_id from public.agency_users
      where auth_user_id = auth.uid()
    )
  );

create policy "Agency members can insert agency_users"
  on public.agency_users for insert
  with check (auth_user_id = auth.uid());

-- clients: agency members can CRUD their clients
create policy "Agency members can manage clients"
  on public.clients for all
  using (
    agency_id in (
      select agency_id from public.agency_users
      where auth_user_id = auth.uid()
    )
  );

-- workspaces: agency members can CRUD their workspaces
create policy "Agency members can manage workspaces"
  on public.workspaces for all
  using (
    agency_id in (
      select agency_id from public.agency_users
      where auth_user_id = auth.uid()
    )
  );

-- posts: agency members can CRUD posts in their workspaces
create policy "Agency members can manage posts"
  on public.posts for all
  using (
    workspace_id in (
      select w.id from public.workspaces w
      join public.agency_users au on au.agency_id = w.agency_id
      where au.auth_user_id = auth.uid()
    )
  );

-- approval_links: agency members can manage links for their workspaces
create policy "Agency members can manage approval_links"
  on public.approval_links for all
  using (
    workspace_id in (
      select w.id from public.workspaces w
      join public.agency_users au on au.agency_id = w.agency_id
      where au.auth_user_id = auth.uid()
    )
  );

-- approval_links: public read via token (for client review pages)
create policy "Public can view approval_links by token"
  on public.approval_links for select
  using (is_active = true);

-- approval_actions: agency members can read actions for their posts
create policy "Agency members can read approval_actions"
  on public.approval_actions for select
  using (
    post_id in (
      select p.id from public.posts p
      join public.workspaces w on w.id = p.workspace_id
      join public.agency_users au on au.agency_id = w.agency_id
      where au.auth_user_id = auth.uid()
    )
  );

-- approval_actions: append-only insert via valid token (enforced at app layer too)
create policy "Anyone with valid link can insert approval_actions"
  on public.approval_actions for insert
  with check (
    approval_link_id in (
      select id from public.approval_links where is_active = true
    )
  );

-- approval_actions: NO UPDATE or DELETE policies — append-only by design

-- comments: agency members can manage comments on their posts
create policy "Agency members can manage comments"
  on public.comments for all
  using (
    post_id in (
      select p.id from public.posts p
      join public.workspaces w on w.id = p.workspace_id
      join public.agency_users au on au.agency_id = w.agency_id
      where au.auth_user_id = auth.uid()
    )
  );

-- comments: clients can insert/read comments via valid approval link
create policy "Clients can insert comments via valid link"
  on public.comments for insert
  with check (
    approval_link_id in (
      select id from public.approval_links where is_active = true
    )
  );

create policy "Clients can read comments on their approval link posts"
  on public.comments for select
  using (
    approval_link_id in (
      select id from public.approval_links where is_active = true
    )
    or
    post_id in (
      select p.id from public.posts p
      join public.workspaces w on w.id = p.workspace_id
      join public.agency_users au on au.agency_id = w.agency_id
      where au.auth_user_id = auth.uid()
    )
  );
