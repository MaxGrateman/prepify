'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useEffect, useMemo, useState} from "react";
import {fetchCourses} from "@/lib/features/courses/coursSlice";
import ModalCourse from "@/features/courses/components/modalCourse";
import { motion } from "motion/react";
import Search from "@/shared/components/Search";

{/*Интерфейс карточки-курса*/}
interface Course {
    id: number,
    name: string | null,
    description: string | null,
}

export default function Courses() {

    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    {/*Хуки модального окна*/}
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showModal, setShowModal] = useState(false);

    {/*Хуки уведомлений об ошибке*/}
    const [errorMessage, setErrorMessage] = useState('');

    {/*Переменные анимации*/}
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const handleMouseEnter = (id: number) => setHoveredId(id);
    const handleMouseLeave = () => setHoveredId(null);

    {/*Обработка запроса курсов*/}
    const dispatch = useDispatch<AppDispatch>();
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

    const filteredCourses = courses.filter((course) =>
        course.name?.toLowerCase().includes(query)
    );

    {/*Кнопка с проверкой на юзера, на каждой карточке*/}
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
                <h1 className="text-3xl basis-1/6"><span className="text-5xl text-violet-500">.</span>COURSES</h1>

                {/*Поисковая строка*/}
                <Search placeholder="Find your course..." onChange={(e: any) => setSearchTerm(e.target.value)} />

                {/*Фильтры*/}
                <div className="basis-1/6 w-80 h-96 box-border p-4 border-neutral-100 shadow-sm shadow-neutral-100/50 border rounded-lg flex justify-items-start">
                    <h2 className="text-2xl">FILTERS</h2>
                </div>

                {/*Вывод карточек-курсов с обработчиками загрузки и ошибок*/}
                <div className="basis-2/3 grid grid-cols-3 gap-4 place-items-start">
                    {loading ? (
                        Array.from({ length: 9 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-full h-auto box-border p-8 bg-gray-300 rounded-lg sm:w-96 dark:bg-gray-700"
                            >
                                <div className="flex flex-col items-start justify-center animate-pulse">
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 "></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-2.5"></div>
                                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 w-36"></div>
                                </div>
                            </div>
                        ))
                    ) : error ? (
                        <div className="text-red-600 bg-red-100 p-4 rounded-lg sm:w-96 dark:bg-red-900 dark:text-red-300">
                            <p className="font-medium tracking-wider">Sorry, something went wrong!</p>
                            <p>{error}</p>
                        </div>
                    ) : (
                        filteredCourses.map((course, index) => (
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
                            <button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-violet-500 rounded-lg 
                                            hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-violet-500 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                                        type="button"
                                        onClick={() => handleButtonClick(course)}
                                    >
                                    Start
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                            </button>
                            </motion.div>
                        ))
                    )}
                </div>


                {/*Скрытая модалка курсов*/}
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
