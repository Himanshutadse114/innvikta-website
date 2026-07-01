const fs = require('fs');
const blogs = JSON.parse(fs.readFileSync('blogs.json', 'utf8'));

let sql = "INSERT INTO blogs (filename, title, image, author_name, published_at, draft, categories, meta_description, content) VALUES \n";

const escape = (str) => {
    if (str === null || str === undefined) return 'NULL';
    return "'" + str.replace(/'/g, "''").replace(/\\/g, '\\\\') + "'";
};

const values = blogs.map(blog => {
    const filename = escape(blog.slug);
    const title = escape(blog.title);
    const image = escape(blog.image);
    const author_name = escape(blog.author?.name || '');
    // Convert to MySQL timestamp format and map to published_at
    const dateStr = blog.date ? new Date(blog.date).toISOString().slice(0, 19).replace('T', ' ') : null;
    const published_at = dateStr ? escape(dateStr) : 'NULL';
    const draft = blog.draft ? '1' : '0';
    const categories = escape(JSON.stringify(blog.categories || []));
    const meta_description = escape(blog.metaDescription || '');
    const content = escape(blog.content || '');
    
    return `(${filename}, ${title}, ${image}, ${author_name}, ${published_at}, ${draft}, ${categories}, ${meta_description}, ${content})`;
});

// Use ON DUPLICATE KEY UPDATE so it can safely be re-run on the server without failing on UNIQUE constraints
sql += values.join(",\n") + "\nON DUPLICATE KEY UPDATE title=VALUES(title), image=VALUES(image), author_name=VALUES(author_name), published_at=VALUES(published_at), draft=VALUES(draft), categories=VALUES(categories), meta_description=VALUES(meta_description), content=VALUES(content);";

fs.writeFileSync('blogs.sql', sql);
console.log("SQL generated successfully with the correct schema.");
