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
              </head>
              <body className={inter.className}>
                  {/* Main layout components */}
                  <GlobalWrapper>{children}</GlobalWrapper>
              </body>
          </html>
      </StoreProvider>
  );
}
