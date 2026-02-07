import { motion } from 'motion/react'

export default function CursorBlinker() {
    return (
        <motion.div
            animate={{
                opacity: [0, 0, 1, 1],
            }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.5, 0.5, 1],
            }}
            className="inline-block h-12 w-1 translate-y-1 bg-slate-900 dark:bg-slate-100"
        />
    )
}
