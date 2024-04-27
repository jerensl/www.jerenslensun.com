import * as React from 'react'
import { Grid } from '../Grid'
import { useReducedMotion, motion } from 'framer-motion'

export const AboutSection = (): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <Grid className="gap-x-16 gap-y-4 lg:gap-x-16">
            <div className="lg:max-w-4xl col-span-full md:col-span-4 lg:col-span-5">
                <motion.div
                    className="flex flex-auto flex-col"
                    initial="initial"
                    animate="visible"
                    variants={{
                        initial: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    <motion.div variants={childrenVariants}>
                        <h1 className="font-semibold text-2xl text-red-700 dark:text-red-400 lg:text-xl">
                            About Me
                        </h1>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pt-2 lg:text-2xl text-base font-bold">
                            Building with technical excellence and passion for
                            solving the right problem.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
            <div className="w-full col-span-full md:col-span-4 lg:col-span-7">
                <motion.div
                    className="flex flex-auto flex-col"
                    initial="initial"
                    animate="visible"
                    variants={{
                        initial: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            As someone who loves both football and software
                            engineering, I find that tackling complex problems
                            is akin to scoring a goal. In football, the ultimate
                            outcome matters most to fans, regardless of whether
                            you played well or poorly during the match.
                            Similarly, in the software world, making informed
                            decisions to optimize outcomes is crucial. However,
                            we must also temper our expectations, recognizing
                            that unfavorable results can still occur. Just as
                            football teams continuously improve with each
                            iteration, software engineers must strive for
                            excellence while managing risks to prevent
                            catastrophic failures. It’s like playing an
                            attacking game in football while maintaining a
                            balanced defensive transition.
                        </p>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            When it comes to learning technology, novelty is
                            cool, but there’s something truly awesome about
                            mastering technologies that withstand the test of
                            time. These enduring technologies, widely used and
                            not deprecated, hold immense value. They form the
                            bedrock of our digital landscape, providing
                            stability and reliability.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </Grid>
    )
}
