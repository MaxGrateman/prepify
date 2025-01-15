import AuthForm from '../../features/auth/components/AuthForm';
import {apiLogin} from "@/features/auth/api/apiUrl";
import TransitionAuth from '@/utilities/TransitionAuth';

export default function RegisterPage() {
    return <TransitionAuth>
                <AuthForm isRegister={false} apiUrl={apiLogin}/>
            </TransitionAuth>
}