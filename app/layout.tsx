import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-ZBNWTZ44QW";
const SITE_URL = "https://yoshiokayuta2-lgtm.github.io/teacher-license-navi/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "偏差値だけではわからない｜教員免許ナビ",
  description: "教育学部以外も含め、国公立・私立大学の学部・学科から取得できる教員免許を検索・比較できる進路情報サイト。小学校、中学校、高校、特別支援など複数免許にも対応。",
  keywords: ["教員免許", "教育学部", "教職課程", "教員志望", "大学検索", "小学校教員", "中学校教員", "高校教員"],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "Yoshiの偏差値だけではわからない",
    title: "偏差値だけではわからない｜教員免許ナビ",
    description: "取りたい教員免許から、国公立・私立大学の学部・学科を検索・比較できます。",
    images: [{ url: `${SITE_URL}yoshi-teacher-corrected.png`, width: 1200, height: 1200, alt: "教員免許ナビ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "偏差値だけではわからない｜教員免許ナビ",
    description: "取りたい教員免許から大学・学部・学科を探せる進路情報サイト。",
    images: [`${SITE_URL}yoshi-teacher-corrected.png`],
  },
  other: {
    google: "notranslate",
  },
  icons: {
    icon: `${SITE_URL}favicon.svg`,
    shortcut: `${SITE_URL}favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" translate="no">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "偏差値だけではわからない 教員免許ナビ",
              url: SITE_URL,
              description: "取得したい教員免許から大学・学部・学科を検索・比較できる進路情報サイト。",
              inLanguage: "ja",
              publisher: { "@type": "Person", name: "Yoshi" },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: '偏差値だけではわからない 教員免許ナビ',
              site_name: 'teacher_license_navi'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
