"use client";

import '../styles/RegisterForm.css'
import {useState} from 'react';
import {registerUser} from '../api/register';

interface FormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
}

function RegisterForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(formData.password !== formData.passwordConfirmation) {
            setError("Passwords don't match");
            return;
        }

        try {
            const token = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.passwordConfirmation,
            })

            console.log(token)
            setSuccess('Registration successful!');
            setError(null);

            localStorage.setItem('token', token);
        } catch (error: any) {
            setError(error.message);
            setSuccess(null);
        }
    }

    return(
        <section className="vh-90">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{borderRadius: "15px"}}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form onSubmit={handleSubmit}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <div data-mdb-input-init className="form-outline">
                                                <input type="text"
                                                       id="name"
                                                       className="form-control form-control-lg"
                                                       value={formData.name}
                                                       onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="username">Username</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div data-mdb-input-init className="form-outline">
                                                <input type="text"
                                                       id="email"
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
                                            <div data-mdb-input-init className="form-outline">
                                                <input type="password"
                                                       id="password"
                                                       className="form-control form-control-lg"
                                                       value={formData.password}
                                                       onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <input type="password"
                                                       id="passwordConfirmation"
                                                       className="form-control form-control-lg"
                                                       value={formData.passwordConfirmation}
                                                       onChange={handleChange}
                                                />
                                                <label className="form-label" htmlFor="passwordConfirmation">Password Confirmation</label>
                                            </div>

                                        </div>
                                    </div>

                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    {success && <p style={{ color: 'green' }}>{success}</p>}

                                    <div className="mt-4 pt-2">
                                        <input data-mdb-ripple-init
                                               className="btn btn-primary btn-lg"
                                               type="submit"
                                               value="Submit"
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

export default RegisterForm;