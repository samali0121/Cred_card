"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const TOTAL_FRAMES = 194;
const MOBILE_FRAME_COUNT = 194;
const IMAGE_PATH = "/assets/smart-card/ss-";

const MobileFlipMob = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    // Handle resizing & detect mobile
    useEffect(() => {
        const handleResize = () => {
            const mobileCheck = window.innerWidth <= 768;
            setIsMobile(mobileCheck);

            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            if (canvasRef.current && images.length > 0) {
                const img = images[0];
                if (img) {
                    setImageDimensions({
                        width: img.width,
                        height: img.height,
                    });
                }
                redrawCanvas();
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

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
                            if (i === 0) {
                                setImageDimensions({
                                    width: img.width,
                                    height: img.height,
                                });
                            }
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

    // Calculate optimal dimensions for mobile
    const getMobileDimensions = () => {
        if (!imageDimensions.width || !imageDimensions.height) return { width: 0, height: 0 };

        const targetWidth = windowSize.width * 0.95; // Use 95% of screen width for better mobile display
        const scale = targetWidth / imageDimensions.width;
        const height = imageDimensions.height * scale;

        return {
            width: targetWidth,
            height: height,
        };
    };

    // Canvas redraw function with mobile-specific improvements
    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const index = Math.min(images.length - 1, Math.max(0, Math.floor(frameIndex.get())));
        const img = images[index];

        if (!img) return;

        if (isMobile) {
            const { width, height } = getMobileDimensions();
            const offsetX = (windowSize.width - width) / 2;
            const offsetY = 20; // Small top margin for mobile

            // Improve image quality on mobile
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, offsetX, offsetY, width, height);
        } else {
            // Keep original desktop drawing logic
            const scaleFactor = 0.8;
            const imgWidth = img.width * scaleFactor;
            const imgHeight = img.height * scaleFactor;
            const offsetX = (windowSize.width - imgWidth) / 2;
            const offsetY = (windowSize.height - imgHeight) / 1;

            ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
        }
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

    return (
        <section
            ref={containerRef}
            style={{
                height: isMobile ? "200vh" : "500vh", // Keep your original height values
                marginBottom: isMobile ? "20px" : "0",
            }}
            className="position-relative"
        >
            <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center">
                <canvas
                    className="mob-flip" // Keep your original class
                    ref={canvasRef}
                    width={windowSize.width}
                    height={windowSize.height}
                    style={{
                        width: "100%",
                        objectFit: "contain",
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

export default MobileFlipMob;
