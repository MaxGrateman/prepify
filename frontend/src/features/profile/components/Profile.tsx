'use client'

import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {fetchUserData, saveUserProfile} from "@/lib/features/profile/userSlice";
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
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: user?.name ?? '',
        about: user?.about ?? '',
        country: user?.country ?? '',
        age: user?.age ?? null,
        image_path: user?.image_path ?? '',
        level: user?.level ?? '',
        stack: user?.stack ?? '',
        email_verified_at: user?.email_verified_at ?? ''
    })

    {/*хук беспрерывного получению данных токена с сервера*/}
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData());
        }
    }, [dispatch, userId]);

    if (error) {
        return <div>{error}</div>;
    }

    const handleSave = () => {
        dispatch(saveUserProfile(formData))
    }

    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
                }} className='mt-20 max-w-md border border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-md box-border p-8 h-3/4 mx-6'>

                    
                {loading ? (

                    /*Скелетон лоудинг*/
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

                    /*Контент профиля*/
                    <div className="flex flex-col items-center -mt-20 z-20 gap-1 relative transform hover:rotate-x-15 hover:rotate-y-30 transition-transform duration-300">
                        <Image src={user?.image_path || '/default.png'} 
                        alt="profile_avatar" width={100} height={100} className='w-40 h-40 border-2 border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-full object-cover'/>
                        <div className="flex items-center space-x-2 my-3">
                            <p className="text-2xl">{user?.name}</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="email" name="floating_email" id="floating_email" className="block font-medium tracking-wider py-2.5 px-0 w-full text-xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " value={user?.email || ''} required readOnly/>
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-xl tracking-wider text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            E-MAIL</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_level" id="floating_level" className="block font-medium tracking-wider py-2.5 px-0 w-full text-xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " value={formData.level || ''} onChange={(e) => setFormData({ ...formData, level: e.target.value })} readOnly={!isEditing} required/>
                            <label htmlFor="floating_level" className="peer-focus:font-medium absolute text-lg tracking-wider text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            LEVEL</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_stack" id="floating_stack" className="block font-medium tracking-wider py-2.5 px-0 w-full text-xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " value={formData.stack || ''} onChange={(e) => setFormData({ ...formData, stack: e.target.value })} readOnly={!isEditing} required/>
                            <label htmlFor="floating_stack" className="peer-focus:font-medium absolute text-lg tracking-wider text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            STACK</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_country" id="floating_country" className="block font-medium tracking-wider py-2.5 px-0 w-full text-xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value })} readOnly={!isEditing} required/>
                            <label htmlFor="floating_country" className="peer-focus:font-medium absolute text-lg tracking-wider text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            COUNTRY</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_about" id="floating_about" className="block font-medium tracking-wider py-2.5 px-0 w-full text-xl text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " value={formData.about || ''} onChange={(e) => setFormData({ ...formData, about: e.target.value })} readOnly={!isEditing} required/>
                            <label htmlFor="floating_about" className="peer-focus:font-medium absolute text-lg tracking-wider text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            ABOUT</label>
                        </div>
                        <div className="flex-1 flex flex-col items-center px-8 mt-6">
                            <div className="absolute -bottom-[135px] flex items-center space-x-4">
                                {!isEditing ? ( 
                                    <button className="transition ease-in-out duration-300 mt-5 italic text-xl self-end font-medium
                                        text-white bg-primary-black border border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                                        rounded-3xl px-4 me-2 mb-2 shadow-md shadow-neutral-100/50" 
                                        onClick={() => setIsEditing(true)}>
                                EDIT
                                </button>
                                ) : (
                                <>
                                    <button className="transition ease-in-out duration-300 mt-5 italic text-xl self-end font-medium
                                            text-white bg-primary-black border border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                                            rounded-3xl px-4 me-2 mb-2 shadow-md shadow-neutral-100/50"
                                            onClick={() => {handleSave(), setIsEditing(false);}}>
                                    SAVE
                                    </button>
                                    <button className="transition ease-in-out duration-300 mt-5 italic text-xl self-end font-medium
                                            text-white bg-primary-black border border-white hover:bg-white hover:text-black focus:outline-none focus:ring-1 focus:ring-white
                                            rounded-3xl px-4 me-2 mb-2 shadow-md shadow-neutral-100/50"
                                            onClick={() => {setFormData({ ...formData }), setIsEditing(false);}}>
                                    CANCEL
                                    </button>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
        </motion.div>
    )
}

export default Profile;