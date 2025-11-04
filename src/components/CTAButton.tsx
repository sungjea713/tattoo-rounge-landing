import React from "react";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function CTAButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
}: CTAButtonProps) {
  const baseStyles = "font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95";

  const variantStyles = {
    primary: "bg-white text-black hover:bg-gray-200 border-2 border-white",
    secondary: "bg-transparent text-white hover:bg-white hover:text-black border-2 border-white",
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
