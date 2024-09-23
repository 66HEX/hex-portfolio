import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import SplitTextWrapper from "@/app/components/ui/LetterWrapper/SplitTextWrapper";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            gsap.to(menuRef.current, {
                duration: 0.5,
                x: 0,
                opacity: 1,
                ease: "power2.out"
            });
        } else {
            gsap.to(menuRef.current, {
                duration: 0.5,
                x: 300, // Wysunięcie w prawo
                opacity: 0,
                ease: "power2.in"
            });
        }
    }, [isMenuOpen]);

    return (
        <nav className="absolute z-50 top-0 right-0 flex justify-end items-center py-4 px-4 md:px-8 lg:px-12 xl:px-16 text-hexblack font-GeistMono">
            <button
                className="rounded-full border-hexblack text-hexblack text-base border-2 px-2 py-1 z-50"
                onClick={toggleMenu}
            >
                <SplitTextWrapper>Menu</SplitTextWrapper>
            </button>
            <div
                ref={menuRef}
                className={`absolute h-screen top-0 right-0 bg-white shadow-lg p-4 opacity-0 z-30`}
                style={{ transform: 'translateX(300px)' }}
            >
                <ul className="flex flex-col mt-20">
                    <li className="py-2">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="py-2">
                        <Link href="/services">Services</Link>
                    </li>
                    <li className="py-2">
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
