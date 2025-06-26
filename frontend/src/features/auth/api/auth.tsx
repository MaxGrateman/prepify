import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

{/*Компонент авторизации пользователя по токену, отправляет введеный данные и сохраняет токен в куки*/}
interface AuthResponse {
    access_token: string;
}

export async function AuthUser(
    router: any,
    url: string,
    userData: {  name?: string; email: string; password: string; passwordConfirmation?: string;}
): Promise<void> {
    try {
        const response = await axios.post<AuthResponse>(url, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.access_token) {
            Cookies.set('token', response.data.access_token, { secure: true, sameSite: 'strict' });
        } else {
            throw new Error('Authentication failed');
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Undefined error');
        }
        throw new Error('Unexpected error');
    }
}
