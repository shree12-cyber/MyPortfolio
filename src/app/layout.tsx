import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { Analytics } from "@vercel/analytics/react"

const outfit = Outfit({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return {
        title: "settings.data.meta_title",
        description: settings.data.meta_description,
        icons:{
          icon:"/logo.png"
        }
    };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-950 text-slate-100">
      <body
        className={clsx(outfit.className, "relative min-h-screen")}
      >
        <Header/>
            {children}
        <Footer />
        <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
        <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Analytics />
      </body>
        <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
