import type { Metadata } from "next";
import "./globals.css";
import "./redesign.css";

export const metadata: Metadata = {
  title: "Shriji International School | Chhata, Mathura",
  description:
    "A website redesign concept for Shriji International School, a CBSE-affiliated Senior Secondary school on Chhata–Barsana Road, Mathura.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
