import React from "react";

export default function SingleCard() {
    return (
        <div className="single_card">
            <div className="web-video">
                <video autoPlay muted>
                    <source src="/assets/single-card.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="mob-video">
                <video autoPlay muted>
                    <source src="/assets/multi-card-mobile-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}
