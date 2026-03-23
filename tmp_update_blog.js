const fs = require('fs');

async function run() {
    const data = JSON.parse(fs.readFileSync('/tmp/blogs.json', 'utf8'));
    const ringBlog = data.find(b => b.slug === 'best-smart-rings-2026-guide');

    if (!ringBlog) {
        console.error("Blog not found in /tmp/blogs.json");
        return;
    }

    let body = ringBlog.body_mdx;

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

    const supabaseUrl = "https://ccxmgbzirjimzgilksao.supabase.co/rest/v1/content_blog_posts?slug=eq.best-smart-rings-2026-guide";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjeG1nYnppcmppbXpnaWxrc2FvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjQzMDYwMywiZXhwIjoyMDgyMDA2NjAzfQ.IZ6LWbd4_fFYxg4HZtWayUHjSZSlyCl4H-oiQ0Bl-u4";

    const response = await fetch(supabaseUrl, {
        method: 'PATCH',
        headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ body_mdx: body })
    });

    if (response.ok) {
        console.log("Successfully updated best-smart-rings-2026-guide!");
    } else {
        console.error("Error updating blog:", await response.text());
    }
}

run();
