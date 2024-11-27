import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lato } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Swanky Shears | Premium Barbershop in the Maldives",
  description:
    "Experience top-notch grooming at Swanky Shears. We offer expert haircuts, beard trims, and styling services in a relaxed, friendly atmosphere.",
  keywords: [
    "barbershop",
    "haircut",
    "beard trim",
    "grooming",
    "men's styling",
  ],
  authors: [{ name: "Swanky Shears Team" }],
  creator: "Swanky Shears",
  publisher: "Swanky Shears",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.swankyshears.com",
    siteName: "Swanky Shears",
    title: "Swanky Shears | Premium Barbershop in the Maldives",
    description:
      "Discover expert grooming services at Swanky Shears. Book your appointment today!",
    images: [
      {
        url: "https://www.swankyshears.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swanky Shears Barbershop",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
