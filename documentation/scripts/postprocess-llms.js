const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build');
const docsDir = path.join(buildDir, 'docs');
const v4Dir = path.join(docsDir, 'v4');

const IMPORT_LINE = /^\s*import\s+.*?;?\s*$/;

/**
 * Remove MDX/doc import statements while preserving imports inside fenced code blocks.
 * docusaurus-plugin-llms excludeImports strips all import lines, including examples.
 */
function removeImportsOutsideCodeBlocks(content) {
  const lines = content.split('\n');
  const result = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }
    if (!inCodeBlock && IMPORT_LINE.test(line)) {
      continue;
    }
    result.push(line);
  }

  return result.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

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

function collectAllMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function cleanMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, removeImportsOutsideCodeBlocks(content));
}

if (fs.existsSync(docsDir)) {
  fs.mkdirSync(v4Dir, { recursive: true });

  for (const mdFile of collectMarkdownFiles(docsDir)) {
    const relativePath = path.relative(docsDir, mdFile);
    const targetPath = path.join(v4Dir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.renameSync(mdFile, targetPath);
  }

  for (const mdFile of collectAllMarkdownFiles(v4Dir)) {
    cleanMarkdownFile(mdFile);
  }
}

for (const filename of ['llms.txt', 'llms-full.txt']) {
  const filePath = path.join(buildDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/{2,}docs\//g, '/docs/v4/');
  if (filename === 'llms-full.txt') {
    content = removeImportsOutsideCodeBlocks(content);
  }
  fs.writeFileSync(filePath, content);
}
