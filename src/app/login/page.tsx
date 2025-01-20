import AuthForm from '../../features/auth/components/AuthForm';
import {apiLogin} from "@/features/auth/api/apiUrl";
import TransitionAuth from '@/utilities/TransitionAuth';
import { AnimatePresence } from 'motion/react';

export default function RegisterPage() {
    return <AnimatePresence>
                <TransitionAuth>
                    <AuthForm isRegister={false} apiUrl={apiLogin}/>
                </TransitionAuth>
            </AnimatePresence>
            
}