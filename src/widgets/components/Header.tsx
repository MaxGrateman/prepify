'use client';

import '../styles/Header.css';
import Link from 'next/link';
import {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {fetchUserData, logout} from "@/lib/features/profile/userSlice";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import HeaderDropdown from "@/widgets/components/HeaderDropdown";

function Header() {
    const router = useRouter();
    const dispatch:AppDispatch = useDispatch();
    const { user, loading } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(fetchUserData());
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className="p-2 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
                    <p className="fs-3 p-1 col-md-2 mb-2 mb-md-0 pointer-cursor">Prepify</p>
                    <nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link className="text-white nav-link px-2" href="/">
                            Home
                        </Link>
                        <Link className="text-white nav-link px-2" href="/courses">
                            Courses
                        </Link>
                    </nav>
                    <div className="d-flex justify-content-center align-items-center text-end col col-lg-auto mb-2 mb-md-0" style={{ minHeight: '50px' }}>
                        {!user ? (
                            <>
                                <Link href="/login">
                                    <button type="button" className="btn btn-outline-light me-2">Login</button>
                                </Link>
                                <Link href="/register">
                                    <button type="button" className="btn btn-success">Sign-up</button>
                                </Link>
                            </>
                        ) : (
                            !loading && user?.image_path ? (
                                <HeaderDropdown user_image={
                                    <img
                                        src={user.image_path || '/hq720.jpg'}
                                        alt="Avatar"
                                        width={50}
                                        height={50}
                                        className="rounded-circle"
                                        style={{ objectFit: 'cover' }}
                                    />
                                } userId={user.id}>
                                    <Link href="/" onClick={handleLogout} className="text-decoration-none text-reset">Log out</Link>
                                </HeaderDropdown>
                            ) : (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;