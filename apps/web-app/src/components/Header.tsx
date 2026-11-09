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
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className={clsx(
                        'pt-24 md:pt-28 pb-24 md:pb-12 min-h-svh content-start',
                        inView && 'fade-in-start'
                    )}
                >
                    <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                        <Images
                            data-fade="1"
                            src="illustration-landing-page.webp"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            alt="Illustration of Jerens Lensun"
                            quality={80}
                            width={1080}
                            height={720}
                        />
                    </div>
                    <div className="col-span-full items-center grid gap-10 pt-10 lg:gap-5 lg:pt-0 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-lg m-auto">
                        <div className="flex flex-auto flex-col gap-6 items-start">
                            <div
                                className="flex flex-auto flex-col gap-3"
                                data-fade="0"
                            >
                                <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                                    Browser engine · Open source
                                </p>
                                <h1 className="font-sans font-bold text-4xl md:text-5xl">
                                    <WritingAnimation
                                        delay={1}
                                        baseText="Hi I'm Jerens"
                                    />
                                </h1>
                                <h2 className="font-sans font-bold text-2xl md:text-3xl">
                                    I build inside the browser engine.
                                </h2>
                                <p className="font-mono font-light text-base md:text-lg">
                                    Software engineer contributing to{' '}
                                    <StandardLink
                                        href="https://github.com/servo/servo"
                                        isExternal
                                        className="font-normal"
                                    >
                                        Servo
                                    </StandardLink>
                                    , the Rust browser engine. I&apos;ve shipped
                                    web-platform features in script bindings,
                                    DOM, and DevTools, and built the CI and
                                    type-checking tooling that keeps an engine
                                    safe to change.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2" data-fade="1">
                                {focusAreas.map((focus) => {
                                    return (
                                        <span
                                            key={focus}
                                            className="rounded-full border border-outline-variant px-3 py-1 font-mono text-xs text-on-surface-variant"
                                        >
                                            {focus}
                                        </span>
                                    )
                                })}
                            </div>
                            <div
                                className="flex flex-col gap-1 font-mono text-sm text-on-surface-variant"
                                data-fade="1"
                            >
                                <StandardLink
                                    href="https://github.com/servo/servo/pulls?q=is%3Apr+author%3Ajerensl+is%3Amerged"
                                    isExternal
                                    className="font-normal"
                                >
                                    {typeof servoMergedPRs === 'number'
                                        ? `${servoMergedPRs} merged PRs in servo/servo`
                                        : 'Merged PRs in servo/servo'}
                                </StandardLink>
                                <StandardLink
                                    href="/project/meshery#across-the-meshery-ecosystem"
                                    className="font-normal text-primary underline hover:no-underline"
                                >
                                    {typeof mesheryEcosystemMergedPRs ===
                                    'number'
                                        ? `${mesheryEcosystemMergedPRs} merged PRs across the Meshery/Layer5 ecosystem`
                                        : 'Merged PRs across the Meshery/Layer5 ecosystem'}
                                </StandardLink>
                            </div>
                            <p
                                className="font-mono text-xs uppercase tracking-[0.18em] text-on-surface-variant"
                                data-fade="1"
                            >
                                Outreachy alum · LFX Mentorship alum (CNCF)
                            </p>
                            <div
                                className="flex flex-row flex-wrap text-center gap-2"
                                data-fade="2"
                            >
                                <Navigation
                                    variant="filled"
                                    href="/project/servo"
                                    label="Servo case study"
                                    size="large"
                                />
                                <Navigation
                                    variant="outlined"
                                    href={siteMetadata.resume}
                                    label="Download CV"
                                    size="large"
                                    isExternal
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
