import { useEffect } from 'react'
import Script from 'next/script'
import { pageview } from '@/libs/gtm'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (window.location.hostname === 'www.jerenslensun.com') {
            pageview(pathname + searchParams)
        }
    }, [pathname, searchParams])

    return (
        <>
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PKW49NT"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
            ></noscript>
            <Script
                id="gtm-script"
                strategy="worker"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', "GTM-PKW49NT");
                `,
                }}
            />
        </>
    )
}
