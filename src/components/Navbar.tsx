import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon, Lock, Layers } from 'lucide-react';

interface NavbarProps {
  name: string;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  currentPage,
  setCurrentPage,
  theme,
  setTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'experience', name: 'Experience' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = `#${pageId}`;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FAF7F2]/95 dark:bg-[#141210]/95 backdrop-blur-md border-b border-[#E8E0D5] dark:border-[#38332E] py-3 shadow-xs' 
        : 'bg-[#FAF7F2]/80 dark:bg-[#141210]/80 backdrop-blur-xs py-4 border-b border-[#E8E0D5]/50 dark:border-[#38332E]/50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand: Etsegenet Amsalu + Computer Science Student at Addis Ababa University */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 shrink text-left focus:outline-none cursor-pointer group min-w-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#C85A32] dark:bg-[#E07A5F] flex items-center justify-center font-mono font-bold text-white text-xs shadow-xs group-hover:scale-105 transition-transform shrink-0">
            EA
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display font-medium text-[#1C1917] dark:text-[#F4EFEB] text-sm sm:text-base tracking-tight leading-tight truncate">
              {name || 'Etsegenet Amsalu'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F] leading-tight truncate">
              Computer Science Student at Addis Ababa University
            </span>
          </div>
        </button>

        {/* Clean Typographic Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-[#F5EFE6] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (currentPage.startsWith('project-') && link.id === 'projects');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#272320] text-[#C85A32] dark:text-[#E07A5F] font-bold shadow-xs'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917] dark:hover:text-[#F4EFEB]'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Primary Action & Controls */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl border border-[#E8E0D5] dark:border-[#38332E] bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#1C1917] dark:text-[#F4EFEB] hover:border-[#C85A32] transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="#admin"
            className="p-2 rounded-xl border border-[#E8E0D5] dark:border-[#38332E] bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] dark:hover:text-[#E07A5F] hover:border-[#C85A32] transition-colors"
            title="Admin Portal"
          >
            <Lock size={14} />
          </a>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 py-2 text-xs font-mono text-white bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Deal a Message</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl border border-[#E8E0D5] dark:border-[#38332E] bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#1C1917] dark:text-[#F4EFEB]"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] dark:text-[#F4EFEB] rounded-xl border border-[#E8E0D5] dark:border-[#38332E] bg-[#FFFFFF] dark:bg-[#1E1B18]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] dark:bg-[#141210] border-b border-[#E8E0D5] dark:border-[#38332E] px-4 pt-3 pb-6 space-y-2 mt-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 text-xs font-mono rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#C85A32] dark:bg-[#E07A5F] text-white font-bold'
                    : 'text-[#6B6560] dark:text-[#9E968F] hover:bg-[#F5EFE6] dark:hover:bg-[#1E1B18]'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E8E0D5] dark:border-[#38332E]">
            <a
              href="#admin"
              className="flex items-center gap-2 px-4 py-2 text-xs font-mono text-[#6B6560] dark:text-[#9E968F]"
            >
              <Lock size={13} />
              <span>Admin Portal Access</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
