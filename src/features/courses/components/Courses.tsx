'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useEffect, useState} from "react";
import {fetchCourses} from "@/lib/features/courses/coursSlice";
import ModalCourse from "@/widgets/components/modalCourse";

interface Course {
    id: number,
    name: string | null,
    description: string | null,
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
        // <div className="pt-5 my-2 text-start" style={{ paddingLeft: '310px', paddingRight: '310px' }}>
        //     <div className="row justify-content-start">
        //         <h1 className="display-6 fw-bold mb-3">Courses</h1>

        //         {/* Search bar */}
        //         <div className="input-group rounded">
        //             <input type="search"
        //                    className="form-control rounded"
        //                    placeholder="Start typing to filter"
        //                    aria-label="Search"
        //                    aria-describedby="search-addon"
        //                    onChange = {(e) => { handleSearch(e.target.value)}}
        //             />
        //         </div>

        //         <div className="row justify-content-start mt-4">
        //             {loading && <div className="d-flex justify-content-center align-items-center vh-100">
        //                 <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
        //                     <span className="visually-hidden">Loading...</span>
        //                 </div>
        //             </div>}

        //             {error && <p>Error: {error}</p>}

        //             {courses.map((course) => (
        //                 <div className="col-sm-3 pt-4" key={course.id}>
        //                     <div className="card">
        //                         <div className="card-body">
        //                             <h5 className="card-title">{course.name ?? 'Default name'}</h5>
        //                             <button type="button"
        //                                     className="btn btn-dark mt-5"
        //                                     data-bs-toggle="modal"
        //                                     data-bs-target="#staticBackdrop"
        //                                     onClick={() => handleButtonClick(course)}
        //                                     >Start</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}

        //             {selectedCourse && (
        //                 <ModalCourse id={selectedCourse.id}
        //                              name={selectedCourse.name}
        //                              description={selectedCourse.description ?? 'No description'}
        //                              show={showModal}
        //                              onClose={handleCloseModal}/>
        //             )}
        //         </div>
        //     </div>
        // </div>

        <section className="mt-28 px-8">
            <div className="flex items-start italic flex-col">
                <h1 className="text-3xl"><span className="text-5xl text-blue-600">.</span>COURSES</h1>
                <form className="mt-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-1 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 mr-3">
                                <path
                                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                                </path>
                            </svg>
                        </div>
                        <input type="text" 
                                name="search"
                                id="search" 
                                className="py-1.5 px-8 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder="Find your course..."
                                autoComplete="new-email" 
                                required />
                        {courses.map((course) => (
                        <div className="col-sm-3 pt-4" key={course.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{course.name ?? 'Default name'}</h5>
                                    <h5 className="card-title">{course.description ?? 'Default name'}</h5>
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
                    </div>
                </form>
            </div>
        </section>
    )
}