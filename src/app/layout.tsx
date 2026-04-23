import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Approva — Content approval for social media agencies",
    template: "%s | Approva",
  },
  description:
    "Send one branded link. Your client approves content in two minutes. Full audit trail, no apps, no accounts required.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://approva-app.vercel.app"),
  openGraph: {
    title: "Approva — Content approval for social media agencies",
    description:
      "Stop chasing client approvals over WhatsApp. Send branded approval links, clients approve in one click, full audit trail saved automatically.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://approva-app.vercel.app",
    siteName: "Approva",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Approva — Content approval for social media agencies",
    description:
      "Stop chasing client approvals over WhatsApp. Send branded approval links, clients approve in one click, full audit trail saved automatically.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
