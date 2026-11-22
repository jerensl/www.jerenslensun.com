import React from 'react'
import Link from 'next/link'
import Images from '../ImageWithFallback'

interface ContentCardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    title: string
    role?: string
    subtitle?: string
    tags?: string[]
    description: string
    slug: string
    imageURL: string
    blurDataURL?: string
    /** Localized reading time label, for example "6 min read". */
    readTimeLabel?: string
    className?: string
}

/**
 * M3 card used for articles and projects. The whole card is one link target;
 * the title carries the accessible name and a stretched pseudo-element makes
 * the rest of the surface clickable.
 */
export const ContentCard: React.FC<ContentCardProps> = ({
    variant,
    title,
    role,
    subtitle,
    tags,
    description,
    slug,
    imageURL,
    blurDataURL,
    readTimeLabel,
    className,
}) => {
    return (
        <article
            className={[
                className,
                'group relative flex h-full flex-col overflow-hidden rounded-md transition-shadow duration-200 ease-emphasized focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-surface',
                variant === 'outlined'
                    ? 'border border-outline-variant bg-surface hover:shadow-elevation-2'
                    : variant === 'elevated'
                      ? 'bg-surface-container-low shadow-elevation-1 hover:shadow-elevation-2'
                      : 'bg-surface-container-highest hover:shadow-elevation-1',
            ].join(' ')}
        >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                <Images
                    src={imageURL}
                    alt={title}
                    blurDataURL={blurDataURL ?? ''}
                    placeholder={blurDataURL ? 'blur' : 'empty'}
                    width={640}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 ease-emphasized group-hover:scale-[1.03]"
                />
                {subtitle ? (
                    <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-label-small text-on-surface shadow-elevation-1 backdrop-blur-sm">
                        {subtitle}
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                {tags && tags.length > 0 ? (
                    <ul className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 4).map((tag) => (
                            <li key={tag}>
                                <span className="inline-flex rounded-sm bg-surface-container-high px-2 py-0.5 text-label-small text-on-surface-variant">
                                    {tag}
                                </span>
                            </li>
                        ))}
                        {tags.length > 4 ? (
                            <li>
                                <span className="inline-flex rounded-sm bg-surface-container-high px-2 py-0.5 text-label-small text-on-surface-variant">
                                    +{tags.length - 4}
                                </span>
                            </li>
                        ) : null}
                    </ul>
                ) : null}

                <h3 className="text-title-large font-medium leading-snug text-on-surface">
                    <Link
                        href={slug}
                        className="rounded-xs after:absolute after:inset-0 after:content-[''] focus:outline-none"
                    >
                        {title}
                    </Link>
                </h3>

                {role ? (
                    <p className="text-body-medium text-on-surface-variant">
                        <span className="font-medium text-on-surface">
                            Role:
                        </span>{' '}
                        {role}
                    </p>
                ) : null}

                <p className="line-clamp-3 text-body-medium text-on-surface-variant">
                    {description}
                </p>

                {readTimeLabel ? (
                    <p className="mt-auto flex items-center gap-1.5 pt-3 text-label-medium text-on-surface-variant">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-4 shrink-0"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <span>{readTimeLabel}</span>
                    </p>
                ) : null}
            </div>
        </article>
    )
}
