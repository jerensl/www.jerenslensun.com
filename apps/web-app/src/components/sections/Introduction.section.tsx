import * as React from 'react'
import clsx from 'clsx'
import { InView } from 'react-intersection-observer'
import { Grid } from '../Grid'
import { SectionHeader } from '../SectionHeader'

const focusAreas = [
    'Script bindings',
    'DOM',
    'DevTools',
    'IndexedDB',
    'CI & type checking',
]

export const IntroductionSection = (): React.ReactElement => {
    return (
        <InView triggerOnce rootMargin="-20% 0px">
            {({ inView, ref }) => (
                <Grid
                    ref={ref}
                    as="section"
                    className="gap-y-10 border-t border-outline-variant py-16 md:py-24"
                >
                    <div className="col-span-full">
                        <SectionHeader
                            eyebrow="Introduction"
                            title="Engineering the web platform"
                            description="I work where web standards meet implementation — making a browser engine easier to change, test, and ship."
                        />
                    </div>

                    <div
                        className={clsx(
                            'col-span-full grid gap-8 lg:col-span-5',
                            inView && 'animate-fade-up'
                        )}
                    >
                        <div>
                            <h2 className="text-headline-medium font-medium">
                                I&apos;m Jerens S. Lensun
                            </h2>
                            <p className="mt-2 text-title-medium text-primary">
                                Browser engine engineer
                            </p>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {focusAreas.map((focus) => (
                                <li
                                    key={focus}
                                    className="inline-flex h-8 items-center rounded-sm bg-surface-container-high px-3 text-label-large text-on-surface-variant"
                                >
                                    {focus}
                                </li>
                            ))}
                        </ul>
                        <div className="rounded-md bg-surface-container-low p-4">
                            <p className="text-label-medium uppercase tracking-[0.14em] text-on-surface-variant">
                                Currently
                            </p>
                            <p className="mt-1 text-body-large text-on-surface">
                                Contributing to Servo, the Rust browser engine.
                            </p>
                        </div>
                    </div>

                    <div
                        className={clsx(
                            'col-span-full flex flex-col gap-4 text-body-large text-on-surface-variant lg:col-span-6 lg:col-start-7',
                            inView && 'animate-fade-up'
                        )}
                        style={{ animationDelay: '100ms' }}
                    >
                        <p>
                            I work inside Servo across script bindings, DOM,
                            DevTools, IndexedDB, and developer tooling. My focus
                            is the layer where web standards meet
                            implementation: making an engine easier to change,
                            test, and ship.
                        </p>
                        <p>
                            Before Servo, I completed an LFX Mentorship at CNCF,
                            working on Meshery&apos;s Playwright end-to-end
                            suite and CI reporting, and contributed to AsyncAPI
                            across frontend and developer tooling.
                        </p>
                        <p>
                            I care about systems that stay understandable years
                            after they ship — durable design measured in years,
                            not releases.
                        </p>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
