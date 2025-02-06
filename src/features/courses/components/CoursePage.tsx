import {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestionsByLevel} from "@/lib/features/courses/questionSlice";
import {AppDispatch, RootState} from "@/lib/store";
import {apiQuestionsDjangoJun} from "@/features/courses/api/apiUrlCourses";

interface Question {
    id: number,
    text: string | null;
}

const CoursePage: React.FC<{level: string}> = ({ level }) => {
    const dispatch: AppDispatch = useDispatch();
    const { answers, loading, error } = useSelector((state: RootState) => state.answers);
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

        dispatch(fetchQuestionsByLevel({ level, apiQuestionsURL }));
    }, [level, dispatch]);

    const currentQuestionId = answers[currentIndex]?.question.id;

    const currentQuestion = answers[currentIndex]?.question;

    const currentAnswers = useMemo(() => {
        if (!currentQuestionId) return [];
        return answers.filter((answer) => answer.question.id === currentQuestionId);
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

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    if (error) return <p>{error}</p>;

    return (
        <div className="pt-5 my-2 text-center text-white">
            <h1>{level} Questions</h1>
            {currentQuestion && (
                <div className="mt-4">
                    <p className="text-dark">{currentQuestion.text}</p>
                    <ul className="list-group mt-4">
                        {currentAnswers.map((answer) => (
                            <li key={answer.id} className="list-group-item">
                                <input type="radio" name="answer" id={`answer${answer.id}`} />
                                <label htmlFor={`answer${answer.id}`} className="ms-2">
                                    {answer.text}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {currentIndex === answers.length - 4 ? (
                <button type="button" className="btn btn-success mt-4" onClick={handleFinish}>
                    Finish
                </button>
            ) : (
                <button type="button" className="btn btn-success mt-4" onClick={handleNext}>
                    Next
                </button>
            )}
        </div>
    );
};

export default CoursePage;