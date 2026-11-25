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

/** Detect language from filename prefix (en- or id-). */
function detectLanguage(slug) {
  return slug && slug.startsWith('id-') ? 'id' : 'en';
}

/** Load published content entries from packages/content-data/contents. */
function loadContent(type) {
  const dir = path.join(__dirname, '..', '..', 'packages', 'content-data', 'contents', type);
  const entries = [];
  try {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      if (data.isPublished === false) continue;
      const slug = data.slug || file.replace(/\.(mdx|md)$/, '');
      entries.push({
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        language: data.language || detectLanguage(slug),
        translation: data.translation,
        isPublished: data.isPublished !== false,
      });
    }
  } catch (e) {
    console.error('loadContent error:', e.message);
  }
  return entries;
}

const blogEntries = loadContent('blog');
const projectEntries = loadContent('project');

const publishedBlogSlugs = new Set(blogEntries.map(e => e.slug));
const blogBySlug = new Map(blogEntries.map(e => [e.slug, e]));

// --- RSS generation (postbuild side effect) ---
function cdata(s) {
  const escaped = s.replace(/]]>/g, ']]]]><![CDATA[>')
  return `<![CDATA[${escaped}]]>`
}

function generateRss() {
  const outDir = 'out';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const locale of ['en', 'id']) {
    const filtered = blogEntries.filter(e => e.language === locale);
    const itemXml = filtered.map(({ slug, title, description, date }) =>
      `    <item>
      <title>${cdata(title)}</title>
      <description>${cdata(description)}</description>
      <link>${SITE_URL}/blog/${slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${slug}/</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
    </item>`
    );

    const selfUrl = locale === 'id'
      ? `${SITE_URL}/rss-id.xml`
      : `${SITE_URL}/rss.xml`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jerens Lensun Blog${locale === 'id' ? ' (Bahasa Indonesia)' : ''}</title>
    <link>${SITE_URL}/blog</link>
    <description>Personal portfolio and blog presented by Jerens Lensun.</description>
    <language>${locale === 'id' ? 'id-ID' : 'en-US'}</language>
    <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
    <ttl>40</ttl>
    ${itemXml.join('\n')}
  </channel>
</rss>`;

    const outFile = locale === 'id' ? `${outDir}/rss-id.xml` : `${outDir}/rss.xml`;
    fs.writeFileSync(outFile, xml.trim());
    console.log(`Generated ${outFile} (${filtered.length} entries)`);
  }
}

// Run RSS generation when this module is loaded during postbuild
try {
  generateRss();
} catch (e) {
  console.error('RSS generation failed:', e.message);
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  output: 'export',
  outDir: 'out',
  trailingSlash: true,
  autoLastmod: false,
  transform: async (config, pagePath) => {
    const loc = normalizePath(pagePath);
    if (loc === '/404/' || loc === '/500/') return null;

    const slug = loc.replace(/^\/(blog|project)\//, '').replace(/\/$/, '');
    const isBlog = loc.startsWith('/blog/');
    const isProject = loc.startsWith('/project/');

    // Exclude unpublished pages (only when slug is non-empty)
    if (slug && isBlog && !publishedBlogSlugs.has(slug)) return null;
    if (slug && isProject && !projectEntries.some(e => e.slug === slug)) return null;

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
        alternateRefs.push({ href: `${SITE_URL}${loc}`, hreflang: lang === 'id' ? 'id-ID' : 'en-US', hrefIsAbsolute: true });
        if (e.translation && publishedBlogSlugs.has(e.translation)) {
          const tEntry = blogBySlug.get(e.translation);
          const tLang = (tEntry && tEntry.language) || (lang === 'id' ? 'en' : 'id');
          const tLoc = normalizePath(`/blog/${e.translation}/`);
          alternateRefs.push({ href: `${SITE_URL}${tLoc}`, hreflang: tLang === 'id' ? 'id-ID' : 'en-US', hrefIsAbsolute: true });
        }
        alternateRefs.push({ href: `${SITE_URL}${loc}`, hreflang: 'x-default', hrefIsAbsolute: true });
      }
    }

    return { loc, lastmod, changefreq: changeFreq, priority, alternateRefs: alternateRefs.length ? alternateRefs : undefined };
  },
  additionalPaths: async () => {
    const paths = [];
    for (const e of blogEntries) {
      paths.push({ loc: normalizePath(`/blog/${e.slug}/`) });
    }
    for (const e of projectEntries) {
      paths.push({ loc: normalizePath(`/project/${e.slug}/`) });
    }
    return paths;
  },
};