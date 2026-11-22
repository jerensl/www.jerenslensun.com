import { useReducedMotion, motion } from 'motion/react'
import React from 'react'

interface CareerCardProps {
    organization: string
    date: string
    position: string
    summary?: string
    inView: boolean
}

/**
 * Timeline entry for the career section. The left rule and dot make the
 * sequence legible without relying on extra chrome.
 */
export const CareerCard: React.FC<CareerCardProps> = ({
    organization,
    date,
    position,
    summary,
    inView,
}): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    }

    return (
        <motion.article
            className="relative col-span-full border-l-2 border-outline-variant pb-8 pl-5 last:pb-0 md:col-span-4 lg:col-span-3"
            initial="initial"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
                initial: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-surface bg-primary"
            />
            <motion.p
                variants={childrenVariants}
                className="text-label-medium uppercase tracking-[0.12em] text-on-surface-variant"
            >
                {date}
            </motion.p>
            <motion.h3
                variants={childrenVariants}
                className="mt-1 text-title-large font-medium text-on-surface"
            >
                {organization}
            </motion.h3>
            <motion.p
                variants={childrenVariants}
                className="mt-1 text-title-small text-primary"
            >
                {position}
            </motion.p>
            {summary ? (
                <motion.p
                    variants={childrenVariants}
                    className="mt-2 text-body-medium text-on-surface-variant"
                >
                    {summary}
                </motion.p>
            ) : null}
        </motion.article>
    )
}
