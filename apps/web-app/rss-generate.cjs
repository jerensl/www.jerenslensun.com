const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://jerensl.dev';
const BLOG_URL = `${SITE_URL}/blog`;

function cdata(s) {
    const escaped = s.replace(/]]>/g, ']]]]><![CDATA[>')
    return `<![CDATA[${escaped}]]>`
}

function loadEntries(type) {
    const dir = path.join(__dirname, '..', '..', 'packages', 'content-data', 'contents', type);
    const entries = [];
    try {
        for (const file of fs.readdirSync(dir)) {
            if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
            const raw = fs.readFileSync(path.join(dir, file), 'utf8');
            const { data } = matter(raw);
            if (data.isPublished === false) continue;
            const slug = data.slug || file.replace(/\.(mdx|md)$/, '');
            const lang = data.language || (slug.startsWith('id-') ? 'id' : 'en');
            entries.push({ slug, title: data.title, description: data.description, date: data.date, language: lang, translation: data.translation });
        }
    } catch (e) {
        console.error('loadEntries error:', e.message);
    }
    return entries;
}

const blogEntries = loadEntries('blog');

async function generateRss() {
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
      <link>${BLOG_URL}/${slug}/</link>
      <guid isPermaLink="true">${BLOG_URL}/${slug}/</guid>
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
    <link>${BLOG_URL}</link>
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

generateRss().catch(err => {
    console.error('RSS generation failed:', err);
    process.exit(1);
});