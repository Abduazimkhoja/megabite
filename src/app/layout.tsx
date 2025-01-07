import Providers from '@/providers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Test Task',
  description: 'Test Task Description',
  openGraph: {
    type: 'website',
    siteName: 'Test-Task',
    emails: ['testtask@gmail.com'],
  },
  icons: {
    shortcut: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
    icon: [
      {
        url: '/favicons/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/favicons/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',

  // Отключить индексацию
  robots: {
    index: false,
    follow: false,
  },
  other: {
    googlebot: 'noindex, nofollow',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
