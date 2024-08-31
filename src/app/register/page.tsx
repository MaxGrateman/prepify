import AuthForm from '../../features/auth/components/AuthForm';
import {apiRegistration} from "@/features/auth/api/apiUrl";

export default function RegisterPage() {
    return <AuthForm isRegister={true} apiUrl={apiRegistration}/>;
}