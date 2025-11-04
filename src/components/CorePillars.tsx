import React from "react";
import PillarCard from "./PillarCard";
import { Rocket, FileText, TrendingUp, Clock, Sparkles, Users } from "lucide-react";

export default function CorePillars() {
  const pillars = [
    {
      icon: <Rocket size={32} />,
      title: "시장 확장",
      description: "경계가 사라집니다. 당신을 기다리는 수백만 고객. 타투 합법화 시대에 맞춰 새롭게 유입되는 거대한 시장의 잠재 고객을 손쉽게 연결합니다. 기존의 한계를 넘어, 성장은 이제 자연스러운 결과입니다.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    },
    {
      icon: <FileText size={32} />,
      title: "전문성의 기준",
      description: "미래를 준비하는 단 하나의 기준. 독점적인 법적 인사이트. 타투이스트 합법화 법령 제정 및 시행 일정, 자격 취득을 위한 교육 일정 등 정부가 발표하는 주요 공지 내용을 가장 빠르고 정확하게 안내합니다.",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "비즈니스 성장",
      description: "측정하고, 분석하고, 지배하세요. 전문 마케팅 대시보드. 매출 증대를 위한 과학적 도구입니다. 포트폴리오 노출수, 인기 도안 트렌드, 고객 전환율을 실시간 데이터로 확인하고 비즈니스를 최적화하세요.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    },
    {
      icon: <Clock size={32} />,
      title: "작업 효율",
      description: "관리 시간을 덜어냅니다. 예약부터 정산까지, 자동화의 미학. 복잡했던 견적 조율, 실시간 예약 확인, 고객 관리가 앱 하나로 간결해집니다. 불필요한 행정 업무를 획기적으로 줄이고, 당신의 시간은 오직 창작에만 쓰입니다.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
    },
    {
      icon: <Sparkles size={32} />,
      title: "쉬운 디자인",
      description: "모호함은 사라지고, 명료한 도안이 남습니다. 고객이 원하는 바를 AI 프롬프트로 명확히 정의하세요. 상담 시간을 줄이고, 바로 시술에 들어갈 수 있는 쉬운 디자인 환경을 제공하여 고객 만족도를 극대화합니다.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    },
    {
      icon: <Users size={32} />,
      title: "간편 이전",
      description: "시작은 언제나 쉬워야 합니다. 인스타그램 포트폴리오를 그대로. 귀찮은 포트폴리오 재구축은 이제 없습니다. 클릭 한 번으로 당신의 모든 작업 기록을 앱에 완벽히 이식합니다. 가장 빠르고 완벽한 시작을 경험하세요.",
      imageUrl: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="features" className="section-padding bg-dark-50">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            우리는 당신의 예술과 비즈니스,
            <br />
            그리고 미래를 위한 정밀한 도구를 제공합니다.
          </h2>
          <p className="text-xl md:text-2xl text-gray-light max-w-3xl mx-auto">
            이제 모든 잠재력을 펼치세요.
          </p>
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
