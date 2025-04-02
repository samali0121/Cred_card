import { useState, useEffect, useRef } from "react";

export default function ImageScroll() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = useRef(null);
    const imageCount = 149;

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const section = scrollRef.current;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollY = window.scrollY;

                // Calculate when the section is in the viewport
                if (scrollY > sectionTop - windowHeight && scrollY < sectionTop + sectionHeight) {
                    // Calculate the progress within the section
                    const relativeScroll = scrollY - (sectionTop - windowHeight);
                    let progress = relativeScroll / (sectionHeight + windowHeight);

                    // Ensure progress is within 0 and 1
                    progress = Math.max(0, Math.min(1, progress));

                    setScrollProgress(progress);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set initial progress

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const getImageIndex = () => {
        return Math.min(imageCount, Math.max(1, Math.ceil(scrollProgress * imageCount)));
    };

    const imagePath = `/assets/fallback/unbilled-${getImageIndex()}.jpg`; // Assuming webp format for better performance

    return (
        <div ref={scrollRef} style={{ height: "200vh", position: "relative" }}>
            {" "}
            {/* Adjust height as needed */}
            <div style={{ position: "sticky", top: "20%", width: "100%", display: "flex", justifyContent: "center" }}>
                <img src={imagePath} alt={`Unbilled ${getImageIndex()}`} style={{ maxWidth: "100%", width: "100%", maxHeight: "100vh", objectFit: "cover" }} />
            </div>
        </div>
    );
}
