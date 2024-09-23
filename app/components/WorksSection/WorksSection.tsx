"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from '@/app/utils/supabaseClient';

interface Project {
    title: string;
    description: string;
    image: string;
    githubLink?: string;
    liveDemoLink?: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function WorksSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsLoaded, setProjectsLoaded] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase.from('projects').select('*');
                if (error) {
                    throw new Error(error.message);
                }
                if (isMounted) {
                    setProjects(data as Project[]);
                    setProjectsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects().catch(console.error);

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (projectsLoaded) {

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
            ScrollTrigger.refresh();
        }
    }, [projectsLoaded]);

    return (
        <section id="works" className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-hexwhite flex flex-col items-center justify-center overflow-hidden py-16">
            <div className="text-center mb-12">
                <h1 className="font-GeistSans text-7xl md:text-10xl lg:text-10xl font-black text-hexblack leading-none uppercase text-center">
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
                        <div className="p-6 lg:p-8 flex-grow flex flex-col">
                            <h2 className="font-GeistSans text-2xl font-bold text-hexblack mb-4">{project.title}</h2>
                            <p className="font-GeistMono text-base text-hexblack leading-relaxed font-medium mb-4">{project.description}</p>
                            <div className="flex justify-between">
                                {project.githubLink ? (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                                       className="font-GeistMono font-semibold text-xl text-hexblack underline">
                                        GitHub
                                    </a>
                                ) : (
                                    <span className="font-GeistMono text-xl text-hexblack opacity-0">
                                        GitHub
                                    </span>
                                )}
                                {project.liveDemoLink ? (
                                    <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer"
                                       className="font-GeistMono font-semibold text-xl text-hexblack underline">
                                        Live Demo
                                    </a>
                                ) : (
                                    <span className="font-GeistMono text-xl text-hexblack opacity-0">
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
