import React from 'react'
import { useReadingProgress } from '@/hooks/useReadingProgress'

interface ReadingProgressProps {
    /** Id of the article element to measure. */
    targetId?: string
}

/**
 * Thin bar at the top of the viewport that fills as the reader moves through
 * an article. Decorative, so it is hidden from assistive technology.
 */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({
    targetId = 'mdx',
}) => {
    const { progress, isScrollable } = useReadingProgress(targetId)

    if (!isScrollable) {
        return null
    }

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px]"
        >
            <div
                className="h-full origin-left bg-primary"
                style={{ transform: `scaleX(${progress})` }}
            />
        </div>
    )
}
