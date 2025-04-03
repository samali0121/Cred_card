"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 194;
const IMAGE_PATH = "/assets/smart-card/ss-";

const MobileFlip = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    // Load all images
    useEffect(() => {
        const loadImages = async () => {
            const imagePromises = [];
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `${IMAGE_PATH}${i}.jpg`;
                imagePromises.push(
                    new Promise((resolve) => {
                        img.onload = resolve;
                    })
                );
            }
            await Promise.all(imagePromises);
            setLoaded(true);
        };

        loadImages();
    }, []);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Draw current frame
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!canvasRef.current || !loaded) return;

        const ctx = canvasRef.current.getContext("2d");
        const currentFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.floor(latest)));
        const img = new Image();
        img.src = `${IMAGE_PATH}${currentFrame}.jpg`;

        img.onload = () => {
            // Match CRED's exact scaling behavior
            const scale =
                windowSize.width <= 768 ? Math.min(windowSize.width / img.width, windowSize.height / img.height) * 0.9 : Math.min(windowSize.width / img.width, windowSize.height / img.height) * 0.7;

            const width = img.width * scale;
            const height = img.height * scale;

            canvasRef.current.width = width;
            canvasRef.current.height = height;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
        };
    });

    return (
        <section
            ref={containerRef}
            style={{
                height: `${TOTAL_FRAMES * 5}vh`,
                position: "relative",
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <canvas
                    className="flip-canvas"
                    ref={canvasRef}
                    style={{
                        width: "auto",
                        maxWidth: "100%",
                        maxHeight: "100vh",
                    }}
                />

                {!loaded && (
                    <div
                        style={{
                            position: "absolute",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p style={{ marginTop: "1rem" }}>Loading animation...</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MobileFlip;
