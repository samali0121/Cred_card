// "use client";
// import { useEffect, useRef, useState } from "react";
// import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ScrollCanvas = () => {
//     const containerRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [images, setImages] = useState([]);
//     const [loaded, setLoaded] = useState(false);
//     const [windowSize, setWindowSize] = useState({
//         width: 0,
//         height: 0,
//     });
//     const [isMobile, setIsMobile] = useState(false);

//     // Initialize and handle resize
//     useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         const handleResize = () => {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//             checkMobile();

//             if (canvasRef.current) {
//                 canvasRef.current.width = window.innerWidth;
//                 canvasRef.current.height = window.innerHeight;
//                 redrawCanvas();
//             }
//         };

//         // Initial setup
//         handleResize();
//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     // Load all images
//     useEffect(() => {
//         const loadImages = async () => {
//             const imageArray = [];

//             for (let i = 1; i <= 149; i++) {
//                 try {
//                     const img = new Image();
//                     img.src = `/assets/fallback/unbilled-${i}.jpg`;
//                     await new Promise((resolve, reject) => {
//                         img.onload = resolve;
//                         img.onerror = reject;
//                     });
//                     imageArray.push(img);
//                 } catch (error) {
//                     console.error(`Error loading image unbilled-${i}.jpg:`, error);
//                 }
//             }

//             setImages(imageArray);
//             setLoaded(true);
//         };

//         loadImages();
//     }, []);

//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ["start start", "end end"],
//     });

//     const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 148]);

//     const redrawCanvas = () => {
//         if (!loaded || !canvasRef.current) return;

//         const ctx = canvasRef.current.getContext("2d");
//         const currentIndex = Math.floor(frameIndex.get());
//         const img = images[currentIndex];

//         if (img) {
//             ctx.clearRect(0, 0, windowSize.width, windowSize.height);

//             // Mobile-optimized scaling
//             const scaleFactor = isMobile ? 0.8 : 1;
//             const canvasAspect = windowSize.width / windowSize.height;
//             const imgAspect = img.width / img.height;

//             let drawWidth,
//                 drawHeight,
//                 offsetX = 0,
//                 offsetY = 0;

//             if (imgAspect > canvasAspect) {
//                 drawHeight = windowSize.height * scaleFactor;
//                 drawWidth = drawHeight * imgAspect;
//                 offsetX = (windowSize.width - drawWidth) / 2;
//             } else {
//                 drawWidth = windowSize.width * scaleFactor;
//                 drawHeight = drawWidth / imgAspect;
//                 offsetY = (windowSize.height - drawHeight) / 2;
//             }

//             ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
//         }
//     };

//     // Update canvas when frameIndex changes
//     useMotionValueEvent(frameIndex, "change", redrawCanvas);

//     // Opera-specific fix for smooth scrolling
//     useEffect(() => {
//         const isOpera = !!window.opr || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
//         if (isOpera && containerRef.current) {
//             containerRef.current.style.overflow = "hidden";
//             containerRef.current.style.height = "500vh";
//         }
//     }, []);

//     return (
//         <section
//             ref={containerRef}
//             style={{ height: isMobile ? "300vh" : "500vh" }} // Less scroll space on mobile
//             className="position-relative"
//         >
//             <div className="position-sticky top-0 vh-100 w-100 d-flex align-items-center justify-content-center bg-dark">
//                 <canvas
//                     ref={canvasRef}
//                     width={windowSize.width}
//                     height={windowSize.height}
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "contain",
//                         touchAction: "none", // Prevent touch interference
//                     }}
//                 />

//                 {!loaded && (
//                     <div className="position-absolute text-white text-center">
//                         <div className="spinner-border" role="status">
//                             <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <p className="mt-2">Loading animation...</p>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default ScrollCanvas;

"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const TOTAL_FRAMES = 149;
const MOBILE_FRAME_COUNT = 50;
const IMAGE_PATH = "/assets/fallback/unbilled-";

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

    // Load images dynamically
    useEffect(() => {
        const loadImages = async () => {
            const totalFrames = isMobile ? MOBILE_FRAME_COUNT : TOTAL_FRAMES;
            const imageArray = [];

            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                img.src = `${IMAGE_PATH}${i}.jpg`;

                await new Promise((resolve, reject) => {
                    img.onload = () => {
                        imageArray[i - 1] = img;
                        resolve();
                    };
                    img.onerror = reject;
                });
            }

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

    // Redraw canvas when frameIndex updates
    const redrawCanvas = () => {
        if (!loaded || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        const index = Math.floor(frameIndex.get());
        const img = images[index];

        if (img) {
            ctx.clearRect(0, 0, windowSize.width, windowSize.height);

            const scaleFactor = isMobile ? 0.85 : 1;
            const imgAspect = img.width / img.height;
            const canvasAspect = windowSize.width / windowSize.height;

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
        }
    };

    useMotionValueEvent(frameIndex, "change", redrawCanvas);

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
