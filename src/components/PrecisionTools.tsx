import React from "react";
import ToolFeature from "./ToolFeature";

export default function PrecisionTools() {
  const tools = [
    {
      title: "📈 매출 최적화 대시보드",
      description: "더 이상 감(感)으로 영업하지 마세요. 어떤 포트폴리오가 고객 전환율이 높은지, 어떤 지역에서 문의가 급증하는지 객관적인 데이터로 확인하고 다음 마케팅 전략을 세울 수 있습니다. 실시간으로 업데이트되는 정밀한 인사이트를 통해 비즈니스를 성장시키세요.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "지능형 매칭",
      description: "거리, 스타일, 그리고 비전. 가장 적합한 고객만을 연결합니다. AI 기반 매칭 시스템이 고객의 취향, 위치, 예산을 분석하여 당신에게 딱 맞는 고객을 찾아줍니다. 시간 낭비 없이 성공적인 매칭만 경험하세요.",
      imageUrl: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "즉각적인 포트폴리오",
      description: "가장 빠르고 완벽한 시작. 당신의 땀을 그대로 가져옵니다. 인스타그램에서 쌓아온 모든 작업물을 클릭 한 번으로 가져오세요. 복잡한 재등록 과정 없이, 바로 비즈니스를 시작할 수 있습니다. 고품질 포트폴리오가 자동으로 정리됩니다.",
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section id="tools" className="section-padding bg-dark">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            당신의 예술과 비즈니스를 위한
            <br />
            <span className="text-gradient">정밀한 도구.</span>
          </h2>
        </div>

        {/* Tool Features */}
        <div>
          {tools.map((tool, index) => (
            <ToolFeature
              key={index}
              title={tool.title}
              description={tool.description}
              imageUrl={tool.imageUrl}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
