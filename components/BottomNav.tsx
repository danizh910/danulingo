'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',          icon: '🏠', label: 'Home'     },
  { href: '/languages', icon: '🌍', label: 'Sprachen'  },
  { href: '/profile',   icon: '👤', label: 'Profil'    },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t-2 border-gray-100 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ href, icon, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-6 py-2 rounded-xl transition-all ${
                active
                  ? 'text-brand-green'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className={`text-xs font-bold ${active ? 'text-brand-green' : ''}`}>{label}</span>
              {active && <div className="w-1 h-1 rounded-full bg-brand-green mt-0.5" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
