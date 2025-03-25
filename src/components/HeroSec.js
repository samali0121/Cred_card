import React from "react";

export default function HeroSec() {
    return (
        <div className="hero-main">
            <div className="hero_inn">
                <div className="video-div ratio ratio-16x9">
                    <video autoPlay muted>
                        <source src="/assets/hero-fold-desktop-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
