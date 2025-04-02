"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const ScrollCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    const isInView = useInView(containerRef, { once: false, amount: 0.1 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
            setIsMobile(window.innerWidth <= 786);

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
            const imageArray = await Promise.all(
                Array.from({ length: 149 }, (_, i) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = `/assets/fallback/unbilled-${i + 1}.jpg`;
                        img.onload = () => resolve(img);
                        img.onerror = () => reject(`Failed to load image ${i + 1}`);
                    });
                })
            ).catch((err) => console.error(err));

            setImages(imageArray);
            setLoaded(true);
        };

        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 148]);

    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        const currentIndex = Math.floor(frameIndex.get());
        const img = images[currentIndex];

        if (img) {
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);
            const imgAspect = img.width / img.height;
            const canvasAspect = windowSize.width / windowSize.height;

            let drawWidth,
                drawHeight,
                offsetX = 0,
                offsetY = 0;

            if (imgAspect > canvasAspect) {
                drawHeight = windowSize.height;
                drawWidth = drawHeight * imgAspect;
                offsetX = (windowSize.width - drawWidth) / 2;
            } else {
                drawWidth = windowSize.width;
                drawHeight = drawWidth / imgAspect;
                offsetY = (windowSize.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

    useEffect(() => {
        if (isInView) {
            redrawCanvas();
        }
    }, [isInView]);

    return (
        <section ref={containerRef} style={{ height: isMobile ? "300vh" : "500vh" }} className="position-relative">
            <div style={{ position: "sticky", top: "0", height: "100vh", width: "100%" }}>
                <canvas
                    ref={canvasRef}
                    width={windowSize.width}
                    height={windowSize.height}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        touchAction: "none",
                        willChange: "transform",
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
