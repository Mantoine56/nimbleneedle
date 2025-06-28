import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Poppins } from 'next/font/google';

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair'
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Nimble Needle - Professional Clothing Alterations & Tailoring Services',
  description: 'Expert tailoring services in Ottawa. Suit alterations, custom tailoring, and clothing repairs with over 15 years of experience. Perfect fit guaranteed.',
  keywords: 'tailoring, alterations, suits, custom clothing, Ottawa, professional tailor, nimble needle',
  openGraph: {
    title: 'Nimble Needle - Professional Tailoring Services',
    description: 'Expert tailoring services in Ottawa with over 15 years of experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable} ${poppins.variable}`}>
      <body className="font-montserrat">{children}</body>
    </html>
  );
}