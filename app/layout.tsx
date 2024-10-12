import QueryProvider from "@/app/components/providers/QueryProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUZUKAZINE",
  description: "SUZUKAZINEは、三重県鈴鹿市を中心としたグルメ・観光・イベント・ローカル情報を発信する、ローカルメディアです。鈴鹿に関する「マガジン」と「人（じん）」の意味で、この名前を付けました。",
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
