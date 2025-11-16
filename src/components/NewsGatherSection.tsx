import React, { useEffect, useRef, useState } from "react";

// Import news images
import news1 from "../images/news-1.png";
import news2 from "../images/news-2.png";
import news3 from "../images/news-3.png";
import news4 from "../images/news-4.png";
import news5 from "../images/news-5.png";
import news6 from "../images/news-6.png";
import news7 from "../images/news-7.png";
import news8 from "../images/news-8.png";
import news9 from "../images/news-9.png";

interface NewsImage {
  src: string;
  startX: number; // Starting position X (%)
  startY: number; // Starting position Y (%)
  finalX: number; // Final position X (%)
  finalY: number; // Final position Y (%)
  width: number;  // Image width in pixels
}

export default function NewsGatherSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [gatherProgress, setGatherProgress] = useState(0); // 0 to 1
  const [textPhase, setTextPhase] = useState(0); // 0: hidden, 1: first text, 2: transition, 3: second text

  // Define news images with irregular starting positions and clustered final positions around center
  const newsImages: NewsImage[] = [
    { src: news1, startX: -35, startY: -25, finalX: 25, finalY: 40, width: 260 }, // Top-left → left
    { src: news2, startX: 48, startY: -45, finalX: 50, finalY: 35, width: 240 }, // Top → center-top
    { src: news3, startX: 135, startY: -20, finalX: 75, finalY: 38, width: 250 }, // Top-right → right
    { src: news4, startX: 145, startY: 55, finalX: 78, finalY: 50, width: 260 }, // Right → far-right
    { src: news5, startX: 125, startY: 135, finalX: 70, finalY: 60, width: 245 }, // Bottom-right → right-bottom
    { src: news6, startX: 52, startY: 145, finalX: 48, finalY: 65, width: 255 }, // Bottom → center-bottom
    { src: news7, startX: -25, startY: 128, finalX: 28, finalY: 58, width: 250 }, // Bottom-left → left-bottom
    { src: news8, startX: -45, startY: 48, finalX: 22, finalY: 48, width: 240 }, // Left → far-left
    { src: news9, startX: 150, startY: -35, finalX: 60, finalY: 48, width: 235 }, // Far top-right → center-right
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      // Start when section top hits viewport bottom
      // End when section bottom hits viewport top
      const scrollStart = -rect.bottom + windowHeight;
      const scrollEnd = -rect.top + windowHeight;
      const scrollRange = rect.height;

      // Progress from 0 to 1 as we scroll through the section
      const progress = Math.max(0, Math.min(1, (scrollEnd / scrollRange)));
      setScrollProgress(progress);

      // Phase 1 (0 - 30%): Images gather
      if (progress < 0.3) {
        setGatherProgress(progress / 0.3);
        setTextPhase(0);
      }
      // Phase 2 (30% - 100%): Text transition (first -> second) and done
      else {
        setGatherProgress(1);
        const transitionProgress = (progress - 0.3) / 0.7;
        setTextPhase(1 + Math.min(transitionProgress * 2, 2)); // 1 -> 3
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '200vh' }} // 2x viewport height for fast transitions
    >
      {/* Sticky container */}
      <div
        className="sticky top-0 w-full h-screen bg-dark flex items-center justify-center overflow-hidden"
      >
        {/* News Images Container */}
        <div className="absolute inset-0 overflow-hidden">
          {newsImages.map((image, index) => {
            const currentX = image.startX + (image.finalX - image.startX) * gatherProgress;
            const currentY = image.startY + (image.finalY - image.startY) * gatherProgress;

            // Calculate opacity based on gather progress (fade in from 0 to 0.8)
            const imageOpacity = gatherProgress > 0 ? gatherProgress * 0.8 : 0;

            return (
              <img
                key={index}
                src={image.src}
                alt={`News ${index + 1}`}
                className="absolute pointer-events-none"
                style={{
                  left: `${currentX}%`,
                  top: `${currentY}%`,
                  width: `${image.width}px`,
                  opacity: imageOpacity,
                  transform: 'translate(-50%, -50%)',
                  filter: textPhase >= 1 ? 'brightness(0.4)' : 'brightness(1)',
                  transition: 'left 0.6s ease-out, top 0.6s ease-out, opacity 0.6s ease-out, filter 0.5s ease-in-out',
                  willChange: 'left, top, opacity, filter',
                }}
              />
            );
          })}
        </div>

        {/* Overlay for darkening effect */}
        {textPhase >= 1 && (
          <div
            className="absolute inset-0 bg-black transition-opacity duration-500"
            style={{
              opacity: Math.min((textPhase - 1) * 0.3, 0.3)
            }}
          />
        )}

        {/* Text Container */}
        <div className="relative z-10 text-center px-6">
          {/* First Text: "넘쳐나는 새로운 문신사법 정보" */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white transition-opacity duration-700 absolute inset-0 flex items-center justify-center"
            style={{
              opacity: textPhase >= 1 && textPhase < 2 ? 1 : textPhase >= 2 ? Math.max(1 - (textPhase - 1), 0) : 0,
            }}
          >
            <span>넘쳐나는 새로운<br />문신사법 정보</span>
          </h2>

          {/* Second Text: "타투라운지에서 정리해서 알려드립니다." */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold transition-opacity duration-700"
            style={{
              opacity: textPhase >= 2 ? Math.min(textPhase - 1, 1) : 0,
            }}
          >
            <style>{`
              @keyframes pinkGradientShift {
                0%, 100% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
              }

              @keyframes pinkGlow {
                0%, 100% {
                  filter: brightness(1) drop-shadow(0 0 8px rgba(219, 39, 119, 0.6));
                  transform: scale(1);
                }
                50% {
                  filter: brightness(1.4) drop-shadow(0 0 20px rgba(219, 39, 119, 0.9));
                  transform: scale(1.05);
                }
              }

              .tattoo-rounge-gradient {
                background: linear-gradient(90deg,
                  #db2777 0%,
                  #ec4899 25%,
                  #f472b6 50%,
                  #ec4899 75%,
                  #db2777 100%
                );
                background-size: 200% 200%;
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: pinkGradientShift 3s ease-in-out infinite, pinkGlow 2s ease-in-out infinite;
                display: inline-block;
                font-weight: 700;
              }
            `}</style>
            <span className="tattoo-rounge-gradient">타투라운지</span>
            <span className="text-white">에서<br />정리해서 알려드립니다.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}