'use client'

import { motion } from "motion/react";
import React from "react";


function AboutUs() {

    const words = "WHAT DO WE KNOW ABOUT US?";
    const paragraphFirst = `PREPARING FOR AN INTERVIEW CAN BE STRESSFUL. SO THATS EXACTLY WHY WE CREATED PREPIFY TO MAKE THE PROCESS EASIER, MORE STRUCTURED, AND WAY LESS NERVE-WRACKING.`;
    const paragraphSecond = `WITH PREPIFY, YOU'LL HAVE ACCESS TO A WIDE RANGE OF PRACTICE TESTS, SUITABLE FOR EVERY EXPERIENCE LEVEL – FROM BEGINNERS TO SEASONED PROFESSIONALS. WE ALSO PROVIDE SPECIALIZED COURSES DESIGNED TO HELP YOU MASTER SPECIFIC SKILLS AND TOPICS TAILORED TO YOUR INDUSTRY OR ROLE.`;
    const paragraphThird = `BUT THAT'S NOT ALL – WE'RE EXCITED TO ANNOUNCE THAT WE'LL SOON BE INTRODUCING AN INTENSIVE INTERVIEW SIMULATION PROGRAM. THIS INCLUDES ONE-ON-ONE SESSIONS WITH EXPERIENCED MENTORS WHO WILL GUIDE YOU THROUGH A REALISTIC INTERVIEW ENVIRONMENT. EXPECT INSIGHTFUL FEEDBACK, HANDS-ON PRACTICE, AND A CHANCE TO BUILD YOUR CONFIDENCE LIKE NEVER BEFORE.`;
    const paragraphFourth = `OUR MISSION IS SIMPLE: TO HELP YOU SUCCEED, ONE STEP AT A TIME. SO, LET'S PREPARE, PRACTICE, AND PERFECT TOGETHER WITH PREPIFY!`;

    const labelText = words.split(" ");
    const paragraphFirstSplit = paragraphFirst.split(" ");
    const paragraphSecondSplit = paragraphSecond.split(" ");
    const paragrapThirdSplit = paragraphThird.split(" ");
    const paragrapFourthSplit = paragraphFourth.split(" ");

    const transition = { duration: 0.7, ease: [.25,.1,.25,1] };
    const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(50%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    };

    return(
        <motion.div className="flex flex-col items-start mt-40 mx-10 w-[70%]"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.04 }}>
            <h1 className="italic text-3xl">
            <span className="text-5xl text-blue-600">.</span>
            {labelText.map((word, index) => (
                <React.Fragment key={index}>
                <motion.span className="inline-block" transition={transition} variants={variants}>
                    {word}
                </motion.span>
                {index < labelText.length - 1 && ' '} {/* Correctly checks the length of `labelText` */}
                </React.Fragment>
            ))}
            </h1>

            <motion.h3 className="text-xl mt-4 mx-4">
            {paragraphFirstSplit.map((word, index) => (
                <React.Fragment key={index}>
                <motion.span className="inline-block" transition={transition} variants={variants}>
                    {word}
                </motion.span>
                {index < paragraphFirstSplit.length - 1 && ' '} {/* Uses the correct array */}
                </React.Fragment>
            ))}
            <div className="h-4"></div>
            {paragraphSecondSplit.map((word, index) => (
                <React.Fragment key={index}>
                <motion.span className="inline-block" transition={transition} variants={variants}>
                    {word}
                </motion.span>
                {index < paragraphSecondSplit.length - 1 && ' '} {/* Uses the correct array */}
                </React.Fragment>
            ))}
            <div className="h-4"></div>
            {paragrapThirdSplit.map((word, index) => (
                <React.Fragment key={index}>
                <motion.span className="inline-block" transition={transition} variants={variants}>
                    {word}
                </motion.span>
                {index < paragrapThirdSplit.length - 1 && ' '} {/* Uses the correct array */}
                </React.Fragment>
            ))}
            <div className="h-4"></div>
            {paragrapFourthSplit.map((word, index) => (
                <React.Fragment key={index}>
                <motion.span className="inline-block" transition={transition} variants={variants}>
                    {word}
                </motion.span>
                {index < paragrapFourthSplit.length - 1 && ' '} {/* Uses the correct array */}
                </React.Fragment>
            ))}
            </motion.h3>
        </motion.div>
    )
}

export default AboutUs;