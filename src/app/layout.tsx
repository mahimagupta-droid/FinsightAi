import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from "./components/navbar";
import { Toaster } from "sonner";
import { Lato, Lexend, Playfair_Display } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: "--font-playfair",
})

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "FinsightAi",
  description: "A financial tracker app that allows users to track their expenses, set budgets, and gain insights into their spending habits.",
  icons: {
    icon: '/projectLogo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={`${lato.variable} ${lexend.variable} ${playfair.variable} bg-background text-textColor w-full antialiased min-h-screen flex flex-col`}>
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
