import { Search, Menu, Globe, LogIn, Moon, Settings, Sun, Eye, Volume2 } from 'lucide-react';
import { NAV_ITEMS } from '../data';
import { useState, useEffect } from 'react';

export default function Navbar({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isTTS, setIsTTS] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
    if (document.documentElement.classList.contains('high-contrast')) {
      setIsHighContrast(true);
    }
  }, []);

  useEffect(() => {
    if (!isTTS) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.innerText) {
         window.speechSynthesis.cancel();
         const textToRead = target.innerText || target.textContent;
         if (textToRead && textToRead.length > 0 && textToRead.length < 500) {
            const validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'A', 'SPAN', 'LI'];
            if (validTags.includes(target.tagName)) {
              const utterance = new SpeechSynthesisUtterance(textToRead);
              utterance.rate = 0.9;
              window.speechSynthesis.speak(utterance);
            }
         }
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    }
  }, [isTTS]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    setIsHighContrast(!isHighContrast);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800 transition-colors">
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg leading-none">IAI</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
              India<span className="text-indigo-600 dark:text-indigo-400">AI</span>Jobs
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {NAV_ITEMS.slice(0, 6).map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => setIsTTS(!isTTS)}
              className={`transition-colors p-2 rounded-full flex items-center gap-1 ${isTTS ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-amber-400 hover:bg-indigo-50 dark:hover:bg-slate-800'}`}
              title={isTTS ? "Disable Text-to-Speech" : "Enable Text-to-Speech"}
            >
               <Volume2 className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleHighContrast}
              className={`transition-colors p-2 rounded-full flex items-center gap-1 ${isHighContrast ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' : 'text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-amber-400 hover:bg-indigo-50 dark:hover:bg-slate-800'}`}
              title={isHighContrast ? "Disable High Contrast" : "Enable High Contrast"}
            >
               <Eye className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleTheme}
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-amber-400 transition-colors p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center gap-1"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={onOpenAdmin}
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 flex items-center gap-1"
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center gap-1">
              <Globe className="w-5 h-5" />
              <span className="text-xs font-semibold">EN</span>
            </button>
            <div className="h-6 border-l border-gray-300 dark:border-gray-700"></div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all hover:shadow-lg">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-4">
             <button onClick={() => setIsTTS(!isTTS)} className={`p-2 ${isTTS ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`}>
               <Volume2 className="w-5 h-5" />
             </button>
             <button onClick={toggleHighContrast} className={`p-2 ${isHighContrast ? 'text-amber-600' : 'text-gray-500 dark:text-gray-400'}`}>
               <Eye className="w-5 h-5" />
             </button>
            <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 p-2">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onOpenAdmin} className="text-indigo-600 dark:text-indigo-400 p-2 bg-indigo-50 dark:bg-slate-800 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-4 py-4 space-y-1 shadow-lg absolute w-full left-0">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100 dark:border-slate-800 flex gap-2">
             <button className="flex-1 flex justify-center items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl text-base font-semibold">
              <LogIn className="w-5 h-5" />
              Login
            </button>
            <button className="flex-1 justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
