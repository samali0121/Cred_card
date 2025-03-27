"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvas({ frameCount = 149, imagePath = "/assets/fallback/unbilled-" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${imagePath}${i}.jpg`;

      img.onload = () => {
        loadedCount++;
        console.log(`✅ Loaded: ${img.src}`); // Log successful loads

        if (loadedCount === frameCount) {
          imagesRef.current = loadImages;
          setLoaded(true);
          console.log("✅ All images loaded successfully!");
        }
      };

      img.onerror = () => {
        console.error(`❌ Failed to load image: ${img.src}`);
      };

      loadImages.push(img);
    }
  }, [frameCount, imagePath]);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = (index) => {
      const img = imagesRef.current[index];
      if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    let scrollObj = { frame: 0 };

    gsap.to(scrollObj, {
      frame: frameCount - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          console.log("Scroll progress:", self.progress); // Debugging scroll progress
        },
      },
      onUpdate: () => {
        const frameIndex = Math.floor(scrollObj.frame);
        console.log(`Rendering frame: ${frameIndex}`);
        render(frameIndex);
      },
    });

    render(0); // Render first frame immediately
  }, [loaded, frameCount]);

  return (
    <div ref={containerRef} style={{ height: "3000px", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "sticky",
          top: 0,
          background: "black", // Set background color to check visibility
        }}
      />
    </div>
  );
}
