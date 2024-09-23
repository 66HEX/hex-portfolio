"use client";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        tl.fromTo(
            "#contact h2",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );

        tl.fromTo(
            "#contact p",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4" // Opóźnienie, które sprawia, że animacja zaczyna się nieco wcześniej
        );

        tl.fromTo(
            "#contact button",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.4"
        );

        gsap.fromTo(
            ".toast-message",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", paused: true }
        );
    }, []);

    useEffect(() => {
        if (showMessage) {
            const toastAnimation = gsap.fromTo(
                ".toast-message",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
            toastAnimation.play();
            setTimeout(() => {
                toastAnimation.reverse();
                setTimeout(() => setShowMessage(false), 500);
            }, 3000);
        }
    }, [showMessage]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('hexthecoder@gmail.com').then(() => {
            setShowMessage(true);
        });
    };

    return (
        <section id="contact" className="w-screen p-4 md:p-8 lg:p-12 xl:p-16 overflow-hidden bg-hexwhite">
            <div className="h-full w-full bg-hexgreen3 flex flex-col md:flex-row justify-between items-center p-6 lg:p-8 rounded-2xl gap-6 md:gap-0">
                <h2 className="text-hexwhite font-GeistSans text-4xl md:text-5xl lg:text-7xl font-black uppercase text-center md:text-left">
                    Let&#8217;s Work Together
                </h2>
                <p className="text-hexwhite font-GeistMono text-base font-medium text-center md:text-left p-0 md:p-6 lg:p-8 md:mx-5 xl:mr-20">
                    I&#8217;m available for freelance projects. Let’s connect and create something great together!
                </p>
                <button
                    onClick={handleCopyEmail}
                    className="px-8 py-4 w-full md:w-80 bg-hexblack text-hexwhite font-semibold text-xl md:text-2xl font-GeistSans rounded-2xl shadow-lg"
                >
                    Contact Me
                </button>
            </div>
            {showMessage && (
                <div className="toast-message font-medium fixed bottom-4 right-4 bg-hexblack text-hexwhite px-4 py-2 rounded-lg shadow-lg z-50 font-GeistMono">
                    Email copied to clipboard!
                </div>
            )}
        </section>
    );
}
