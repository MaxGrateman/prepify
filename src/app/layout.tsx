import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/globals.css";
import Header from '@/widgets/components/Header'
import './../shared/styles/Utilities.css'
import StoreProvider from './StoreProvider';
import GlobalWrapper from "./GlobalWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prepify",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <StoreProvider>
          <html lang="en">
              <head>
                {/* <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"/> */}
                <link href="https://db.onlinewebfonts.com/c/5795a47e252d16c82bb79fa354b224db?family=VK+Sans+Display+Regular" rel="stylesheet"></link>
              </head>
              <body className={inter.className}>
                  {/* Main layout components */}
                  <GlobalWrapper>{children}</GlobalWrapper>
              </body>
          </html>
      </StoreProvider>
  );
}
