import { ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionBadge from './ui/SectionBadge';

const products = [
  {
    keyName: 'products.cat1',
    keyDesc: 'products.cat1.desc',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '🎂',
    featured: true,
  },
  {
    keyName: 'products.cat2',
    keyDesc: 'products.cat2.desc',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '💍',
    featured: false,
  },
  {
    keyName: 'products.cat3',
    keyDesc: 'products.cat3.desc',
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '🎉',
    featured: false,
  },
  {
    keyName: 'products.cat4',
    keyDesc: 'products.cat4.desc',
    image: 'https://images.pexels.com/photos/3407777/pexels-photo-3407777.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '🧁',
    featured: false,
  },
  {
    keyName: 'products.cat5',
    keyDesc: 'products.cat5.desc',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '✨',
    featured: false,
  },
  {
    keyName: 'products.cat6',
    keyDesc: 'products.cat6.desc',
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600',
    tag: '🎨',
    featured: false,
  },
];

export default function Products() {
  const { t } = useLanguage();

  const waOrder = (name: string) => {
    const msg = encodeURIComponent(`Halo Brielicious! Saya ingin memesan ${name} 🎂`);
    window.open(`https://wa.me/6289672701795?text=${msg}`, '_blank');
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionBadge>{t('products.badge')}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mt-4 mb-4">
            {t('products.title').split('\n').map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>{line}</span>
            ))}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t('products.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.keyName}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={product.image}
                  alt={t(product.keyName)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 left-3 w-9 h-9 bg-white/90 dark:bg-gray-900/90 rounded-xl flex items-center justify-center text-lg shadow-md">
                  {product.tag}
                </div>
                {product.featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-lg">
                    Best Seller
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => waOrder(t(product.keyName))}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {t('products.order')}
                  </button>
                  <button
                    onClick={() => waOrder(t(product.keyName))}
                    className="flex items-center justify-center w-8 bg-white/90 hover:bg-white text-gray-700 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{t(product.keyName)}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{t(product.keyDesc)}</p>
                <button
                  onClick={() => waOrder(t(product.keyName))}
                  className="w-full py-2.5 border-2 border-rose-200 dark:border-rose-800 text-rose-500 dark:text-rose-400 text-sm font-semibold rounded-xl hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500 transition-all duration-200"
                >
                  {t('products.inquire')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
