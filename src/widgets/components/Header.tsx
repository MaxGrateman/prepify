'use client';

import '../../shared/styles/Header.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRouteLoading } from '@/shared/hooks/useRouteLoading';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useRouteLoading(
        () => setIsLoading(true),
        () => setIsLoading(false),
    );

    const handleLinkClick = (e: any, path: string) => {
        e.preventDefault();
        router.push(path);
    };

    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
                    <p className="fs-3 p-1 col-md-2 mb-2 mb-md-0 pointer-cursor">Prepify</p>
                    <nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link className={`text-white nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/" onClick={(e) => handleLinkClick(e, '/')}>
                            Home
                        </Link>
                        <Link className={`text-white nav-link px-2 ${pathname === '/courses' ? 'active' : ''}`} href="/courses" onClick={(e) => handleLinkClick(e, '/courses')}>
                            Courses
                        </Link>
                        <Link className={`text-white nav-link px-2 ${pathname === '/about' ? 'active' : ''}`} href="/about" onClick={(e) => handleLinkClick(e, '/about')}>
                            About
                        </Link>
                        <Link className={`text-white nav-link px-2 ${pathname === '/help' ? 'active' : ''}`} href="/help" onClick={(e) => handleLinkClick(e, '/help')}>
                            Help
                        </Link>
                    </nav>
                    <div className="d-flex justify-content-center align-items-center text-end col col-lg-auto mb-2 mb-md-0">

                        <Link className={`nav-link ${pathname === '/login' ? 'active' : ''}`} href="/login" onClick={(e) => handleLinkClick(e, '/login')}>
                            <button type="button" className="btn btn-outline-light me-2">
                                Login
                            </button>
                        </Link>

                        <Link className={`nav-link ${pathname === '/register' ? 'active' : ''}`} href="/register" onClick={(e) => handleLinkClick(e, '/register')}>
                            <button type="button" className="btn btn-warning">
                                Sign-up
                            </button>
                        </Link>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;