import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const hind = Hind({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "EVA Gallery",
  description: "European Visual Arts Gallery - Europes first AI-Powered Web3 Gallery for professional Artists and Gallerists.",
};

const lang: string = "sk";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (

    <html lang={lang}>
      <body className={hind.className}>
        {children}
      </body>
    </html>

  );
}
