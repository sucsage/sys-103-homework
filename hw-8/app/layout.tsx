import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hw-8",
  description: "Homework-8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
