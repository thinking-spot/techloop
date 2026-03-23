const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/tmp/blogs.json', 'utf8'));

const ringBlog = data.find(b => b.slug === 'best-smart-rings-2026-guide');

if (ringBlog) {
    console.log(ringBlog.body_mdx);
} else {
    console.log("Blog not found");
}
