import { QueryProvider } from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description: 'Explore characters from Rick and Morty universe',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  keywords: ['Rick and Morty', 'characters', 'explorer', 'Next.js', 'React'],
  authors: [{ name: 'Mucahit Tasan' }],
  openGraph: {
    title: 'Rick and Morty Explorer',
    description: 'Explore characters from Rick and Morty universe',
    url: 'https://rick-and-morty-explorer.vercel.app',
    siteName: 'Rick and Morty Explorer',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NuqsAdapter>
          <QueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
