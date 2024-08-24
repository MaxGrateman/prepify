'use client'

import '../styles/Header.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Header() {
    const pathname = usePathname();

    return(
        <header className="p-3 text-bg-dark ">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2">
                    <p className="fs-3 p-1 col-md-2 mb-2 mb-md-0 pointer-cursor">Prepify</p>
                    <nav className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link className={`text-white nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/">
                            Home
                        </Link>
                    </nav>
                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">
                            <Link className={`nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/login">
                                Login
                            </Link>
                        </button>
                        <button type="button" className="btn btn-warning" >
                            <Link className={`nav-link px-2 ${pathname === '/' ? 'active' : ''}`} href="/register">
                                Sign-up
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;