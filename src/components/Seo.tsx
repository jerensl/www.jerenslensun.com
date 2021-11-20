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
    description: string
}

const app: App = {
    name: 'Jerens App',
    title: 'Jerens Lensun',
    description:
        "Hi I'm Jerens Lensun this web app will cover topics such as designing good software especially on web development and backend",
}

interface BlogPostSeoProps {
    title: string
    description: string
    path: string
}

export const ArticleSeo = ({ title, description, path }: BlogPostSeoProps) => {
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
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
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
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={app.title} />
            <meta name="twitter:description" content={app.description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
