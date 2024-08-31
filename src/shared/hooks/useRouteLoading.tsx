import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const useRouteLoading = (onStart: any, onComplete: any) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const previousPathname = useRef(pathname);
    const previousSearchParams = useRef(searchParams.toString());

    useEffect(() => {
        if (pathname !== previousPathname.current || searchParams.toString() !== previousSearchParams.current) {
            if (onStart) onStart();

            const timer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 500);

            previousPathname.current = pathname;
            previousSearchParams.current = searchParams.toString();

            return () => clearTimeout(timer);
        }
    }, [pathname, searchParams, onStart, onComplete]);
};