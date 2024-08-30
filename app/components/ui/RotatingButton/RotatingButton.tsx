"use client";
import { useEffect, useRef } from 'react';
import ArrowDown from '@/app/assets/svg/arrow-down.svg';

const Button: React.FC = () => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const textElement = textRef.current;
        if (textElement) {
            const text = textElement.innerText;
            const length = text.length;
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const angleIncrement = isMobile
                ? 360 / length + 1.2
                : 360 / length + 0.1;

            textElement.innerHTML = text
                .split("")
                .map(
                    (char, i) => `<span style="transform:rotate(${i * angleIncrement}deg)">${char}</span>`
                )
                .join("");
        }
    }, []);

    return (
        <div
            style={{
                width: '150px',
                height: '150px',
                borderRadius: '75px',
            }}
            className="relative flex justify-center items-center mt-5 md:mt-0"
        >
            <button
                aria-label="Scroll down"
                className="absolute border-4 border-solid border-hexwhite px-5 py-5 rounded-full overflow-hidden group hover:bg-hexwhite z-10"
            >
                <div className="relative z-10 flex items-center justify-center">
                    <ArrowDown
                        className="w-10 h-10 fill-hexwhite transition-colors duration-300 group-hover:fill-hexblack"
                    />
                </div>
            </button>
            <div
                style={{
                    animation: 'textRotation 8s linear infinite',
                }}
                className="text absolute h-full w-full text-hexwhite text-2xl font-SupplyMono" ref={textRef}>
                <p>services•services•</p>
            </div>
        </div>
    );
};

export default Button;
