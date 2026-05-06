import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppFloat() {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const waUrl = `https://wa.me/6289672701795?text=${encodeURIComponent(t('wa.message'))}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      {showTooltip && !dismissed && (
        <div className="flex items-start gap-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 max-w-[220px] animate-fade-in">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">Brielicious Bakery</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t('wa.tooltip')}</p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 -mt-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 hover:shadow-xl hover:shadow-emerald-300 dark:hover:shadow-emerald-900/50 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl bg-emerald-500 animate-ping opacity-30" />
      </a>
    </div>
  );
}
