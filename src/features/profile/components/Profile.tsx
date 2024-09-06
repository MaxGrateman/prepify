'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import {apiProfile} from "@/features/profile/api/apiUrlProfile";
{/*Компонент профиля*/}

export interface UserProfile {
    about: string | null;
    age: number | null;
    country: string | null;
    email: string;
    email_verified_at: string | null;
    id: number;
    image_path: string | undefined;
    level: string | null;
    name: string;
    place_of_work: string | null;
    stack: string | null;
}

interface ApiResponse {
    user: UserProfile;
}

function Profile() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();



    {/*хук беспрерывного получению данных токена с сервера*/}
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await axios.get<ApiResponse>(apiProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.user);

            } catch (error) {
                setError('Failed to fetch user data');
                router.push('/login');
            }
        };

        fetchUserData();
    }, [router]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    } else {
        console.log(userData.name)
    }

    return (
            <section style={{backgroundColor: '#eee'}} className="vh-99">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src={userData.image_path ?? 'N/A'}
                                        alt="avatar"
                                        className="rounded-circle img-fluid" style={{ width: '200px', aspectRatio: '1 / 1' }}/>
                                        <h5 className="my-3">{userData.name}</h5>
                                        <p className="text-muted mb-1">{userData.level ?? 'N/A'}</p>
                                        <p className="text-muted mb-4">{userData.about ?? 'N/A'}</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-primary">Follow
                                            </button>
                                            <button type="button" data-mdb-button-init data-mdb-ripple-init
                                                    className="btn btn-outline-primary ms-1">Message
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
                                            <p className="text-muted mb-0">{userData.name}</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{userData.email}</p>
                                            </div>
                                        </div>
                                    <hr></hr>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0">Age</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{userData.age ?? 'N/A'}</p>
                                                </div>
                                            </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Place of work</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userData.place_of_work ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Stack</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userData.stack ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                    <hr></hr>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Country</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <p className="text-muted mb-0">{userData.country ?? 'N/A'}</p>
                                                    </div>
                                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card mb-4 mb-md-0">
                                        <div className="card-body">
                                            <p className="mb-4"><span
                                                className="text-primary font-italic me-1">assigment</span> Project
                                                Status
                                            </p>
                                            <p className="mb-1" style={{fontSize: '.77rem'}}>Web Design</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{width: '80%'}}
                                                     aria-valuenow={80}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Website Markup</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{width: '72%'}}
                                                     aria-valuenow={72}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>One Page</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '89%'}}
                                                     aria-valuenow={89}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>Mobile Template</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '55%'}}
                                                     aria-valuenow={55}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '66%'}}
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
                                                className="text-primary font-italic me-1">assigment</span> Project
                                                Status
                                            </p>
                                            <p className="mb-1" style={{ fontSize: '.77rem;'}}>Web Design</p>
                                            <div className="progress rounded" style={{ height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{width: '80%'}}
                                                     aria-valuenow={80}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>Website Markup</p>
                                            <div className="progress rounded" style={{ height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '80%'}}
                                                     aria-valuenow={72}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>One Page</p>
                                            <div className="progress rounded" style={{height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '89%'}}
                                                     aria-valuenow={89}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>Mobile Template</p>
                                            <div className="progress rounded" style={{ height: '5px' }}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '80%'}}
                                                     aria-valuenow={55}
                                                     aria-valuemin={0} aria-valuemax={100}></div>
                                            </div>
                                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem'}}>Backend API</p>
                                            <div className="progress rounded mb-2" style={{ height: '5px'}}>
                                                <div className="progress-bar" role="progressbar" style={{ width: '80%'}}
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
    )
}

export default Profile;