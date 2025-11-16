import React, { useEffect, useRef } from "react";
import ToolFeature from "./ToolFeature";
import { Instagram, Zap, BarChart3 } from "lucide-react";
import instaToRoungeImg from "../images/insta-to-rounge.png";
import intelligenceMatchingImg from "../images/intelligence-matching.png";
import dashboardImg from "../images/dashboard.png";
import tattooTree2 from "../images/tattoo-tree-2.png";

export default function PrecisionTools() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgImageRef.current) return;

      const section = sectionRef.current;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Section absolute position
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Define scroll ranges
      // Phase 1: Enter - section top enters viewport (image slides in from right)
      const enterStart = sectionTop - viewportHeight;
      const enterEnd = sectionTop;

      // Phase 2: Exit - section bottom leaves viewport (image slides out to right)
      const exitStart = sectionTop + sectionHeight - viewportHeight;
      const exitEnd = sectionTop + sectionHeight;

      let opacity = 0;
      let translateX = 100; // Start off-screen to the right

      if (scrollY < enterStart) {
        // Before section enters viewport
        opacity = 0;
        translateX = 100;
      } else if (scrollY >= enterStart && scrollY <= enterEnd) {
        // Phase 1: Entering - slide in from right
        const enterProgress = (scrollY - enterStart) / (enterEnd - enterStart);
        opacity = 0.3 * enterProgress;
        translateX = 100 * (1 - enterProgress); // 100 -> 0
      } else if (scrollY > enterEnd && scrollY < exitStart) {
        // Middle phase: fully visible at position
        opacity = 0.3;
        translateX = 0;
      } else if (scrollY >= exitStart && scrollY <= exitEnd) {
        // Phase 2: Exiting - slide out to right
        const exitProgress = (scrollY - exitStart) / (exitEnd - exitStart);
        opacity = 0.3 * (1 - exitProgress);
        translateX = 100 * exitProgress; // 0 -> 100
      } else {
        // After section exits viewport
        opacity = 0;
        translateX = 100;
      }

      bgImageRef.current.style.opacity = String(opacity);
      bgImageRef.current.style.transform = `translateY(-50%) translateX(${translateX}%)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const tools = [
    {
      title: "즉각적인 포트폴리오",
      description: "가장 빠르고 완벽한 시작. 당신의 인스타 포트폴리오를 몇 초만에 그대로 가져옵니다. 인스타그램에서 쌓아온 모든 작업물을 클릭 한 번으로 가져오세요. 복잡한 재등록 과정 없이, 바로 비즈니스를 시작할 수 있습니다. 고품질 포트폴리오가 자동으로 정리됩니다.",
      imageUrl: instaToRoungeImg,
      icon: <Instagram size={40} />,
    },
    {
      title: "매칭 인텔리전스",
      description: "거리, 스타일, 그리고 비전. 가장 적합한 고객만을 연결합니다. AI 기반 매칭 시스템이 고객의 취향, 위치, 예산을 분석하여 당신에게 딱 맞는 고객을 찾아줍니다. 시간 낭비 없이 성공적인 매칭만 경험하세요.",
      imageUrl: intelligenceMatchingImg,
      icon: <Zap size={40} />,
    },
    {
      title: "매출 최적화 대시보드",
      description: "더 이상 감(感)으로 영업하지 마세요. 어떤 포트폴리오가 고객 전환율이 높은지, 어떤 지역에서 문의가 급증하는지 객관적인 데이터로 확인하고 다음 마케팅 전략을 세울 수 있습니다. 실시간으로 업데이트되는 정밀한 인사이트를 통해 비즈니스를 성장시키세요.",
      imageUrl: dashboardImg,
      icon: <BarChart3 size={40} />,
    },
  ];

  return (
    <section ref={sectionRef} id="tools" className="section-padding bg-dark relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20 md:mb-32 relative">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative z-10">
            <span className="block mb-4">타투의 예술과 비즈니스를 위한</span>
            <span className="text-gradient block">정밀한 도구.</span>
          </h2>

          {/* Background Decorative Image - Behind title, slides in from right */}
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
              right: '-10%',
              transform: 'translateY(-50%) translateX(100%)'
            }}
          />
        </div>

        {/* Tool Features */}
        <div>
          {tools.map((tool, index) => (
            <ToolFeature
              key={index}
              title={tool.title}
              description={tool.description}
              imageUrl={tool.imageUrl}
              icon={tool.icon}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
