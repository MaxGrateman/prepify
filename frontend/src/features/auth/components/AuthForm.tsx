"use client";

import '../styles/RegisterForm.css'
import React, {useState } from 'react';
import { AuthUser } from "@/features/auth/api/auth";
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import {useDispatch} from "react-redux";
import {fetchUserData} from "@/lib/features/profile/userSlice";
import {AppDispatch} from "@/lib/store";
import {GetServerSideProps} from "next";
import validateForm from '@/utilities/components/validateForm';

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

interface AuthFormProps {
    isRegister?: boolean;
    apiUrl: string;
}

function AuthForm({ isRegister = false, apiUrl }: AuthFormProps) {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch: AppDispatch  = useDispatch();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    {/*Фкнция по отслеживанию полей инпута*/}
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    {/*Функция срабатывающая по нажатию, проверяет данные и перенаправляет на профиль*/}
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        console.log("Submitting form data:", formData);
    
        const newErrors = validateForm(formData, isRegister);
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        if (isRegister && formData.password !== formData.password_confirmation) {
            return;
        }
    
        try {
            // Авторизация пользователя
            await AuthUser(router, apiUrl, {
                email: formData.email,
                password: formData.password,
                ...(isRegister && { name: formData.name, passwordConfirmation: formData.password_confirmation }),
            });
    
            setSuccess(isRegister ? 'Registration successful!' : 'Login Successful');
    
            const userResponse = await dispatch(fetchUserData()).unwrap();
            console.log("User response:", userResponse);
    
            setErrors({});
    
            if (!userResponse || !userResponse.id) {
                throw new Error("User ID is missing.");
            }
    
            // Переход на профиль
            setTimeout(() => {
                router.push(`/profile/${userResponse.id}`);
            }, 100);
    
        } catch (error: any) {
            console.error("Error during submission:", error);
            setErrors(error.message || "Something went wrong.");
            setSuccess(null);
        }
    };

    return(
        <section className="mt-48">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-neutral-100 shadow-md shadow-neutral-100/50 rounded-md box-border p-8">
                <h3 className="mb-6 text-xl tracking-wider">{isRegister ? 'REGISTRATION' : 'LOGIN'}</h3>

                {isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <input 
                            id="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 mb-2 border-b-2 ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer`} 
                            placeholder=" " 
                            autoComplete="new-email"
                        />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500A peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                        {errors.name && <p className="animate-pulse text-red-500 tracking-wider text-sm">{errors.name}</p>}
                    </div>
                )}
                

                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" 
                    
                        name="email" 
                        id="email" 
                        className="block py-2.5 mb-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer" 
                        placeholder=" " 
                        required
                        autoComplete="new-email" 
                        value={formData.email || " "}
                        onChange={handleChange} />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {errors.email && <p className="animate-pulse text-red-500 tracking-wider text-sm">{errors.email}</p>}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" 
                        name="password" 
                        id="password" 
                        className="block py-2.5 px-0 w-full mb-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                        placeholder=" " 
                        required
                        autoComplete="new-password"
                        value={formData.password || ""}
                        onChange={handleChange} />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    {errors.password && <p className="animate-pulse text-red-500 tracking-wider text-sm uppercase">{errors.password}</p>}
                </div>

                {isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" 
                            name="password_confirmation" 
                            id="password_confirmation" 
                            className="block py-2.5 mb-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-violet-600 peer" 
                            placeholder=" " 
                            required
                            autoComplete="new-password"
                            value={formData.password_confirmation}
                            onChange={handleChange}/>
                        <label htmlFor="password_confirmation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                        {errors.password_confirmation && <p className="animate-pulse text-red-500 tracking-wider text-sm uppercase">{errors.password_confirmation}</p>}
                    </div>
                )}
            
                {!isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <Link className={`text-violet-500 hover:underline dark:text-violet-600 ${pathname === '/' ? 'active' : ''}`} href="/passwordRecover">
                            Forgot password?
                        </Link>
                    </div>
                )}
                <button type="submit" className="text-white bg-violet-500 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-8 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </section>                                
                                  
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies?.token;

    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}

export default AuthForm;
