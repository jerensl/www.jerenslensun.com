import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CareerCard } from '../cards/Contribution'
import { useScroll, useTransform, motion } from 'motion/react'
import { Contributions } from '@/constant/contributions'

const EDGE_FADE =
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLElement | null>(null)
    const frameRef = useRef<HTMLDivElement | null>(null)
    const trackRef = useRef<HTMLDivElement | null>(null)
    const [frameWidth, setFrameWidth] = useState(0)
    const [trackWidth, setTrackWidth] = useState(0)

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

    // Keep the original 35% start offset, but stop exactly when the last card
    // leaves the frame so the heading releases as soon as the cards are gone.
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [trackWidth * 0.35, -(frameWidth + trackWidth) / 2]
    )

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-dvh pt-10">
                <div className="flex h-[450px] items-center flex-col overflow-hidden">
                    <h2 className="mt-20 text-center m-auto font-bold text-3xl">
                        Open Source Contribution
                    </h2>
                    <div
                        ref={frameRef}
                        className="flex w-full justify-center overflow-hidden"
                        style={{
                            maskImage: EDGE_FADE,
                            WebkitMaskImage: EDGE_FADE,
                        }}
                    >
                        <motion.div
                            ref={trackRef}
                            style={{ x }}
                            className="flex gap-28 h-80 mt-14 w-max"
                        >
                            {Contributions?.map(
                                ({
                                    organization,
                                    project,
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
            </div>
        </section>
    )
}
