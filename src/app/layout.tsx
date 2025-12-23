import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anchor - Your Story Matters",
  description: "AI-powered mental wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}