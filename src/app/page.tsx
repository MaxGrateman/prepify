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
          
          transition={{ duration: 0.5 }}
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
    <div className="mt-48 mx-5 w-[80%]">
      <h5 className="mb-12 italic text-lg text-blue-600">.courses</h5>
      <div className="mx-8">
        <p className="italic text-4xl font-semibold text-white"><span className="invisible inline-block w-10"></span>TRY TO FIND YOUR QUESTIONS</p>
        <hr className="h-0.5 bg-white w-[100%]"></hr>
      </div>
      <div className="mt-40 flex w-[100%] flex-row items-start justify-around">
        <form className="w-1/3">
          <select id="underline_select" className="block px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white appearance-none
           dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option selected>programming language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="PHP">PHP</option>
              <option value="Python">Python</option>
          </select>
        </form>
        <form className="w-1/3">
          <select id="underline_select" className="block px-0 w-full text-xl text-white bg-transparent border-0 border-b-2 border-white appearance-none
           dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option selected>skill level</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
          </select>
        </form>
        <button type="button" className="mt-48 transition ease-in-out duration-300 text-white italic bg-purple-700 hover:bg-white hover:text-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 font-semibold
            rounded-tl-2xl rounded-br-2xl text-3xl px-6 py-3 text-center mb-2 dark:bg-purple-600 dark:hover:bg-white dark:focus:ring-purple-900">
            START
          </button>
      </div>
    </div>
    <div className="mt-48 mx-5 w-[75%]">
      <h5 className="mb-12 italic text-lg text-blue-600">.soon</h5>
      <div className="mx-8">
        <p className="pb-16 italic text-4xl font-medium text-white">PREPARE FOR YOUR DREAM JOB WITH MENTOR INTERVIEWER</p>
        <p className="text-2xl tracking-wide">LOOKING TO ACE YOUR NEXT PROGRAMMING INTERVIEW? OUR MENTOR INTREVIEWER FEATURE
        IS HERE TO HELP! SIMULATE REAL-WORLD JOB INTERVIEWS TAILORED TO YOUR CHOSEN PROGRAMMING
        LANGUAGE AND SKILL LEVEL.</p>
        <button className="mt-16 mx-8 transition ease-in-out duration-300 italic text-2xl self-end font-semibold
          text-white bg-primary-black border-2 border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
            rounded-3xl px-8 me-4 mb-4 shadow-md shadow-neutral-100/50">
          I'M A MENTOR
        </button>
      </div>
      
    </div>
    <div className="h-96">

    </div>
  </>
  );
}
