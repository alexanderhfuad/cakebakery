import { Gem, Palette, Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionBadge from './ui/SectionBadge';

const features = [
  { icon: Gem, keyTitle: 'about.feat1.title', keyDesc: 'about.feat1.desc', color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' },
  { icon: Palette, keyTitle: 'about.feat2.title', keyDesc: 'about.feat2.desc', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { icon: Clock, keyTitle: 'about.feat3.title', keyDesc: 'about.feat3.desc', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: DollarSign, keyTitle: 'about.feat4.title', keyDesc: 'about.feat4.desc', color: 'text-sky-500 bg-sky-50 dark:bg-sky-900/20' },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Beautiful cake creation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-video shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Cake decorating"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-video shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Custom cupcakes"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Wedding cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3 max-w-[180px]">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏆</div>
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">Best Seller</div>
                <div className="text-xs text-gray-400">Custom Cake 2024</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionBadge>{t('about.badge')}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mt-4 mb-6">
              {t('about.title').split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>{line}</span>
              ))}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              {t('about.desc')}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map(({ icon: Icon, keyTitle, keyDesc, color }) => (
                <div key={keyTitle} className="flex gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t(keyTitle)}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{t(keyDesc)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
