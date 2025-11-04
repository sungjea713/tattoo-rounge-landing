import React, { useEffect, useRef } from "react";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  delay?: number;
}

export default function PillarCard({ icon, title, description, imageUrl, delay = 0 }: PillarCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-slide-up");
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Parse description to handle **bold** markdown syntax
  const parseDescription = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold text-white">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      ref={cardRef}
      className="group opacity-0 bg-dark-200 border border-gray-border rounded-lg p-8 hover:bg-dark-400 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 flex flex-col h-full"
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="text-white flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-light leading-relaxed mb-6 flex-grow">
        {parseDescription(description)}
      </p>

      {/* Visual/Image */}
      {imageUrl && (
        <div className="mt-auto rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
