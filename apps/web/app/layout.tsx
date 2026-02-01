import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Higgsfield AI — Create Stunning AI-Powered Images & Videos",
  description:
    "Generate cinematic videos, create viral content, and build AI influencers with Higgsfield. Professional AI-powered creative platform for images, videos, and content creation.",
  keywords: [
    "AI video generation",
    "AI image generation",
    "text to video",
    "image to video",
    "AI influencer",
    "motion control",
    "cinematic video",
    "content creation",
    "AI creative tools",
    "video synthesis",
  ],
  authors: [{ name: "Higgsfield AI" }],
  creator: "Higgsfield AI",
  publisher: "Higgsfield AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://higgsfield.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Higgsfield AI — Create Stunning AI-Powered Images & Videos",
    description:
      "Generate cinematic videos, create viral content, and build AI influencers with Higgsfield. Professional AI-powered creative platform.",
    url: "/",
    siteName: "Higgsfield AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Higgsfield AI - AI-Powered Creative Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Higgsfield AI — Create Stunning AI-Powered Images & Videos",
    description:
      "Generate cinematic videos, create viral content, and build AI influencers with Higgsfield.",
    images: ["/og-image.png"],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
