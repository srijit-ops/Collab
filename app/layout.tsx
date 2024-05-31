import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name, //by defaukt it will show collab
    template: `%s | ${siteConfig.name}` //when on a diffret route suppose a new workspace or organization inside this appliaction, then will show the name like Organization name | collab, so %s puts the dynamic name
  },
  description: siteConfig.description,
  icons:[
    {
      url:"/collab-logo.svg",
      href:"/collab-logo.svg"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
