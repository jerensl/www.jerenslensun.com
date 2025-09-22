import * as React from 'react'
import clsx from 'clsx'
import { InView } from 'react-intersection-observer'
import { Grid } from '../Grid'
import { useReducedMotion, motion } from 'motion/react'

export const IntroductionSection = (): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <InView triggerOnce rootMargin="-40% 0px">
            {({ inView, ref }) => (
                <Grid ref={ref} className={clsx('pt-20 gap-10 bg-background')}>
                    <div className="col-span-full lg:col-span-6">
                        <motion.div
                            className="flex flex-auto flex-col"
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
                            <motion.div variants={childrenVariants}>
                                <h2 className="font-sans text-5xl lg:text-6xl font-bold text-center md:text-left text-gray-800 dark:text-gray-200">
                                    Hi Folks...
                                </h2>
                            </motion.div>
                            <motion.div variants={childrenVariants}>
                                <h2 className="font-sans text-4xl lg:text-5xl mt-3 font-bold text-center md:text-left text-gray-900 dark:text-gray-200">
                                    Let me introduce myself
                                </h2>
                            </motion.div>
                        </motion.div>
                    </div>
                    <div className="col-span-full lg:col-span-6 lg:col-start-7">
                        <motion.div
                            className="flex flex-auto flex-col"
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
                            <motion.div variants={childrenVariants}>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center md:text-left">
                                    I&apos;m Jerens S. Lensun
                                </h2>
                            </motion.div>
                            <motion.div variants={childrenVariants}>
                                <p className="text-base mt-5">
                                    I focus on system specifications, continuous
                                    integration and delivery, and building
                                    tooling that makes development workflows
                                    more predictable and efficient. I care about
                                    great design not for how it looks, but for
                                    how it functions and how long it lasts.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
