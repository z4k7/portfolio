import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/effects/CustomCursor";
import LoadingScreen from "@/components/effects/LoadingScreen";
import ScrollProgress from "@/components/effects/ScrollProgress";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sachin Kizhakkepurath — Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in Angular, fintech systems, real-time platforms, and scalable enterprise applications. Based in Kerala, India.",
  keywords: [
    "Sachin Kizhakkepurath",
    "Full Stack Developer",
    "Angular Developer",
    "Fintech Engineer",
    "NestJS",
    "Flutter Developer",
    "Kerala India",
    "Software Engineer",
  ],
  authors: [{ name: "Sachin Kizhakkepurath" }],
  creator: "Sachin Kizhakkepurath",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Sachin Kizhakkepurath — Full-Stack Software Engineer",
    description:
      "Building scalable fintech systems, real-time platforms, and production-grade user experiences.",
    siteName: "Sachin KP Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sachin Kizhakkepurath — Full-Stack Software Engineer",
    description: "Building scalable fintech systems and production-grade user experiences.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`} suppressHydrationWarning>
      <body className="noise min-h-screen bg-[#050505] text-slate-100 antialiased">
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
