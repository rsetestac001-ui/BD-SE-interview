import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { SiteFrame } from "@/components/site-frame";
import { THEME_KEY } from "@/lib/progress";
import "./globals.css";

const noto = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "PingFang HK",
    "PingFang TC",
    "Noto Sans CJK TC",
    "Microsoft JhengHei",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "合約結構工程師面試溫習",
    template: "%s · 合約結構工程師面試溫習",
  },
  description:
    "香港屋宇署結構工程師（合約）職位編號 50460 的私人面試溫習工具。題庫以 JSON 存放，進度只存在瀏覽器。",
};

const themeBoot = `try{if(localStorage.getItem(${JSON.stringify(THEME_KEY)})==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${noto.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
