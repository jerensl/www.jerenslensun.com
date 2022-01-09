import Head from 'next/head'

interface SiteMetadata {
    url: string
    twitter: string
    linkedin: string
}

const siteMetadata: SiteMetadata = {
    url: 'https://www.jerenslensun.com/',
    twitter: 'https://twitter.com/jerensl22/',
    linkedin: 'https://www.linkedin.com/in/jerensl/',
}

interface App {
    name: string
    title: string
    image: string
    description: string
}

const app: App = {
    name: 'Jerens',
    title: 'Jerens Lensun',
    image: 'https://www.jerenslensun.com/images/banner-og.png',
    description:
        "Personal portfolio and blog presented by Jerens Lensun. I'm writing about tech specializing in software development.",
}

interface BlogPostSeoProps {
    title: string
    description: string
    path: string
    image: string
}

export const ArticleSeo = ({
    title,
    description,
    path,
    image,
}: BlogPostSeoProps) => {
    return (
        <Head>
            <title>{`${title}`}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={description} />
            <meta property="og:url" content={`${siteMetadata.url}${path}`} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={app.name} />
            <meta property="og:type" content="website" />
            <meta name="image" property="og:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    )
}

interface PageSeo {
    path: string
}

export const Seo = ({ path }: PageSeo) => {
    return (
        <Head>
            <title>{`${app.title}`}</title>
            <meta name="robots" content="follow, index" />
            <meta name="description" content={app.description} />
            <meta property="og:url" content={`${siteMetadata.url}${path}`} />
            <meta property="og:title" content={app.title} />
            <meta property="og:description" content={app.description} />
            <meta property="og:site_name" content={app.name} />
            <meta property="og:type" content="website" />
            <meta name="image" property="og:image" content={app.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={app.title} />
            <meta name="twitter:description" content={app.description} />
            <meta name="twitter:image" content={app.image} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
