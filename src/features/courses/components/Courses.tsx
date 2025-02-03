'use client'

import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {SetStateAction, useEffect, useState} from "react";
import {fetchCourses} from "@/lib/features/courses/coursSlice";
import ModalCourse from "@/widgets/components/modalCourse";
import { motion } from "motion/react";
import Loading from "@/widgets/components/Loading";
interface Course {
    id: number,
    name: string | null,
    description: string | null,
}

export default function Courses() {
    const dispatch = useDispatch<AppDispatch>();

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => setHoveredId(id);
    const handleMouseLeave = () => setHoveredId(null);

    const user = useSelector((state: RootState) => state.user);
    const {courses, loading, error} = useSelector((state: RootState) => state.courses);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch])

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCourse(null); 
    }

    const handleButtonClick = (course: Course) => {
        if (!user.user) {
            setErrorMessage('Please, log in to continue');
            setShowModal(false);
            router.push('/login');
        } else {
            setSelectedCourse({
                ...course,
                name: course.name || 'No name available',
            });
            setShowModal(true);
            console.log("Selected Course:", course);
            console.log("Show Modal:", showModal);
        }
    };

    return(
        <section className="mt-10 px-8">
            <div className="flex items-start flex-wrap gap-5">
                <h1 className="text-3xl basis-1/6"><span className="text-5xl text-blue-600">.</span>COURSES</h1>
                <form className="mt-4 basis-2/3">
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
                    </div>
                </form>
                <div className="basis-1/6 w-80 h-96 box-border p-4 border-neutral-100 shadow-sm shadow-neutral-100/50 border rounded-lg flex justify-items-start">
                    <h2 className="text-2xl">FILTERS</h2>
                </div>
                <div className="basis-2/3 grid grid-cols-3 gap-4 place-items-start">
                {loading || error &&
                Array.from({ length: 15 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-full h-auto box-border p-8 bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
                    >   <div className="flex flex-col items-start justify-center animate-pulse">
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 "></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-36"></div>
                        </div>
                    </div>
                ))}

                    {courses.map((course, index) => (
                        <motion.div
                        key={course.id}
                        className="w-full h-auto box-border p-8 border-neutral-100 shadow-sm shadow-neutral-100/50 border rounded-lg"
                        initial={false}
                        animate={{
                            scale: hoveredId === course.id ? 1.05 : hoveredId ? 0.95 : 1,
                            x:
                            hoveredId === course.id
                                ? 0
                                : hoveredId !== null
                                ? Math.sign(index - courses.findIndex((c) => c.id === hoveredId)) * 5
                                : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onMouseEnter={() => handleMouseEnter(course.id)}
                        onMouseLeave={handleMouseLeave}
                        >
                        <h5 className="text-lg font-bold">{course.name ?? "Default name"}</h5>
                        <p className="text-sm font-semibold text-gray-700">{course.description ?? "Default description"}</p>
                        <button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg 
                                        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    onClick={() => handleButtonClick(course)}
                                >
                                Start
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                        </button>
                        </motion.div>
                    ))}
                </div>
                {selectedCourse && (
                        <ModalCourse id={selectedCourse.id}
                                     name={selectedCourse.name}
                                     description={selectedCourse.description ?? 'No description'}
                                     show={showModal}
                                     onClose={handleCloseModal}/>
                    )}
            </div>
        </section>
    )
}
