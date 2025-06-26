import { AnimatePresence } from "motion/react";
import PasswordRecover from "../../features/auth/components/PasswordRecover";
import TransitionAuth from "@/utilities/transitions/TransitionAuth";

export default function passwordRecoverPage() {
    return <AnimatePresence>
                <TransitionAuth>
                    <PasswordRecover/>
                </TransitionAuth>
            </AnimatePresence>
}