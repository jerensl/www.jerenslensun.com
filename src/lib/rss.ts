import format from 'date-fns/format'
import BlogContext from '../context/blog/index'
import fs from 'fs'

export async function getRssXml() {
    const post = new BlogContext('contents/blog')
    const frontmatters = await post.getAllPublishArticle()

    const blogUrl = 'https://www.jerenslensun.com/blog'

    const itemXml = frontmatters.map(({ slug, title, description, date }) =>
        `
    <item>
      <title>${cdata(title)}</title>
      <description>${cdata(description)}</description>
      <link>${blogUrl}/${slug}</link>
      <guid>${blogUrl}/${slug}</guid>
      <pubDate>${format(new Date(date), 'yyyy-MM-dd')}</pubDate>
    </item>
    `.trim()
    )

    return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="${blogUrl}">
      <channel>
        <title>Jerens Lensun Blog</title>
        <link>${blogUrl}</link>
        <description>Personal portfolio and blog presented by Jerens Lensun. I'm writing about tech specializing in software development.</description>
        <language>en</language>
        <ttl>40</ttl>
        ${itemXml.join('\n')}
      </channel>
    </rss>
  `.trim()
}

function cdata(s: string) {
    return `<![CDATA[${s}]]>`
}

export async function generateRss() {
    const xml = await getRssXml()
    fs.writeFileSync('public/rss.xml', xml)
}
