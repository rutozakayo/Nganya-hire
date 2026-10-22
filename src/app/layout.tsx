import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { CurrentYear } from "@/components/current-year";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { PWAInstaller } from "@/components/pwa-installer";
import { ServiceWorkerRegister } from "@/components/sw-register";

export const metadata: Metadata = {
  title: "NGANYA HIRE | Premium Matatu Experience",
  description: "Hire customized Kenyan matatus for events, road trips, and special occasions.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-full flex flex-col`}
      >
        <ServiceWorkerRegister />
        <Navbar />
        <main className="flex-1">{children}</main>
        <PWAInstaller />
        <footer className="border-t border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="space-y-4">
                <span className="text-2xl font-bold tracking-tighter text-primary">
                  NGANYA<span className="text-secondary">HIRE</span>
                </span>
                <p className="text-sm text-muted-foreground">
                  The ultimate platform for discovering and hiring Kenya&apos;s most iconic matatus. Experience the culture.
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/browse" className="hover:text-primary">Explore Nganyas</a></li>
                  <li><a href="/how-it-works" className="hover:text-primary">How It Works</a></li>
                  <li><a href="/register" className="hover:text-primary">Join as Customer</a></li>
                  <li><a href="/owner/register" className="hover:text-primary">List Your Vehicle</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/faq" className="hover:text-primary">FAQs</a></li>
                  <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
                  <li><a href="/terms" className="hover:text-primary">Terms & Conditions</a></li>
                  <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Follow Us</h4>
                <div className="flex space-x-4">
                  {/* Social icons placeholder */}
                  <span className="text-sm text-muted-foreground">Instagram</span>
                  <span className="text-sm text-muted-foreground">Twitter</span>
                  <span className="text-sm text-muted-foreground">Facebook</span>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
              © <CurrentYear /> NGANYA HIRE. All rights reserved. Made in Nairobi.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
