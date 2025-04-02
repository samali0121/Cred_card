"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ScrollCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    const [isMobile, setIsMobile] = useState(false);

    // Initialize and handle resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            checkMobile();

            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                redrawCanvas();
            }
        };

        // Initial setup
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Load all images
    useEffect(() => {
        const loadImages = async () => {
            console.log("Starting image loading...");
            const imageArray = [];

            for (let i = 1; i <= 149; i++) {
                try {
                    const img = new Image();
                    const imgPath = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/fallback/unbilled-${i}.jpg`;
                    console.log(`Loading image: ${imgPath}`);
                    img.src = imgPath;
                    await new Promise((resolve, reject) => {
                        img.onload = () => {
                            console.log(`Loaded image ${i}`);
                            resolve();
                        };
                        img.onerror = (e) => {
                            console.error(`Error loading image ${i}`, e);
                            reject(e);
                        };
                    });
                    imageArray.push(img);
                } catch (error) {
                    console.error(`Error loading image unbilled-${i}.jpg:`, error);
                }
            }

            setImages(imageArray);
            setLoaded(true);
            console.log("All images loaded");
        };

        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 148]);

    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current) {
            console.log("Canvas redraw skipped - not ready");
            return;
        }

        const ctx = canvasRef.current.getContext("2d");
        const currentIndex = Math.floor(frameIndex.get());
        const img = images[currentIndex];

        console.log(`Redrawing canvas with frame ${currentIndex}`);

        if (img) {
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);

            const scaleFactor = isMobile ? 0.8 : 1;
            const canvasAspect = windowSize.width / windowSize.height;
            const imgAspect = img.width / img.height;

            let drawWidth,
                drawHeight,
                offsetX = 0,
                offsetY = 0;

            if (imgAspect > canvasAspect) {
                drawHeight = windowSize.height * scaleFactor;
                drawWidth = drawHeight * imgAspect;
                offsetX = (windowSize.width - drawWidth) / 2;
            } else {
                drawWidth = windowSize.width * scaleFactor;
                drawHeight = drawWidth / imgAspect;
                offsetY = (windowSize.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            console.warn(`No image found for index ${currentIndex}`);
        }
    };

    // Debug scroll events
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Scroll progress:", latest);
    });

    useMotionValueEvent(frameIndex, "change", (latest) => {
        console.log("Frame index:", latest);
        redrawCanvas();
    });

    return (
        <section ref={containerRef} style={{ height: isMobile ? "300vh" : "500vh" }} className="position-relative">
            <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center bg-dark">
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
