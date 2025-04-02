"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ScrollCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState(0);
    const [totalImages] = useState(149);
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    // Mobile detection and resize handler
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768);
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
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Progressive image loading with mobile optimization
    useEffect(() => {
        const imageCache = [];
        let canceled = false;

        const loadImages = async () => {
            // Mobile loads fewer, optimized images
            const imageCount = isMobile ? Math.min(totalImages, 75) : totalImages;
            const step = isMobile ? 2 : 1; // Skip frames on mobile

            for (let i = 1; i <= imageCount && !canceled; i += step) {
                try {
                    const img = new Image();
                    img.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/fallback/unbilled-${i}.jpg?width=${isMobile ? 800 : 1200}`;

                    await new Promise((resolve) => {
                        img.onload = () => {
                            if (!canceled) {
                                imageCache[i] = img;
                                setLoadedImages((prev) => prev + 1);
                                resolve();
                            }
                        };
                        img.onerror = resolve; // Continue even if some images fail
                    });
                } catch (error) {
                    console.error(`Error loading image ${i}:`, error);
                }
            }
        };

        loadImages();
        return () => {
            canceled = true;
        };
    }, [isMobile, totalImages]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [1, isMobile ? 75 : 149] // Adjusted for mobile
    );

    // Canvas rendering with mobile optimizations
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        const currentIndex = Math.floor(latest);
        const img = imageCache[currentIndex];

        if (img) {
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);

            // Mobile-optimized scaling
            const scale = isMobile ? 0.9 : 1;
            const imgAspect = img.width / img.height;
            const canvasAspect = windowSize.width / windowSize.height;

            let width,
                height,
                x = 0,
                y = 0;

            if (imgAspect > canvasAspect) {
                height = windowSize.height * scale;
                width = height * imgAspect;
                x = (windowSize.width - width) / 2;
            } else {
                width = windowSize.width * scale;
                height = width / imgAspect;
                y = (windowSize.height - height) / 2;
            }

            ctx.drawImage(img, x, y, width, height);
        }
    });

    // Mobile touch event handling
    useEffect(() => {
        if (!isMobile || !containerRef.current) return;

        const container = containerRef.current;
        let startY = 0;
        let isScrolling = false;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
            isScrolling = true;
        };

        const handleTouchMove = (e) => {
            if (!isScrolling) return;
            e.preventDefault();
        };

        const handleTouchEnd = () => {
            isScrolling = false;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isMobile]);

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

                {loadedImages < (isMobile ? 75 : 149) && (
                    <div className="position-absolute text-white text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">
                            Loading {loadedImages}/{isMobile ? 75 : 149} frames...
                            {isMobile && <br />}(Mobile-optimized version)
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

// Cache for loaded images
const imageCache = {};

export default ScrollCanvas;
