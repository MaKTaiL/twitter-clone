import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import NavBar from "@/components/NavBar";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        <Providers>
          <div className="container mx-auto flex justify-center">
            <div>
              <NavBar />
            </div>
            <div className="flex min-h-screen max-w-2xl grow flex-col border-x">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
