import { act, renderHook } from '@testing-library/react'
import { useOnScrollToc } from '../../src/hooks/useScrollToc'

describe('useOnScrollToc', () => {
    it('ignores heading ids that are no longer in the DOM', () => {
        const { result } = renderHook(() =>
            useOnScrollToc({
                headers: [{ id: 'missing-heading', text: 'Missing heading' }],
            })
        )

        expect(() => {
            act(() => {
                document.dispatchEvent(new Event('scroll'))
            })
        }).not.toThrow()

        expect(result.current.active).toBe('')
    })

    it('does not throw when an article is replaced and its heading disappears', () => {
        const heading = document.createElement('h2')
        heading.id = 'present-heading'
        document.body.appendChild(heading)

        renderHook(() =>
            useOnScrollToc({
                headers: [{ id: 'present-heading', text: 'Present heading' }],
            })
        )

        heading.remove()

        expect(() => {
            act(() => {
                document.dispatchEvent(new Event('scroll'))
            })
        }).not.toThrow()
    })
})
