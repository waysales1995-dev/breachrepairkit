import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://breachrepairkit.com'),
  title: {
    default: 'Breach Repair Kit — Calm, practical steps after a scam or security scare',
    template: '%s | Breach Repair Kit',
  },
  description:
    'Get a calm, private action plan for suspicious links, account alerts, fake delivery texts, bank scams, and more. No account required.',
  applicationName: 'Breach Repair Kit',
  openGraph: {
    type: 'website',
    siteName: 'Breach Repair Kit',
    title: 'Breach Repair Kit',
    description: 'Clear next steps when something online feels wrong.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
