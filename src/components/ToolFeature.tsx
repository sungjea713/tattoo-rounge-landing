import React, { useEffect, useRef } from "react";

interface ToolFeatureProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

export default function ToolFeature({ title, description, imageUrl, reverse = false }: ToolFeatureProps) {
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={featureRef}
      className={`opacity-0 flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16 mb-24 lg:mb-32`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-lg overflow-hidden shadow-2xl border border-gray-border group">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-gray-light leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
