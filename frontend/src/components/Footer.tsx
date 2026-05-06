import { Cake, Heart, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.products', href: '#products' },
  { key: 'nav.testimonials', href: '#testimonials' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Footer() {
  const { t } = useLanguage();

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14 border-b border-gray-800">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-400 to-rose-600 rounded-xl flex items-center justify-center">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">Brielicious</div>
                <div className="text-[10px] text-rose-400 font-medium tracking-widest uppercase">Cake & Bakery</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/brielicious/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-br hover:from-rose-400 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/Yuliana-Anggraeni"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-emerald-500 rounded-lg flex items-center justify-center transition-all duration-200"
              >
                <span className="text-base">💬</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">{t('footer.links')}</h4>
            <ul className="space-y-2.5">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <button
                    onClick={() => handleNav(href)}
                    className="text-gray-400 hover:text-rose-400 text-sm transition-colors"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={`https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-rose-400 transition-colors"
                >
                  📱 +62 896-7270-1795
                </a>
              </li>
              <li className="leading-relaxed">
                🕐 {t('contact.info.hours.detail').replace(/\n/g, ' · ')}
              </li>
            </ul>
          </div>
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Brielicious Cake & Bakery. {t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            {t('footer.made')} <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 mx-0.5" /> {t('footer.love')}
          </p>
        </div>
      </div>
    </footer>
  );
}
