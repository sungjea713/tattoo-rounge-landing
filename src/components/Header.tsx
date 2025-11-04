import React from "react";
import logo from "../images/tattoo-rounge-logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-border">
      <div className="container-custom px-6 py-4 md:px-12">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src={logo}
              alt="Tattoo Rounge Logo"
              className="h-14 md:h-16 lg:h-20 w-auto"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-light hover:text-white transition-colors">
              특징
            </a>
            <a href="#tools" className="text-gray-light hover:text-white transition-colors">
              기능
            </a>
            <a href="#contact" className="text-gray-light hover:text-white transition-colors">
              문의하기
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
