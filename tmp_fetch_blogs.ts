import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ccxmgbzirjimzgilksao.supabase.co';
const supabaseKey = 'sb_publishable_hwYGFjm9k7yISOaoF4W9uA_WmlQmbQG';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchBlogs() {
    const { data, error } = await supabase
        .from('content_blog_posts')
        .select('slug, title, body_mdx')
        .eq('published', true);

    if (error) {
        console.error('Error fetching blogs:', error);
        return;
    }

    console.log(JSON.stringify(data, null, 2));
}

fetchBlogs();
