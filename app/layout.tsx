import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "个人设计作品集",
  description: "一本打开的精装书风格的个人设计作品集网站。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
