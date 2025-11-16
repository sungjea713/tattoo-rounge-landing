import React, { useEffect, useRef } from "react";
import PillarCard from "./PillarCard";
import { Rocket, FileText, TrendingUp, Clock, Sparkles, Users } from "lucide-react";
import marketImg from "../images/market.png";
import craftmanImg from "../images/craftman.png";
import growthImg from "../images/growth.png";
import timerImg from "../images/timer.png";
import designImg from "../images/design.png";
import documentsImg from "../images/documents.png";
import tattooDragon2 from "../images/tattoo-dragon-2.png";

export default function CorePillars() {
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
      // Phase 1: Enter - section top enters viewport (image slides in from LEFT)
      const enterStart = sectionTop - viewportHeight;
      const enterEnd = sectionTop;

      // Phase 2: Exit - section bottom leaves viewport (image slides out to LEFT)
      const exitStart = sectionTop + sectionHeight - viewportHeight;
      const exitEnd = sectionTop + sectionHeight;

      let opacity = 0;
      let translateX = -100; // Start off-screen to the LEFT

      if (scrollY < enterStart) {
        // Before section enters viewport
        opacity = 0;
        translateX = -100;
      } else if (scrollY >= enterStart && scrollY <= enterEnd) {
        // Phase 1: Entering - slide in from left
        const enterProgress = (scrollY - enterStart) / (enterEnd - enterStart);
        opacity = 0.3 * enterProgress;
        translateX = -100 * (1 - enterProgress); // -100 -> 0
      } else if (scrollY > enterEnd && scrollY < exitStart) {
        // Middle phase: fully visible at position
        opacity = 0.3;
        translateX = 0;
      } else if (scrollY >= exitStart && scrollY <= exitEnd) {
        // Phase 2: Exiting - slide out to left
        const exitProgress = (scrollY - exitStart) / (exitEnd - exitStart);
        opacity = 0.3 * (1 - exitProgress);
        translateX = -100 * exitProgress; // 0 -> -100
      } else {
        // After section exits viewport
        opacity = 0;
        translateX = -100;
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

  const pillars = [
    {
      icon: <Rocket size={32} />,
      title: "시장 확장",
      description: "경계가 사라집니다. 당신을 기다리는 **수백만 고객**. 타투 **합법화 시대**에 맞춰 새롭게 유입되는 **거대한 시장**의 잠재 고객을 손쉽게 연결합니다. 기존의 한계를 넘어, 성장은 이제 **자연스러운 결과**입니다.",
      imageUrl: marketImg,
    },
    {
      icon: <FileText size={32} />,
      title: "전문성의 기준",
      description: "미래를 준비하는 단 하나의 기준. **독점적인 법적 인사이트**. 타투이스트 **합법화 법령 제정 및 시행 일정**, **자격 취득을 위한 교육 일정** 등 정부가 발표하는 주요 공지 내용을 **가장 빠르고 정확하게** 안내합니다.",
      imageUrl: craftmanImg,
    },
    {
      icon: <TrendingUp size={32} />,
      title: "비즈니스 성장",
      description: "측정하고, 분석하고, 지배하세요. **전문 마케팅 대시보드**. **매출 증대**를 위한 과학적 도구입니다. **포트폴리오 노출수**, **인기 도안 트렌드**, **고객 전환율**을 **실시간 데이터**로 확인하고 비즈니스를 최적화하세요.",
      imageUrl: growthImg,
    },
    {
      icon: <Clock size={32} />,
      title: "작업 효율",
      description: "관리 시간을 덜어냅니다. **예약부터 정산까지, 자동화**의 미학. 복잡했던 **견적 조율**, **실시간 예약 확인**, **고객 관리**가 **앱 하나로** 간결해집니다. 불필요한 행정 업무를 **획기적으로 줄이고**, 당신의 시간은 **오직 창작에만** 쓰입니다.",
      imageUrl: timerImg,
    },
    {
      icon: <Sparkles size={32} />,
      title: "쉬운 디자인",
      description: "모호함은 사라지고, **명료한 도안**이 남습니다. 고객이 원하는 바를 **AI 프롬프트**로 명확히 정의하세요. **상담 시간을 줄이고**, 바로 시술에 들어갈 수 있는 쉬운 디자인 환경을 제공하여 **고객 만족도를 극대화**합니다.",
      imageUrl: designImg,
    },
    {
      icon: <Users size={32} />,
      title: "간편 이전",
      description: "시작은 언제나 쉬워야 합니다. **인스타그램 포트폴리오**를 그대로. 귀찮은 포트폴리오 재구축은 이제 없습니다. **클릭 한 번**으로 당신의 **모든 작업 기록**을 앱에 **완벽히 이식**합니다. **가장 빠르고 완벽한 시작**을 경험하세요.",
      imageUrl: documentsImg,
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="section-padding bg-dark-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24 relative">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight relative z-10">
            <span className="block mb-4">타투의 예술과 비즈니스,</span>
            <span className="block mb-4">그리고 미래를 위한 정밀한 도구.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto relative z-10">
            이제 모든 잠재력을 펼치세요.
          </p>

          {/* Background Decorative Image - Behind title, slides in from left */}
          <img
            ref={bgImageRef}
            src={tattooDragon2}
            alt="Tattoo Dragon Background"
            className="absolute top-1/2 w-auto pointer-events-none object-contain"
            style={{
              opacity: 0,
              willChange: 'opacity, transform',
              zIndex: 0,
              height: '700px',
              left: '-25%',
              transform: 'translateY(-50%) translateX(-100%)'
            }}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
              imageUrl={pillar.imageUrl}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
