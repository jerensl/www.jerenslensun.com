import { useReducedMotion, motion } from 'framer-motion'

export const CareerCard = ({
    organization,
    date,
    role,
    inView,
}: any): React.ReactElement => {
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
                <h2 className="text-xl font-bold">{organization}</h2>
            </motion.div>
            <motion.div variants={childrenVariants}>
                <p>{role}</p>
            </motion.div>
            <motion.div variants={childrenVariants}>
                <span className="font-light pt-2">{date}</span>
            </motion.div>
        </motion.div>
    )
}
