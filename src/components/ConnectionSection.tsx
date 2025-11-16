import React, { useEffect, useRef } from "react";
import { Users, Paintbrush, ArrowLeftRight } from "lucide-react";
import tattooRoungeLogo from "../images/tattoo-rounge-logo.png";
import tattooTree2 from "../images/tattoo-tree-2.png";

export default function ConnectionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgImageRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Phase 1: Enter - section top enters viewport (image slides in from left)
      const enterStart = sectionTop - viewportHeight;
      const enterEnd = sectionTop;

      // Phase 2: Exit - section bottom leaves viewport (image slides out to left)
      const exitStart = sectionTop + sectionHeight - viewportHeight;
      const exitEnd = sectionTop + sectionHeight;

      let opacity = 0;
      let translateX = -100; // Start off-screen to the left (reversed from PrecisionTools)

      if (scrollY < enterStart) {
        opacity = 0;
        translateX = -100;
      } else if (scrollY >= enterStart && scrollY <= enterEnd) {
        // Phase 1: Entering - slide in from left
        const enterProgress = (scrollY - enterStart) / (enterEnd - enterStart);
        opacity = 0.3 * enterProgress;
        translateX = -100 * (1 - enterProgress); // -100 -> 0
      } else if (scrollY > enterEnd && scrollY < exitStart) {
        // Middle phase: fully visible
        opacity = 0.3;
        translateX = 0;
      } else if (scrollY >= exitStart && scrollY <= exitEnd) {
        // Phase 2: Exiting - slide out to left
        const exitProgress = (scrollY - exitStart) / (exitEnd - exitStart);
        opacity = 0.3 * (1 - exitProgress);
        translateX = -100 * exitProgress; // 0 -> -100
      } else {
        opacity = 0;
        translateX = -100;
      }

      bgImageRef.current.style.opacity = String(opacity);
      bgImageRef.current.style.transform = `translateY(-50%) translateX(${translateX}%) scaleX(-1)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-dark-50 py-20 md:py-32 overflow-hidden">
      <div className="container-custom px-6 md:px-12">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24 relative">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative z-10">
            타투라운지는 타투이스트와<br />고객을 연결합니다
          </h2>

          {/* Background Decorative Image - Behind title, slides in from left */}
          <img
            ref={bgImageRef}
            src={tattooTree2}
            alt="Tattoo Tree Background"
            className="absolute top-1/2 w-auto pointer-events-none object-contain"
            style={{
              opacity: 0,
              willChange: 'opacity, transform',
              zIndex: 0,
              height: '700px',
              left: '-10%',
              transform: 'translateY(-50%) translateX(-100%)'
            }}
          />
        </div>
      </div>

      {/* Connection Diagram - Full Width */}
      <div className="w-full mb-20 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 py-8 min-w-max px-8">
            {/* User */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
              </div>
              <p className="text-base sm:text-xl md:text-2xl font-semibold text-white whitespace-nowrap">사용자</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <ArrowLeftRight className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-pink-500 animate-pulse" />
            </div>

            {/* Tattoo Rounge Logo */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white/10 backdrop-blur-sm border-4 border-pink-500 flex items-center justify-center shadow-2xl p-3 sm:p-4">
                <img src={tattooRoungeLogo} alt="Tattoo Rounge" className="w-full h-full object-contain" />
              </div>
              <p className="text-base sm:text-xl md:text-2xl font-semibold text-gradient whitespace-nowrap">타투라운지</p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <ArrowLeftRight className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-pink-500 animate-pulse" />
            </div>

            {/* Artist */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-2xl">
                <Paintbrush className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" strokeWidth={1.5} />
              </div>
              <p className="text-base sm:text-xl md:text-2xl font-semibold text-white whitespace-nowrap">타투이스트</p>
            </div>
        </div>
      </div>

      <div className="container-custom px-6 md:px-12">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Features */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              { title: "예약", description: "간편한 예약 시스템" },
              { title: "알림", description: "실시간 알림 서비스" },
              { title: "견적 상담", description: "투명한 가격 안내" },
              { title: "도안 작성", description: "AI 도안 생성" },
              { title: "홍보", description: "마케팅 지원" },
              { title: "고객 분석", description: "최고의 사용자 경험" }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
