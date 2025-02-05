'use client'

import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {fetchUserData} from "@/lib/features/profile/userSlice";
import {AppDispatch, RootState} from "@/lib/store";
import Loading from '@/widgets/components/Loading';
import Image from 'next/image';

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
        return <Loading/>
    }


    if (error) {
        return <div>{error}</div>;
    }

    return(
        <>
            <div className="bg-transparent shadow-xl h-1/2 pb-8 mx-4">
                <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
                </div>
                <div className='mt-20 max-w-md border border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-md box-border p-8 h-full'>
                    <div className="flex flex-col items-center -mt-20 z-20 gap-1 relative">
                        <Image src={user?.image_path as string} alt="profile_avatar" width={100} height={100} className='w-40 h-40 border-2 border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-full object-cover'/>
                        <div className="flex items-center space-x-2 my-3">
                            <p className="text-2xl">{user?.name}</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p className="text-gray-600 font-medium tracking-wider">Email: <span className='text-blue-700'>{user?.email}</span></p>
                        <p className="text-lg font-medium tracking-wider text-gray-500">Level: <span className='text-blue-700'>{user?.level}</span></p>
                        <p className="text-lg font-medium tracking-wider text-gray-500">Stack: <span className='text-blue-700'>{user?.stack}</span></p>
                        <p className="text-lg font-medium tracking-wider text-gray-500">Country: <span className='text-blue-700'>{user?.country}</span></p>
                        <p className="text-lg font-medium tracking-wider text-gray-500">About: <span className='text-blue-700'>{user?.about}</span></p>
                        <div className="flex-1 flex flex-col items-center px-8 mt-2">
                        <div className="absolute -bottom-[105px] flex items-center space-x-4">
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
                </div>
            </div>
        </>
    )
}

export default Profile;