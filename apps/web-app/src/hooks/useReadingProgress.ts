import { useEffect, useState } from 'react'

interface ReadingProgressInput {
    /** Current vertical scroll offset, in pixels. */
    scrollY: number
    /** Absolute top of the article, in pixels. */
    articleTop: number
    /** Total height of the article, in pixels. */
    articleHeight: number
    /** Visible viewport height, in pixels. */
    viewportHeight: number
}

/**
 * Returns how much of the article has been read (0 to 1). An article shorter
 * than the viewport counts as read once its top scrolls past the top edge.
 */
export function computeReadingProgress({
    scrollY,
    articleTop,
    articleHeight,
    viewportHeight,
}: ReadingProgressInput): number {
    const scrollable = articleHeight - viewportHeight

    if (scrollable <= 0) {
        return scrollY > articleTop ? 1 : 0
    }

    const progress = (scrollY - articleTop) / scrollable

    return Math.min(1, Math.max(0, progress))
}

/**
 * Tracks scroll progress through an element. Updates are throttled with
 * `requestAnimationFrame` so scrolling stays smooth, and listeners are
 * passive because the hook never calls `preventDefault`.
 */
export function useReadingProgress(targetId: string) {
    const [progress, setProgress] = useState(0)
    const [isScrollable, setIsScrollable] = useState(false)

    useEffect(() => {
        const target = document.getElementById(targetId)

        if (!target) {
            setProgress(0)
            setIsScrollable(false)
            return
        }

        let frame: number | null = null

        const update = () => {
            frame = null

            const rect = target.getBoundingClientRect()
            const articleTop = rect.top + window.scrollY
            const articleHeight = target.offsetHeight
            const viewportHeight = window.innerHeight

            setProgress(
                computeReadingProgress({
                    scrollY: window.scrollY,
                    articleTop,
                    articleHeight,
                    viewportHeight,
                })
            )
            setIsScrollable(articleHeight > viewportHeight)
        }

        const scheduleUpdate = () => {
            if (frame !== null) return
            frame = window.requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', scheduleUpdate, { passive: true })
        window.addEventListener('resize', scheduleUpdate)

        return () => {
            if (frame !== null) {
                window.cancelAnimationFrame(frame)
            }
            window.removeEventListener('scroll', scheduleUpdate)
            window.removeEventListener('resize', scheduleUpdate)
        }
    }, [targetId])

    return { progress, isScrollable }
}
