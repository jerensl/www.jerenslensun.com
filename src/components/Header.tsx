import clsx from 'clsx'
import Image from 'next/image'
import { InView } from 'react-intersection-observer'
import { Grid } from './Grid'
import imageLoader from '../constant/images'
import { LinkButton } from './links/LinkButton'

export const Header = ({
    blurDataURL,
}: {
    blurDataURL: string
}): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-30% 0px">
            {({ inView, ref }) => (
                <Grid
                    as="header"
                    ref={ref}
                    className={clsx('pt-20', inView && 'fade-in-start')}
                >
                    <div className="col-span-full pt-10 lg:col-start-6 lg:col-span-7 m-auto">
                        <Image
                            data-fade="1"
                            src="illustration-landing-page.png"
                            loader={imageLoader}
                            placeholder="blur"
                            blurDataURL={blurDataURL}
                            alt="A man looking to a beautiful river and mountain"
                            quality="80"
                            width="1080"
                            height="720"
                        />
                    </div>
                    <div className="col-span-full items-center grid gap-10 pt-10 lg:gap-5 lg:pt-0 lg:col-start-1 lg:row-start-1 lg:col-span-5 w-full max-w-sm m-auto">
                        <div className="flex flex-auto flex-col gap-6 items-start">
                            <div
                                className="flex flex-auto flex-col gap-3"
                                data-fade="0"
                            >
                                <h1 className="font-bold text-4xl md:text-5xl">
                                    Hi I{"'"}m Jerens
                                </h1>
                                <p className="font-light text-lg md:text-xl">
                                    I work with Typescript & Golang Ecosystem,
                                    and write about software development.
                                </p>
                            </div>
                            <div
                                className="flex flex-row text-center self-center  gap-2"
                                data-fade="2"
                            >
                                <LinkButton
                                    variant="outlined"
                                    href="/blog"
                                    label="About me"
                                    size="large"
                                />
                                <LinkButton
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
