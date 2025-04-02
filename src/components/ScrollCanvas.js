"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ScrollCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            setIsMobile(window.innerWidth <= 768);
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                redrawCanvas();
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            const imageArray = [];
            for (let i = 1; i <= 149; i++) {
                const img = new Image();
                img.src = `/assets/fallback/unbilled-${i}.jpg`;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
                imageArray.push(img);
            }
            setImages(imageArray);
            setLoaded(true);
        };
        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 148]);

    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        const currentIndex = Math.floor(frameIndex.get());
        const img = images[currentIndex];
        if (img) {
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);
            const scaleFactor = isMobile ? 0.8 : 1;
            const imgAspect = img.width / img.height;
            let drawWidth = windowSize.width * scaleFactor;
            let drawHeight = drawWidth / imgAspect;
            let offsetX = 0,
                offsetY = (windowSize.height - drawHeight) / 2;
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

    return (
        <section ref={containerRef} style={{ height: isMobile ? "300vh" : "500vh" }} className="position-relative">
            <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center bg-dark">
                <canvas ref={canvasRef} width={windowSize.width} height={windowSize.height} style={{ width: "100%", height: "100%", touchAction: "none" }} />
                {!loaded && (
                    <div className="position-absolute text-white text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading animation...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ScrollCanvas;
