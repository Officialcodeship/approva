-- Run this in your Supabase SQL editor to create the post-media storage bucket.

insert into storage.buckets (id, name, public)
values ('post-media', 'post-media', true)
on conflict (id) do nothing;

-- Authenticated agency users can upload
create policy "Authenticated users can upload post media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'post-media');

-- Public read (so media_url works in client review pages)
create policy "Anyone can view post media"
  on storage.objects for select
  using (bucket_id = 'post-media');

-- Authenticated users can delete their own uploads
create policy "Authenticated users can delete post media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'post-media');
