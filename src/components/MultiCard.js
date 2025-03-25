import React, { useState, useEffect, useRef } from "react";

export default function MultiCard() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // Disable scrolling when video is playing
        const handleWheel = (e) => {
            if (isPlaying) {
                e.preventDefault();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isPlaying]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start playing the video when it comes into view
                    if (videoRef.current) {
                        videoRef.current.play();
                        setIsPlaying(true);
                    }
                } else {
                    // Pause the video when it goes out of view
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.5 } // Start playing when 50% of the video is in view
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const handleVideoEnd = () => {
        // Allow scrolling after the video ends
        setIsPlaying(false);
    };

    return (
        <div className="mc-main">
            <div className="mc_inn">
                <div className="container text-center">
                    <div className="mt_main">
                        <h4 className="head-4">credit card management. reimagined.</h4>
                        <h1 className="head-1">everything you need. nothing you don't.</h1>
                        <p className="mc-text">
                            welcome to a credit card experience designed to feel like second nature. like muscle memory. life's logistics demand enough of your time, effort, and attention—managing
                            your credit cards shouldn't add to the list.
                        </p>
                        <p className="mc-text">you can put your admin duties to rest. for good.</p>
                    </div>
                </div>
                <div className="web-video">
                    <video ref={videoRef} autoPlay muted onEnded={handleVideoEnd}>
                        <source src="/assets/multi-card-desktop-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="mob-video">
                    <video ref={videoRef} autoPlay muted onEnded={handleVideoEnd}>
                        <source src="/assets/multi-card-mobile-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
