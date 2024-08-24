import AuthForm from '../../features/auth/components/AuthForm';

export default function RegisterPage() {
    return <AuthForm isRegister={false} apiUrl="http://157.245.123.144/api/auth/login"/>;
}