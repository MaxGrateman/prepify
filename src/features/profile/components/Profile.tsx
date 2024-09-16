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
        return (
            <section className="vh-89 bg-light">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src={user.image_path ?? 'Not indicated'}
                                        alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
                                        <h5 className="my-3">{user.name}</h5>
                                        <p className="text-muted mb-1">{user.level ?? 'Not indicated'}</p>
                                        <p className="text-muted mb-4">{user.about ?? 'Not indicated'}</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-dark">Follow
                                            </button>
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-success ms-1">Message
                                            </button>
                                        </div>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fas fa-globe fa-lg text-warning"></i>
                                            <p className="mb-0">https://mdbootstrap.com</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-github fa-lg text-body"></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-twitter fa-lg" style={{color: '#55acee'}}></i>
                                            <p className="mb-0">@mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-instagram fa-lg" style={{color: '#ac2bac'}}></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i className="fab fa-facebook-f fa-lg" style={{color: '#3b5998'}}></i>
                                            <p className="mb-0">mdbootstrap</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{user.name}</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.email}</p>
                                            </div>
                                        </div>
                                    <hr></hr>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Age</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{user.age ?? 'Not indicated'}</p>
                                                </div>
                                            </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Place of work</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{user.place_of_work ?? 'Not indicated'}</p>
                                                    </div>
                                                </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Stack</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{user.stack ?? 'Not indicated'}</p>
                                                    </div>
                                                </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Country</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{user.country ?? 'Not indicated'}</p>
                                                    </div>
                                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span
                                                className="text-primary font-italic me-1"></span> Project
                                                Status
                                            </p>
                                            <p className="mb-1" style={{fontSize: ".77rem"}}>Web Design</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: '80%'}}
                                                     aria-valuenow={80}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Website Markup</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: '72%'}}
                                                     aria-valuenow={72}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>One Page</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '89%'}}
                                                     aria-valuenow={89}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{fontSize: ".77rem"}}>Mobile Template</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '55%'}}
                                                     aria-valuenow={55}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '66%'}}
                                                     aria-valuenow={66}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span
                                                className="text-primary font-italic me-1"></span> Project
                                                Status
                                            </p>
                                            <p className="mb-1" style={{ fontSize: '.77rem'}}>Web Design</p>
                                            <div className="progress rounded" style={{ height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{width: '80%'}}
                                                     aria-valuenow={80}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Website Markup</p>
                                            <div className="progress rounded" style={{ height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
                                                     aria-valuenow={72}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>One Page</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '89%'}}
                                                     aria-valuenow={89}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Mobile Template</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
                                                     aria-valuenow={55}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: ".77rem"}}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px'}}>
                                                <div className="progress-bar bg-success" role="progressbar" style={{ width: '80%'}}
                                                     aria-valuenow={66}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )}

    return null;
}

export default Profile;