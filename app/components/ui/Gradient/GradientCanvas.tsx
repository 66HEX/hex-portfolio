"use client";
import React, { useEffect } from 'react';
import { Gradient } from './Gradient.js';

const GradientCanvas: React.FC = () => {
    useEffect(() => {
        const gradient = new Gradient();
        // @ts-ignore
        gradient.initGradient('#gradient-canvas');
    }, []);

    return (
        <canvas
            id="gradient-canvas"
            data-transition-in
            className="w-full h-full absolute top-0 left-0 rounded-2xl"
            style={{
                '--gradient-color-1': '#032B41',
                '--gradient-color-2': '#022233',
                '--gradient-color-3': '#1A8E68',
                '--gradient-color-4': '#0C4446',
            } as React.CSSProperties}
        />

    );
};

export default GradientCanvas;
