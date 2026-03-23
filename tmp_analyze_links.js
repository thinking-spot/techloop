const fs = require('fs');

const data = JSON.parse(fs.readFileSync('/tmp/blogs.json', 'utf8'));

console.log(`Analyzing ${data.length} blog posts...\n`);
let md = `# Internal Linking Opportunities\n\n`;

data.forEach((blog) => {
    md += `## [${blog.title}](/blog/${blog.slug})\n\n`;
    
    // Check for product CTA links
    const content = blog.body_mdx;
    const regex = /Try ([\w\s-]+) on Techloop for \$(\d+)\/month/g;
    let match;
    let ctas = [];
    while ((match = regex.exec(content)) !== null) {
        ctas.push({ phrase: match[0], product: match[1].trim() });
    }
    
    if (ctas.length > 0) {
        md += `### Product CTAs\n`;
        ctas.forEach(c => {
             // Let's guess the URL: e.g. "Oura Ring 4" -> /product/oura-ring-4
             const prodSlug = c.product.toLowerCase().replace(/\s+/g, '-');
             md += `- Replace: \`${c.phrase}\`\n  - **Link to:** \`/product/${prodSlug}\`\n`;
        });
        md += '\n';
    }

    // Rough checks for categories
    const categories = ['rings', 'glasses', 'watches', 'earbuds', 'pins', 'pendants', 'cards', 'robotics'];
    let catMatches = new Set();
    categories.forEach(cat => {
        if (content.toLowerCase().includes(cat)) {
            catMatches.add(cat);
        }
    });

    if (catMatches.size > 0) {
        md += `### Keyword Insertions (Categories)\n`;
        catMatches.forEach(cat => {
            md += `- Found keyword: \`${cat}\`\n  - **Link to:** \`/browse/ai-${cat}\`\n`;
        });
        md += '\n';
    }

    // Rough checks for use cases
    const useCases = ['productivity', 'health', 'fitness', 'entertainment', 'communication', 'developer', 'assistant', 'business'];
    let ucMatches = new Set();
    useCases.forEach(uc => {
        if (content.toLowerCase().includes(uc)) {
            ucMatches.add(uc);
        }
    });

    if (ucMatches.size > 0) {
        md += `### Keyword Insertions (Use Cases)\n`;
        ucMatches.forEach(uc => {
            md += `- Found keyword: \`${uc}\`\n  - **Link to:** \`/browse/${uc}-ai-devices\`\n`;
        });
        md += '\n';
    }
});

fs.writeFileSync('/tmp/linking_opportunities.md', md);
console.log('Saved to /tmp/linking_opportunities.md');
