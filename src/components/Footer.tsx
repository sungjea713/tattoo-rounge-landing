import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-gray-border">
      <div className="container-custom px-6 py-12 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">
            Tattoo Rounge
          </div>
          <div className="text-gray-medium text-sm">
            © 2025 Tattoo Rounge. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-medium hover:text-white transition-colors text-sm">
              이용약관
            </a>
            <a href="#" className="text-gray-medium hover:text-white transition-colors text-sm">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
