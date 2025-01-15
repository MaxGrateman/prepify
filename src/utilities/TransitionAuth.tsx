'use client'

import { motion } from "framer-motion";

export default function TransitionAuth({children}: Readonly<{children: React.ReactNode;}>) {
    const transition = {
        duration: 0.3,
        delay: 0.1,
        ease: [0, 0.71, 0.2, 1.01]
    }

    return(
        <motion.div
            transition={transition}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            {children}
        </motion.div>
    )
}