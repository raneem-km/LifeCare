import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosInit from "@/components/AosInit";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Initialize the Next.js optimized font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Care Homeopathic Clinic | Professional Homeopathic Care in Malappuram",
  description: "Professional homeopathic care with 15 years of excellence. Holistic treatments for respiratory, digestive, and fertility health in Manjeri, Kerala.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <head>
        {/* We keep Material Symbols as a standard link because it is an icon font, not a standard text font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      {/* We apply the optimized Inter font directly to the body */}
      <body className={`${inter.className} bg-background text-on-surface antialiased`}>
        <AosInit />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
