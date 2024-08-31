import AuthForm from '../../features/auth/components/AuthForm';
import {apiLogin} from "@/features/auth/api/apiUrl";

export default function RegisterPage() {
    return <AuthForm isRegister={false} apiUrl={apiLogin}/>;
}