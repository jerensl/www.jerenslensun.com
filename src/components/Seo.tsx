import { app, siteMetadata } from '@/constant/seo'
import Head from 'next/head'
import React from 'react'

interface IArticleSeo {
    title: string
    description: string
    path: string
    image: string
}

export const ArticleSeo: React.FC<IArticleSeo> = ({
    title,
    description,
    path,
    image,
}) => {
    const currTitle = title ? `${title} | ${app.title}` : app.title

    return (
        <>
            <Head>
                <title>{`${currTitle}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={description} />

                {/* Open Graph Data */}
                <meta property="og:title" content={currTitle} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:description" content={description} />
                <meta property="og:site_name" content={app.name} />
                <meta property="og:type" content="website" />
                <meta name="image" property="og:image" content={image} />

                {/* Twitter Graph Data */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteMetadata.twitter} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
            </Head>
        </>
    )
}

interface IHeadComponent {
    title: string
    path: string
}

export const HeadComponent: React.FC<IHeadComponent> = ({ title, path }) => {
    const currTitle = title ? `${title} | ${app.title}` : app.title

    return (
        <>
            <Head>
                <title>{`${currTitle}`}</title>
                <meta name="robots" content="follow, index" />
                <meta name="description" content={app.description} />

                {/* Open Graph Data */}
                <meta property="og:title" content={currTitle} />
                <meta
                    property="og:url"
                    content={`${siteMetadata.url}${path}`}
                />
                <meta property="og:description" content={app.description} />
                <meta property="og:site_name" content={app.name} />
                <meta property="og:type" content="website" />
                <meta name="image" property="og:image" content={app.image} />

                {/* Twitter Graph Data */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteMetadata.twitter} />
                <meta name="twitter:title" content={app.title} />
                <meta name="twitter:description" content={app.description} />
                <meta name="twitter:image" content={app.image} />
                <link rel="icon" href="/favicon.ico" />

                {path === '/about' && (
                    <link
                        rel="canonical"
                        href="https://www.jerenslensun.com/"
                    />
                )}
            </Head>
        </>
    )
}
