import * as React from 'react'
import { Grid } from '../Grid'
import { SectionHeader } from '../SectionHeader'
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
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    }

    return (
        <Grid as="section" className="gap-x-12 gap-y-10 lg:gap-x-16">
            <div className="col-span-full lg:col-span-5">
                <SectionHeader
                    eyebrow="About"
                    title="About Me"
                    titleAs="h1"
                    description="Browser engine internals, web-platform behavior, and the tooling that keeps an engine maintainable."
                />

                <motion.ul
                    className="mt-6 flex flex-wrap gap-2"
                    initial="initial"
                    animate="visible"
                    variants={{
                        initial: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.06 },
                        },
                    }}
                >
                    {focusAreas.map((focus) => (
                        <motion.li
                            key={focus}
                            variants={childrenVariants}
                            className="inline-flex h-8 items-center rounded-sm bg-surface-container-high px-3 text-label-large text-on-surface-variant"
                        >
                            {focus}
                        </motion.li>
                    ))}
                </motion.ul>

                <div className="mt-8 rounded-lg bg-surface-container-low p-5">
                    <p className="text-label-medium uppercase tracking-[0.14em] text-on-surface-variant">
                        Currently
                    </p>
                    <p className="mt-1 text-title-medium text-on-surface">
                        Contributing to Servo, the Rust browser engine.
                    </p>
                    <p className="mt-2 text-body-medium text-on-surface-variant">
                        Open to conversations about browser engines, web
                        standards, and developer tooling.
                    </p>
                </div>
            </div>

            <motion.div
                className="col-span-full flex flex-col gap-4 text-body-large text-on-surface-variant lg:col-span-7"
                initial="initial"
                animate="visible"
                variants={{
                    initial: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.12 },
                    },
                }}
            >
                <motion.p variants={childrenVariants}>
                    I&apos;m a software engineer focused on browser engines and
                    the web platform. I contribute to Servo, the Rust browser
                    engine, across script bindings, DOM, DevTools, IndexedDB,
                    and the CI and type-checking tooling that keeps the engine
                    healthy.
                </motion.p>
                <motion.p variants={childrenVariants}>
                    My route into engines started with developer experience. I
                    built inline CI annotations for Clippy and test-tidy,
                    introduced Pyrefly type checking, tightened Ruff rules, and
                    cleaned up <code>mach</code>. That work gave me the context
                    to move into engine internals: implementing Web IDL
                    behavior, validating IndexedDB key paths, modernizing DOM
                    macros, and extending DevTools.
                </motion.p>
                <motion.p variants={childrenVariants}>
                    Before Servo, I completed an LFX Mentorship with CNCF’s
                    Meshery project, where I worked on Playwright end-to-end
                    testing, CI test reporting, and contributor documentation. I
                    also contributed to AsyncAPI across frontend and developer
                    tooling. I care about systems that stay understandable years
                    after they ship, not just on release day. Next, I&apos;m
                    going deeper into layout, paint, and rendering internals.
                </motion.p>
                <motion.p
                    variants={childrenVariants}
                    className="text-body-medium"
                >
                    Away from the keyboard, I play football and think about
                    durable design — the kind measured in years, not releases.
                </motion.p>
            </motion.div>
        </Grid>
    )
}
