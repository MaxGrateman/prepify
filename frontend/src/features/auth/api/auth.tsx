import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

{/*Компонент авторизации пользователя по токену, отправляет введеный данные и сохраняет токен в куки*/}
interface AuthResponse {
    token: string;
    access_token: string;
}

export async function AuthUser(
    router: any,
    url: string,
    userData: { name?: string; email: string; password: string; password_confirmation?: string; }
): Promise<boolean> {
    try {
        const response = await axios.post<AuthResponse>(url, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.access_token || response.data.token) {
            const token = response.data.access_token || response.data.token;
            Cookies.set('token', token, { secure: true, sameSite: 'strict' });
            return true;
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

