import { useState } from 'react';
import { Send, Phone, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import SectionBadge from './ui/SectionBadge';

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_messages').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const infoItems = [
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+62 896-7270-1795',
      href: `https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      icon: Clock,
      label: t('contact.info.hours'),
      value: t('contact.info.hours.detail'),
      href: null,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: t('contact.info.location.detail'),
      href: null,
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionBadge>{t('contact.badge')}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mt-4 mb-4">
            {t('contact.title').split('\n').map((line, i) => (
              <span key={i} className={`block ${i === 1 ? 'text-rose-500' : ''}`}>{line}</span>
            ))}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {infoItems.map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-gray-900 dark:text-white hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-gray-900 dark:text-white whitespace-pre-line text-sm leading-relaxed">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t('footer.follow')}</div>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/brielicious/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  📷 Instagram
                </a>
                <a
                  href="https://www.facebook.com/Yuliana-Anggraeni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  📘 Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 space-y-5">
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{t('contact.form.success')}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{t('contact.form.error')}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors text-sm"
                  placeholder="+62 812 3456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors text-sm resize-none"
                  placeholder="Ceritakan kebutuhan kue Anda..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-rose-200 dark:shadow-rose-900/30 hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('contact.form.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
