"use client"
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
    useEffect(() => {
        // Animation for the section title
        gsap.fromTo(
            "#services h1",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#services",
                    start: "top 80%",
                    end: "top top",
                    scrub: 1,
                },
            }
        );

        // Animation for service cards
        gsap.fromTo(
            ".service-card",
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#services",
                    start: "top center",
                    end: "top top",
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <section
            id="services"
            className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-hexwhite relative flex flex-col items-center justify-center overflow-hidden py-16"
        >
            <h1 className="font-NeueMontreal text-7xl md:text-10xl lg:text-10xl font-black text-hexblack tracking-tight leading-none uppercase text-center">
                services
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 max-w-7xl">
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-lg" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">Custom Web Design</h2>
                    <p className="font-SupplyMono text-lg">Crafting unique and responsive designs tailored to your brand.</p>
                </div>
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-lg" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">Front-End Development</h2>
                    <p className="font-SupplyMono text-lg">Building dynamic and interactive user interfaces with the latest technologies.</p>
                </div>
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-2xl" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">SEO Optimization</h2>
                    <p className="font-SupplyMono text-lg">Enhancing your website&#8217;s visibility and ranking in search engine results.</p>
                </div>
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-2xl" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">Maintenance & Support</h2>
                    <p className="font-SupplyMono text-lg">Providing ongoing support and updates to ensure your site runs smoothly.</p>
                </div>
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-2xl" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">E-commerce Solutions</h2>
                    <p className="font-SupplyMono text-lg">Creating seamless and secure online shopping experiences for your customers.</p>
                </div>
                <div className="service-card bg-hexwhite text-hexblack p-6 lg:p-8 rounded-2xl shadow-2xl" data-blobity>
                    <h2 className="font-bold text-2xl mb-4">Performance Optimization</h2>
                    <p className="font-SupplyMono text-lg">Improving website speed and performance for a better user experience.</p>
                </div>
            </div>
        </section>
    );
}
