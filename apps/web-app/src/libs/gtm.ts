type WindowWithDataLayer = Window & {
    dataLayer?: Record<string, unknown>[]
}

/**
 * The same GTM container can be used on both domains. The env var makes it
 * possible to swap containers per environment without changing code.
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-PKW49NT'

export const pageview = (url: string) => {
    if (typeof window === 'undefined') {
        return
    }

    const gtmWindow = window as WindowWithDataLayer
    gtmWindow.dataLayer = gtmWindow.dataLayer ?? []
    gtmWindow.dataLayer.push({
        event: 'pageview',
        page: url,
    })
}
