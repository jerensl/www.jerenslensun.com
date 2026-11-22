import clsx from 'clsx'
import { InView } from 'react-intersection-observer'
import { Grid } from './Grid'
import { Navigation } from './links/Navigation'
import { StandardLink } from './links/StandardLink'
import WritingAnimation from './animations/WritingAnimation'
import Images from './ImageWithFallback'
import { siteMetadata } from '@/constant/seo'
import React from 'react'

interface HeaderProps {
    blurDataURL: string
    servoMergedPRs?: number | null
    mesheryEcosystemMergedPRs?: number | null
}

const focusAreas = [
    'Servo',
    'Rust',
    'Web Platform Tests',
    'Script bindings',
    'DevTools',
    'CI/CD',
]

export const Header = ({
    blurDataURL,
    servoMergedPRs,
    mesheryEcosystemMergedPRs,
}: HeaderProps): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-10% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className="relative items-center gap-y-10 pb-16 pt-24 md:pb-24 md:pt-32"
                >
                    <div
                        className={clsx(
                            'col-span-full flex flex-col items-start gap-6 lg:col-span-7',
                            inView && 'animate-fade-up'
                        )}
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-tertiary-container px-3 py-1.5 text-label-large text-on-tertiary-container">
                            <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-tertiary"
                            />
                            Browser engine · Open source
                        </span>

                        <div className="flex flex-col gap-3">
                            <h1 className="text-display-small font-medium tracking-[-0.02em] md:text-display-medium lg:text-display-large">
                                <WritingAnimation
                                    delay={0.4}
                                    baseText="Hi, I'm Jerens"
                                />
                            </h1>
                            <p className="max-w-xl text-headline-small font-medium text-on-surface md:text-headline-medium">
                                I build inside the browser engine.
                            </p>
                        </div>

                        <p className="max-w-xl text-body-large text-on-surface-variant">
                            Software engineer contributing to{' '}
                            <StandardLink
                                href="https://github.com/servo/servo"
                                isExternal
                                className="font-medium"
                            >
                                Servo
                            </StandardLink>
                            , the Rust browser engine. I&apos;ve shipped
                            web-platform features in script bindings, DOM, and
                            DevTools, and built the CI and type-checking tooling
                            that keeps an engine safe to change.
                        </p>

                        <ul className="flex flex-wrap gap-2">
                            {focusAreas.map((focus) => (
                                <li
                                    key={focus}
                                    className="inline-flex h-8 items-center rounded-sm border border-outline-variant px-3 text-label-large text-on-surface-variant"
                                >
                                    {focus}
                                </li>
                            ))}
                        </ul>

                        <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
                            <StandardLink
                                href="https://github.com/search?q=org%3Aservo+is%3Apr+author%3Ajerensl+is%3Amerged&type=pullrequests"
                                isExternal
                                className="md-state-layer flex flex-col gap-1 rounded-md bg-surface-container-low p-4 no-underline transition-shadow duration-200 ease-emphasized hover:shadow-elevation-1"
                            >
                                <span className="text-headline-small font-medium text-primary">
                                    {typeof servoMergedPRs === 'number'
                                        ? servoMergedPRs
                                        : '—'}
                                </span>
                                <span className="text-label-medium text-on-surface-variant">
                                    Merged PRs across the Servo organization
                                </span>
                            </StandardLink>
                            <StandardLink
                                href="/project/meshery#across-the-meshery-ecosystem"
                                className="md-state-layer flex flex-col gap-1 rounded-md bg-surface-container-low p-4 no-underline transition-shadow duration-200 ease-emphasized hover:shadow-elevation-1"
                            >
                                <span className="text-headline-small font-medium text-primary">
                                    {typeof mesheryEcosystemMergedPRs ===
                                    'number'
                                        ? mesheryEcosystemMergedPRs
                                        : '—'}
                                </span>
                                <span className="text-label-medium text-on-surface-variant">
                                    Merged PRs across the Meshery/Layer5
                                    ecosystem
                                </span>
                            </StandardLink>
                        </div>

                        <p className="text-label-medium uppercase tracking-[0.14em] text-on-surface-variant">
                            Outreachy alum · LFX Mentorship alum (CNCF)
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <Navigation
                                variant="filled"
                                href="/project/servo"
                                label="Servo case study"
                                size="large"
                                trailingIcon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                }
                            />
                            <Navigation
                                variant="outlined"
                                href={siteMetadata.resume}
                                label="Download CV"
                                size="large"
                                isExternal
                                trailingIcon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            'relative col-span-full lg:col-span-5 lg:col-start-8',
                            inView && 'animate-scale-in'
                        )}
                        style={{ animationDelay: '120ms' }}
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-surface-container-low p-4 md:p-6">
                            <div
                                aria-hidden="true"
                                className="absolute -right-12 -top-12 size-44 rounded-full bg-primary-container/45 blur-2xl"
                            />
                            <div
                                aria-hidden="true"
                                className="absolute -bottom-12 -left-12 size-44 rounded-full bg-tertiary-container/45 blur-2xl"
                            />
                            <Images
                                src="illustration-landing-page.webp"
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                                alt="Illustration of Jerens Lensun standing on a pier"
                                quality={80}
                                width={1000}
                                height={667}
                                className="relative z-10 h-auto w-full rounded-2xl"
                            />
                        </div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
