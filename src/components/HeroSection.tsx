import React, { useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";
import backgroundVideo from "../images/tattoo-rounge-background_2.webm";
import appMockupVideo from "../images/tattoo-rounge-app-mockup.webm";
import tattooTree from "../images/tattoo-tree.png";
import tattooDragon from "../images/tattoo-dragon.png";
import { Instagram, TrendingUp, GraduationCap, BarChart3, Calendar, Sparkles } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
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
    const containerRef = sectionRef.current?.querySelector('.fixed-container') as HTMLDivElement;

    const handleScroll = () => {
      if (!sectionRef.current || !leftImageRef.current || !rightImageRef.current || !modalRef.current || !containerRef) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;

      // Calculate scroll progress through the hero section (0 to 1)
      const progress = Math.min(Math.max((scrollY - sectionTop) / sectionHeight, 0), 1);

      console.log('Scroll progress:', progress, 'scrollY:', scrollY, 'sectionTop:', sectionTop);

      // Split progress into two phases:
      // Phase 1 (0 to 0.5): Modal slides up, section stays fixed at top
      // Phase 2 (0.5 to 1): Everything moves up together and disappears
      const phase1Progress = Math.min(progress * 2, 1); // 0 to 1 in first half
      const phase2Progress = Math.max((progress - 0.5) * 2, 0); // 0 to 1 in second half

      // Apply transform to images - they move throughout entire scroll
      const leftTranslateX = -25 - (progress * 50); // Move from -25% to -75%
      leftImageRef.current.style.setProperty('transform', `translateY(-50%) translateX(${leftTranslateX}%)`, 'important');
      leftImageRef.current.style.setProperty('opacity', String(0.2 * (1 - progress)), 'important');

      const rightTranslateX = 25 + (progress * 50); // Move from 25% to 75%
      rightImageRef.current.style.setProperty('transform', `translateY(-50%) translateX(${rightTranslateX}%)`, 'important');
      rightImageRef.current.style.setProperty('opacity', String(0.2 * (1 - progress)), 'important');

      // Phase 1: Modal slides up
      const modalActualHeight = modalRef.current.offsetHeight; // Get actual rendered height
      const modalTranslateY = modalActualHeight - (phase1Progress * modalActualHeight); // Slides up in phase 1
      modalRef.current.style.transform = `translateY(${modalTranslateY}px)`;

      // Phase 2: Entire container (section + modal) moves up
      const viewportHeight = window.innerHeight;
      const containerTranslateY = -(phase2Progress * viewportHeight); // Move entire thing up by viewport height
      containerRef.style.transform = `translateY(${containerTranslateY}px)`;
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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '200vh' }}
    >
      {/* Container for Video and Content - fixed then moves up */}
      <div className="fixed-container fixed top-0 left-0 w-full h-screen">
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
          className="absolute left-0 w-auto pointer-events-none h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[800px] animate-slide-in-left"
          style={{ top: '62%', willChange: 'transform, opacity' }}
        />
        <img
          ref={rightImageRef}
          src={tattooDragon}
          alt="Tattoo Dragon"
          className="absolute right-0 w-auto pointer-events-none h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[800px] animate-slide-in-right"
          style={{ top: '57%', willChange: 'transform, opacity' }}
        />

        {/* Content */}
        <div className="relative z-10 container-custom px-6 md:px-12 py-32 md:py-40 flex items-center justify-center h-full">
          <div className="flex flex-col items-center text-center gap-8 md:gap-12">
            {/* Main Headline */}
            <h1 className="text-white leading-tight opacity-0 animate-slide-up flex flex-col items-center w-full">
              <span className="block mb-1 text-center font-bold px-4" style={{ fontSize: 'clamp(2.2rem, 7vw, 7rem)' }}>새로운 시대의 시작</span>
              <span className="text-gradient block text-center font-semibold px-4" style={{ fontSize: 'clamp(1.2rem, 3vw, 3rem)' }}>
                타투이스트는 더 넓은 시장으로 향합니다
              </span>
            </h1>

            {/* Subheadline */}
            <div className="text-gray-light max-w-6xl leading-relaxed opacity-0 animate-slide-up flex flex-col items-center gap-0 px-4" style={{ animationDelay: "0.2s", fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
              <p className="text-center">합법화된 타투 시장의 잠재력을 열어주는 유일한 플랫폼, 타투라운지.</p>
              <p className="text-center">예술에만 집중할 수 있는 완벽한 환경을 제공합니다.</p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4 mt-4 opacity-0 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CTAButton size="lg" onClick={scrollToCTA} showIcon={true}>
                타투 중개 플랫폼 사전접수 진행중
              </CTAButton>
              <style>{`
                @keyframes ambient-text {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
                .ambient-led-text {
                  background: linear-gradient(90deg,
                    #ef4444 0%,
                    #f59e0b 16.67%,
                    #10b981 33.33%,
                    #3b82f6 50%,
                    #8b5cf6 66.67%,
                    #ec4899 83.33%,
                    #ef4444 100%
                  );
                  background-size: 300% 100%;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: ambient-text 8s ease-in-out infinite;
                  font-weight: 600;
                  display: inline-block;
                }
              `}</style>
              <p className="text-base md:text-lg">
                <span className="ambient-led-text">사전 접수 할인혜택:</span>{' '}
                <span className="text-white font-normal">~ 2025년 11월 30일</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-50 to-transparent" />

        {/* Black Modal Overlay - slides up from bottom */}
        <div
          ref={modalRef}
          className="absolute left-[5%] right-[5%] bg-black/80 backdrop-blur-sm rounded-t-3xl overflow-hidden"
          style={{
            maxHeight: '85vh',
            minHeight: 'fit-content',
            bottom: 0,
            transform: 'translateY(100%)',
            willChange: 'transform',
            zIndex: 15
          }}
        >
          {/* Modal Content */}
          <div className="relative w-full flex items-center justify-center px-4 sm:px-6 md:px-16 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-7xl w-full items-center">
              {/* Left Side - Video */}
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[260px] sm:max-w-xs md:max-w-md">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  >
                    <source src={appMockupVideo} type="video/webm" />
                  </video>
                  {/* Bottom fade gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl pointer-events-none" />
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="flex flex-col gap-4 sm:gap-6 text-white">
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2">타투 예약, 도안 제작 플랫폼</p>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">타투라운지</h2>
                </div>
                <div className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 flex flex-wrap gap-x-2 gap-y-3">
                  <span className="feature-gradient-purple inline-flex items-center gap-1.5">
                    <Instagram size={18} className="icon-gradient-purple" />
                    인스타그램 계정 1초 이전
                  </span>
                  <span className="text-gray-400">,</span>
                  <span className="feature-gradient-blue inline-flex items-center gap-1.5">
                    <TrendingUp size={18} className="icon-gradient-blue" />
                    시장 확대 지원
                  </span>
                  <span className="text-gray-400">,</span>
                  <span className="feature-gradient-green inline-flex items-center gap-1.5">
                    <GraduationCap size={18} className="icon-gradient-green" />
                    합법화 교육 일정 독점 공지
                  </span>
                  <span className="text-gray-400">,</span>
                  <span className="feature-gradient-orange inline-flex items-center gap-1.5">
                    <BarChart3 size={18} className="icon-gradient-orange" />
                    매출 최적화 마케팅 대시보드
                  </span>
                  <span className="text-gray-400">,</span>
                  <span className="feature-gradient-pink inline-flex items-center gap-1.5">
                    <Calendar size={18} className="icon-gradient-pink" />
                    자동 예약 관리
                  </span>
                  <span className="text-gray-400">,</span>
                  <span className="feature-gradient-cyan inline-flex items-center gap-1.5">
                    <Sparkles size={18} className="icon-gradient-cyan" />
                    AI 도안 생성 및 견적 요청
                  </span>
                  <span className="text-gray-200 ml-1">기능을 모두 제공하는 타투 전문가 올인원 비즈니스 플랫폼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
