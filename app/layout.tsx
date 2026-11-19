import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AppProvider } from '../components/app-provider';

export const metadata: Metadata = {
  title: 'Mark Ruffalo | An Original Campaign Experience',
  description: 'A contemporary celebration experience built around meaningful moments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1514365123841288');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1514365123841288&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}