import type { Metadata } from 'next';
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
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}