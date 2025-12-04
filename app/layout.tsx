import './globals.css';
import type { Metadata } from 'next';
import { League_Spartan, Montserrat, Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const leagueSpartan = League_Spartan({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-league-spartan',
  display: 'swap',
  preload: true
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap'
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nimbleneedle.ca'),
  title: 'Nimble Needle - Professional Clothing Alterations & Tailoring Services',
  description: 'Expert tailoring & clothing alterations in Ottawa. No appointment needed! Family-run business serving Preston & Riverside. Call (343) 588-1300',
  keywords: 'Ottawa tailoring, clothing alterations, dress alterations, wedding dress alterations, suit alterations, zipper repair, Preston Street, Riverside Drive',
  authors: [{ name: 'Nimble Needle Tailoring' }],
  robots: 'index, follow',
  // Favicon configuration using the logo
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: {
      url: '/logo.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'Nimble Needle - Professional Tailoring Services',
    description: 'Expert tailoring & clothing alterations in Ottawa. No appointment needed! Family-run business serving Preston & Riverside.',
    type: 'website',
    url: 'https://nimbleneedle.ca',
    siteName: 'Nimble Needle Tailoring',
    images: [{
      url: '/logo.png',
      width: 1200,
      height: 630,
      alt: 'Nimble Needle Tailoring Logo',
    }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${montserrat.variable} ${poppins.variable}`}>
      <head>
        {/* Google Tag Manager - Yellow Pages Campaign Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5GPGZRT6');`
          }}
        />
        {/* End Google Tag Manager */}
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://nimbleneedle.ca/#business",
              "name": "Nimble Needle Tailoring",
              "description": "Expert tailoring & clothing alterations in Ottawa. No appointment needed! Family-run business serving Preston & Riverside.",
              "url": "https://nimbleneedle.ca",
              "telephone": "(343) 588-1300",
              "email": "info@nimbleneedle.ca",
              "priceRange": "$$",
              "currenciesAccepted": "CAD",
              "paymentAccepted": "Cash, Credit Card",
              "image": "https://nimbleneedle.ca/logo.png",
              "logo": "https://nimbleneedle.ca/logo.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              },
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "141 Preston St",
                  "addressLocality": "Ottawa",
                  "addressRegion": "ON",
                  "postalCode": "K1R 7P4",
                  "addressCountry": "CA"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "3681 Riverside Dr",
                  "addressLocality": "Ottawa",
                  "addressRegion": "ON",
                  "postalCode": "K1V 1H7",
                  "addressCountry": "CA"
                }
              ],
              "geo": [
                {
                  "@type": "GeoCoordinates",
                  "latitude": "45.4085",
                  "longitude": "-75.7116"
                },
                {
                  "@type": "GeoCoordinates",
                  "latitude": "45.3685",
                  "longitude": "-75.6666"
                }
              ],
              "openingHours": [
                "Mo-Fr 10:00-20:00",
                "Sa 10:00-18:00",
                "Su 11:00-18:00"
              ],
              "sameAs": [
                "https://www.facebook.com/nimbleneedle",
                "https://www.instagram.com/nimbleneedle"
              ],
              "serviceArea": {
                "@type": "City",
                "name": "Ottawa",
                "addressRegion": "Ontario",
                "addressCountry": "Canada"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Tailoring Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Clothing Alterations",
                      "description": "Wedding Dresses, Jackets, Suits, Pants, Shirts, Dresses, Skirts, Fitting Bridalwear and Eveningwear"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom and Retail Suits",
                      "description": "We have a selection of retail suits or we can create a custom one for you"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Zipper Repair",
                      "description": "Clothing Zippers, Suitcase Zippers"
                    }
                  }
                ]
              },
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "No Appointment Needed",
                  "value": "true"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Walk-ins Welcome",
                  "value": "true"
                },
                {
                  "@type": "PropertyValue",
                  "name": "Family Business",
                  "value": "true"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-montserrat" suppressHydrationWarning={true}>
        {/* Google Tag Manager (noscript) - Yellow Pages Campaign Tracking */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5GPGZRT6"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <GoogleAnalytics />
        {/* Vercel Web Analytics - tracks page views and user interactions */}
        <Analytics />
        {children}
      </body>
    </html>
  );
}