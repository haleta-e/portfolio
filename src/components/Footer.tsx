import React from 'react';
import { Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ name, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] dark:bg-[#161412] border-t border-[#E7DFD3] dark:border-[#3A342F] py-12 px-4 transition-colors duration-300 text-[#1C1917] dark:text-[#F5F5F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-full bg-[#C85A32] dark:bg-[#E07A5F] flex items-center justify-center font-bold text-white text-xs">
              EA
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1917] dark:text-[#F5F5F4]">
                {name}
              </h3>
              <p className="text-xs text-[#78716C] dark:text-[#A8A29E]">
                Computer Science Student at Addis Ababa University
              </p>
            </div>
          </div>

          {/* Quick Page Links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#78716C] dark:text-[#A8A29E]">
            <button onClick={() => handleNav('home')} className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors">
              Home
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors">
              About
            </button>
            <button onClick={() => handleNav('projects')} className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors">
              Projects
            </button>
            <button onClick={() => handleNav('experience')} className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors">
              Experience
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors">
              Contact
            </button>
            <a href="#admin" className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] transition-colors flex items-center gap-1">
              <Lock size={12} /> Admin Portal
            </a>
          </nav>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#E7DFD3] dark:border-[#3A342F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] dark:text-[#A8A29E]">
          <p>© {currentYear} {name}. All rights reserved.</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-[#1C1917] dark:hover:text-[#F5F5F4] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
};
