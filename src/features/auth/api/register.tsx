import axios from "axios";

interface RegisterUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

interface RegisterResponse {
    status: string;
    access_token: string;
}

export async function registerUser(userData: RegisterUserData): Promise<string> {
    try {
        const response = await axios.post<RegisterResponse>('http://157.245.123.144/api/auth/register', userData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.data.access_token) {
            console.log(response.data.access_token)
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

