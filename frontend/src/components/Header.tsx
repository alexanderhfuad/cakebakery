import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Cake } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.products', href: '#products' },
  { key: 'nav.testimonials', href: '#testimonials' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map(n => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg shadow-rose-100/20 dark:shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-rose-300 dark:group-hover:shadow-rose-900 transition-shadow">
              <Cake className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">Brielicious</span>
              <span className="block text-[10px] text-rose-500 font-medium tracking-widest uppercase">Cake & Bakery</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => handleNavClick(href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === href.slice(1)
                    ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {t(key)}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-rose-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all"
            >
              {lang === 'id' ? '🇮🇩 ID' : '🇺🇸 EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-rose-300 hover:text-rose-500 dark:hover:text-rose-400 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navItems.map(({ key, href }) => (
              <button
                key={key}
                onClick={() => handleNavClick(href)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === href.slice(1)
                    ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {t(key)}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 mt-1 border border-gray-200 dark:border-gray-700"
            >
              {lang === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
