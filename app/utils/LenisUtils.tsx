import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const initializeLenis = () => {
    if (!lenisInstance) {
        lenisInstance = new Lenis({
            duration: 1.8,
            smoothWheel: true,
        });

        const raf: FrameRequestCallback = (time) => {
            lenisInstance!.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        (globalThis as any).lenis = lenisInstance;
    }
};

export const destroyLenis = () => {
    if (lenisInstance) {
        delete (globalThis as any).lenis;
        lenisInstance = null;
    }
};