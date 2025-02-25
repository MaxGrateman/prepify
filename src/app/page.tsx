'use client'

import { motion } from "motion/react";
import "./page.css";
import Footer from "@/widgets/components/Footer";
import React from "react";
import Link from 'next/link';

const text = "PREPARE WITH PREPIFY";

const transition = { duration: 1, ease: [.25,.1,.25,1] };
const variants = {
  hidden: { filter: "blur(10px)", transform: "translateY(15%)", opacity: 0 },
  visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
};

export default function Home() {
  const words = text.split(" ");

  return (
  <div className="scrollbar">
    {/*Видео секция на весь экран*/}
    <div className="relative h-screen text-left w-screen ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
          className="absolute text-7xl bottom-14 left-5 flex items-center cursor-pointer"
        >
          <h1>
            {words.map((word, index) => (
            <React.Fragment key={index}>
              <motion.span className="inline-block" transition={transition} variants={variants}>
                {word}
              </motion.span>
              {index < words.length - 1 && ' '}
            </React.Fragment>
          ))}
          </h1>
        </motion.div>
    </div>

    {/*Первая секция*/}
    <motion.div initial="hidden" whileInView="visible" className="mt-48 mx-5 w-[50%] flex flex-col">
        <motion.h5 transition={transition} variants={variants} className="mb-12 italic text-lg text-violet-500">.about us</motion.h5>
        <motion.p transition={transition} variants={variants} className=" text-2xl tracking-wide">PREPIFY IS A QUICK RELIABLE WAY TO PREPARE AS MUCH AS POSSBILE
          FOR YOUR UPCOMING INTERVIEW. WE SUGGEST YOU WIDE RANGE OF TESTS
          OF ALL POSSIBLE QUESTIONS. REGISTER NOW TO TRY </motion.p>
        <motion.button transition={transition} variants={variants} className="transition ease-in-out duration-300 mt-5 italic text-2xl self-end font-semibold
                  text-white bg-primary-black border-2 border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                  rounded-3xl px-8 me-4 mb-4 shadow-md shadow-neutral-100/50">
          <Link href="/about"><span>CLICK</span></Link>
        </motion.button>
    </motion.div>

    {/*Вторая секция*/}
    <motion.div initial="hidden" whileInView="visible" className="mt-48 mx-5 w-[80%]">
      <motion.h5 transition={transition} variants={variants} className="mb-12 italic text-lg text-violet-500">.courses</motion.h5>
      <motion.div transition={transition} variants={variants} className="mx-8">
        <p className="italic text-4xl font-semibold text-white"><span className="invisible inline-block w-10"></span>TRY TO FIND YOUR QUESTIONS</p>
        <hr className="h-0.5 bg-white w-[100%]"></hr>
      </motion.div>
      <motion.div transition={transition} variants={variants} className="mt-40 flex w-[100%] flex-row items-start justify-around">
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
        <button type="button" className="mt-48 transition ease-in-out duration-300 text-white italic bg-violet-500 hover:bg-white hover:text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 font-semibold
            rounded-tl-2xl rounded-br-2xl text-3xl px-6 py-3 text-center mb-2 dark:bg-violet-600 dark:hover:bg-white dark:focus:ring-violet-900">
            START
        </button>
      </motion.div>
    </motion.div>

    {/*Третья секция*/}
    <motion.div initial="hidden" whileInView="visible" className="mt-48 mx-5 w-[75%]" >
      <motion.h5 transition={transition} variants={variants} className="mb-12 italic text-lg text-violet-500">.soon</motion.h5>
      <motion.div transition={transition} variants={variants} className="mx-8">
        <p className="pb-16 italic text-3xl font-medium text-white">PREPARE FOR YOUR DREAM JOB WITH MENTOR INTERVIEWER</p>
        <p className="text-2xl tracking-wide">LOOKING TO ACE YOUR NEXT PROGRAMMING INTERVIEW? OUR MENTOR INTREVIEWER FEATURE
        IS HERE TO HELP! SIMULATE REAL-WORLD JOB INTERVIEWS TAILORED TO YOUR CHOSEN PROGRAMMING
        LANGUAGE AND SKILL LEVEL.</p>
        <button className="mt-16 mx-8 transition ease-in-out duration-300 italic text-2xl self-end font-semibold
          text-white bg-primary-black border-2 border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
            rounded-3xl px-8 me-4 mb-4 shadow-md shadow-neutral-100/50">
          I AM A MENTOR
        </button>
      </motion.div>
    </motion.div>

    {/*Футер сайста*/}
    <Footer/>
  </div>
  );
}
