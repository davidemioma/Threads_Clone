import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito_Sans } from "next/font/google";
import ToasterProvider from "@/components/providers/ToasterProvider";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads-Clone",
  description: "Threads clone built with Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ToasterProvider />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
