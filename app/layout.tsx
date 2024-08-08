import { GoogleAnalytics } from '@next/third-parties/google';
import { FirebaseNextJSProvider } from "firebase-nextjs/client/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bindle-UI : A mega library of UI components for Javascript and React",
  description: "Bindle UI provides an ever growing set of UI components for Javascript and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:image"
          content="/ogpreview.png"
        />
      </Head>
      <FirebaseNextJSProvider>
        {children}
        <GoogleAnalytics gaId="G-CZ25ND9KVQ" />
      </FirebaseNextJSProvider>
    </html>
  );
}
