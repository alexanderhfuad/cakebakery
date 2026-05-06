import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionBadge from './ui/SectionBadge';

const testimonials = [
  {
    name: 'Lia Permata',
    role: 'Ibu Rumah Tangga',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    textId: 'Kue ulang tahun anakku beneran cantik banget! Desainnya persis seperti yang aku minta, dan rasanya super enak. Semua tamu pesta sampai nanya beli dimana. Pasti bakal order lagi!',
    textEn: "My daughter's birthday cake was incredibly beautiful! The design was exactly as I requested, and it tasted amazing. All the party guests kept asking where I bought it. Will definitely order again!",
  },
  {
    name: 'Keisha Rahmawati',
    role: 'Event Organizer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    textId: 'Sudah beberapa kali pesan untuk event klien dan selalu memuaskan. Kualitas konsisten, tepat waktu, dan harganya sangat worth it. Brielicious jadi partner andalan untuk setiap acara!',
    textEn: "I've ordered several times for client events and it's always satisfying. Consistent quality, on time, and very worth the price. Brielicious has become my go-to partner for every event!",
  },
  {
    name: 'Farid Anshari',
    role: 'Pelanggan Setia',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    textId: 'Pesan kue wedding anniversary istri, dan hasilnya melebihi ekspektasi! Detailnya luar biasa, rasanya juga enak banget. Istri sampai nangis senang. Terima kasih Brielicious!',
    textEn: "Ordered a wedding anniversary cake for my wife, and the result exceeded expectations! The details were amazing, and it tasted incredible. My wife was moved to tears of joy. Thank you Brielicious!",
  },
  {
    name: 'Dina Kusuma',
    role: 'Content Creator',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    textId: 'Aesthetic banget! Kue dari Brielicious selalu jadi bintang di setiap foto. Cocok banget buat konten, dan tentu saja rasanya tidak kalah dengan tampilannya. Highly recommend!',
    textEn: 'Super aesthetic! Cakes from Brielicious always steal the show in every photo. Perfect for content, and of course the taste matches the appearance. Highly recommend!',
  },
];

export default function Testimonials() {
  const { lang, t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionBadge>{t('testimonials.badge')}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mt-4">
            {t('testimonials.title').split('\n').map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>{line}</span>
            ))}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t_item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-rose-200 dark:text-rose-800" />

              <div className="flex items-center gap-1">
                {[...Array(t_item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1">
                "{lang === 'id' ? t_item.textId : t_item.textEn}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={t_item.avatar}
                  alt={t_item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{t_item.name}</div>
                  <div className="text-xs text-gray-400">{t_item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-white">5.0</div>
            <div className="flex justify-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rating Keseluruhan</div>
          </div>
          <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{lang === 'id' ? 'Ulasan Positif' : 'Positive Reviews'}</div>
          </div>
          <div className="w-px h-16 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{lang === 'id' ? 'Tingkat Kepuasan' : 'Satisfaction Rate'}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
