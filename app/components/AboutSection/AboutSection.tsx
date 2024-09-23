"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ProfilePic from "@/public/about.webp";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    useEffect(() => {
        gsap.fromTo(
            ".profile-img",
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 80%",
                    end: "top top",
                    scrub: 1,
                },
            }
        );

        gsap.fromTo(
            ".about-text",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#about",
                    start: "top center",
                    end: "top top",
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <section
            id="about"
            className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden bg-hexwhite py-16"
        >
            <div className="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-12 relative z-10">
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <div className="profile-img w-full h-auto rounded-2xl shadow-2xl overflow-hidden">
                        <Image
                            src={ProfilePic}
                            alt="Profile Picture"
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </div>
                <div className="about-text w-full lg:w-1/2 text-center lg:text-left p-6 lg:p-8">
                    <h1 className="font-GeistSans text-7xl md:text-10xl lg:text-10xl font-black text-hexblack leading-none uppercase mb-8">
                        About
                    </h1>
                    <p className="font-GeistMono font-medium text-hexblack text-base leading-relaxed mb-4 text-justify">
                        I am Marek Jóźwiak, a web developer with a background in electronics and production management. My education and experience have equipped me with strong analytical skills, applied in both front-end and back-end development to deliver high-quality, scalable solutions.
                    </p>
                    <p className="font-GeistMono font-medium text-hexblack text-base leading-relaxed mb-4 text-justify">
                        Before web development, I served as Deputy Production Manager, which enhanced my leadership and communication skills and deepened my understanding of technical processes. I excel at working under pressure and ensuring smooth project execution.
                    </p>
                    <p className="font-GeistMono font-medium text-hexblack text-base leading-relaxed mb-4 text-justify">
                        I am committed to continuous learning and staying updated with the latest web technologies to provide innovative, user-friendly solutions.
                    </p>
                </div>
            </div>
        </section>
    );
}
