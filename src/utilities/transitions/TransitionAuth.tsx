'use client'

import { AnimatePresence, motion } from "framer-motion";

{/*Утилита перехода-анимации между формами регистрации-логина-смены пароля-напоминание пароля*/}
export default function TransitionAuth({children}: Readonly<{children: React.ReactNode;}>) {
    
    const transition = {
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
    }

    return(
        <AnimatePresence>
            <motion.div
                transition={transition}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{opacity: 0, scale: 0}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}