"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientCanvas from "@/app/components/ui/Gradient/GradientCanvas";
import RotatingButton from "@/app/components/ui/RotatingButton/RotatingButton";
import Logo from "@/app/assets/svg/hex-logo.svg";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSection() {
    useEffect(() => {
        gsap.fromTo(
            ".scrolltrigger",
            { y: 0, scale: 1 },
            {
                scale: 0.9,
                y: 1000,
                scrollTrigger: {
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );
    }, []);

    const scrollToSection = (id: string) => {
        const lenis = (globalThis as typeof globalThis & { lenis?: any }).lenis;
        if (lenis) {
            lenis.scrollTo('#services', { offset: 0 });
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
        event.preventDefault();
        scrollToSection(id);
    };

    return (
        <section id="home" className="h-svh w-screen p-4 md:p-8 lg:p-12 xl:p-16 overflow-hidden bg-hexwhite relative z-10">
            <div className="h-full w-full relative flex justify-center items-center flex-col gap-10 scrolltrigger">
                <GradientCanvas />
                <Logo className="h-14 w-auto fill-hexwhite absolute top-5 left-5" alt="Logo" data-blobity />
                <h1 className="font-GeistSans text-8xl md:text-12xl lg:text-12xl font-black text-hexwhite leading-none uppercase text-center z-10">
                    <span className="block md:block lg:block">hex</span>
                    <span className="block md:block lg:inline">the </span>
                    <span className="block md:block lg:inline">coder</span>
                </h1>
                <div onClick={(event) => handleClick(event, "services")}>
                    <RotatingButton />
                </div>
                <p className="font-GeistMono text-hexwhite font-medium absolute bottom-5 right-5">
                    Available for freelance work
                </p>
                <p className="font-GeistMono text-hexwhite font-medium absolute bottom-5 left-5 hidden md:block">
                    (Web designer & developer)
                </p>
            </div>
        </section>
    );
}
