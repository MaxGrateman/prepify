import AuthForm from '../../features/auth/components/AuthForm';
import {apiRegistration} from "@/features/auth/api/apiUrl";
import TransitionAuth from '@/utilities/TransitionAuth';
import { AnimatePresence } from 'motion/react';

export default function RegisterPage() {
    return  <AnimatePresence>
                <TransitionAuth>
                    <AuthForm isRegister={true} apiUrl={apiRegistration}/>
                </TransitionAuth> 
            </AnimatePresence>
    
}