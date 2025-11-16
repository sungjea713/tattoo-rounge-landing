import React, { useEffect, useRef, useState } from "react";

// Import all portfolio images
import BUDDISM from "../images/portfolio/BUDDISM.png";
import DRAGON from "../images/portfolio/DRAGON.png";
import FLORAL from "../images/portfolio/FLORAL.png";
import GEOMETRIC from "../images/portfolio/GEOMETRIC.png";
import GOTHIC from "../images/portfolio/GOTHIC.png";
import IREZUMI from "../images/portfolio/IREZUMI.png";
import LETTERING from "../images/portfolio/LETTERING.png";
import MYSTICISM from "../images/portfolio/MYSTICISM.png";
import OCCULT from "../images/portfolio/OCCULT.png";
import OLDSCHOOL from "../images/portfolio/OLDSCHOOL.png";
import ORIENTAL from "../images/portfolio/ORIENTAL.png";
import SAMURAI from "../images/portfolio/SAMURAI.png";
import TREE from "../images/portfolio/TREE.png";
import TRIBAL from "../images/portfolio/TRIBAL.png";

const portfolioImages = [
  { src: BUDDISM, name: "BUDDISM" },
  { src: DRAGON, name: "DRAGON" },
  { src: FLORAL, name: "FLORAL" },
  { src: GEOMETRIC, name: "GEOMETRIC" },
  { src: GOTHIC, name: "GOTHIC" },
  { src: IREZUMI, name: "IREZUMI" },
  { src: LETTERING, name: "LETTERING" },
  { src: MYSTICISM, name: "MYSTICISM" },
  { src: OCCULT, name: "OCCULT" },
  { src: OLDSCHOOL, name: "OLDSCHOOL" },
  { src: ORIENTAL, name: "ORIENTAL" },
  { src: SAMURAI, name: "SAMURAI" },
  { src: TREE, name: "TREE" },
  { src: TRIBAL, name: "TRIBAL" },
];

// Shuffle once outside component to ensure it stays consistent
const shuffledImages = [...portfolioImages].sort(() => Math.random() - 0.5);
// Double the images for seamless loop
const duplicatedImages = [...shuffledImages, ...shuffledImages];

export default function AIGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationDistance, setAnimationDistance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (containerRef.current) {
      // Measure the width of half the container (one set of images)
      const fullWidth = containerRef.current.scrollWidth;
      const halfWidth = fullWidth / 2;
      setAnimationDistance(halfWidth);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use fewer images on mobile for better performance
  const imagesToShow = isMobile ? shuffledImages.slice(0, 7) : shuffledImages;
  const finalImages = [...imagesToShow, ...imagesToShow];

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${animationDistance}px, 0, 0);
          }
        }
        .scroll-container {
          animation: scroll-left ${isMobile ? '25s' : '40s'} linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <section className="relative overflow-hidden bg-dark py-16">
        {/* Section Title */}
        <div className="container-custom mb-12 px-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-white/70">
            타투라운지에서 자동 생성한 도안
          </h3>
        </div>

        {/* Scrolling Gallery */}
        <div className="relative overflow-hidden">
          <div ref={containerRef} className="scroll-container flex">
            {finalImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-4"
              >
                <div className={`relative ${isMobile ? 'w-48 h-48' : 'w-64 h-64'} rounded-lg overflow-hidden bg-dark-50`}>
                  <img
                    src={image.src}
                    alt={image.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-45"
                  />
                </div>
                <p
                  className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-black whitespace-nowrap`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Overlays for fade effect */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent pointer-events-none z-10" />
      </section>
    </>
  );
}
