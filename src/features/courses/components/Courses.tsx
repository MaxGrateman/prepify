'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useEffect, useState} from "react";
import {fetchCourses} from "@/lib/features/courses/coursSlice";
import ModalCourse from "@/widgets/components/modalCourse";
import Cookies from "js-cookie";

interface Course {
    id: number,
    name: string | null,
    description: string,
}

export default function Courses() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const user = useSelector((state: RootState) => state.user);
    const {courses, loading, error} = useSelector((state: RootState) => state.courses);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch])

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleButtonClick = (course: Course) => {
        if (!user.user) {
            setErrorMessage('Please, log in to continue');
            setShowModal(false);

            router.push('/login')
        } else {
            setSelectedCourse({
                ...course,
                name: course.name || 'No name available',
            });
            setShowModal(true);
        }
    }

    function handleSearch(term: string) {

    }


    return(
        <div className="pt-5 my-2 text-start" style={{ paddingLeft: '310px', paddingRight: '310px' }}>
            <div className="row justify-content-start">
                <h1 className="display-6 fw-bold mb-3">Courses</h1>

                {/* Search bar */}
                <div className="input-group rounded">
                    <input type="search"
                           className="form-control rounded"
                           placeholder="Start typing to filter"
                           aria-label="Search"
                           aria-describedby="search-addon"
                           onChange = {(e) => { handleSearch(e.target.value)}}
                    />
                </div>

                <div className="row justify-content-start mt-4">
                    {loading && <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                    {error && <p>Error: {error}</p>}

                    {courses.map((course) => (
                        <div className="col-sm-3 pt-4" key={course.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{course.name ?? 'Default name'}</h5>
                                    <button type="button"
                                            className="btn btn-dark mt-5"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => handleButtonClick(course)}
                                            >Start</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {selectedCourse && (
                        <ModalCourse id={selectedCourse.id}
                                     name={selectedCourse.name}
                                     description={selectedCourse.description}
                                     show={showModal}
                                     onClose={handleCloseModal}/>
                    )}


                </div>
            </div>
        </div>
    )
}