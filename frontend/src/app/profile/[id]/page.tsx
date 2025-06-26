'use client'

import Profile from "@/features/profile/components/Profile";
import {useParams} from "next/navigation";


export default function ProfilePage() {
    const params = useParams();
    const { id } = params

    return <Profile userId={id as string}/>
}