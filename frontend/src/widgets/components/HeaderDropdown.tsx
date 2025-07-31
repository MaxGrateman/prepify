import {ReactNode, ReactSVG, useEffect, useRef, useState} from "react";
import './../styles/Header.css'
import Link from "next/link";
import Image from "next/image";


interface HeaderDropdownProps {
    userId: number;
    user_image: string;
    userName: string;
    userEmail: string;
    children?: ReactNode;
}

export default function HeaderDropdown({user_image, userId, children, userEmail, userName} : HeaderDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    

    return(
    <div className="relative flex justify-end" ref={dropdownRef}>
        <button
            id="dropdownUserAvatarButton"
            onClick={toggleDropdown}
            aria-expanded={isOpen ? "true" : "false"}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
            type="button"
        >
            <Image className="rounded-full object-fill w-10 h-10" width={39} height={39} src={user_image} alt="user photo" />
            <span className="animate-pingSlow absolute inline-flex h-full w-full rounded-full bg-gray-200 opacity-50"></span>
        </button>

        {isOpen && (
            <div
                id="dropdownAvatar"
                className="absolute right-0 top-11 z-10 bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
                <div className="py-4">
                    <p className="px-4 text-base text-white tracking-wider font-medium">{userName}</p>
                    <p className="px-4 text-sm tracking-wider text-gray-700 dark:text-gray-200">{userEmail}</p>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link className="dropdown-item block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600" href={`/profile/${userId}`}>
                            My profile
                        </Link>
                    </li>
                </ul>
                <div className="py-2">{children}</div>
            </div>
        )}
    </div>
    )
}