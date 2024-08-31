import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/globals.css";
import  "bootstrap/dist/css/bootstrap.min.css";
import Header from '@/widgets/components/Header'
import './../shared/styles/Utilities.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prepify",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        <div className="page-transition">
            {children}
        </div>
      </body>
    </html>
  );
}
