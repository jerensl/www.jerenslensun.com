import * as React from 'react'
import { Grid } from '../Grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { CareerCard } from '../CareerCard'
import { Careers } from '@/constant/career'
import { siteMetadata } from '@/constant/seo'
import { InView } from 'react-intersection-observer'
import { motion } from 'motion/react'

export const CareerSection: React.FC = () => {
    return (
        <InView triggerOnce rootMargin="-40% 0px">
            {({ inView, ref }) => (
                <Grid ref={ref} className="gap-5 lg:gap-8">
                    <motion.div
                        className="col-span-full lg:col-span-9"
                        initial="initial"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={{
                            initial: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 },
                            },
                        }}
                    >
                        <h1 className="font-sans text-5xl font-bold text-center md:text-left">
                            Career
                        </h1>
                    </motion.div>
                    <motion.div
                        className="col-span-full lg:col-span-3 flex"
                        initial="initial"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={{
                            initial: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 },
                            },
                        }}
                    >
                        <a
                            href={siteMetadata.resume}
                            target="_blank"
                            className="inline-flex m-auto font-sans font-semibold gap-3 text-xl py-2 px-4 rounded-lg border-b-2 transition duration-150 ease-in-out hover:bg-gray-50 border-gray-100 hover:border-gray-300 dark:hover:bg-neutral-800 dark:border-neutral-900 dark:hover:border-neutral-700"
                            rel="noopener noreferrer"
                        >
                            <span>Get My CV</span>
                            <FontAwesomeIcon className="block" icon={faFile} />
                        </a>
                    </motion.div>
                    {Careers.slice(0, 4).map(
                        (
                            { organization, role, summary, startDate, endDate },
                            index
                        ) => {
                            return (
                                <CareerCard
                                    key={index}
                                    inView={inView}
                                    organization={organization}
                                    position={role}
                                    summary={summary}
                                    date={`${startDate} – ${endDate}`}
                                />
                            )
                        }
                    )}
                </Grid>
            )}
        </InView>
    )
}
