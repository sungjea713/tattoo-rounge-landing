import React, { useState } from "react";
import CTAButton from "./CTAButton";
import ContactForm from "./ContactForm";

export default function FinalCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="relative section-padding bg-gradient-to-b from-dark via-dark-100 to-dark overflow-hidden"
      >
        {/* Background Effect */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom">
          <div className="flex flex-col items-center text-center gap-12">
            {/* Main Copy */}
            <div className="space-y-6 max-w-4xl">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block mb-4">멈춰있던 잠재력이</span>
                <span className="text-gradient block">깨어납니다.</span>
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl text-gray-light font-light leading-relaxed">
                새로운 시대의 기회는,
                <br />
                기다리는 자에게 주어지지 않습니다.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <CTAButton size="lg" onClick={() => setIsFormOpen(true)}>
                지금 6개월 프리미엄 혜택 받고 시작하기
              </CTAButton>
              <CTAButton size="lg" variant="secondary" onClick={() => setIsFormOpen(true)}>
                문의하기
              </CTAButton>
            </div>

            {/* Urgency Text */}
            <p className="text-sm text-gray-medium mt-4">
              (혜택 마감일 임박)
            </p>

            {/* Additional Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">6개월</div>
                <div className="text-gray-light">수수료 면제</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-light">고객 지원</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">무제한</div>
                <div className="text-gray-light">포트폴리오 업로드</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
