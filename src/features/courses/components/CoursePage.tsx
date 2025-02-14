import {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestionsByLevel} from "@/lib/features/courses/questionSlice";
import {AppDispatch, RootState} from "@/lib/store";
import {apiQuestionsDjangoJun} from "@/features/courses/api/apiUrlCourses";
import { CheckboxMotion } from "@/widgets/components/CheckboxMotion";
import { motion } from "motion/react";

interface Question {
    id: number,
    text: string | null;
}

const CoursePage: React.FC<{level: string}> = ({ level }) => {
    const dispatch: AppDispatch = useDispatch();
    // const { answers, loading, error } = useSelector((state: RootState) => state.answers);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null)

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
                text: "What is the capital of France?"
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
        if (!selectedAnswerId) {
            alert("Please select an answer before proceeding!")
            return
        }

        if (currentIndex < answers.length - 4) {
            setCurrentIndex((prevIndex) => prevIndex + 4);
            setSelectedAnswerId(null)
        } else {
            handleFinish();
        }
    };

    const handleFinish = () => {
        console.log('Test finished');
    };

    return (
        <div className="flex flex-col h-[80%] p-10 justify-between">
            <h1 className="text-4xl uppercase font-medium tracking-wider text-white"><span className="text-5xl text-blue-600">.</span>{level} Test Name</h1>
            {currentQuestion && (
                <div className="flex-col w-[100%] justify-center items-center px-20">
                    <p className="tracking-wider font-medium text-3xl self-start uppercase">{currentQuestion.text}</p>
                        {currentAnswers.map((answer) => (
                            <div className="flex gap-3 items-center mt-8 mx-auto hover:bg-gray-800 hover:text-black rounded-md cursor-pointer transition ease-in-out duration-400">
                                <div className="flex items-center h-10">
                                    <CheckboxMotion id={`answer${answer.id}`}/>
                                </div>
                                <div key={answer.id} >
                                    <label htmlFor={`answer${answer.id}`} className="font-medium tracking-wider text-lg text-gray-900 dark:text-gray-300 cursor-pointer">
                                        {answer.text}
                                    </label>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            <div className="flex justify-center px-20">
                {currentIndex === answers.length - 4 ? (
                    <button type="button" className="" onClick={handleFinish}>
                        Finish
                    </button>
                ) : (
                    <button type="button" className="w-[100%] transition ease-in-out duration-300 text-white italic bg-transparent hover:bg-white hover:text-black focus:outline-none focus:ring-4 focus:ring-slate-100 font-semibold
                        rounded-lg text-2xl px-2 py-2 text-center mb-2 dark:focus:ring-slate-500 "
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