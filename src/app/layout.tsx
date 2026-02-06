import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "九典制药 2026 年会微官网",
  description: "九典制药 2026 年会微官网",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
