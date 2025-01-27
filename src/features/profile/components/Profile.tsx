'use client'

import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {fetchUserData} from "@/lib/features/profile/userSlice";
import {AppDispatch, RootState} from "@/lib/store";

{/*Компонент профиля*/}

interface ProfileProps {
    userId: string;
}

const Profile: React.FC<ProfileProps> = ({ userId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error} = useSelector((state: RootState) => state.user);
    const router = useRouter();



    {/*хук беспрерывного получению данных токена с сервера*/}
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData());
        }

    }, [dispatch, userId]);


    if (loading) {
        return <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>;
    }


    if (error) {
        return <div>{error}</div>;
    }

    if (user) {
        return
            // <section className="vh-89 bg-light">
            //     <div className="container py-5">
            //         <div className="row">
            //             <div className="col-lg-4">
            //                 <div className="card mb-4">
            //                     <div className="card-body text-center">
            //                         <img
            //                             src={user.image_path ?? 'Not indicated'}
            //                             alt="avatar"
            //                             className="rounded-circle img-fluid" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
            //                             <h5 className="my-3">{user.name}</h5>
            //                             <p className="text-muted mb-1">{user.level ?? 'Not indicated'}</p>
            //                             <p className="text-muted mb-4">{user.about ?? 'Not indicated'}</p>
            //                             <div className="d-flex justify-content-center mb-2">
            //                                 <button type="button" data-mdb-button-init data-mdb-ripple-init
            //                                         className="btn btn-dark">Follow
            //                                 </button>
            //                                 <button type="button" data-mdb-button-init data-mdb-ripple-init
            //                                         className="btn btn-success ms-1">Message
            //                                 </button>
            //                             </div>
            //                     </div>
            //                 </div>
            //                 <div className="card mb-4 mb-lg-0">
            //                     <div className="card-body p-0">
            //                         <ul className="list-group list-group-flush rounded-3">
            //                             <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            //                                 <i className="fas fa-globe fa-lg text-warning"></i>
            //                                 <p className="mb-0">https://mdbootstrap.com</p>
            //                             </li>
            //                             <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            //                                 <i className="fab fa-github fa-lg text-body"></i>
            //                                 <p className="mb-0">mdbootstrap</p>
            //                             </li>
            //                             <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            //                                 <i className="fab fa-twitter fa-lg" style={{color: '#55acee'}}></i>
            //                                 <p className="mb-0">@mdbootstrap</p>
            //                             </li>
            //                             <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            //                                 <i className="fab fa-instagram fa-lg" style={{color: '#ac2bac'}}></i>
            //                                 <p className="mb-0">mdbootstrap</p>
            //                             </li>
            //                             <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            //                                 <i className="fab fa-facebook-f fa-lg" style={{color: '#3b5998'}}></i>
            //                                 <p className="mb-0">mdbootstrap</p>
            //                             </li>
            //                         </ul>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div className="col-lg-8">
            //                 <div className="card mb-4">
            //                     <div className="card-body">
            //                         <div className="row">
            //                             <div className="col-sm-3">
            //                                 <p className="mb-0">Full Name</p>
            //                             </div>
            //                             <div className="col-sm-9">
            //                                 <p className="text-muted mb-0">{user.name}</p>
            //                             </div>
            //                         </div>
            //                         <hr></hr>
            //                             <div className="row">
            //                                 <div className="col-sm-3">
            //                                     <p className="mb-0">Email</p>
            //                                 </div>
            //                                 <div className="col-sm-9">
            //                                     <p className="text-muted mb-0">{user.email}</p>
            //                                 </div>
            //                             </div>
            //                         <hr></hr>
            //                                 <div className="row">
            //                                     <div className="col-sm-3">
            //                                         <p className="mb-0">Age</p>
            //                                     </div>
            //                                     <div className="col-sm-9">
            //                                         <p className="text-muted mb-0">{user.age ?? 'Not indicated'}</p>
            //                                     </div>
            //                                 </div>
            //                         <hr></hr>
            //                                     <div className="row">
            //                                         <div className="col-sm-3">
            //                                             <p className="mb-0">Place of work</p>
            //                                         </div>
            //                                         <div className="col-sm-9">
            //                                             <p className="text-muted mb-0">{user.place_of_work ?? 'Not indicated'}</p>
            //                                         </div>
            //                                     </div>
            //                         <hr></hr>
            //                                     <div className="row">
            //                                         <div className="col-sm-3">
            //                                             <p className="mb-0">Stack</p>
            //                                         </div>
            //                                         <div className="col-sm-9">
            //                                             <p className="text-muted mb-0">{user.stack ?? 'Not indicated'}</p>
            //                                         </div>
            //                                     </div>
            //                         <hr></hr>
            //                                     <div className="row">
            //                                         <div className="col-sm-3">
            //                                             <p className="mb-0">Country</p>
            //                                         </div>
            //                                         <div className="col-sm-9">
            //                                             <p className="text-muted mb-0">{user.country ?? 'Not indicated'}</p>
            //                                         </div>
            //                                     </div>
            //                     </div>
            //                 </div>
            //                 <div className="row">
            //                     <div className="col-md-6">
            //                         <div className="card mb-4 mb-md-0">
            //                             <div className="card-body">
            //                                 <p className="mb-4"><span
            //                                     className="text-primary font-italic me-1"></span> Project
            //                                     Status
            //                                 </p>
            //                                 <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
            //                                 <div className="progress rounded" style={{height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{width: '80%'}}
            //                                          aria-valuenow={80}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
            //                                 <div className="progress rounded" style={{height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{width: '72%'}}
            //                                          aria-valuenow={72}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>One Page</p>
            //                                 <div className="progress rounded" style={{height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '89%'}}
            //                                          aria-valuenow={89}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
            //                                 <div className="progress rounded" style={{height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '55%'}}
            //                                          aria-valuenow={55}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Backend API</p>
            //                                 <div className="progress rounded mb-2" style={{ height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '66%'}}
            //                                          aria-valuenow={66}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     <div className="col-md-6">
            //                         <div className="card mb-4 mb-md-0">
            //                             <div className="card-body">
            //                                 <p className="mb-4"><span
            //                                     className="text-primary font-italic me-1"></span> Project
            //                                     Status
            //                                 </p>
            //                                 <p className="mb-1" style={{ fontSize: '.77rem'}}>Web Design</p>
            //                                 <div className="progress rounded" style={{ height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{width: '80%'}}
            //                                          aria-valuenow={80}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Website Markup</p>
            //                                 <div className="progress rounded" style={{ height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
            //                                          aria-valuenow={72}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>One Page</p>
            //                                 <div className="progress rounded" style={{height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '89%'}}
            //                                          aria-valuenow={89}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Mobile Template</p>
            //                                 <div className="progress rounded" style={{ height: '5px' }}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
            //                                          aria-valuenow={55}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                                 <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Backend API</p>
            //                                 <div className="progress rounded mb-2" style={{ height: '5px'}}>
            //                                     <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
            //                                          aria-valuenow={66}
            //                                          aria-valuemin={0} aria-valuemax={100}></div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </section>
            (
                <div className="h-full bg-gray-200 p-8">
                    <div className="bg-white rounded-lg shadow-xl pb-8">
                        <div className="absolute right-12 mt-4 rounded">
                            <button
                                className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
                                title="Settings"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    ></path>
                                </svg>
                            </button>
                                <div className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl">
                                    <div className="py-2 border-b">
                                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                                        <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                                ></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Share Profile</span>
                                        </button>
                                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                                ></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Block User</span>
                                        </button>
                                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">More Info</span>
                                        </button>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                ></path>
                                            </svg>
                                            <span className="text-sm text-gray-700">Report</span>
                                        </button>
                                    </div>
                                </div>
                        </div>
                        <div className="w-full h-[250px]">
                            <img src="#" className="w-full h-full rounded-tl-lg rounded-tr-lg" alt="Profile Banner" />
                        </div>
                        <div className="flex flex-col items-center -mt-20">
                            <img src="#" className="w-40 border-4 border-white rounded-full" alt="Profile Avatar" />
                            <div className="flex items-center space-x-2 mt-2">
                                <p className="text-2xl">Amanda Ross</p>
                                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-gray-100 h-2.5 w-2.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </span>
                            </div>
                            <p className="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                            <p className="text-sm text-gray-500">New York, USA</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                            <div className="flex items-center space-x-4 mt-2">
                                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                    </svg>
                                    <span>Connect</span>
                                </button>
                                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span>Message</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    return null;
}

export default Profile