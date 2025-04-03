"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const TOTAL_FRAMES = 149;
const MOBILE_FRAME_COUNT = 50;
const IMAGE_PATH = "/assets/fallback/unbilled-";

const ScrollCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Handle resizing & detect mobile
    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 768;
            setIsMobile(mobileCheck);

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

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

    // Optimized image loading
    useEffect(() => {
        const loadImages = async () => {
            const totalFrames = isMobile ? MOBILE_FRAME_COUNT : TOTAL_FRAMES;
            const imageArray = new Array(totalFrames);

            await Promise.all(
                Array.from({ length: totalFrames }, (_, i) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = `${IMAGE_PATH}${i + 1}.jpg`;
                        img.onload = () => {
                            imageArray[i] = img;
                            resolve();
                        };
                        img.onerror = reject;
                    });
                })
            );

            setImages(imageArray);
            setLoaded(true);
        };

        loadImages();
    }, [isMobile]);

    // Scroll animation logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1]);

    // Canvas redraw function
    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const index = Math.min(images.length - 1, Math.max(0, Math.floor(frameIndex.get())));
        const img = images[index];

        if (!img) return;

        const scaleFactor = isMobile ? 0.9 : 1;
        const imgWidth = img.width * scaleFactor;
        const imgHeight = img.height * scaleFactor;
        const offsetX = (canvasRef.current.width - imgWidth) / 2;
        const offsetY = (canvasRef.current.height - imgHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

    return (
        <section ref={containerRef} style={{ height: isMobile ? "200vh" : "500vh" }} className="position-relative">
            <div className="position-relative top-0 vh-100 w-100 d-flex align-items-center justify-content-center bg-dark">
                <canvas
                    ref={canvasRef}
                    width={windowSize.width}
                    height={windowSize.height}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        touchAction: "none",
                    }}
                />

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
