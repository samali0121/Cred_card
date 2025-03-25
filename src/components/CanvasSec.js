import React, { useEffect, useRef, useState } from "react";

export default function ScrollPlaySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the video comes into view
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

  return (
    <div className="scroll-play-section">
      <div className="imageLoadMarker"></div>
      <div className="mainContent" style={{ height: '600vh' }}>
        <div className="contentInner">
          <div className="contentTop" style={{ height: '550vh' }}></div>
          <div className="videoWrapper">
            <video
              ref={videoRef}
              width="1536"
              height="894"
              muted
              loop
            >
              <source src="/assets/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
