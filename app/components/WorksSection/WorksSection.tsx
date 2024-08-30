"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Gym Website",
        description: "Created a powerful online presence for powerlifting enthusiasts.",
        image: "/works/leanbulls-resized.webp",
        githubLink: "https://github.com/66HEX/lean-bulls-gym",
        liveDemoLink: "https://66hex.github.io/lean-bulls-gym/"
    },
    {
        title: "Logo Design",
        description: "Designed a fresh and distinctive logo to enhance brand identity.",
        image: "/works/logo-resized.webp"
    },
    {
        title: "E-commerce Store",
        description: "Launched a seamless online shopping experience using Shopify.",
        image: "/works/natalia-resized.webp",
        liveDemoLink: "https://nataliajasinska.pl/"
    },
    {
        title: "Sponsorship Proposal",
        description: "Designed an eye-catching sponsorship proposal.",
        image: "/works/sponsorship-resized.webp",
    },
    {
        title: "Landing Page",
        description: "Designed an impactful landing page highlighting marketing solutions.",
        image: "/works/mocommerce-resized.webp",
        githubLink: "https://github.com/66HEX/mo-commerce",
        liveDemoLink: "https://mocommerce.pl/"
    }
];

export default function WorksSection() {
    useEffect(() => {
        // Animation for the section title
        gsap.fromTo(
            "#works",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#works h1",
                    start: "top 80%",
                    end: "top top",
                    scrub: 1,
                },
            }
        );

        // Animation for the project cards
        gsap.fromTo(
            ".project-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#works",
                    start: "top center",
                    end: "top top",
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <section id="works" className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-hexwhite flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="text-center mb-12">
                <h1 className="font-NeueMontreal text-7xl md:text-10xl lg:text-10xl font-black text-hexblack tracking-tight leading-none uppercase text-center">
                    works
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div key={index} className="project-card flex flex-col rounded-2xl overflow-hidden shadow-2xl max-w-full">
                        <div className="relative w-full h-64">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-t-2xl"
                            />
                        </div>
                        <div className="p-6 lg:p-8">
                            <h2 className="font-NeueMontreal text-2xl lg:text-3xl font-bold text-hexblack mb-4">{project.title}</h2>
                            <p className="font-SupplyMono text-hexblack mb-4">{project.description}</p>
                            <div className="flex justify-between">
                                {project.githubLink ? (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                       className="font-SupplyMono text-base lg:text-lg text-hexblack underline">
                                        GitHub
                                    </a>
                                ) : (
                                    <span className="font-SupplyMono text-base lg:text-lg text-hexblack opacity-0">
                                        GitHub
                                    </span>
                                )}
                                {project.liveDemoLink ? (
                                    <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer"
                                       className="font-SupplyMono text-base lg:text-lg text-hexblack underline">
                                        Live Demo
                                    </a>
                                ) : (
                                    <span className="font-SupplyMono text-base lg:text-lg text-hexblack opacity-0">
                                        Live Demo
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
