'use client'

import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {fetchUserData} from "@/lib/features/profile/userSlice";
import {AppDispatch, RootState} from "@/lib/store";
import Loading from '@/widgets/components/Loading';
import Image from 'next/image';
import { motion } from 'motion/react';

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

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
                }} className='mt-20 max-w-md border border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-md box-border p-8 h-1/2 mx-6'>
                {loading ? (
                    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                            <svg className="w-40 h-40 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                            </svg>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="flex items-center mt-4">
                            <div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-red-600 bg-red-100 p-4 rounded-lg sm:w-96 dark:bg-red-900 dark:text-red-300">
                        <p className="font-medium tracking-wider">Sorry, something went wrong!</p>
                        <p>{error}</p>
                    </div>
                ) : (
                    <div
                    className="flex flex-col items-center -mt-20 z-20 gap-1 relative transform hover:rotate-x-15 hover:rotate-y-30 transition-transform duration-300">
                        <Image src={user?.image_path as string} alt="profile_avatar" width={100} height={100} className='w-40 h-40 border-2 border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-full object-cover'/>
                        <div className="flex items-center space-x-2 my-3">
                            <p className="text-2xl">{user?.name}</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p className="text-gray-600 text-xl font-medium tracking-wider">E-MAIL: <span className='text-blue-700'>{user?.email}</span></p>
                        <p className="text-xl font-medium tracking-wider text-gray-500">LEVEL: <span className='text-blue-700'>{user?.level}</span></p>
                        <p className="text-xl font-medium tracking-wider text-gray-500">STACK: <span className='text-blue-700'>{user?.stack}</span></p>
                        <p className="text-xl font-medium tracking-wider text-gray-500">COUNTRY: <span className='text-blue-700'>{user?.country}</span></p>
                        <p className="text-xl font-medium tracking-wider text-gray-500">ABOUT: <span className='text-blue-700'>{user?.about}</span></p>
                        <div className="flex-1 flex flex-col items-center px-8 mt-2">
                            <div className="absolute -bottom-[135px] flex items-center space-x-4">
                                <button className="transition ease-in-out duration-300 mt-5 italic text-xl self-end font-medium
                                        text-white bg-primary-black border border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                                        rounded-3xl px-4 me-2 mb-2 shadow-md shadow-neutral-100/50">
                                EDIT
                                </button>
                                <button className="transition ease-in-out duration-300 mt-5 italic text-xl self-end font-medium
                                        text-white bg-primary-black border border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                                        rounded-3xl px-4 me-2 mb-2 shadow-md shadow-neutral-100/50">
                                SAVE
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
        </motion.div>
    )
}

export default Profile;