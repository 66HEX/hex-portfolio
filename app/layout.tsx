import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/app/components/SessionProviderWrapper";
export const metadata: Metadata = {
    title: "Hex - Freelance Web Developer",
    description: "Portfolio of HEX, a freelance web developer specializing in modern web technologies.",
    keywords: "freelance web developer, web development, portfolio",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <SessionProviderWrapper>
            {children}
        </SessionProviderWrapper>
        </body>
        </html>
    );
}