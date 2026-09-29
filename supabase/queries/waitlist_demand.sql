-- Waitlist demand. Run in the Supabase SQL editor (it bypasses row-level
-- security, so it can read the table; the public site cannot).
--
-- Device interest is only trustworthy for form_version = 2. The original form
-- (version 1) preselected Meta Ray-Ban, so those rows cannot be told apart from
-- people who actually chose it.

-- 1. Demand by device: the number to show a brand.
select
  coalesce(device_interest, 'no device chosen') as device,
  count(*)                                       as signups
from public.waitlist
where form_version = 2
group by 1
order by signups desc, device;

-- 2. Who is signing up.
select coalesce(role, 'not said') as role, count(*) as signups
from public.waitlist
where form_version = 2
group by 1
order by signups desc;

-- 3. Where they come from (landing page, and the site that sent them).
select
  coalesce(source, 'unknown')   as page,
  coalesce(referrer, 'direct')  as referrer,
  count(*)                      as signups
from public.waitlist
where form_version = 2
group by 1, 2
order by signups desc
limit 50;

-- 4. Paid or campaign traffic.
select utm_source, utm_medium, utm_campaign, count(*) as signups
from public.waitlist
where form_version = 2 and utm_source is not null
group by 1, 2, 3
order by signups desc;

-- 5. Signups per day.
select date_trunc('day', created_at)::date as day, count(*) as signups
from public.waitlist
group by 1
order by 1 desc
limit 60;

-- 6. Totals, so you know how much of the list has clean device data.
select
  count(*)                                   as total,
  count(*) filter (where form_version = 2)   as with_v2_data,
  count(*) filter (where form_version = 1)   as legacy
from public.waitlist;
