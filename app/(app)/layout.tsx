import type { Metadata } from 'next';
import MainHeader from '@/components/ui/main-header';

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
    <>
      <MainHeader />
      {children}
    </>
  );
}
