"use client";
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initializeLenis, destroyLenis } from '@/app/utils/LenisUtils';
import { initialBlobityOptions } from "./utils/BlobityConfig";
import useBlobity from "blobity/lib/react/useBlobity";
import Preloader from "@/app/components/ui/Preloader/Preloader";
import Menu from "@/app/components/ui/Menu/Menu";
import HomeSection from "@/app/components/HomeSection/HomeSection";
import AboutSection from "@/app/components/AboutSection/AboutSection";
import ServicesSection from "@/app/components/ServicesSection/ServicesSection";
import WorksSection from "@/app/components/WorksSection/WorksSection";
import ContactSection from "@/app/components/ContactSection/ContactSection";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    useEffect(() => {
        initializeLenis();

        return () => {
            destroyLenis();
        };
    }, []);

    const blobityInstance = useBlobity(initialBlobityOptions);

    useEffect(() => {
        if (blobityInstance.current) {
            // @ts-ignore for debugging purposes or playing around
            window.blobity = blobityInstance.current;
        }
    }, [blobityInstance]);


    return (
        <main className="bg-hexwhite">
            <Preloader/>
            <Menu/>
            <HomeSection/>
            <AboutSection/>
            <ServicesSection/>
            <WorksSection/>
            <ContactSection/>
        </main>
    );
}