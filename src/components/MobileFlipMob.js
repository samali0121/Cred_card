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

    // Handle resizing & detect mobile - keeping your original logic
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

    // Image loading - keeping your original approach
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

    // Scroll animation - keeping your original logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, images.length - 1]);

    // Modified getMobileDimensions to ensure full image display
    const getMobileDimensions = () => {
        if (!imageDimensions.width || !imageDimensions.height) return { width: 0, height: 0 };

        const targetWidth = windowSize.width * 0.95;
        const targetHeight = windowSize.height * 0.85; // Slightly reduced to account for browser UI

        // Calculate scale to fit both width and height
        const widthScale = targetWidth / imageDimensions.width;
        const heightScale = targetHeight / imageDimensions.height;
        const scale = Math.min(widthScale, heightScale);

        return {
            width: imageDimensions.width * scale,
            height: imageDimensions.height * scale,
            scale,
        };
    };

    // Enhanced redrawCanvas with pixel ratio handling
    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const index = Math.min(images.length - 1, Math.max(0, Math.floor(frameIndex.get())));
        const img = images[index];

        if (!img) return;

        if (isMobile) {
            const { width, height, scale } = getMobileDimensions();
            const offsetX = (windowSize.width - width) / 2;
            const offsetY = (windowSize.height - height) / 2;

            // Handle high DPI displays
            const pixelRatio = window.devicePixelRatio || 1;
            canvasRef.current.width = width * pixelRatio;
            canvasRef.current.height = height * pixelRatio;
            canvasRef.current.style.width = `${width}px`;
            canvasRef.current.style.height = `${height}px`;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.drawImage(img, offsetX, offsetY, width, height);
        } else {
            // Original desktop drawing logic
            const scaleFactor = 0.8;
            const imgWidth = img.width * scaleFactor;
            const imgHeight = img.height * scaleFactor;
            const offsetX = (windowSize.width - imgWidth) / 2;
            const offsetY = (windowSize.height - imgHeight) / 1;

            canvasRef.current.width = windowSize.width;
            canvasRef.current.height = windowSize.height;
            ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
        }
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

    return (
        <section
            ref={containerRef}
            style={{
                height: isMobile ? "200vh" : "500vh",
                marginBottom: isMobile ? "20px" : "0",
            }}
            className="position-relative"
        >
            <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center">
                <canvas
                    className="mobFlip" // Your original class preserved
                    ref={canvasRef}
                    style={{
                        width: "100%",
                        objectFit: "contain",
                        display: loaded ? "block" : "none",
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
