import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import MyNavbar from "./components/MyNavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appwrite Yea Im eepy",
  description: "NextJs App using Appwrite for authentication, databse todo storage and more coming in the future!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-default-50 text-foreground`}>
        <Providers>
          <MyNavbar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
