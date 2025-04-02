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
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    // Load all images on component mount
    useEffect(() => {
        const loadImages = async () => {
            const imageArray = [];

            for (let i = 1; i <= 149; i++) {
                const img = new Image();
                img.src = `/assets/fallback/unbilled-${i}.jpg`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });
                imageArray.push(img);
            }

            setImages(imageArray);
            setLoaded(true);
        };

        loadImages();

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            // Update canvas dimensions on resize
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 148]);

    // Update canvas when frameIndex changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loaded || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        const currentIndex = Math.floor(latest);
        const img = images[currentIndex];

        if (img) {
            // Clear canvas
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);

            // Calculate dimensions to maintain aspect ratio
            const canvasAspect = windowSize.width / windowSize.height;
            const imgAspect = img.width / img.height;

            let drawWidth,
                drawHeight,
                offsetX = 0,
                offsetY = 0;

            if (imgAspect > canvasAspect) {
                // Image is wider than canvas
                drawHeight = windowSize.height;
                drawWidth = drawHeight * imgAspect;
                offsetX = (windowSize.width - drawWidth) / 2;
            } else {
                // Image is taller than canvas
                drawWidth = windowSize.width;
                drawHeight = drawWidth / imgAspect;
                offsetY = (windowSize.height - drawHeight) / 2;
            }

            // Draw image centered
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    });

    return (
        <section
            ref={containerRef}
            style={{ height: "500vh" }} // 5 viewport heights for scroll space
            className="position-relative"
        >
            <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center bg-dark">
                <canvas
                    ref={canvasRef}
                    width={windowSize.width}
                    height={windowSize.height}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </div>
        </section>
    );
};

export default ScrollCanvas;
