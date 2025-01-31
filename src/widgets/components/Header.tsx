'use client';

import '../styles/Header.css';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {fetchUserData, logout} from "@/lib/features/profile/userSlice";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import HeaderDropdown from "@/widgets/components/HeaderDropdown";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { CgSpinnerTwo } from "react-icons/cg";

import { RiInstagramLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import Loading from './Loading';

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
        <div
            className="bg-transparent w-full z-50"
        >
            <nav className="grid grid-cols-3 w=[80%] p-2 border-b border-white mx-5">
                <div className='flex items-center justify-between w-96'>
                    <Link href="/">
                        <p className="text-white font-bold text-3xl cursor-pointer">Prepify</p>
                    </Link>
                </div>
                <ul className='flex items-center justify-center space-x-6 text-white'>
                    <Link href="/courses" className="relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-white 
                                                    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute
                                                     after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] text-base">
                        <span>COURSES</span>
                    </Link>

                    <Link href="/about" className="relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-white 

                                                    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute
                                                     after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] text-base">
                        <span>ABOUT US</span>
                    </Link>

                    <Link href="#" className="relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-white 
                                                    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute
                                                     after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] text-base">
                        <span>MENTOR DESK</span>
                    </Link>
                    <Link href="#" className="relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-200 before:absolute before:bg-white 
                                                    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-200 after:absolute
                                                     after:bg-white after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] text-base">
                        <span>SUPPORT</span>
                    </Link>
                </ul>

                <div className="flex items-center justify-end space-x-2">
                    <div className="flex items-center space-x-3 mr-16">
                        <a href="#instagram" className=" text-white hover:text-gray-300"><RiInstagramLine size={25}/></a>
                        <a href="#linkedin" className="text-white hover:text-gray-300"><FaLinkedin size={25}/></a>
                        <a href="#telegram" className="text-white hover:text-gray-300"><FaTelegramPlane size={25}/></a>
                    </div>
                    {!user ? (
                             <>
                                 <Link href="/login">
                                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                        Login
                                    </button>
                                </Link>
                                 <Link href="/register">
                                    <button type="button" className="text-gray-900 bg-white focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-gray-700">
                                        Sign in
                                    </button>
                                 </Link>
                             </>
                         ) : (
                             !loading && user?.image_path ? (
                                <HeaderDropdown user_image={user.image_path} userId={user.id}>
                                    <Link href="/" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        Log out
                                    </Link>
                                </HeaderDropdown>
                             ) : (
                                <Loading/>
                             )
                         )}
                </div>
            </nav>
        </div>
    );
}

export default Header;
