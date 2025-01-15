import AuthForm from '../../features/auth/components/AuthForm';
import {apiRegistration} from "@/features/auth/api/apiUrl";
import TransitionAuth from '@/utilities/TransitionAuth';

export default function RegisterPage() {
    return <TransitionAuth>
                <AuthForm isRegister={true} apiUrl={apiRegistration}/>
            </TransitionAuth> 
    
}