"use client";

import { AnimatePresence, motion } from "motion/react";

const PasswordSuccess = () => {

    const variants = {
        enter: (direction: number) => {
          return {
            y: direction > 0 ? -200 : 200,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          y: 0,
          opacity: 1
        },
        exit: (direction: number) => {
          return {
            zIndex: 0,
            y: direction < 0 ? 100 : -100,
            opacity: 0
          };
        }
      };

    return(
        <div className="flex justify-center items-center h-[90%]">
            <AnimatePresence>
                <motion.div variants={variants} 
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }} 
                    className="bg-transparent w-[70%] backdrop-blur-xl border-t border border-violet-500 rounded text-white px-4 py-3 shadow-md" role="alert">
                    <div className="flex pt-2">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-violet-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                        <p className="font-bold tracking-wider">ALMOST THERE!</p>
                        <p className="text-sm tracking-wider">Please, check your e-mail to verify recovery</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default PasswordSuccess;