const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build');
const docsDir = path.join(buildDir, 'docs');
const v4Dir = path.join(docsDir, 'v4');

function collectMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'v4') continue;
      files.push(...collectMarkdownFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

if (fs.existsSync(docsDir)) {
  fs.mkdirSync(v4Dir, { recursive: true });

  for (const mdFile of collectMarkdownFiles(docsDir)) {
    const relativePath = path.relative(docsDir, mdFile);
    const targetPath = path.join(v4Dir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.renameSync(mdFile, targetPath);
  }
}

for (const filename of ['llms.txt', 'llms-full.txt']) {
  const filePath = path.join(buildDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/{2,}docs\//g, '/docs/v4/');
  fs.writeFileSync(filePath, content);
}
