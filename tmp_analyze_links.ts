import * as fs from 'fs';

const data = JSON.parse(fs.readFileSync('/tmp/blogs.json', 'utf8'));

console.log(`Analyzing ${data.length} blog posts...\n`);

data.forEach((blog: any) => {
    console.log(`--- Post: ${blog.title} (/blog/${blog.slug}) ---`);
    let matches = [];

    // Check for category terms
    const categories = ['rings', 'glasses', 'watch', 'earbuds', 'pins', 'pendants', 'cards', 'robotics'];
    categories.forEach(cat => {
        if (blog.body_mdx.toLowerCase().includes(cat)) {
            matches.push(`Category: ${cat}`);
        }
    });

    // Check for use case terms
    const useCases = ['productivity', 'health', 'fitness', 'entertainment', 'communication', 'developer', 'assistant', 'business'];
    useCases.forEach(uc => {
        if (blog.body_mdx.toLowerCase().includes(uc)) {
            matches.push(`Use Case: ${uc}`);
        }
    });

    // Check for Product CTA line
    const ctaMatch = blog.body_mdx.match(/Try ([\w\s]+) on Techloop for /g);
    if (ctaMatch) {
         matches.push(`CTAs to target: ${ctaMatch.length}`);
    }

    if (matches.length > 0) {
        console.log(`Opportunities: ${matches.join(', ')}\n`);
    } else {
        console.log(`No obvious exact matches found.\n`);
    }
});
