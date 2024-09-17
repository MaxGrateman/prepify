'use client'

import Link from 'next/link';
import {useSearchParams} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useEffect} from "react";
import {fetchCourses} from "@/lib/features/courses/coursSlice";

export default function Courses() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();

    const {courses, loading, error} = useSelector((state: RootState) => state.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch])

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

                    <table className="table table-light table-hover">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Test</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <th scope="row">{course.id}</th>
                                    <td><Link href="#" className="text-dark nav-link px-2">{course.name}</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}