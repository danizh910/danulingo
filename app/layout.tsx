import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Danulingo – Reisesprachen lernen',
  description: 'Lerne Spanisch, Italienisch und Französisch für deine nächste Reise. Spielerisch wie Duolingo!',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Danulingo',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#58CC02',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <div className="max-w-md mx-auto relative min-h-screen bg-white dark:bg-gray-900 shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
