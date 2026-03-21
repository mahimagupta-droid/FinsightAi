import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "./components/navbar";
import "../../public/projectLogo.png";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinsightAi",
  description: "A financial tracker app that allows users to track their expenses, set budgets, and gain insights into their spending habits."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
          <ClerkProvider>
            <Navbar />
            <div className="flex flex-col flex-1 justify-center items-center bg-background text-textColor w-full">
              <Toaster /> 
              {children}
            </div>
          </ClerkProvider>
        </main>
      </body>
    </html>
  );
}
