import type { Metadata } from 'next';
import Script from 'next/script';

import './globals.css';
import RecoilRootWrapper from './ui/common/recoil-root-wrapper';
import Header from './ui/common/header';
import { BMYEONSUNG } from '@/components/ui/fonts';
import { NotificationContextProvider } from '@/store/notification-context';

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
    <html lang="ko" className={`h-full bg-white`}>
      <body className={`${BMYEONSUNG.className} antialiased`}>
        <RecoilRootWrapper>
          <NotificationContextProvider>
            <Header />
            <div className="mt-[86px]" />
            {children}
          </NotificationContextProvider>
        </RecoilRootWrapper>
        <div id="modal-root" />
      </body>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </html>
  );
}
