import React from 'react'

interface ContentCardProps {
    variant: 'elevated' | 'filled' | 'outlined'
}

export const ContentCard: React.FC<ContentCardProps> = () => {
    return <article className="rounded-small">card</article>
}
