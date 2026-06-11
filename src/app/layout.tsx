import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Footer, Navbar } from '~/components';
import { QueryProvider } from '~/providers';
import '~/styles/globals.css';

import { GrainEffect } from '~/components/grain-effect';
import { Toaster } from '~/components/ui/sonner';

/* -----------------------------------------
   CUSTOM FONTS
------------------------------------------ */
const rizkyBeatriceRegular = localFont({
  src: '../../public/beatrice-regular.woff2',
  variable: '--font-rizky-beatrice-regular',
});

const rizkyBeatriceMedium = localFont({
  src: '../../public/beatrice-medium.woff2',
  variable: '--font-rizky-beatrice-medium',
});

const rizkyElgoc = localFont({
  src: '../../public/elgocAlt-medium.woff2',
  variable: '--font-rizky-elgoc',
});

/* -----------------------------------------
   METADATA
------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL('https://rizky-febriyanto.dev'),
  title: 'Rizky Febriyanto | Software Engineer | Web Developer',
  description:
    'Portfolio resmi Rizky Febriyanto. Software Engineer yang berfokus pada Web Development, UI/UX modern, dan pembuatan aplikasi berkualitas tinggi.',
  applicationName: 'Rizky Febriyanto Portfolio',
  keywords: [
    'Rizky Febriyanto',
    'Software Engineer',
    'Web Developer',
    'Frontend Developer',
    'Fullstack Developer',
    'React Developer',
    'Next.js',
    'JavaScript',
    'Typescript',
    'Portfolio',
    'UI/UX Modern',
  ],
  creator: 'Rizky Febriyanto',
  publisher: 'Rizky Febriyanto',
  authors: [{ name: 'Rizky Febriyanto' }],
  manifest: '/manifest.json',
  icons: [{ rel: 'icon', url: '/logo.png' }],

  twitter: {
    card: 'summary_large_image',
    title: 'Rizky Febriyanto — Software Engineer',
    description:
      'Portfolio resmi Rizky Febriyanto. Fokus pada web development, desain modern, dan solusi aplikasi yang efisien.',
    creator: '@rizkyfebri',
    site: '@rizkyfebri',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Rizky Febriyanto — Software Engineer',
      },
    ],
  },

  openGraph: {
    title: 'Rizky Febriyanto | Software Engineer & Web Developer',
    description:
      'Eksplorasi karya dan proyek modern oleh Rizky Febriyanto — pengembang web dengan fokus pada React, Next.js, dan desain UI/UX.',
    type: 'website',
    locale: 'id_ID',
    url: 'https://rizky-febriyanto.dev',
    siteName: 'Rizky Febriyanto Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Rizky Febriyanto Portfolio',
      },
    ],
  },

  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Rizky Febriyanto',
    'msapplication-TileColor': '#000000',
  },
};

/* -----------------------------------------
   ROOT LAYOUT
------------------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Reads saved theme BEFORE first paint — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light')}else{document.documentElement.classList.remove('light')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={[
          '!overflow-x-hidden font-sans',
          rizkyBeatriceRegular.variable,
          rizkyBeatriceMedium.variable,
          rizkyElgoc.variable,
        ].join(' ')}
      >
        <QueryProvider>
          <GrainEffect />
          <Navbar />
          <main className='flex min-h-screen flex-col'>
            <div className='flex-1'>{children}</div>
            <Footer />
          </main>
          <Toaster />
        </QueryProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
