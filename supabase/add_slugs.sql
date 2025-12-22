-- Add slug column to products if it doesn't exist
alter table public.products add column if not exists slug text unique;

-- Update the existing dummy data to match src/lib/data.ts IDs
update public.products set slug = 'meta-rayban' where name like '%Ray-Ban%';
update public.products set slug = 'rabbit-r1' where name like '%Rabbit%';
update public.products set slug = 'whoop-4' where name like '%Whoop%';

-- Verify the changes
select name, slug, monthly_price from public.products;
