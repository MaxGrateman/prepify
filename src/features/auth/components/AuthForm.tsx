"use client";

import '../styles/RegisterForm.css'
import React, {ReactElement, useEffect, useState} from 'react';
import {AuthUser} from '../api/auth';
import Link from 'next/link'
import {usePathname} from "next/navigation";

interface FormData {
    name?: string;
    email: string;
    password: string;
    passwordConfirmation?: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

interface AuthFormProps {
    isRegister?: boolean;
    apiUrl: string;
}

function AuthForm({isRegister = false, apiUrl}: AuthFormProps) {
    const pathname = usePathname();
    const [formData, setFormData] = useState<FormData | any>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [nameInput, setNameInput] = useState<string>('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [emailInputDirty, setEmailInputDirty] = useState(false);
    const [passwordInputDirty, setPasswordInputDirty] = useState(false);
    const [nameInputDirty, setNameInputDirty] = useState(false);
    const [emailInputError, setEmailInputError] = useState('Email must be specified');
    const [passwordInputError, setPasswordInputError] = useState('Password must be specified');
    const [nameInputError, setNameInputError] = useState('Name must be specified');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailInputError || nameInputError || passwordInputError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [emailInputError, nameInputError, passwordInputError]);

    const emailRegexHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value.toLowerCase();
        setEmailInput(email);

        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) {
            setEmailInputError('Invalid email format');
        } else {
            setEmailInputError('');
        }
    };

    const passwordRegexHandler = (e: any) => {
        setPasswordInput(formData.password);
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setPasswordInputError("The password must be more than 3 and less than 20 characters")
            if(!e.target.value) {
                setPasswordInputError("Password must be specified")
            }
        } else {
            setPasswordInputError("");
        }

    }

    const nameRegexHandler = (e: any) => {
        setNameInput(formData.name);
        if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNameInputError("The name must be more than 3 and less than 20 characters")
            if(!e.target.value) {
                setNameInputError("Name must be specified")
            }
        } else {
            setNameInputError("");
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value});
        emailRegexHandler(e);
        passwordRegexHandler(e);
        nameRegexHandler(e);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isRegister && formData.password !== formData.passwordConfirmation) {
            setError("Passwords don't match");
            return;
        }

        try {
            await AuthUser(apiUrl, {
                ...formData,
                ...(isRegister && { password_confirmation: formData.passwordConfirmation }),
            });
            setSuccess(isRegister ? 'Registration successful!' : 'Login Successful');
            setError(null);
        } catch (error: any) {
            setFormData(initialFormData);
            setError(error.message);
            setSuccess(null);
        }
    };

    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmailInputDirty(true);
                break;
            case 'name':
                setNameInputDirty(true);
                break;
            case 'password':
                setPasswordInputDirty(true);
                break;
            case 'passwordConfirmation':
                setPasswordInputDirty(true);
        }
    }



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
                                                           onBlur={e => blurHandler(e)}
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
                                                       onBlur={e => blurHandler(e)}
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
                                                       onBlur={e => blurHandler(e)}
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
                                                       id="passwordConfirmation"
                                                       name='passwordConfirmation'
                                                       className="form-control form-control-lg"
                                                       value={formData.passwordConfirmation}
                                                       onChange={handleChange}
                                                       onBlur={e => blurHandler(e)}
                                                />
                                                <span
                                                    className="position-absolute top-50 end-0 translate-middle-y me-3 "
                                                    onClick={togglePasswordVisibility}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <i className={passwordVisible ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}></i>
                                                </span>
                                                <label className="form-label" htmlFor="passwordConfirmation">Password Confirmation</label>
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

                                    {(nameInputDirty && nameInputError) && <div className="alert alert-danger mt-1" role="alert">{nameInputError}</div>}
                                    {(emailInputDirty && emailInputError) && <div className="alert alert-danger mt-1" role="alert">{emailInputError}</div>}
                                    {(passwordInputDirty && passwordInputError) && <div className="alert alert-danger mt-1" role="alert">{passwordInputError}</div>}
                                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                                    {success && <p style={{ color: 'green' }}>{success}</p>}

                                    <div className="mt-4 pt-2">
                                        <input data-mdb-ripple-init
                                               className="btn btn-primary btn-lg"
                                               type="submit"
                                               value={isRegister ? 'Register' : 'Login'}
                                               disabled={!formValid}
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