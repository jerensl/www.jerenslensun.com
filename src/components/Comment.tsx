import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export const Comment: React.FC = (): React.ReactElement => {
    const { theme } = useTheme()

    return (
        <Giscus
            id="comments"
            repo="jerensl/www.jerenslensun.com"
            repoId="R_kgDOGSJ3GQ"
            category="Blog"
            categoryId="DIC_kwDOGSJ3Gc4CfORD"
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={theme}
            lang="en"
            loading="lazy"
        />
    )
}
