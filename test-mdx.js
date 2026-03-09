require('dotenv').config({ path: '.env.local' });
fetch(process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/content_blog_posts?slug=eq.xreal-vs-meta-ray-ban&select=body_mdx', {
  headers: {
    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
}).then(r => r.json()).then(d => require('fs').writeFileSync('mdx_dump.txt', d[0].body_mdx));
