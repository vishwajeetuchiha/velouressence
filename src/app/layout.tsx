import type { Metadata } from "next";
import { Raleway,  } from "next/font/google";
import localFont from "next/font/local";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";


import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const gambarino = localFont({
  src: './gambarino.woff2',
  display: "swap",
    variable: "--font-gambarino",

});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle("setting")

  return {
    title: settings.data.site_title || "Cote Royal India" ,
    description: settings.data.meta_description || "Discover the exquisite collection of luxury fragrance by Cote Royal",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image) ? 
      [settings.data.fallback_og_image.url]: ["/og-image.png"]
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient()
  const settings = await client.getSingle("setting")

  return (
    <ViewTransitions>
    <html lang="en"
    className={`${raleway.variable} ${gambarino.variable} antialiased`}
>
      <body className="bg-neutral-900 text-white">
       <NavBar settings={settings}/>
        <main className="">
        {children}
        </main>
        <Footer/>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  </ViewTransitions>
 
  );
}
