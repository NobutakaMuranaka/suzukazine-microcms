import QueryProvider from "@/app/components/providers/QueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUZUKAZINE",
  description: "SUZUKAZIENは鈴鹿に関するWebサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body><QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
