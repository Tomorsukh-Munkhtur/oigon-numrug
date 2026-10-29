import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oigonnumrug.mn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oigon Numrug — Үл хөдлөх ба ХАБЭА зөвлөх үйлчилгээ",
    template: "%s | Oigon Numrug",
  },
  description:
    "Oigon Numrug нь Дархан хотын үл хөдлөх хөрөнгийн зуучлал, маркетинг, зөвлөх үйлчилгээ болон ХАБЭА сургалт, аюулгүй ажиллагааны зөвлөх үйлчилгээ үзүүлэгч компани.",
  keywords: [
    "үл хөдлөх хөрөнгө",
    "үл хөдлөх Дархан",
    "Oigon Numrug",
    "Ойгон Нөмрөг",
    "орон сууц Дархан",
    "оффис түрээс Дархан",
    "Real Estate Mongolia",
    "ХАБЭА сургалт",
    "аюулгүй ажиллагаа",
  ],
  authors: [{ name: "Oigon Numrug" }],
  creator: "Oigon Numrug",
  publisher: "Oigon Numrug",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: SITE_URL,
    siteName: "Oigon Numrug",
    title: "Oigon Numrug — Үл хөдлөх ба ХАБЭА зөвлөх үйлчилгээ",
    description:
      "Дархан хотын үл хөдлөх хөрөнгийн зуучлал, маркетинг, ХАБЭА сургалтын мэргэжлийн баг.",
    images: [
      {
        url: "/Logo_Primary color - 2.png",
        width: 720,
        height: 190,
        alt: "Oigon Numrug",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oigon Numrug — Үл хөдлөх ба ХАБЭА зөвлөх үйлчилгээ",
    description:
      "Дархан хотын үл хөдлөх хөрөнгийн зуучлал, маркетинг, ХАБЭА сургалтын мэргэжлийн баг.",
    images: ["/Logo_Primary color - 2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${roboto.variable} h-full antialiased`}
      // Next.js keeps CSS smooth scrolling for in-page (#section) links but not for route changes
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
