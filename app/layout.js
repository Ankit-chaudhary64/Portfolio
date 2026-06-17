import { Geist, Geist_Mono, Baloo_2, Dancing_Script } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { SITE_URL } from '@/lib/siteConfig';
import profile from '@/data/profile.json';
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const description = profile.description;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name.full} | ${profile.roles.short}`,
    template: `%s | ${profile.name.full}`,
  },
  description,
  keywords: [
    profile.name.full,
    profile.roles.short,
    ...profile.skills,
    profile.location.based
  ],
  authors: [{ name: profile.name.full, url: SITE_URL }],
  creator: profile.name.full,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: profile.name.full,
    title: `${profile.name.full} | ${profile.roles.short}`,
    description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${profile.name.full} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name.full} | ${profile.roles.short}`,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicons/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
      { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${baloo.variable} ${dancing.variable} h-full antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: profile.name.full,
              url: SITE_URL,
              email: profile.email,
              jobTitle: profile.roles.short,
              sameAs: profile.socials.map(s => s.href),
            }),
          }}
        />
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
