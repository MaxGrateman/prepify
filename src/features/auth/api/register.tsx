import axios from "axios";
import jwt from 'jsonwebtoken';

interface RegisterUserData {
    username: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    status: string;
    access_token: string;
}

export async function registerUser(userData: RegisterUserData): Promise<string> {
    try {
        const response = await axios.post<RegisterResponse>('#', userData);

        if (response.data.access_token) {
            return response.data.access_token;
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.measure || 'Undefined error')
        }
        throw new Error('Unexpected error');
    }
}

