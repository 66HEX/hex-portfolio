"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPaintBrush, FaLaptopCode, FaSearch, FaWrench, FaShoppingCart, FaRocket } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        title: "Custom Web Design",
        description: "Crafting unique, responsive, and aesthetically pleasing web designs tailored your brand.",
        icon: <FaPaintBrush className="text-5xl mb-4 text-hexblack" />,
    },
    {
        title: "Front-End Development",
        description: "Building dynamic and interactive user interfaces with the latest technologies.",
        icon: <FaLaptopCode className="text-5xl mb-4 text-hexblack" />,
    },
    {
        title: "SEO Optimization",
        description: "Enhancing your website's visibility and ranking in search engine results.",
        icon: <FaSearch className="text-5xl mb-4 text-hexblack" />,
    },
    {
        title: "Maintenance & Support",
        description: "Providing ongoing support and updates to ensure your site runs smoothly.",
        icon: <FaWrench className="text-5xl mb-4 text-hexblack" />,
    },
    {
        title: "E-commerce Solutions",
        description: "Creating seamless and secure online shopping experiences for your customers.",
        icon: <FaShoppingCart className="text-5xl mb-4 text-hexblack" />,
    },
    {
        title: "Performance Optimization",
        description: "Improving website speed and performance for a better user experience.",
        icon: <FaRocket className="text-5xl mb-4 text-hexblack" />,
    },
];

export default function ServicesSection() {
    useEffect(() => {
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
            <h1 className="font-GeistSans text-7xl md:text-10xl font-black text-hexblack leading-none uppercase text-center">
                Services
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 max-w-7xl">
                {servicesData.map((service, index) => (
                    <div key={index} className="service-card bg-hexwhite text-hexblack p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col items-center" data-blobity>
                        {service.icon}
                        <h2 className="font-bold text-2xl mb-2 text-center font-GeistSans">{service.title}</h2>
                        <p className="font-GeistMono text-base text-center">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
