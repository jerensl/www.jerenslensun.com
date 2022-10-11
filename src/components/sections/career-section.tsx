import * as React from 'react'
import { Grid } from '../grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { CareerCard } from '../career-card'
import { InView } from 'react-intersection-observer'
import { useReducedMotion, motion } from 'framer-motion'

export const CareerSection = (): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

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
                        <h1 className="text-5xl font-bold text-center md:text-left">
                            Career
                        </h1>
                    </motion.div>
                    <motion.div
                        className="col-span-full lg:col-span-3"
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
                            href="https://drive.google.com/file/d/17cKewjUgjQomJ32VMxaWo1oigN-v1eqe/view?usp=sharing"
                            target="_blank"
                            className="inline-flex font-semibold items-center gap-3 text-2xl py-2 px-4 rounded-lg border-b-2 transition duration-150 ease-in-out hover:bg-gray-50 border-gray-100 hover:border-gray-300"
                            rel="noopener noreferrer"
                        >
                            <span>Get My CV</span>
                            <FontAwesomeIcon className="block" icon={faFile} />
                        </a>
                    </motion.div>
                    <CareerCard
                        inView={inView}
                        organization="SoftwareSeni"
                        role="ReactJS Developer Intern"
                        date="August 2022 – Now"
                    />
                    <CareerCard
                        inView={inView}
                        organization="Bangkit Academy 2022"
                        role="Facilitator"
                        date="February 2022 – July 2022"
                    />
                    <CareerCard
                        inView={inView}
                        organization="Baparekraf Digital Talent"
                        role="Facilitator"
                        date="October 2020 – November 2020"
                    />
                </Grid>
            )}
        </InView>
    )
}
