const fs = require('fs');
const blogs = JSON.parse(fs.readFileSync('blogs.json', 'utf8'));

// The schema is: filename, title, content, categories, author_name, image, draft, meta_description, published_at
let sql = "INSERT INTO blogs (filename, title, content, categories, author_name, image, draft, meta_description, published_at) VALUES \n";

const escape = (str) => {
    if (str === null || str === undefined || str === "") return 'NULL';
    return "'" + str.replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
};

const values = blogs.map(blog => {
    const filename = escape(blog.slug);
    const title = escape(blog.title);
    const content = escape(blog.content);
    const categories = escape(JSON.stringify(blog.categories));
    const author_name = escape(blog.author.name);
    const image = escape(blog.image);
    const draft = blog.draft ? '1' : '0';
    const meta_description = escape(blog.metaDescription);
    
    // Convert to MySQL timestamp format
    const dateStr = new Date(blog.date).toISOString().slice(0, 19).replace('T', ' ');
    const published_at = escape(dateStr);
    
    return `(${filename}, ${title}, ${content}, ${categories}, ${author_name}, ${image}, ${draft}, ${meta_description}, ${published_at})`;
});

// Use ON DUPLICATE KEY UPDATE to avoid errors if re-importing the same posts
sql += values.join(",\n") + "\nON DUPLICATE KEY UPDATE\n  title=VALUES(title),\n  content=VALUES(content),\n  categories=VALUES(categories),\n  author_name=VALUES(author_name),\n  image=VALUES(image),\n  draft=VALUES(draft),\n  meta_description=VALUES(meta_description),\n  published_at=VALUES(published_at);";

fs.writeFileSync('blogs.sql', sql);
console.log("SQL generated successfully with updated schema.");
