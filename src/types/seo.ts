export interface SiteMetadata {
    url: string
    twitter: string
    linkedin: string
}

export interface App {
    name: string
    title: string
    image: string
    description: string
}

export interface BlogPostSeoProps {
    title: string
    description: string
    path: string
    image: string
}
