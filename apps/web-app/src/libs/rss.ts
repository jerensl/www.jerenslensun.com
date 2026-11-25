import fs from 'fs'
import { getContents } from './content'

function cdata(s: string) {
    // Escape any ']]>' sequences that would break CDATA
    const escaped = s.replace(/]]>/g, ']]]]><![CDATA[>')
    return `<![CDATA[${escaped}]]>`
}

export async function getRssXml(locale: 'en' | 'id' = 'en') {
    const frontmatters = await getContents('blog')

    const filtered = frontmatters.filter(
        (fm: any) => (fm.language || 'en') === locale
    )

    const blogUrl = 'https://jerensl.dev/blog'

    const itemXml = filtered.map(
        ({ slug, title, description, date }: any) =>
            `
    <item>
      <title>${cdata(title)}</title>
      <description>${cdata(description)}</description>
      <link>${blogUrl}/${slug}/</link>
      <guid isPermaLink="true">${blogUrl}/${slug}/</guid>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
    </item>
    `.trim()
    )

    const selfUrl = locale === 'id'
        ? 'https://jerensl.dev/rss-id.xml'
        : 'https://jerensl.dev/rss.xml'

    return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Jerens Lensun Blog${locale === 'id' ? ' (Bahasa Indonesia)' : ''}</title>
        <link>${blogUrl}</link>
        <description>Personal portfolio and blog presented by Jerens Lensun. I'm writing about tech specializing in software development.</description>
        <language>${locale === 'id' ? 'id-ID' : 'en-US'}</language>
        <atom:link href="${selfUrl}" rel="self" type="application/rss+xml" />
        <ttl>40</ttl>
        ${itemXml.join('\n')}
      </channel>
    </rss>
  `.trim()
}

export async function generateRss() {
    const outDir = 'out'
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true })
    }

    const enXml = await getRssXml('en')
    const idXml = await getRssXml('id')

    fs.writeFileSync(`${outDir}/rss.xml`, enXml)
    fs.writeFileSync(`${outDir}/rss-id.xml`, idXml)
}

// Allow postbuild execution via ts-node
if (import.meta.url === `file://${process.argv[1]}`) {
    generateRss()
        .then(() => console.log('RSS feeds generated'))
        .catch((err) => {
            console.error('RSS generation failed:', err)
            process.exit(1)
        })
}