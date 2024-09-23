"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaKey } from 'react-icons/fa';

const Menu: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);

    const navRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);
    const toggleButtonLine1Ref = useRef<HTMLDivElement>(null);
    const toggleButtonLine2Ref = useRef<HTMLDivElement>(null);
    const navMenuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (navRef.current && toggleButtonRef.current && toggleButtonLine1Ref.current && toggleButtonLine2Ref.current && navMenuRef.current) {
            gsap.set(navRef.current, { width: '4rem', height: '4rem', borderRadius: '5rem' });
            gsap.set(toggleButtonLine1Ref.current, { rotate: 0, top: '42.5%', left: '50%' });
            gsap.set(toggleButtonLine2Ref.current, { rotate: 0, top: '57.5%', left: '50%' });
            gsap.set(navMenuRef.current, { opacity: 0, visibility: 'hidden' });
        }
    }, []);

    const handleToggle = useCallback(() => {
        const isExpanded = !isToggled;

        gsap.to(navRef.current, {
            duration: 0.3,
            width: isExpanded ? '20rem' : '4rem',
            height: isExpanded ? '30rem' : '4rem',
            borderRadius: isExpanded ? '1rem' : '1rem',
            ease: 'power2.inOut',
        });

        gsap.to(toggleButtonLine1Ref.current, {
            duration: 0.2,
            rotate: isExpanded ? 45 : 0,
            top: isExpanded ? '50%' : '42.5%',
            left: '50%',
            ease: 'power2.inOut',
            transformOrigin: 'center',
        });

        gsap.to(toggleButtonLine2Ref.current, {
            duration: 0.2,
            rotate: isExpanded ? -45 : 0,
            top: isExpanded ? '50%' : '57.5%',
            left: '50%',
            ease: 'power2.inOut',
            transformOrigin: 'center',
        });

        gsap.to(navMenuRef.current, {
            duration: 0.4,
            visibility: isExpanded ? 'visible' : 'hidden',
            opacity: isExpanded ? 1 : 0,
            ease: 'power2.inOut',
        });

        setIsToggled(isExpanded);
    }, [isToggled]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                handleToggle(); // Close menu if click is outside
            }
        };

        if (isToggled) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isToggled, handleToggle]);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        const lenis = (globalThis as any).lenis;
        if (section && lenis) {
            lenis.scrollTo(section, { offset: 0 });
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();
        scrollToSection(id);
        handleToggle();
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-2 right-2 h-16 w-16 bg-hexgreen3 rounded-2xl z-40"
        >
            <button
                id="toggleButton"
                aria-expanded={isToggled}
                aria-controls="menu"
                aria-label="menu button"
                className="absolute top-0 right-0 h-16 w-16 rounded-2xl bg-hexgreen3 cursor-pointer z-50 "
                onClick={handleToggle}
                ref={toggleButtonRef}
            >
                <div
                    ref={toggleButtonLine1Ref}
                    id="toggleButtonLine1"
                    className="absolute h-1 bg-hexwhite w-1/2 top-[42.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                ></div>
                <div
                    ref={toggleButtonLine2Ref}
                    id="toggleButtonLine2"
                    className="absolute h-1 bg-hexwhite w-1/2 top-[57.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                ></div>
            </button>
            <ul
                id="menu"
                className="h-full w-full flex flex-col items-center justify-start gap-4 p-5 opacity-0 invisible drop-shadow-2xl"
                ref={navMenuRef}
                aria-hidden={!isToggled}
            >
                <li className="w-full text-2xl font-medium list-none flex items-center justify-between">
                    <Link href="#home" aria-label="home section button"
                          className="font-GeistSans text-4xl text-hexwhite"
                          onClick={(e) => handleClick(e, 'home')}>
                        home
                    </Link>
                </li>
                <li className="w-full text-2xl font-medium list-none flex items-center justify-between">
                    <Link href="#about" aria-label="about section button"
                          className="font-GeistSans text-4xl text-hexwhite"
                          onClick={(e) => handleClick(e, 'about')}>
                        about
                    </Link>
                </li>
                <li className="w-full text-2xl font-medium list-none flex items-center justify-between">
                    <Link href="#services" aria-label="services section button"
                          className="font-GeistSans text-4xl text-hexwhite"
                          onClick={(e) => handleClick(e, 'services')}>
                        services
                    </Link>
                </li>
                <li className="w-full text-2xl font-medium list-none flex items-center justify-between">
                    <Link href="#works" aria-label="works section button"
                          className="font-GeistSans text-4xl text-hexwhite"
                          onClick={(e) => handleClick(e, 'works')}>
                        works
                    </Link>
                </li>
                <li className="w-full text-2xl font-medium list-none flex items-center justify-between">
                    <Link href="#contact" aria-label="contact section button"
                          className="font-GeistSans text-4xl text-hexwhite"
                          onClick={(e) => handleClick(e, 'contact')}>
                        contact
                    </Link>
                </li>
                <div className="absolute flex justify-between items-center w-full px-5 bottom-5">
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/hexthecoder/" target="_blank" rel="noopener noreferrer"
                           title="Instagram"
                           className="text-hexblack hover:text-gray-700">
                            <FaInstagram className="w-12 h-12 rounded-2xl bg-hexwhite fill-hexblack p-2"/>
                        </a>
                        <a href="https://github.com/66HEX/" target="_blank" rel="noopener noreferrer"
                           title="GitHub"
                           className="text-hexblack hover:text-gray-700">
                            <FaGithub className="w-12 h-12 rounded-2xl bg-hexwhite fill-hexblack p-2"/>
                        </a>
                    </div>
                    <a href="/admin/login" rel="noopener noreferrer" title="Admin Panel"
                       className="text-hexblack hover:text-gray-700">
                        <FaKey className="w-12 h-12 rounded-2xl bg-hexwhite fill-hexblack p-2"/>
                    </a>
                </div>

            </ul>
        </nav>
    );
};

export default Menu;