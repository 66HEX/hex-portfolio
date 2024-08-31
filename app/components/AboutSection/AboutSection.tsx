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
                        <Image src={ProfilePic} alt="Profile Picture" className="object-cover w-full h-full" />
                    </div>
                </div>
                <div className="about-text w-full lg:w-1/2 text-center lg:text-left p-6 lg:p-8 shadow-2xl rounded-2xl">
                    <h1 className="font-NeueMontreal text-7xl md:text-10xl lg:text-10xl font-black text-hexblack tracking-tight leading-none uppercase mb-8">
                        about
                    </h1>
                    <p className="font-SupplyMono text-hexblack text-lg leading-relaxed mb-6">
                        I am Marek Jóźwiak, a passionate web developer with a keen eye for design and a deep understanding of modern web technologies. My journey in web development started several years ago, and since then, I&#8217;ve honed my skills in both front-end and back-end development.
                    </p>
                    <p className="font-SupplyMono text-hexblack text-lg leading-relaxed mb-6">
                        Whether it&#8217;s creating a custom web design from scratch or developing a complex, scalable application, I always strive to deliver high-quality work that exceeds expectations. I am committed to continuous learning and staying up-to-date with the latest trends and technologies in the industry.
                    </p>
                </div>
            </div>
        </section>
    );
}
