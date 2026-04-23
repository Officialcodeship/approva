-- Run in Supabase SQL editor to create the logos storage bucket.

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

-- Authenticated agency users can upload their own logo
create policy "Authenticated users can upload logos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'logos');

-- Authenticated users can update (upsert) their own logo
create policy "Authenticated users can update logos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'logos');

-- Public read (logo_url displayed on review pages)
create policy "Anyone can view logos"
  on storage.objects for select
  using (bucket_id = 'logos');

-- Authenticated users can delete their own logos
create policy "Authenticated users can delete logos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'logos');
