import axios from "axios";

interface AuthUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}

interface AuthResponse {
    access_token: string;
}

export async function AuthUser(
    url: string,
    userData: { passwordConfirmation?: string; password: string; name?: string; email: string }): Promise<string> {
    try {
        const response = await axios.post<AuthResponse>(url, userData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.data.access_token) {
            console.log(response.data)
            return response.data.access_token;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.measure || 'Undefined error')
        }
        throw new Error('Unexpected error');
    }
}

