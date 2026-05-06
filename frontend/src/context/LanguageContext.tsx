import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.products': 'Produk',
    'nav.testimonials': 'Testimoni',
    'nav.faq': 'FAQ',
    'nav.contact': 'Kontak',

    // Hero
    'hero.badge': 'Homemade Custom Order',
    'hero.title': 'Wujudkan Cita Rasa\nKeindahan Anda',
    'hero.subtitle': 'Kue custom berkualitas tinggi, dibuat dengan cinta dan kreativitas untuk setiap momen spesial Anda.',
    'hero.cta.order': 'Pesan Sekarang',
    'hero.cta.gallery': 'Lihat Galeri',
    'hero.stat.orders': 'Pesanan Selesai',
    'hero.stat.customers': 'Pelanggan Puas',
    'hero.stat.years': 'Tahun Berpengalaman',

    // About
    'about.badge': 'Tentang Kami',
    'about.title': 'Passion Kami adalah\nMembuat Anda Bahagia',
    'about.desc': 'Brielicious Cake & Bakery adalah usaha homemade custom order yang mengutamakan kualitas dan kepuasan pelanggan. Kami percaya setiap kue adalah karya seni yang harus memanjakan mata sekaligus lidah.',
    'about.feat1.title': 'Bahan Premium',
    'about.feat1.desc': 'Menggunakan bahan-bahan pilihan berkualitas tinggi untuk cita rasa terbaik.',
    'about.feat2.title': 'Desain Custom',
    'about.feat2.desc': 'Setiap kue dibuat sesuai keinginan dan impian Anda.',
    'about.feat3.title': 'Tepat Waktu',
    'about.feat3.desc': 'Pengiriman atau pengambilan selalu tepat sesuai janji.',
    'about.feat4.title': 'Harga Terjangkau',
    'about.feat4.desc': 'Kualitas premium dengan harga yang bersahabat untuk semua kalangan.',

    // Products
    'products.badge': 'Menu Kami',
    'products.title': 'Koleksi Kue\nSpesial Kami',
    'products.subtitle': 'Setiap kreasi kami dibuat dengan penuh cinta dan perhatian pada detail, memastikan pengalaman yang tak terlupakan.',
    'products.cat1': 'Kue Ulang Tahun',
    'products.cat1.desc': 'Rayakan momen spesial dengan kue ulang tahun custom yang memukau.',
    'products.cat2': 'Kue Pernikahan',
    'products.cat2.desc': 'Percantik hari istimewa Anda dengan kue pernikahan elegan dan megah.',
    'products.cat3': 'Kue Acara',
    'products.cat3.desc': 'Sempurnakan setiap acara dengan kue dekorasi yang menawan.',
    'products.cat4': 'Cupcakes',
    'products.cat4.desc': 'Mini kue cantik untuk dibagikan ke orang-orang tersayang.',
    'products.cat5': 'Kue Tema',
    'products.cat5.desc': 'Kue dengan tema khusus sesuai karakter favorit Anda.',
    'products.cat6': 'Kreasi Lain',
    'products.cat6.desc': 'Ekspresikan kreativitas tanpa batas dengan pilihan kreasi spesial.',
    'products.order': 'Pesan Sekarang',
    'products.inquire': 'Tanya Harga',

    // Testimonials
    'testimonials.badge': 'Testimoni',
    'testimonials.title': 'Apa Kata\nPelanggan Kami',

    // FAQ
    'faq.badge': 'FAQ',
    'faq.title': 'Pertanyaan yang\nSering Diajukan',
    'faq.q1': 'Bagaimana cara memesan kue?',
    'faq.a1': 'Anda bisa memesan melalui WhatsApp kami di +62 896-7270-1795. Konsultasikan desain, ukuran, dan tanggal pengambilan/pengiriman yang Anda inginkan.',
    'faq.q2': 'Berapa lama waktu pemesanan?',
    'faq.a2': 'Minimal pemesanan 3-7 hari sebelum acara, tergantung kerumitan desain. Untuk pesanan mendadak, silakan hubungi kami untuk konfirmasi ketersediaan.',
    'faq.q3': 'Apakah bisa custom desain?',
    'faq.a3': 'Tentu! Semua kue kami adalah custom order. Kami akan mewujudkan impian kue Anda dengan mengikuti referensi foto atau ide Anda.',
    'faq.q4': 'Apakah ada pengiriman?',
    'faq.a4': 'Saat ini kami melayani pengambilan langsung (self-pickup) dan pengiriman area tertentu. Hubungi kami untuk detail area pengiriman dan biaya.',
    'faq.q5': 'Berapa harga kue custom?',
    'faq.a5': 'Harga bervariasi tergantung ukuran, tingkat kerumitan desain, dan jenis kue. Konsultasikan kebutuhan Anda kepada kami untuk mendapatkan penawaran terbaik.',
    'faq.q6': 'Bagaimana sistem pembayaran?',
    'faq.a6': 'Pembayaran dilakukan dengan DP 50% saat konfirmasi pesanan, dan pelunasan sebelum atau saat pengambilan/pengiriman.',

    // Contact
    'contact.badge': 'Hubungi Kami',
    'contact.title': 'Siap Membuat\nMomen Spesial Anda?',
    'contact.subtitle': 'Hubungi kami sekarang untuk konsultasi gratis dan wujudkan kue impian Anda.',
    'contact.form.name': 'Nama Lengkap',
    'contact.form.email': 'Alamat Email',
    'contact.form.phone': 'Nomor WhatsApp',
    'contact.form.message': 'Pesan / Detail Pesanan',
    'contact.form.submit': 'Kirim Pesan',
    'contact.form.submitting': 'Mengirim...',
    'contact.form.success': 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.',
    'contact.form.error': 'Gagal mengirim pesan. Silakan coba lagi.',
    'contact.info.phone': 'WhatsApp',
    'contact.info.hours': 'Jam Operasional',
    'contact.info.hours.detail': 'Sen-Jum: 08.00 - 20.00 WIB\nSabtu: 09.00 - 16.00 WIB\nMinggu: Tutup',
    'contact.info.location': 'Lokasi',
    'contact.info.location.detail': 'Tersedia layanan antar\nHubungi untuk detail area',

    // WhatsApp
    'wa.tooltip': 'Chat WhatsApp',
    'wa.message': 'Halo Brielicious! Saya ingin memesan kue 🎂',

    // Footer
    'footer.desc': 'Homemade custom order cake & bakery yang mengutamakan kualitas dan kreativitas untuk setiap momen spesial Anda.',
    'footer.links': 'Tautan Cepat',
    'footer.contact': 'Kontak',
    'footer.follow': 'Ikuti Kami',
    'footer.rights': 'Hak cipta dilindungi.',
    'footer.made': 'Dibuat dengan',
    'footer.love': 'cinta',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.testimonials': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',

    // Hero
    'hero.badge': 'Homemade Custom Order',
    'hero.title': 'Bringing Your Sweet\nDreams to Life',
    'hero.subtitle': 'Premium quality custom cakes, crafted with love and creativity for every special moment of yours.',
    'hero.cta.order': 'Order Now',
    'hero.cta.gallery': 'View Gallery',
    'hero.stat.orders': 'Orders Completed',
    'hero.stat.customers': 'Happy Customers',
    'hero.stat.years': 'Years Experience',

    // About
    'about.badge': 'About Us',
    'about.title': 'Our Passion is\nMaking You Happy',
    'about.desc': 'Brielicious Cake & Bakery is a homemade custom order business that prioritizes quality and customer satisfaction. We believe every cake is a work of art that should delight both the eyes and the palate.',
    'about.feat1.title': 'Premium Ingredients',
    'about.feat1.desc': 'Using carefully selected high-quality ingredients for the best taste.',
    'about.feat2.title': 'Custom Design',
    'about.feat2.desc': 'Every cake is made according to your wishes and dreams.',
    'about.feat3.title': 'On Time',
    'about.feat3.desc': 'Delivery or pickup always as promised, no delays.',
    'about.feat4.title': 'Affordable Price',
    'about.feat4.desc': 'Premium quality at friendly prices accessible to everyone.',

    // Products
    'products.badge': 'Our Menu',
    'products.title': 'Our Special\nCake Collections',
    'products.subtitle': 'Every creation is made with love and attention to detail, ensuring an unforgettable experience.',
    'products.cat1': 'Birthday Cakes',
    'products.cat1.desc': 'Celebrate special moments with a stunning custom birthday cake.',
    'products.cat2': 'Wedding Cakes',
    'products.cat2.desc': 'Beautify your big day with an elegant and grand wedding cake.',
    'products.cat3': 'Event Cakes',
    'products.cat3.desc': 'Perfect every event with beautifully decorated cakes.',
    'products.cat4': 'Cupcakes',
    'products.cat4.desc': 'Pretty mini cakes to share with your loved ones.',
    'products.cat5': 'Themed Cakes',
    'products.cat5.desc': 'Special themed cakes featuring your favorite characters.',
    'products.cat6': 'Other Creations',
    'products.cat6.desc': 'Express unlimited creativity with our special creation options.',
    'products.order': 'Order Now',
    'products.inquire': 'Ask for Price',

    // Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'What Our\nCustomers Say',

    // FAQ
    'faq.badge': 'FAQ',
    'faq.title': 'Frequently Asked\nQuestions',
    'faq.q1': 'How do I place an order?',
    'faq.a1': 'You can order via our WhatsApp at +62 896-7270-1795. Consult about the design, size, and pickup/delivery date you want.',
    'faq.q2': 'How long does ordering take?',
    'faq.a2': 'Minimum order 3-7 days before the event, depending on design complexity. For last-minute orders, please contact us to confirm availability.',
    'faq.q3': 'Can I request a custom design?',
    'faq.a3': 'Absolutely! All our cakes are custom orders. We will bring your dream cake to life following your photo references or ideas.',
    'faq.q4': 'Is delivery available?',
    'faq.a4': 'We currently offer self-pickup and delivery to certain areas. Contact us for delivery area details and costs.',
    'faq.q5': 'How much does a custom cake cost?',
    'faq.a5': 'Prices vary depending on size, design complexity, and cake type. Consult your needs with us to get the best offer.',
    'faq.q6': 'How does payment work?',
    'faq.a6': 'Payment is made with a 50% deposit upon order confirmation, and the balance before or at pickup/delivery.',

    // Contact
    'contact.badge': 'Contact Us',
    'contact.title': 'Ready to Make\nYour Special Moment?',
    'contact.subtitle': 'Contact us now for a free consultation and bring your dream cake to life.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'WhatsApp Number',
    'contact.form.message': 'Message / Order Details',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.form.success': 'Message sent successfully! We will contact you soon.',
    'contact.form.error': 'Failed to send message. Please try again.',
    'contact.info.phone': 'WhatsApp',
    'contact.info.hours': 'Operating Hours',
    'contact.info.hours.detail': 'Mon-Fri: 08:00 - 20:00 WIB\nSaturday: 09:00 - 16:00 WIB\nSunday: Closed',
    'contact.info.location': 'Location',
    'contact.info.location.detail': 'Delivery service available\nContact us for delivery area details',

    // WhatsApp
    'wa.tooltip': 'WhatsApp Chat',
    'wa.message': 'Hello Brielicious! I would like to order a cake 🎂',

    // Footer
    'footer.desc': 'Homemade custom order cake & bakery that prioritizes quality and creativity for every special moment of yours.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with',
    'footer.love': 'love',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  toggleLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'id' || saved === 'en') return saved;
    return 'id';
  });

  const toggleLang = () => {
    setLang(l => {
      const next = l === 'id' ? 'en' : 'id';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
