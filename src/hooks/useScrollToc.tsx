import { useEffect, useState } from 'react'

interface TableOfContentsProps {
    headers: Array<{ id: string; text: string }>
}

export const useOnScrollToc = ({ headers }: TableOfContentsProps) => {
    const [active, setActive] = useState(
        headers.length > 0 ? headers[0].id : ''
    )

    useEffect(() => {
        const handleScroll = () => {
            const headingElements: Array<HTMLElement | null> = headers.map(
                ({ id }: { id: string }) => document.getElementById(id)
            )
            const visibleHeadings = headingElements.filter((el) =>
                isElementInViewport(el!)
            )
            if (visibleHeadings.length > 0) {
                setActive(visibleHeadings[0]!.id)
            }
        }

        document.addEventListener('scroll', handleScroll)
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
