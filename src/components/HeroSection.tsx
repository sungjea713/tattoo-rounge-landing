import React, { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import backgroundVideo from "../images/tattoo-rounge-background_2.webm";
import tattooTree from "../images/tattoo-tree.png";
import tattooDragon from "../images/tattoo-dragon.png";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !leftImageRef.current || !rightImageRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;

      // Calculate scroll progress through the hero section (0 to 1)
      const progress = Math.min(Math.max((scrollY - sectionTop) / sectionHeight, 0), 1);

      console.log('Scroll progress:', progress, 'scrollY:', scrollY, 'sectionTop:', sectionTop);

      // Apply transform to images based on scroll progress
      const leftTranslateX = -25 - (progress * 50); // Move from -25% to -75%
      leftImageRef.current.style.setProperty('transform', `translateY(-50%) translateX(${leftTranslateX}%)`, 'important');
      leftImageRef.current.style.setProperty('opacity', String(0.2 * (1 - progress)), 'important');

      const rightTranslateX = 25 + (progress * 50); // Move from 25% to 75%
      rightImageRef.current.style.setProperty('transform', `translateY(-50%) translateX(${rightTranslateX}%)`, 'important');
      rightImageRef.current.style.setProperty('opacity', String(0.2 * (1 - progress)), 'important');
    };

    // Wait for initial animations to complete before enabling scroll effect
    const initTimer = setTimeout(() => {
      console.log('Scroll listener attached');
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
    }, 2000); // Wait for slide-in animation to complete (1.8s + buffer)

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToCTA = () => {
    const ctaSection = document.getElementById("contact");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/webm" />
      </video>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/50 to-dark" />

      {/* Decorative Side Images */}
      <img
        ref={leftImageRef}
        src={tattooTree}
        alt="Tattoo Tree"
        className="absolute left-0 w-auto pointer-events-none h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[900px] animate-slide-in-left"
        style={{ top: '62%', willChange: 'transform, opacity' }}
      />
      <img
        ref={rightImageRef}
        src={tattooDragon}
        alt="Tattoo Dragon"
        className="absolute right-0 w-auto pointer-events-none h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[900px] animate-slide-in-right"
        style={{ top: '57%', willChange: 'transform, opacity' }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom px-6 md:px-12 py-32 md:py-40">
        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
          {/* Main Headline */}
          <h1 className="text-white leading-tight opacity-0 animate-slide-up flex flex-col items-center w-full">
            <span className="block mb-4 whitespace-nowrap font-medium" style={{ fontSize: 'clamp(2.5rem, 10vw, 12rem)' }}>새로운 시대의 시작</span>
            <span className="text-gradient block whitespace-nowrap text-center font-semibold" style={{ fontSize: 'clamp(1.5rem, 5vw, 5rem)' }}>
              타투이스트는 더 넓은 시장으로 향합니다
            </span>
          </h1>

          {/* Subheadline */}
          <div className="text-2xl md:text-3xl lg:text-4xl text-gray-light max-w-6xl leading-relaxed opacity-0 animate-slide-up flex flex-col items-center gap-2" style={{ animationDelay: "0.2s" }}>
            <p className="whitespace-nowrap">합법화된 타투 시장의 잠재력을 열어주는 유일한 플랫폼, 타투라운지.</p>
            <p className="whitespace-nowrap">예술에만 집중할 수 있는 완벽한 환경을 제공합니다.</p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 mt-8 opacity-0 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CTAButton size="lg" onClick={scrollToCTA}>
              Tattoo Rounge 전문가로 합류하기
            </CTAButton>
            <p className="text-base md:text-lg text-gray-medium">
              선착순 혜택: <span className="text-white font-semibold">6개월 수수료 면제</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-50 to-transparent" />
    </section>
  );
}
