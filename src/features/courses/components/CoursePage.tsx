import {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestionsByLevel} from "@/lib/features/courses/questionSlice";
import {AppDispatch, RootState} from "@/lib/store";
import {apiQuestionsDjangoJun} from "@/features/courses/api/apiUrlCourses";
import { CheckboxMotion } from "@/widgets/components/CheckboxMotion";
import { AnimatePresence, motion, useTime } from "motion/react";

{/* ВНИМАНИЕ! Копмпонет с ужсным кодом. Нуждаетя в правках  */}

const CoursePage: React.FC<{level: string}> = ({ level }) => {
    const dispatch: AppDispatch = useDispatch();
    // const { answers, loading, error } = useSelector((state: RootState) => state.answers);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null)
    const [checkedStates, setCheckedStates] = useState<Record<number, boolean>>({});

    const [[direction]] = useState([0, 0]);

    useEffect(() => {
        let apiQuestionsURL: string;
        if (level === 'junior') {
            apiQuestionsURL = apiQuestionsDjangoJun;
        } else if (level === 'middle') {
            apiQuestionsURL = '';
        } else {
            apiQuestionsURL = '';
        }

        dispatch(fetchQuestionsByLevel({level, apiQuestionsURL }));
    }, [level, dispatch]);

    const answers = [
        {
            id: 1,
            question: {
                id: 1,
                text: "What is the capital of France?"
            },
            answers: [
                { id: 1, text: "Berlin" },
                { id: 2, text: "Madrid" },
                { id: 3, text: "Paris" },
                { id: 4, text: "Rome" }
            ]
        },
        {
            id: 2,
            question: {
                id: 2,
                text: "What is called the red planet?"
            },
            answers: [
                { id: 5, text: "Venus" },
                { id: 6, text: "Mars" },
                { id: 7, text: "Jupiter" },
                { id: 8, text: "Saturn" }
            ]
        }
    ];

    const currentQuestionId = answers[currentIndex]?.question.id;

    const currentQuestion = answers[currentIndex]?.question;

    const currentAnswers = useMemo(() => {
        if (!currentQuestionId) return [];
        return answers.find((answer) => answer.question.id === currentQuestionId)?.answers || [];
    }, [answers, currentQuestionId]);

    const handleNext = () => {
        if (selectedAnswerId === null) {
            // return (
            //     <ul>
            //         <AnimatePresence initial={false} mode="popLayout">
            //             {notifications.map((id) => (
            //                 <motion.li
            //                 className="flex items-center p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600" role="alert"
            //                 key={id}
            //                 layout
            //                 initial={{ opacity: 0, y: 50, scale: 0.3 }}
            //                 animate={{ opacity: 1, y: 0, scale: 1 }}
            //                 exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            //                 >
            //                     <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            //                         <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            //                     </svg>
            //                     <div>
            //                         <span className="font-medium">Hold on!</span> Please choose the answer to continue!
            //                     </div>
            //                 </motion.li>
            //             ))}
            //         </AnimatePresence>
            //     </ul>)
            return
        }

        if (currentIndex < answers.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswerId(null)
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        console.log('Test finished');
    };

    const handleToggle = (answerId: number) => {
        setSelectedAnswerId(answerId)

        setCheckedStates({ [answerId]: true });
    };

    const variants = {
        enter: (direction: number) => {
          return {
            x: direction > 0 ? 100 : -100,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1
        },
        exit: (direction: number) => {
          return {
            zIndex: 0,
            x: direction < 0 ? -100 : 100,
            opacity: 0
          };
        }
      };

    return (
        <div className="flex flex-col h-[80%] p-10 justify-between">
            <h1 className="text-4xl uppercase font-medium tracking-wider text-white"><span className="text-5xl text-violet-500">.</span>{level} Test Name</h1>
            {currentQuestion && (
                <AnimatePresence mode="wait">
                    <motion.div variants={variants}
                    key={currentQuestion.id}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    custom={direction}
                    className="flex-col w-[100%] justify-center items-center px-20">
                        <p className="tracking-wider font-medium text-3xl self-start uppercase">{currentQuestion.text}</p>
                        {currentAnswers.map((answer) => (
                            <label
                                key={answer.id}
                                htmlFor={`helper-checkbox answer${answer.id}`} 
                                className="flex gap-3 items-center mt-8 mx-auto hover:bg-gray-800 hover:text-black rounded-md cursor-pointer transition ease-in-out duration-400 p-2"
                                onClick={() => handleToggle(answer.id)}
                            >
                                <div className="flex items-center h-10">
                                    <CheckboxMotion id={`helper-checkbox answer${answer.id}`} isChecked={selectedAnswerId === answer.id}/>
                                </div>
                                <span className="font-medium tracking-wider text-lg text-gray-900 dark:text-gray-300">
                                    {answer.text}
                                </span>
                            </label>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
            <div className="flex justify-center px-20">
                {currentIndex === answers.length - 1 ? (
                    <button type="button" className="w-[100%] transition ease-in-out duration-300 text-white italic bg-transparent hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-slate-100 font-semibold
                        rounded-lg text-2xl px-2 py-2 text-center mb-2 dark:focus:ring-slate-500" onClick={handleFinish}>
                        FINISH
                    </button>
                ) : (
                    <button type="button" className="w-[100%] transition ease-in-out duration-300 text-white italic bg-transparent hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-slate-100 font-semibold
                        rounded-lg text-2xl px-2 py-2 text-center mb-2 dark:focus:ring-slate-500"
                        onClick={handleNext}
                        
                    >
                        NEXT
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default CoursePage;