import React from "react";
import { Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-300 border-t border-gray-border py-8">
      <div className="container-custom px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <p className="text-gray-light text-sm mb-1">
              상호: <span className="text-white font-medium">웨버</span>
              <span className="mx-2 text-gray-600">|</span>
              대표: <span className="text-white font-medium">김성재</span>
            </p>
            <p className="text-gray-light text-sm mb-2">
              사업자등록번호: <span className="text-white font-medium">847-05-03134</span>
            </p>
            <p className="text-gray-400 text-xs">
              © 2024 Tattoo Rounge. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <a
              href="tel:010-9229-8794"
              className="flex items-center gap-2 text-gray-light hover:text-white transition-colors group"
            >
              <Phone size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">010-9229-8794</span>
            </a>
            <a
              href="https://www.webber-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-light hover:text-white transition-colors group"
            >
              <Globe size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">www.webber-ai.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
