const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://jerensl.dev';

/** Normalize a path to a canonical leading/trailing-slash form. */
function normalizePath(p) {
  if (!p) return '/';
  let out = p.replace(/\/+/g, '/');
  if (!out.startsWith('/')) out = '/' + out;
  if (!out.endsWith('/') && !out.endsWith('.html')) out += '/';
  out = out.replace(/\.html$/, '/');
  return out;
}

/** Load published content entries from packages/content-data/contents. */
function loadContent(type) {
  const dir = path.join(__dirname, '..', 'packages', 'content-data', 'contents', type);
  const entries = [];
  try {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      if (data.isPublished === false) continue;
      entries.push({ slug: data.slug || file.replace(/\.(mdx|md)$/, ''), date: data.date, language: data.language, translation: data.translation });
    }
  } catch (e) { /* directory may not exist at build time */ }
  return entries;
}

const blogEntries = loadContent('blog');
const projectEntries = loadContent('project');

const publishedBlogSlugs = new Set(blogEntries.map(e => e.slug));
const blogBySlug = new Map(blogEntries.map(e => [e.slug, e]));

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  output: 'export',
  outDir: 'out',
  trailingSlash: true,
  autoLastmod: false,
  transform: async (config, path) => {
    const loc = normalizePath(path);
    if (loc === '/404/' || loc === '/500/') return null;
    const slug = loc.replace(/^\/(blog|project)\//, '').replace(/\/$/, '');
    const isBlog = loc.startsWith('/blog/');
    const isProject = loc.startsWith('/project/');
    let lastmod;
    if (isBlog) {
      const e = blogBySlug.get(slug);
      if (e && e.date) lastmod = new Date(e.date).toISOString();
    } else if (isProject) {
      const e = projectEntries.find(p => p.slug === slug);
      if (e && e.date) lastmod = new Date(e.date).toISOString();
    }
    if (!lastmod) lastmod = new Date().toISOString();

    const slashless = loc.replace(/\/$/, '') || '/';
    let priority = 0.7;
    if (slashless === '/') priority = 1.0;
    else if (slashless === '/about') priority = 0.8;
    else if (slashless.startsWith('/blog')) priority = 0.9;
    else if (slashless.startsWith('/project')) priority = 0.9;

    const changeFreq = slashless === '/' ? 'daily' : 'weekly';

    const alternateRefs = [];
    if (isBlog) {
      const e = blogBySlug.get(slug);
      if (e) {
        const lang = e.language || 'en';
        alternateRefs.push({ href: `${SITE_URL}${loc}`, hreflang: lang === 'id' ? 'id-ID' : 'en-US' });
        if (e.translation && publishedBlogSlugs.has(e.translation)) {
          const tEntry = blogBySlug.get(e.translation);
          const tLang = (tEntry && tEntry.language) || (lang === 'id' ? 'en' : 'id');
          const tLoc = normalizePath(`/blog/${e.translation}/`);
          alternateRefs.push({ href: `${SITE_URL}${tLoc}`, hreflang: tLang === 'id' ? 'id-ID' : 'en-US' });
        }
        alternateRefs.push({ href: `${SITE_URL}${loc}`, hreflang: 'x-default' });
      }
    }

    return { loc, lastmod, changefreq: changeFreq, priority, alternateRefs: alternateRefs.length ? alternateRefs : undefined };
  },
  additionalPaths: async () => {
    const paths = [];
    for (const e of blogEntries) {
      if (e.isPublished === false) continue;
      paths.push(normalizePath(`/blog/${e.slug}/`));
    }
    for (const e of projectEntries) {
      if (e.isPublished === false) continue;
      paths.push(normalizePath(`/project/${e.slug}/`));
    }
    return paths;
  },
};