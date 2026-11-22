import { motion } from 'motion/react'

export default function CursorBlinker() {
    return (
        <motion.div
            aria-hidden="true"
            animate={{
                opacity: [0, 0, 1, 1],
            }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.5, 1],
            }}
            className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.06em] rounded-full bg-primary align-baseline"
        />
    )
}
