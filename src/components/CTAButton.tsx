import React from "react";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export default function CTAButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  showIcon = false,
}: CTAButtonProps) {
  const baseStyles = "font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 relative overflow-hidden";

  const variantStyles = {
    primary: "cta-button-primary text-white",
    secondary: "bg-transparent text-white hover:bg-white hover:text-black border-2 border-white",
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <>
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

        .cta-button-primary::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shine 3s ease-in-out infinite;
          border-radius: inherit;
          z-index: -1;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
      <button
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} rounded-lg flex items-center gap-2 justify-center`}
      >
        <span>{children}</span>
        {showIcon && <ArrowRight className="w-5 h-5 animate-pulse" />}
      </button>
    </>
  );
}
