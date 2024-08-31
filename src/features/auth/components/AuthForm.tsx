"use client";

import '../styles/RegisterForm.css'
import {useState} from 'react';
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
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value});
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isRegister && formData.password !== formData.passwordConfirmation) {
            setError("Passwords don't match");
            return;
        }

        try {
            const token = await AuthUser(apiUrl,{
                ...formData,
                ...(isRegister && {password_confirmation: formData.passwordConfirmation}),
            })

            setSuccess(isRegister ? 'Registration successful!' : 'Login Successful');
            setError(null);


            localStorage.setItem('token', token);
        } catch (error: any) {
            setFormData(initialFormData)
            setError(error.message);
            setSuccess(null);
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
                                                           id="name"
                                                           required
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
                                                       placeholder="E-mail"
                                                       required
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
                                                       placeholder="Password"
                                                       required
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

                                            <div className="form-floating mb-3">
                                                <input type={passwordVisible ? "text" : "password"}
                                                       placeholder="Password Confirmation"
                                                       required
                                                       id="passwordConfirmation"
                                                       className="form-control form-control-lg"
                                                       value={formData.passwordConfirmation}
                                                       onChange={handleChange}
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
                                        <Link className={`text-blue nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/passwordRecover">
                                            Forgot password?
                                        </Link>
                                    )}

                                    {error && <p style={{ color: 'red' }}>{error}</p>}
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