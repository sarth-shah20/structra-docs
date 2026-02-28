import fs from 'node:fs/promises';
import path from 'node:path';

const siteRoot = process.cwd();
const docsRoot = path.join(siteRoot, 'docs');
const outFile = path.join(siteRoot, 'static', 'search-index.json');

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(full);
      }
      if (entry.isFile() && full.endsWith('.md')) {
        return [full];
      }
      return [];
    }),
  );
  return files.flat();
}

function parseFrontmatter(content) {
  if (!content.startsWith('---\n')) {
    return {frontmatter: {}, body: content};
  }

  const end = content.indexOf('\n---\n', 4);
  if (end === -1) {
    return {frontmatter: {}, body: content};
  }

  const raw = content.slice(4, end).split('\n');
  const frontmatter = {};
  for (const line of raw) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return {frontmatter, body: content.slice(end + 5)};
}

function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^#+\s*/gm, '')
    .replace(/[>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function docUrlFromPath(filePath, frontmatter) {
  if (frontmatter.slug) {
    return frontmatter.slug.startsWith('/') ? frontmatter.slug : `/${frontmatter.slug}`;
  }

  const rel = path.relative(docsRoot, filePath).replace(/\\/g, '/');
  const noExt = rel.replace(/\.md$/, '');
  if (noExt === 'index') {
    return '/';
  }
  if (noExt.endsWith('/index')) {
    return `/${noExt.slice(0, -6)}`;
  }
  return `/${noExt}`;
}

function titleFromContent(frontmatter, body, filePath) {
  if (frontmatter.title) return frontmatter.title;
  const h1 = body.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  return path.basename(filePath, '.md');
}

async function main() {
  const files = await walk(docsRoot);
  const index = [];

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const {frontmatter, body} = parseFrontmatter(raw);
    const title = titleFromContent(frontmatter, body, file);
    const url = docUrlFromPath(file, frontmatter);
    const text = stripMarkdown(body).slice(0, 4000);

    index.push({
      title,
      url,
      text,
    });
  }

  await fs.writeFile(outFile, JSON.stringify(index, null, 2));
  console.log(`Generated search index with ${index.length} docs -> ${path.relative(siteRoot, outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
