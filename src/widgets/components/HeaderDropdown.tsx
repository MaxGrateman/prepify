import {ReactNode, ReactSVG, useEffect, useRef, useState} from "react";
import './../styles/Header.css'
import Link from "next/link";


interface HeaderDropdownProps {
    userId: number;
    user_image: string;
    children?: ReactNode;
}

export default function HeaderDropdown({user_image, userId, children} : HeaderDropdownProps) {
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
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
        >
            <img className="w-10 h-10 rounded-full" src={user_image} alt="user photo" />
            <span className="animate-pingSlow absolute inline-flex h-full w-full rounded-full bg-gray-200 opacity-50"></span>
        </button>

        {isOpen && (
            <div
                id="dropdownAvatar"
                className="absolute right-0 top-11 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
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