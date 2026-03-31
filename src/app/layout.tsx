import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PixelShield — Protect Your Photography',
  description:
    'Automatically embed copyright metadata into every image you upload. Monitor for infringements and license your work with confidence.',
  keywords: ['photo copyright', 'image protection', 'metadata embedding', 'EXIF copyright'],
  authors: [{ name: 'PixelShield' }],
  openGraph: {
    title: 'PixelShield — Protect Your Photography',
    description:
      'Automatically embed copyright metadata into every image you upload.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
