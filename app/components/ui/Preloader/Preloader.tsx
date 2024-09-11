"use client";
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Logo from '@/app/assets/svg/hex-logo.svg';

const Preloader: React.FC = () => {
    useEffect(() => {

        const logo = document.querySelector(".logo") as HTMLElement;
        if (logo) {
            logo.style.transform = 'scale(0)';
            logo.style.opacity = '0';
        }

        logo?.offsetHeight; // Trigger reflow

        const tl = gsap.timeline({ paused: false });

        tl
            .to({}, { duration: 0.5 })
            .to(".logo", {
                duration: 1,
                scale: 1,
                opacity: 1,
                ease: "power3.out",
            })
            .to({}, { duration: 0.5 }) // Pause to keep the logo visible
            .to(".logo", {
                duration: 1,
                scale: 0,
                opacity: 0,
                ease: "power3.in",
            })
            .to("#preloader", {
                duration: 0.5,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    const preloader = document.getElementById("preloader");
                    if (preloader) {
                        preloader.style.visibility = 'hidden';
                        preloader.style.pointerEvents = 'none';
                    }
                }
            });
        tl.play();

    }, []);

    return (
        <div>
            <div
                id="preloader"
                className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-svh z-[100] bg-hexgreen2"
            >
                <Logo className="fill-hexwhite z-100 logo opacity-0" alt="HEX Logo" height={300} width={300}/>
            </div>
        </div>
    );
};

export default Preloader;
