import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchQuestionsByLevel} from "@/lib/features/courses/questionSlice";
import {AppDispatch, RootState} from "@/lib/store";
import {apiQuestionsDjangoJun} from "@/features/courses/api/apiUrlCourses";

interface Question {
    id: number,
    text: string | null;
}

const CoursePage: React.FC<{level: string}> = ({ level }) => {
    const dispatch:AppDispatch = useDispatch();
    const {questions, loading, error} = useSelector((state: RootState) => state.questions);
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        let apiQuestionsURL: string;
        if (level === 'junior') {
            apiQuestionsURL = apiQuestionsDjangoJun;
        } else if (level === 'middle') {
            apiQuestionsURL = '';
        } else {
            apiQuestionsURL = '';
        }

        dispatch(fetchQuestionsByLevel({level, apiQuestionsURL}));
    },[level, dispatch])

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }



    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    if (error) return <p>{error}</p>

    return(
        <div>
            <h1>{level} Questions</h1>
            {questions.length > 0 && (
                <div>
                    <p className="text-dark">{questions[currentIndex].text}</p>
                </div>
            )}

            {currentIndex === questions.length - 1 ?
                <button type="button" className="btn btn-success" onClick={handleNext}>Finish</button>
            : <button type="button" className="btn btn-success" onClick={handleNext}>Next</button>}
        </div>
    )
}

export default CoursePage;