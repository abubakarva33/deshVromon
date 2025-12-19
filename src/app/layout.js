import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Campusian Shop - Your Campus Marketplace",
  description: "Discover and shop for products from your campus community. Buy and sell locally with Campusian Shop.",
  keywords: "campus shop, university marketplace, student products, local selling, campusian",
  alternates: {
    canonical: "https://campusian-shop.com",
  },
  robots: "index, follow",
  authors: [{ name: "Campusian Shop Team" }],
  openGraph: {
    title: "Campusian Shop - Your Campus Marketplace",
    description: "Discover and shop for products from your campus community. Buy and sell locally with Campusian Shop.",
    image: "/images/logo.png",
    url: "https://campusian-shop.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campusian Shop - Your Campus Marketplace",
    description: "Discover and shop for products from your campus community. Buy and sell locally with Campusian Shop.",
    image: "/images/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton={false}
          duration={2000}
          toastOptions={{
            style: {
              background: "var(--background-primary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-primary)",
            },
          }}
        />
      </body>
    </html>
  );
}
