import * as React from 'react'
import clsx from 'clsx'
import { InView } from 'react-intersection-observer'
import { Grid } from '../Grid'
import { useReducedMotion, motion } from 'framer-motion'

export const IntroductionSection = (): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <InView triggerOnce rootMargin="-40% 0px">
            {({ inView, ref }) => (
                <Grid ref={ref} className={clsx('pt-20 gap-10')}>
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
                                <h2 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200">
                                    Hi Folks...
                                </h2>
                            </motion.div>
                            <motion.div variants={childrenVariants}>
                                <h2 className="text-4xl lg:text-5xl mt-3 font-bold text-gray-900 dark:text-gray-200">
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
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{`I'm Jerens S. Lensun`}</h2>
                            </motion.div>
                            <motion.div variants={childrenVariants}>
                                <p className="text-base mt-5">
                                    My area of focus lies in building products
                                    as well as web development and backend
                                    development. I enjoy designing and building
                                    a highly scalable system that can help a lot
                                    of users to solve their own problems.
                                </p>
                            </motion.div>
                            <motion.div variants={childrenVariants}>
                                <p className="text-base mt-5">
                                    I am currently studied Electrical
                                    Engineering at the University of Sam
                                    Ratulangi based on Manado, minoring in
                                    control system, during my college I involve
                                    in leading a project, being an assistant
                                    practicum as well as coordinator assistant
                                    too, etc. But outside that, I consider
                                    myself a builder so {`I'm`} building my side
                                    project for fun, and one of them is this
                                    blog.
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </Grid>
            )}
        </InView>
    )
}
