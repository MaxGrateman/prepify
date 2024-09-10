"use client";

import '../styles/RegisterForm.css'
import React, {useState } from 'react';
import { AuthUser } from "@/features/auth/api/auth";
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import {useDispatch} from "react-redux";
import {fetchUserData} from "@/lib/features/profile/userSlice";
import {AppDispatch} from "@/lib/store";

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

            dispatch(fetchUserData());

            router.push('/profile');
        } catch (error: any) {
            setFormData(initialFormData);
            setError(error.message);
            setSuccess(null);
        }
    };



    return(
        <section className="vh-90">
            <div className="container py-5 h-100 slideIn">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">{isRegister ? 'Registration Form' : 'Login'}</h3>
                                <form onSubmit={handleSubmit} className="needs-validation">
                                    {isRegister && (
                                        <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div data-mdb-input-init className="form-floating mb-3">
                                                    <input type="text"
                                                           name="name"
                                                           id="name"
                                                           placeholder="Username"
                                                           className="form-control form-control-lg"
                                                           value={formData.name}
                                                           onChange={handleChange}
                                                    />
                                                    <label className="form-label" htmlFor="username">Username</label>

                                                </div>

                                            </div>
                                        </div>
                                    )}

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div data-mdb-input-init className="form-floating mb-3">
                                                <input type="email"
                                                       id="email"
                                                       name="email"
                                                       placeholder="E-mail"
                                                       className="form-control form-control-lg"
                                                       value={formData.email}
                                                       onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="email">E-mail</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div data-mdb-input-init className="form-floating mb-3">
                                                <input type={passwordVisible ? "text" : "password"}
                                                       id="password"
                                                       name='password'
                                                       placeholder="Password"
                                                       className="form-control form-control-lg"
                                                       value={formData.password}
                                                       onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <span
                                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                    {isRegister && (
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-floating">
                                                <input type={passwordVisible ? "text" : "password"}
                                                       placeholder="Password Confirmation"
                                                       id="password_confirmation"
                                                       name='passwordConfirmation'
                                                       className="form-control form-control-lg"
                                                       value={formData.password_confirmation}
                                                       onChange={handleChange}
                                                />
                                                <span
                                                    className="position-absolute top-50 end-0 translate-middle-y me-3 "
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
                                                </span>
                                                <label className="form-label" htmlFor="password_confirmation">Password Confirmation</label>
                                            </div>

                                        </div>
                                    </div>
                                    )}

                                    {!isRegister && (
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Link className={`text-blue nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/passwordRecover">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/*Вывод ошибок и удачных уведомлений*/}
                                    {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
                                    {success && <p style={{ color: 'green' }}>{success}</p>}

                                    <div className="mt-4 pt-2">
                                        <input data-mdb-ripple-init
                                               className="btn btn-primary btn-lg"
                                               type="submit"
                                               value={isRegister ? 'Register' : 'Login'}
                                        />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthForm;