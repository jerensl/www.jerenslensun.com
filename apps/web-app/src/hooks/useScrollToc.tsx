import { useEffect, useState } from 'react'

interface TableOfContentsProps {
    headers: Array<{ id: string; text: string }>
}

export const useOnScrollToc = ({ headers }: TableOfContentsProps) => {
    const [active, setActive] = useState(
        headers.length > 0 ? headers[0].id : ''
    )

    useEffect(() => {
        // Navigation between articles can leave the previous article's heading
        // ids in state for a moment, so some ids may no longer exist in the DOM.
        const handleScroll = () => {
            const visibleHeadings = headers
                .map(({ id }: { id: string }) => document.getElementById(id))
                .filter((el): el is HTMLElement => el !== null)
                .filter(isElementInViewport)

            if (visibleHeadings.length > 0) {
                setActive(visibleHeadings[0].id)
            }
        }

        const firstExistingHeading = headers.find(({ id }) =>
            document.getElementById(id)
        )
        setActive(firstExistingHeading?.id ?? '')
        handleScroll()

        document.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [headers])

    const isElementInViewport = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    return {
        active,
    }
}
