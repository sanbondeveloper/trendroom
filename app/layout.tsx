import type { Metadata } from 'next';
import './globals.css';
import { nato_sans_kr } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'TrendRoom',
  description: '트렌디한 쇼핑몰',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nato_sans_kr.className} h-full bg-white`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
