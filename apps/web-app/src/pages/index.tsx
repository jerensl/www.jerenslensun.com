import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '@/components/Footer'
import { HeadComponent } from '@/components/Seo'
import { generateRss } from '@/libs/rss'
import { Header } from '@/components/Header'
import { personSchema, websiteSchema } from '@/libs/seo'
import { IntroductionSection } from '@/components/sections/Introduction.section'
import { CareerSection } from '@/components/sections/Career.section'
import HorizontalScroll from '@/components/sections/OSSContribution'
import { loadImageFrom, transformToImageBuffer } from '@/utils/imagesBuffer'
import {
    getMergedMesheryEcosystemPRCount,
    getMergedServoPRCount,
} from '@/libs/github'
import React from 'react'

export const getStaticProps: GetStaticProps = async () => {
    generateRss()

    const srcImg = await loadImageFrom('illustration-landing-page.webp')
    const [servoMergedPRs, mesheryEcosystemMergedPRs] = await Promise.all([
        getMergedServoPRCount(),
        getMergedMesheryEcosystemPRCount(),
    ])

    // const { blurDataURL } = await transformToImageBuffer(srcImg)

    const getCurrentYear = new Date().getFullYear()

    return {
        props: {
            blurDataURL: '',
            currentYear: getCurrentYear,
            servoMergedPRs,
            mesheryEcosystemMergedPRs,
        },
    }
}

export default function Home({
    blurDataURL,
    currentYear,
    servoMergedPRs,
    mesheryEcosystemMergedPRs,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <HeadComponent
                path="/"
                title=""
                jsonLd={[websiteSchema(), personSchema()]}
            />
            <Header
                blurDataURL={blurDataURL}
                servoMergedPRs={servoMergedPRs}
                mesheryEcosystemMergedPRs={mesheryEcosystemMergedPRs}
            />
            <div className="h-56 lg:h-64" />
            <IntroductionSection />
            <div className="h-56 lg:h-64" />
            <CareerSection />
            <div className="h-56 lg:h-64" />
            <HorizontalScroll />
            <div className="h-56 lg:h-64" />
            <Footer currentYear={currentYear} />
        </>
    )
}
