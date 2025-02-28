"use client";

import { useState } from "react";
import axios from "axios";
import { apiPasswordRecover } from "@/features/auth/api/apiUrl";
import {useRouter} from "next/navigation";

{/*Компонент по востановлению пароля*/}
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
    const router = useRouter();

    {/*Функция по отслеживанию инпута*/}
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    {/*Функция по отправки формы имейла на сервер*/}
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(apiPasswordRecover, { email: formData.email });

            setError(null);
            router.push('/passwordSuccess')
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <section className="mt-48">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-neutral-100 shadow-lg shadow-neutral-100/50 rounded-md box-border px-8 py-6">
                <h3 className="mb-6 text-xl tracking-wider">PASSWORD RECOVERY</h3>
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
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                
                    <button type="submit" 
                            className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-10 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
                        Send
                    </button>
                </div>
            </form>
        </section>    
    );
}

export default PasswordRecover;