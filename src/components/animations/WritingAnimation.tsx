import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import CursorBlinker from './Cursor'

export interface IRedoAnimTextProps {
    delay: number
    baseText: string
}

export default function WritingAnimation({
    delay,
    baseText,
}: IRedoAnimTextProps) {
    const subs = useMotionValue(0)
    const textToWrite = useTransform(subs, (latest) =>
        baseText.slice(0, latest)
    )

    useEffect(() => {
        animate(subs, baseText.length, {
            type: 'tween',
            delay: delay,
            duration: 1,
            ease: 'easeIn',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <span>
            <motion.span className="inline">{textToWrite}</motion.span>
            <CursorBlinker />
        </span>
    )
}
