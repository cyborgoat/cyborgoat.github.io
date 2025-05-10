// scripts/rename-posts.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// simple slugify: kebab-case
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const postsDir = path.join(process.cwd(), 'public', 'data', 'posts');

function walk(dir) {
  let files = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  });
  return files;
}

function renamePosts() {
  const files = walk(postsDir);
  files.forEach((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(raw);
    const date = data.date;
    const title = data.title;
    if (!date || !title) return;
    const slug = slugify(title);
    const newName = `${date}-${slug}.md`;
    const newPath = path.join(path.dirname(filePath), newName);
    if (path.basename(filePath) !== newName) {
      fs.renameSync(filePath, newPath);
      console.log(`Renamed: ${filePath} -> ${newPath}`);
    }
    // Add directory-based tags
    const relDir = path.relative(postsDir, path.dirname(filePath));
    const dirTags = relDir.split(path.sep).filter(Boolean);
    const existingTags = Array.isArray(data.tags) ? data.tags : [];
    data.tags = Array.from(new Set([...existingTags, ...dirTags]));
    // Override author and authorImage globally
    data.author = 'Cyborgoat';
    data.authorImage = 'https://avatars.githubusercontent.com/u/44262838?v=4&size=64';

    // rewrite frontmatter with ordered keys
    const keys = ['title','date','author','authorImage','tags','excerpt','video'];
    const fm = {};
    keys.forEach((k) => { if (data[k] !== undefined) fm[k] = data[k]; });
    Object.keys(data).forEach((k) => { if (!(k in fm)) fm[k] = data[k]; });
    const newContent = matter.stringify(body, fm);
    fs.writeFileSync(newPath, newContent);
  });
}

renamePosts();
