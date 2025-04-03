import React, { useState, useRef, useEffect } from "react";

export default function DownloadCred() {
    const [showContent, setShowContent] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    // Handle intersection observer for autoplay
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasPlayed && videoRef.current) {
                        const playPromise = videoRef.current.play();

                        if (playPromise !== undefined) {
                            playPromise.catch(() => {
                                // If autoplay fails, show content immediately
                                setShowContent(true);
                            });
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasPlayed]);

    // Handle video events
    useEffect(() => {
        const video = videoRef.current;

        const handlePause = () => {
            setShowContent(true);
        };

        const handleEnded = () => {
            setShowContent(true);
            setHasPlayed(true);
        };

        if (video) {
            video.addEventListener("pause", handlePause);
            video.addEventListener("ended", handleEnded);
        }

        return () => {
            if (video) {
                video.removeEventListener("pause", handlePause);
                video.removeEventListener("ended", handleEnded);
            }
        };
    }, []);

    return (
        <div className="download iCAnxp" ref={sectionRef}>
            <div className=" sc-1pisk27-0 iCAnxp position-relative">
                <video
                    className="dv"
                    ref={videoRef}
                    muted
                    playsInline
                    loop={false} // Ensure video doesn't loop
                >
                    <source src="/assets/cta-fold-desktop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="sc-1pisk27-1 fqHnOB">
                    <div className="sc-1pisk27-2 ibYucQ">
                        <div
                            className="sc-6ca9pz-0 kSMium dd-div"
                            style={{
                                opacity: showContent ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                                pointerEvents: showContent ? "auto" : "none",
                            }}
                        >
                            <div className="sc-6ca9pz-3 ialzGb">
                                <img src="https://web-images.credcdn.in/v2/_next/assets/images/cards/cred-qr.png" className="sc-6ca9pz-4 eLznSh" />
                                <div className="sc-6ca9pz-5 gEftKE">
                                    download
                                    <br />
                                    CRED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mob-download">
                <div className="sc-6ca9pz-2 enTSAE">
                    <img className="db-img" src="/assets/power.png" alt="image" />
                    <a className="dbm" href="https://app.cred.club/k63y/ciofyb98" rel="noreferrer">
                        <div className="sc-b5xc4a-0 hNPQwt dwn-btn">
                            <div className="sc-b5xc4a-1 jpRlrZ">DOWNLOAD CRED</div>
                            <svg width="19" height="8" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="sc-b5xc4a-2 ggybSB">
                                <path
                                    d="M2 4.87494H0.875L0.875 7.12494H2L2 4.87494ZM2 7.12494L30.5 7.12494V4.87494L2 4.87494L2 7.12494ZM25.0685 4.7589e-08C25.0685 3.89997 28.1374 7.125 32 7.125L32 4.875C29.449 4.875 27.3185 2.72744 27.3185 -4.7589e-08L25.0685 4.7589e-08ZM32 4.875C28.1374 4.875 25.0684 8.09999 25.0684 12H27.3184C27.3184 9.27259 29.4489 7.125 32 7.125V4.875Z"
                                    fill="white"
                                ></path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
