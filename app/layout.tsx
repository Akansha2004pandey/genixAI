import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "@/components/modal-provider";
import {ClerkProvider} from "@clerk/nextjs"
import { ToasterProvider } from "@/components/toaster-provider";
import { Crisp } from "crisp-sdk-web";
import { CrispProvider } from "@/components/crisp-provider";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GenixAI",
  description: "Ai Saas Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider/>
        <ToasterProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}
