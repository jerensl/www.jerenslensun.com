import clsx from 'clsx'
import { InView } from 'react-intersection-observer'
import { Grid } from './Grid'
import { Navigation } from './links/Navigation'
import WritingAnimation from './animations/WritingAnimation'
import Images from './ImageWithFallback'
import React from 'react'

interface HeaderProps {
    blurDataURL: string
}

export const Header = ({ blurDataURL }: HeaderProps): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className={clsx('pt-20', inView && 'fade-in-start')}
                >
                    <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                        <Images
                            data-fade="1"
                            src="illustration-landing-page.webp"
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            alt="A man looking to a beautiful river and mountain"
                            quality={80}
                            width={1080}
                            height={720}
                        />
                    </div>
                    <div className="col-span-full items-center grid gap-10 pt-10 lg:gap-5 lg:pt-0 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-sm m-auto">
                        <div className="flex flex-auto flex-col gap-6 items-start">
                            <div
                                className="flex flex-auto flex-col gap-3"
                                data-fade="0"
                            >
                                <h1 className="font-sans font-bold text-4xl md:text-5xl">
                                    <WritingAnimation
                                        delay={1}
                                        baseText="Hi I'm Jerens"
                                    />
                                </h1>
                                <p className="font-mono font-light text-lg md:text-xl">
                                    I work in the open source ecosystem. Focused
                                    on continuous integration & delivery. I
                                    write about systems, tooling, and cutting
                                    through the noise in software.
                                </p>
                            </div>
                            <div
                                className="flex flex-row text-center self-center  gap-2"
                                data-fade="2"
                            >
                                <Navigation
                                    variant="outlined"
                                    href="/blog"
                                    label="About me"
                                    size="large"
                                />
                                <Navigation
                                    variant="filled"
                                    href="/blog"
                                    label="Read articles"
                                    size="large"
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
