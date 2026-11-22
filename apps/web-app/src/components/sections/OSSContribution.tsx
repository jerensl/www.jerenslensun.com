import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CareerCard } from '../cards/Contribution'
import { useScroll, useTransform, motion, useReducedMotion } from 'motion/react'
import { Contributions } from '@/constant/contributions'

const EDGE_FADE =
    'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLElement | null>(null)
    const frameRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)
    const [frameWidth, setFrameWidth] = useState(0)
    const [trackWidth, setTrackWidth] = useState(0)
    const shouldReduceMotion = useReducedMotion()

    useIsomorphicLayoutEffect(() => {
        const measure = () => {
            if (frameRef.current) {
                setFrameWidth(frameRef.current.clientWidth)
            }
            if (trackRef.current) {
                setTrackWidth(trackRef.current.scrollWidth)
            }
        }

        measure()
        window.addEventListener('resize', measure)
        return () => window.removeEventListener('resize', measure)
    }, [])

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [trackWidth * 0.35, -(frameWidth + trackWidth) / 2]
    )

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
                <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
                    <p className="text-label-large uppercase tracking-[0.14em] text-primary">
                        Open source
                    </p>
                    <h2 className="mt-2 max-w-2xl text-display-small font-medium md:text-display-medium">
                        Contributions across the ecosystem
                    </h2>
                    <p className="mt-3 max-w-2xl text-body-large text-on-surface-variant">
                        Merged pull requests in Servo, Meshery, and the tools
                        around them — from web-platform fixes to CI reporting.
                    </p>
                </div>

                <div
                    ref={frameRef}
                    className="mt-10 flex w-full justify-center overflow-hidden"
                    style={{
                        maskImage: EDGE_FADE,
                        WebkitMaskImage: EDGE_FADE,
                    }}
                >
                    <motion.div
                        ref={trackRef}
                        style={{ x: shouldReduceMotion ? 0 : x }}
                        className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8"
                    >
                        {Contributions?.map(
                            ({
                                organization,
                                project,
                                focus,
                                issue_name,
                                issue_number,
                                issue_url,
                                pr_name,
                                pr_number,
                                pr_url,
                                status,
                                date,
                            }) => {
                                return (
                                    <CareerCard
                                        key={pr_name}
                                        organization={organization}
                                        project={project}
                                        focus={focus}
                                        issue_name={issue_name}
                                        issue_number={issue_number}
                                        issue_url={issue_url}
                                        pr_name={pr_name}
                                        pr_number={pr_number}
                                        pr_url={pr_url}
                                        status={status}
                                        date={date}
                                    />
                                )
                            }
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
