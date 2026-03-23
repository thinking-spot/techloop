import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const { data: blog, error: fetchError } = await supabase
        .from('content_blog_posts')
        .select('*')
        .eq('slug', 'best-smart-rings-2026-guide')
        .single();

    if (fetchError || !blog) {
        console.error("Error fetching blog:", fetchError);
        return;
    }

    let body = blog.body_mdx;

    // 1. Oura Ring 4
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — and if you buy after 3 months/,
        "**[Try Oura Ring 4](/product/oura-ring) on Techloop for $42/month** — and if you buy after 3 months"
    );

    // 2. Samsung Galaxy Ring
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — the perfect way to test if the sizing kit/,
        "**[Try Samsung Galaxy Ring](/product/samsung-galaxy-ring) on Techloop for $42/month** — the perfect way to test if the sizing kit"
    );

    // 3. Ultrahuman Ring Air
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — the best way to see how the titanium finish/,
        "**[Try Ultrahuman Ring Air](/product/ultrahuman-ring-air) on Techloop for $42/month** — the best way to see how the titanium finish"
    );

    // 4. RingConn Gen 2
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — our rent-to-own math is especially good here/,
        "**[Try RingConn Gen 2](/product/ringconn-gen-2) on Techloop for $42/month** — our rent-to-own math is especially good here"
    );

    // 5. Amazfit Helio Ring
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — a single month tells you if the battery life/,
        "**[Try Amazfit Helio Ring](/product/amazfit-helio-ring) on Techloop for $42/month** — a single month tells you if the battery life"
    );

    // 6. Circular Ring 2
    body = body.replace(
        /\*\*Try it on Techloop for \$42\/month\*\* — ideal for testing whether ECG-on-ring is useful/,
        "**[Try Circular Ring 2](/product/circular-ring-2) on Techloop for $42/month** — ideal for testing whether ECG-on-ring is useful"
    );

    const { error: updateError } = await supabase
        .from('content_blog_posts')
        .update({ body_mdx: body })
        .eq('slug', 'best-smart-rings-2026-guide');

    if (updateError) {
        console.error("Error updating blog:", updateError);
    } else {
        console.log("Successfully updated best-smart-rings-2026-guide!");
    }
}

run();
