"use client";

import { useState } from "react";
import axios from "axios";
import { apiPasswordRecover } from "@/features/auth/api/apiUrl";

interface FormData {
    email: string;
}

const initialEmail: FormData = {
    email: '',
};

function PasswordRecover() {
    const [formData, setFormData] = useState<FormData>(initialEmail);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(apiPasswordRecover, { email: formData.email });

            setSuccess('Please, check your e-mail');
            setError(null);
        } catch (error: any) {
            setError(error.message);
            setSuccess(null);
        }
    };

    return (
        <section className="vh-90">
            <div className="container py-5 h-100 slideIn">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Password Recovery</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div data-mdb-input-init className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="E-mail"
                                                    className="form-control form-control-lg"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="email">E-mail</label>
                                            </div>
                                        </div>
                                    </div>

                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    {success && <p style={{ color: 'green' }}>{success}</p>}

                                    <div className="mt-4 pt-2">
                                        <input
                                            data-mdb-ripple-init
                                            className="btn btn-primary btn-lg"
                                            type="submit"
                                            value="Send"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PasswordRecover;