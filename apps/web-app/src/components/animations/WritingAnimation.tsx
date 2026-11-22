import {
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
    animate,
} from 'motion/react'
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
    const shouldReduceMotion = useReducedMotion()
    const subs = useMotionValue(baseText.length)
    const textToWrite = useTransform(subs, (latest) =>
        baseText.slice(0, latest)
    )

    useEffect(() => {
        if (shouldReduceMotion) {
            subs.set(baseText.length)
            return
        }

        subs.set(0)
        animate(subs, baseText.length, {
            type: 'tween',
            delay: delay,
            duration: 1,
            ease: 'easeIn',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1.5,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseText, shouldReduceMotion])

    return (
        <span>
            <span className="sr-only">{baseText}</span>
            <span aria-hidden="true">
                <motion.span className="inline">{textToWrite}</motion.span>
                {shouldReduceMotion ? null : <CursorBlinker />}
            </span>
        </span>
    )
}
