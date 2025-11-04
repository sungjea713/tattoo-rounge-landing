import React, { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { X, Send } from "lucide-react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS 설정 - 실제 사용시 환경 변수로 교체하세요
      const serviceId = "YOUR_SERVICE_ID"; // 교체 필요
      const templateId = "YOUR_TEMPLATE_ID"; // 교체 필요
      const publicKey = "YOUR_PUBLIC_KEY"; // 교체 필요

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-dark-200 border border-gray-border rounded-lg p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-medium hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          문의하기
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-light mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors"
              placeholder="홍길동"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-light mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors"
              placeholder="example@email.com"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-light mb-2">
              문의 내용
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-dark-300 border border-gray-border rounded-lg text-white placeholder-gray-medium focus:border-white focus:outline-none transition-colors resize-none"
              placeholder="문의하실 내용을 입력해주세요..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              "전송 중..."
            ) : (
              <>
                <Send size={20} />
                문의 보내기
              </>
            )}
          </button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <p className="text-green-400 text-center">문의가 성공적으로 전송되었습니다!</p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-400 text-center">전송 중 오류가 발생했습니다. 다시 시도해주세요.</p>
          )}
        </form>
      </div>
    </div>
  );
}
