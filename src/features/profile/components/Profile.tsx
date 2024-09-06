'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import {apiProfile} from "@/features/profile/api/apiUrlProfile";
{/*Компонент профиля*/}

export interface UserProfile {
    about: string | null;
    age: number | null;
    country: string | null;
    email: string;
    email_verified_at: string | null;
    id: number;
    image_path: string | undefined;
    level: string | null;
    name: string;
    place_of_work: string | null;
    stack: string | null;
}

interface ApiResponse {
    user: UserProfile;
}

function Profile() {
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();

    {/*хук беспрерывного получению данных токена с сервера*/}
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await axios.get<ApiResponse>(apiProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.user);

            } catch (error) {
                setError('Failed to fetch user data');
                router.push('/login');
            }
        };

        fetchUserData();
    }, [router]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    } else {
        console.log(userData.name)
    }

    return (
        <div>
            <h1>{userData.name}</h1>
            <p>Email: {userData.email}</p>
            <p>Age: {userData.age ?? 'N/A'}</p>
            <p>Country: {userData.country ?? 'N/A'}</p>
            <p>About: {userData.about ?? 'N/A'}</p>
            <p>Place of Work: {userData.place_of_work ?? 'N/A'}</p>
            <p>Stack: {userData.stack ?? 'N/A'}</p>
            <p>Level: {userData.level ?? 'N/A'}</p>
            <img src={userData.image_path} alt="profile_image"/>
        </div>
    );
}

export default Profile;