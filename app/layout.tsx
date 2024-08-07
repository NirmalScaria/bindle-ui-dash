import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FirebaseNextJSProvider } from "firebase-nextjs/client/auth";
import BottomBar from "@/components/bottomBar";
import { GoogleAnalytics } from '@next/third-parties/google'
import { cn } from "@/lib/utils";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster"

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
        <body className={cn(inter.className, "text-white")}>
          {children}
          <Toaster />
        </body>
        <GoogleAnalytics gaId="G-CZ25ND9KVQ" />
      </FirebaseNextJSProvider>
    </html>
  );
}
