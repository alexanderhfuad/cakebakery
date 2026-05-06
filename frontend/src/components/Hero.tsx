import { useEffect, useRef } from 'react';
import { ChevronDown, Star, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const stats = [
  { key: 'hero.stat.orders', value: '500+' },
  { key: 'hero.stat.customers', value: '200+' },
  { key: 'hero.stat.years', value: '3+' },
];

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = el.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const lines = t('hero.title').split('\n');

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/40 dark:bg-amber-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/20 dark:bg-rose-900/10 rounded-full blur-3xl" />

        {/* Floating shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-rose-300/40 dark:bg-rose-700/30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-3.5 h-3.5 fill-current" />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              {lines.map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <a
                href={`https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-rose-200 dark:shadow-rose-900/30 hover:shadow-xl hover:shadow-rose-300 dark:hover:shadow-rose-900/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                {t('hero.cta.order')}
              </a>
              <button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:border-rose-300 hover:text-rose-500 dark:hover:border-rose-700 dark:hover:text-rose-400 transition-all duration-200"
              >
                {t('hero.cta.gallery')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
              {stats.map(({ key, value }) => (
                <div key={key} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{t(key)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px]">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-rose-200 dark:border-rose-800/50 animate-spin-slow" />

              {/* Main image circle */}
              <div className="absolute inset-6 rounded-full overflow-hidden shadow-2xl shadow-rose-200 dark:shadow-rose-900/30">
                <img
                  src="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Beautiful custom cake"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 flex items-center gap-2.5 animate-float">
                <div className="w-9 h-9 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-lg">🎂</div>
                <div>
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">Custom Order</div>
                  <div className="text-[10px] text-gray-400">100% Homemade</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 flex items-center gap-2.5 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex -space-x-1.5">
                  {['🌟', '⭐', '✨'].map((s, i) => (
                    <span key={i} className="text-sm">{s}</span>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900 dark:text-white">5.0 Rating</div>
                  <div className="text-[10px] text-gray-400">200+ Reviews</div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-rose-500 text-white rounded-2xl shadow-xl p-3 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-xs font-bold">Fresh</div>
                <div className="text-[10px] opacity-80">Daily</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors animate-bounce"
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
}
