import * as React from 'react'
import { Grid } from '../Grid'
import { useReducedMotion, motion } from 'motion/react'

const focusAreas = [
    'Browser engines',
    'Rust',
    'Web platform',
    'Developer tooling',
    'Playwright',
    'CI/CD',
    'CNCF',
    'W3C & WHATWG specs',
]

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
                            Browser engine internals, web-platform behavior, and
                            the tooling that keeps an engine maintainable.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={childrenVariants}
                        className="pt-6 flex flex-wrap gap-2"
                    >
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
                            I&apos;m a software engineer focused on browser
                            engines and the web platform. I contribute to Servo,
                            the Rust browser engine, across script bindings,
                            DOM, DevTools, IndexedDB, and the CI and
                            type-checking tooling that keeps the engine healthy.
                        </p>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            My route into engines started with developer
                            experience. I built inline CI annotations for Clippy
                            and test-tidy, introduced Pyrefly type checking,
                            tightened Ruff rules, and cleaned up{' '}
                            <code>mach</code>. That work gave me the context to
                            move into engine internals: implementing Web IDL
                            behavior, validating IndexedDB key paths,
                            modernizing DOM macros, and extending DevTools.
                        </p>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4">
                            Before Servo, I completed an LFX Mentorship with
                            CNCF’s Meshery project, where I worked on Playwright
                            end-to-end testing, CI test reporting, and
                            contributor documentation. I also contributed to
                            AsyncAPI across frontend and developer tooling. I
                            care about systems that stay understandable years
                            after they ship, not just on release day. Next,
                            I&apos;m going deeper into layout, paint, and
                            rendering internals.
                        </p>
                    </motion.div>
                    <motion.div variants={childrenVariants}>
                        <p className="pb-4 text-on-surface-variant">
                            Away from the keyboard, I play football and think
                            about durable design — the kind measured in years,
                            not releases.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </Grid>
    )
}
