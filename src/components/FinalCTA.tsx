import React, { useState, FormEvent, useEffect } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function FinalCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // EmailJS 초기화
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
      console.log("EmailJS 초기화 완료");
    } else {
      console.error("VITE_EMAILJS_PUBLIC_KEY가 설정되지 않았습니다.");
    }
  }, []);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("=== 폼 제출 시작 ===");
    console.log("폼 데이터:", formData);

    try {
      // 1. Google Sheets에 데이터 저장
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";
      console.log("Google Script URL:", GOOGLE_SCRIPT_URL ? "설정됨" : "없음");

      if (GOOGLE_SCRIPT_URL) {
        console.log("Google Sheets 저장 시작...");
        const payload = {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          instagram: formData.instagram,
          message: formData.message,
          timestamp: new Date().toISOString(),
        };
        console.log("전송할 데이터:", payload);

        const sheetResponse = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        console.log("✅ Google Sheets 저장 완료");
      } else {
        console.warn("⚠️ Google Script URL이 설정되지 않았습니다.");
      }

      // 2. EmailJS로 이메일 전송
      const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
      const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
      const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

      console.log("EmailJS 환경변수:", {
        serviceId: emailServiceId ? "설정됨" : "없음",
        templateId: emailTemplateId ? "설정됨" : "없음",
        publicKey: emailPublicKey ? "설정됨" : "없음",
      });

      if (emailServiceId && emailTemplateId && emailPublicKey) {
        console.log("이메일 전송 시작...");
        const emailParams = {
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          from_instagram: formData.instagram,
          message: formData.message,
          timestamp: new Date().toLocaleString("ko-KR"),
        };
        console.log("이메일 파라미터:", emailParams);

        const response = await emailjs.send(
          emailServiceId,
          emailTemplateId,
          emailParams,
          emailPublicKey
        );
        console.log("✅ 이메일 전송 완료:", response);
      } else {
        console.warn("⚠️ EmailJS 환경변수가 모두 설정되지 않았습니다.");
      }

      console.log("=== 전송 성공 ===");
      setSubmitStatus("success");
      setFormData({ name: "", phone: "", email: "", instagram: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("❌ Form submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {/* Contact Form */}
            <div className="w-full max-w-2xl mt-8">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* 이름 */}
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="이름"
                    className="w-full px-6 py-4 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="연락처"
                    className="w-full px-6 py-4 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="이메일"
                    className="w-full px-6 py-4 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* 인스타그램 아이디 */}
                <div>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="인스타그램 아이디 (선택)"
                    className="w-full px-6 py-4 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors text-lg"
                  />
                </div>

                {/* 문의 내용 */}
                <div>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="문의 내용을 입력하세요"
                    className="w-full px-6 py-4 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors text-lg resize-none"
                  />
                </div>

                {/* 보내기 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-button-primary text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    "전송 중..."
                  ) : (
                    <>
                      <Send size={20} />
                      보내기
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <p className="text-green-400 text-center text-lg">문의가 성공적으로 전송되었습니다!</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-center text-lg">전송 중 오류가 발생했습니다. 다시 시도해주세요.</p>
                )}
              </form>

              {/* Contact Button */}
              <div className="mt-4">
                <a
                  href="http://pf.kakao.com/_NxcwHn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-dark-300 border border-gray-border text-white font-semibold px-8 py-4 rounded-lg hover:border-white transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  카카오톡 문의하기
                </a>
              </div>
            </div>

            <style>{`
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }

              @keyframes glow-pulse {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(220, 38, 38, 0.4),
                              0 0 40px rgba(220, 38, 38, 0.2),
                              0 0 60px rgba(220, 38, 38, 0.1);
                }
                50% {
                  box-shadow: 0 0 30px rgba(220, 38, 38, 0.6),
                              0 0 60px rgba(220, 38, 38, 0.3),
                              0 0 90px rgba(220, 38, 38, 0.2);
                }
              }

              .cta-button-primary {
                background: linear-gradient(135deg, #dc2626, #ef4444, #f87171, #dc2626, #ef4444);
                background-size: 300% 300%;
                animation: gradient-shift 3s ease infinite, glow-pulse 2s ease-in-out infinite;
                border: 2px solid rgba(255, 255, 255, 0.3);
              }

              .cta-button-primary:hover {
                background: linear-gradient(135deg, #b91c1c, #dc2626, #ef4444, #b91c1c, #dc2626);
                background-size: 300% 300%;
                animation: gradient-shift 2s ease infinite, glow-pulse 1.5s ease-in-out infinite;
              }
            `}</style>

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
    </>
  );
}
