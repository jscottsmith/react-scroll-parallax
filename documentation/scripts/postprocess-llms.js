const fs = require('fs');
const path = require('path');

/**
 * Post-build fixes for docusaurus-plugin-llms output.
 *
 * - Moves versioned doc .md files into build/docs/v4/ (leaves migration-guides/ alone).
 * - Strips MDX imports without removing example imports inside code blocks.
 * - Merges migration guide links from the second LLM plugin instance (migration-llms)
 *   into llms.txt; relocates migration .md files to build/docs/migration-guides/.
 */

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
      if (entry.name === 'v4' || entry.name === 'migration-guides') continue;
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

  const migrationDir = path.join(docsDir, 'migration-guides');
  if (fs.existsSync(migrationDir)) {
    for (const mdFile of collectAllMarkdownFiles(migrationDir)) {
      cleanMarkdownFile(mdFile);
    }
  }
}

const migrationLlmsSourceDir = path.join(buildDir, 'migration-guides');
const migrationLlmsTargetDir = path.join(docsDir, 'migration-guides');
if (fs.existsSync(migrationLlmsSourceDir)) {
  fs.mkdirSync(migrationLlmsTargetDir, { recursive: true });
  for (const entry of fs.readdirSync(migrationLlmsSourceDir)) {
    if (!entry.endsWith('.md')) continue;
    const sourcePath = path.join(migrationLlmsSourceDir, entry);
    const targetPath = path.join(migrationLlmsTargetDir, entry);
    fs.renameSync(sourcePath, targetPath);
    cleanMarkdownFile(targetPath);
  }
  if (fs.readdirSync(migrationLlmsSourceDir).length === 0) {
    fs.rmdirSync(migrationLlmsSourceDir);
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

const migrationLlmsPath = path.join(buildDir, 'llms-migration-guides.txt');
const mainLlmsPath = path.join(buildDir, 'llms.txt');
if (fs.existsSync(migrationLlmsPath) && fs.existsSync(mainLlmsPath)) {
  const migrationSection = fs
    .readFileSync(migrationLlmsPath, 'utf8')
    .split('\n')
    .filter((line) => line.startsWith('- ['))
    .join('\n')
    .replace(/\/{2,}migration-guides\//g, '/docs/migration-guides/');
  if (migrationSection) {
    const mainContent = fs.readFileSync(mainLlmsPath, 'utf8').trimEnd();
    fs.writeFileSync(
      mainLlmsPath,
      `${mainContent}\n\n## Migration Guides\n\n${migrationSection}\n`
    );
  }
  fs.unlinkSync(migrationLlmsPath);
}
