import * as React from 'react'
import { Grid } from '../Grid'
import { SectionHeader } from '../SectionHeader'
import { CareerCard } from '../CareerCard'
import { Navigation } from '../links/Navigation'
import { Careers } from '@/constant/career'
import { siteMetadata } from '@/constant/seo'
import { InView } from 'react-intersection-observer'

export const CareerSection: React.FC = () => {
    return (
        <InView triggerOnce rootMargin="-20% 0px">
            {({ inView, ref }) => (
                <Grid ref={ref} as="section" className="gap-y-8">
                    <div className="col-span-full">
                        <SectionHeader
                            eyebrow="Experience"
                            title="Career"
                            description="Internships and roles where I learned to ship in open source — from Playwright end-to-end coverage at CNCF to linting and type-checking infrastructure in Servo."
                            action={
                                <Navigation
                                    href={siteMetadata.resume}
                                    variant="outlined"
                                    label="Download CV"
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
                            }
                        />
                    </div>

                    <div className="col-span-full grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
                        {Careers.slice(0, 4).map(
                            (
                                {
                                    organization,
                                    role,
                                    summary,
                                    startDate,
                                    endDate,
                                },
                                index
                            ) => (
                                <CareerCard
                                    key={index}
                                    inView={inView}
                                    organization={organization}
                                    position={role}
                                    summary={summary}
                                    date={`${startDate} – ${endDate}`}
                                />
                            )
                        )}
                    </div>
                </Grid>
            )}
        </InView>
    )
}
