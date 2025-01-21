'use client'

import { AnimatePresence, motion } from "motion/react";
import "./page.css";
import { LuArrowUpRight } from "react-icons/lu";

export default function Home() {
  return (
  <>
    <div className="relative h-screen text-left w-screen">
      <AnimatePresence>
        <motion.h1
          className="absolute text-7xl bottom-14 left-5 flex items-center cursor-pointer"
          initial={{ y: 10, opacity: 0}}
          animate={{ y: 0, opacity: 1}}
          exit={{ y: -10, opacity: 0 }}
          
          transition={{ duration: 0.4 }}
          whileHover="hover"
        >
          PREPARE WITH PREPIFY
          <motion.span
            variants={{
              hover: { scale: 1.2, transition: { duration: 0.3 } },
            }}
            whileTap={{ scale: 0.3 }}
          >
            <LuArrowUpRight size={92} />
          </motion.span>
        </motion.h1>
      </AnimatePresence>
    </div>
    <div className="mt-48 mx-5 w-[50%] flex flex-col">
          <h5 className="mb-12 italic text-lg text-blue-600">.about us</h5>
          <p className=" text-2xl tracking-wide">PREPIFY IS A QUICK RELIABLE WAY TO PREPARE AS MUCH AS POSSBILE
            FOR YOUR UPCOMING INTERVIEW. WE SUGGEST YOU WIDE RANGE OF TESTS
            OF ALL POSSIBLE QUESTIONS. REGISTER NOW TO TRY </p>
            <button className="transition ease-in-out duration-300 mt-5 italic text-2xl self-end font-semibold
                    text-white bg-primary-black border-2 border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                    rounded-3xl px-8 me-4 mb-4 shadow-md shadow-neutral-100/50">
            CLICK
          </button>
    </div>
    <div className="h-96">

    </div>
  </>
  );
}
