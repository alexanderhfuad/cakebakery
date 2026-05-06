import { ReactNode } from 'react';

export default function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-semibold tracking-wide">
      {children}
    </span>
  );
}
