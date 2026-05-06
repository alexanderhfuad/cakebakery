import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SectionBadge from './ui/SectionBadge';

const faqKeys = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
];

export default function FAQ() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionBadge>{t('faq.badge')}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mt-4">
            {t('faq.title').split('\n').map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>{line}</span>
            ))}
          </h2>
        </div>

        <div className="space-y-3">
          {faqKeys.map(({ q, a }, idx) => (
            <div
              key={q}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {t(q)}
                </span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  open === idx
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                }`}>
                  {open === idx ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === idx ? 'max-h-48' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {t(a)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center p-6 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t('faq.badge') === 'FAQ'
              ? 'Still have questions? Chat with us!'
              : 'Masih ada pertanyaan? Chat dengan kami!'}
          </p>
          <a
            href={`https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors"
          >
            {t('contact.form.submit').includes('Kirim') ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
          </a>
        </div>
      </div>
    </section>
  );
}
