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
import Cookies from "js-cookie";

interface FormData {
    name?: string;
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
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    {/*Фкнция по отслеживанию полей инпута*/}
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    {/*Функция скрытого-пароля*/}
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }


    {/*Функция срабатывающая по нажатию, проверяет данные и перенаправляет на профиль*/}
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isRegister && formData.password !== formData.password_confirmation) {
            setError("Passwords don't match");
            return;
        }

        try {
            // Авторизация пользователя
            await AuthUser(router, apiUrl, {
                ...formData,
                ...(isRegister && { passwordConfirmation: formData.password_confirmation }),
            });

            setSuccess(isRegister ? 'Registration successful!' : 'Login Successful');
            setError(null);

            const userResponse = await dispatch(fetchUserData()).unwrap();

            const userId = userResponse.id;

            // Переход на профиль
            router.push(`/profile/${userId}`);

        } catch (error: any) {
            setFormData(initialFormData);
            setError(error.message);
            setSuccess(null);
        }
    };



    return(
        // <section className="vh-90">
        //     <div className="container py-5 h-100">
        //         <div className="row justify-content-center align-items-center h-100">
        //             <div className="col-12 col-lg-9 col-xl-7">
        //                 <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
        //                     <div className="card-body p-4 p-md-5">
        //                         <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{isRegister ? 'Registration Form' : 'Login'}</h3>
        //                         <form onSubmit={handleSubmit} className="needs-validation">
        //                             {isRegister && (
        //                                 <div className="row">
        //                                     <div className="col mb-4">

        //                                         <div data-mdb-input-init className="form-floating mb-3">
        //                                             <input type="text"
        //                                                    name="name"
        //                                                    id="name"
        //                                                    required
        //                                                    placeholder="Username"
        //                                                    className="form-control form-control-lg"
        //                                                    value={formData.name}
        //                                                    onChange={handleChange}
        //                                             />
        //                                             <label className="form-label" htmlFor="username">Username</label>

        //                                         </div>

        //                                     </div>
        //                                 </div>
        //                             )}

        //                             <div className="row">
        //                                 <div className="col mb-4">
        //                                     <div data-mdb-input-init className="form-floating mb-3">
        //                                         <input type="email"
        //                                                id="email"
        //                                                name="email"
        //                                                required
        //                                                placeholder="E-mail"
        //                                                className="form-control form-control-lg"
        //                                                value={formData.email}
        //                                                onChange={handleChange}
        //                                         />
        //                                         <label className="form-label" htmlFor="email">E-mail</label>
        //                                     </div>
        //                                 </div>
        //                             </div>

        //                             <div className="row">
        //                                 <div className="col mb-4 pb-2">
        //                                     <div data-mdb-input-init className="form-floating mb-3">
        //                                         <input type={passwordVisible ? "text" : "password"}
        //                                                id="password"
        //                                                name='password'
        //                                                required
        //                                                placeholder="Password"
        //                                                className="form-control form-control-lg"
        //                                                value={formData.password}
        //                                                onChange={handleChange}
        //                                         />
        //                                         <label className="form-label" htmlFor="password">Password</label>
        //                                         <span
        //                                             className="position-absolute top-50 end-0 translate-middle-y me-3"
        //                                             onClick={togglePasswordVisibility}
        //                                             style={{ cursor: 'pointer' }}
        //                                         >
        //                                             <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
        //                                         </span>
        //                                     </div>

        //                                 </div>
        //                             </div>

        //                             {isRegister && (
        //                             <div className="row">
        //                                 <div className="col mb-4 pb-2">

        //                                     <div className="form-floating">
        //                                         <input type={passwordVisible ? "text" : "password"}
        //                                                placeholder="Password Confirmation"
        //                                                id="password_confirmation"
        //                                                name='passwordConfirmation'
        //                                                required
        //                                                className="form-control form-control-lg"
        //                                                value={formData.password_confirmation}
        //                                                onChange={handleChange}
        //                                         />
        //                                         <span
        //                                             className="position-absolute top-50 end-0 translate-middle-y me-3 "
        //                                             onClick={togglePasswordVisibility}
        //                                             style={{ cursor: 'pointer' }}
        //                                         >
        //                                             <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
        //                                         </span>
        //                                         <label className="form-label" htmlFor="password_confirmation">Password Confirmation</label>
        //                                     </div>

        //                                 </div>
        //                             </div>
        //                             )}

        //                             {!isRegister && (
        //                                 <div className="row">
        //                                     <div className="col-md-4">
        //                                         <Link className={`text-blue nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/passwordRecover">
        //                                             Forgot password?
        //                                         </Link>
        //                                     </div>
        //                                 </div>
        //                             )}

        //                             {/*Вывод ошибок и удачных уведомлений*/}
        //                             {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
        //                             {success && <p style={{ color: 'green' }}>{success}</p>}

        //                             <div className="mt-4 pt-2">
        //                                 <input data-mdb-ripple-init
        //                                        className="btn btn-primary btn-lg w-100"
        //                                        type="submit"
        //                                        value={isRegister ? 'Register' : 'Login'}
        //                                 />
        //                             </div>

        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        <section className="mt-48">
            <form className="max-w-md mx-auto border border-neutral-100 shadow-md shadow-neutral-100/50 rounded-md box-border p-8">
                <h3 className="mb-6 text-xl">{isRegister ? 'REGISTRATION' : 'LOGIN'}</h3>

                {isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" 
                            name="name"
                            id="name" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" "
                            autoComplete="new-email" 
                            required
                            value={formData.name}
                            onChange={handleChange} />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                )}
                

                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" 
                        name="email" 
                        id="email" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer" 
                        placeholder=" " 
                        required
                        autoComplete="new-email" 
                        value={formData.email}
                        onChange={handleChange} />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" 
                        name="password" 
                        id="password" 
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        required
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange} />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>

                {isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" 
                            name="passwordConfirmation" 
                            id="passwordConfirmation" 
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                            placeholder=" " 
                            required
                            autoComplete="new-password"
                            value={formData.password_confirmation}
                            onChange={handleChange} />
                        <label htmlFor="passwordConfirmation" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    </div>
                )}
            
                {!isRegister && (
                    <div className="relative z-0 w-full mb-5 group">
                        <Link className={`text-blue-600 hover:underline dark:text-blue-500 ${pathname === '/' ? 'active' : ''}`} href="/passwordRecover">
                            Forgot password?
                        </Link>
                    </div>
                )}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-8 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
        </section>                                
                                  
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const token = Cookies.get('token');

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