import { useReducedMotion, motion } from 'motion/react'

interface CareerCardProps {
    organization: string
    date: string
    position: string
    inView: boolean
}

export const CareerCard: React.FC<CareerCardProps> = ({
    organization,
    date,
    position,
    inView,
}): React.ReactElement => {
    const shouldReduceMotion = useReducedMotion()

    const childrenVariants = {
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <motion.div
            className="col-span-full md:col-span-4 lg:col-span-3 p-2 "
            initial="initial"
            key={organization}
            animate={inView ? 'visible' : 'hidden'}
            variants={{
                initial: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                },
            }}
        >
            <motion.div variants={childrenVariants}>
                <h2 className="text-xl font-sans font-bold mb-3">{organization}</h2>
            </motion.div>
            <motion.div variants={childrenVariants}>
                <p className="mb-1">{position}</p>
            </motion.div>
            <motion.div variants={childrenVariants}>
                <span className="font-light italic">{date}</span>
            </motion.div>
        </motion.div>
    )
}
