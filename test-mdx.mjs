import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8');
const anonKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1].trim();
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1].trim();

fetch(`${url}/rest/v1/content_blog_posts?slug=eq.xreal-vs-meta-ray-ban&select=body_mdx`, {
    headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
    }
}).then(r => r.json()).then(d => {
    fs.writeFileSync('mdx_dump.txt', d[0].body_mdx);
    console.log('Done writing ' + d[0].body_mdx.length + ' bytes');
});
