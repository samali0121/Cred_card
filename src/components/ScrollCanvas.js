import { useState, useEffect, useRef } from 'react';

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

        if (scrollY > sectionTop - windowHeight && scrollY < sectionTop + sectionHeight) {
          const relativeScroll = scrollY - (sectionTop - windowHeight);
          let progress = relativeScroll / (sectionHeight + windowHeight);
          progress = Math.max(0, Math.min(1, progress));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getImageIndex = () => {
    return Math.min(imageCount, Math.max(1, Math.ceil(scrollProgress * imageCount)));
  };

  const imagePath = `/assets/fallback/unbilled-${getImageIndex()}.jpg`;

  return (
    <div ref={scrollRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: '0%', // make it stick to the top
          width: '100%',
          height: '100vh', // make the image section full screen
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden', // to prevent any scroll bar issues
        }}
      >
        <img
          src={imagePath}
          alt={`Unbilled ${getImageIndex()}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}