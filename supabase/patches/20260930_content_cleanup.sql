-- Content cleanup for the live content_* tables (job pages, device pages, blog posts).
-- REVIEW BEFORE RUNNING. Run it in the Supabase SQL editor.
--
-- What this fixes (only the parts that need no judgement):
--   1. Placeholder testimonials, stats, ratings and reviews  -> NULL
--   2. A job page's secondary CTA that contains a price       -> "See pricing"
--   3. Blog links to /rent/<x> and /device/<x> (neither exists) -> /product/<x>
--   4. Stored device prices                                    -> recomputed from msrp_cents
--
-- What it leaves alone: wording. Prices, "cancel anytime", "no penalty", delivery times,
-- tax and regulatory statements inside the prose are for a person to fix (or for the page to
-- be regenerated with the updated prompt in techloop-content-schemas.md). Unresolved device
-- slugs are left too, since the right replacement is a judgement call.
--
-- How to use it:
--   1. npm run audit:content         the "before" list
--   2. Run PART 1 below             read-only: how many rows each step would change
--   3. Run PART 2 below             makes the changes, in one transaction
--   4. Run PART 1 again             every number should now be 0
--   5. npm run audit:content         what is left is the manual list
--
-- Pages pick up the change within a minute (they revalidate every 60 seconds). Rows that are
-- changed get updated_at = now(), so the sitemap's lastmod moves too.
-- Safe to run more than once. If a column named below does not exist in your database, the
-- statement fails and PART 2 changes nothing; tell me which one and I will adjust it.


-- =========================================================================================
-- PART 1: preview (read-only)
-- =========================================================================================

select step, rows_to_change
from (
  select 1 as n, '1a. job pages with a placeholder testimonial or stat' as step, count(*) as rows_to_change
    from content_job_pages
   where testimonial_quote is not null or testimonial_name is not null or testimonial_job_title is not null
      or testimonial_company is not null or stat_users_count is not null or stat_rating is not null
      or stat_return_rate is not null
  union all
  select 2, '1b. device pages with a placeholder rating or review', count(*)
    from content_device_pages
   where subscriber_rating is not null or subscriber_review_count is not null
      or featured_review_quote is not null or featured_review_author is not null
  union all
  select 3, '2.  job pages whose secondary CTA contains a price', count(*)
    from content_job_pages
   where hero_cta_secondary ~ '\$\d'
  union all
  select 4, '3.  blog posts linking to /rent/ or /device/', count(*)
    from content_blog_posts
   where body_mdx ~ '["''(]/(rent|device)/' or intro ~ '["''(]/(rent|device)/'
      or ctas::text ~ '["''(]/(rent|device)/' or faqs::text ~ '["''(]/(rent|device)/'
  union all
  select 5, '4.  device pages whose stored prices differ from the pricing rule', count(*)
    from content_device_pages d
    join (
      -- Mirrors PRICING in src/lib/pricing.ts. Keep these four numbers in step with it.
      select x.id, p.credited_payments as months,
             greatest(p.min_rate_cents, (x.msrp_cents * p.rate_pct / 100 / 100) * 100) as rate,
             (x.msrp_cents * p.deposit_pct / 100 / 100) * 100 as dep
        from content_device_pages x
       cross join (select 10 as rate_pct, 10 as deposit_pct, 1900 as min_rate_cents, 3 as credited_payments) p
    ) c on c.id = d.id
   where d.rental_price_cents is distinct from c.rate
      or d.purchase_credit_months is distinct from c.months
      or d.purchase_credit_total_cents is distinct from c.dep + c.months * c.rate
) steps
order by n;


-- =========================================================================================
-- PART 2: apply (one transaction)
-- =========================================================================================

begin;

-- 1a. Job pages: no real customers yet, so no testimonials or stats.
update content_job_pages
   set testimonial_quote = null, testimonial_name = null, testimonial_job_title = null,
       testimonial_company = null, stat_users_count = null, stat_rating = null, stat_return_rate = null,
       updated_at = now()
 where testimonial_quote is not null or testimonial_name is not null or testimonial_job_title is not null
    or testimonial_company is not null or stat_users_count is not null or stat_rating is not null
    or stat_return_rate is not null;

-- 1b. Device pages: same, for ratings and reviews.
update content_device_pages
   set subscriber_rating = null, subscriber_review_count = null,
       featured_review_quote = null, featured_review_author = null,
       updated_at = now()
 where subscriber_rating is not null or subscriber_review_count is not null
    or featured_review_quote is not null or featured_review_author is not null;

-- 2. A CTA label is not the place for a price (the site computes prices itself).
update content_job_pages
   set hero_cta_secondary = 'See pricing', updated_at = now()
 where hero_cta_secondary ~ '\$\d';

-- 3. /rent/<x> and /device/<x> are not pages; device pages live at /product/<id>. Only paths that
--    start a link (after ( " or ') are rewritten, so a sentence that merely mentions "/rent/" stays.
update content_blog_posts
   set body_mdx = regexp_replace(body_mdx, '(["''(])/(rent|device)/', '\1/product/', 'g'),
       intro    = regexp_replace(intro,    '(["''(])/(rent|device)/', '\1/product/', 'g'),
       ctas     = regexp_replace(ctas::text, '(["''(])/(rent|device)/', '\1/product/', 'g')::jsonb,
       faqs     = regexp_replace(faqs::text, '(["''(])/(rent|device)/', '\1/product/', 'g')::jsonb,
       updated_at = now()
 where body_mdx ~ '["''(]/(rent|device)/' or intro ~ '["''(]/(rent|device)/'
    or ctas::text ~ '["''(]/(rent|device)/' or faqs::text ~ '["''(]/(rent|device)/';

-- 4. Stored device prices follow the pricing rule: the monthly price is rate_pct of retail rounded
--    down to a whole dollar (never below the minimum); the deposit is deposit_pct of retail, also
--    rounded down; the credit toward buying is the deposit plus the first credited_payments payments.
update content_device_pages d
   set rental_price_cents = c.rate,
       purchase_credit_months = c.months,
       purchase_credit_total_cents = c.dep + c.months * c.rate,
       updated_at = now()
  from (
    -- Same four numbers as PRICING in src/lib/pricing.ts (and as PART 1 above).
    select x.id, p.credited_payments as months,
           greatest(p.min_rate_cents, (x.msrp_cents * p.rate_pct / 100 / 100) * 100) as rate,
           (x.msrp_cents * p.deposit_pct / 100 / 100) * 100 as dep
      from content_device_pages x
     cross join (select 10 as rate_pct, 10 as deposit_pct, 1900 as min_rate_cents, 3 as credited_payments) p
  ) c
 where c.id = d.id
   and (d.rental_price_cents is distinct from c.rate
     or d.purchase_credit_months is distinct from c.months
     or d.purchase_credit_total_cents is distinct from c.dep + c.months * c.rate);

commit;
