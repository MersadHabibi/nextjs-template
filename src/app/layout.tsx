import { cn } from "@/lib/utils";
import "./globals.css";
import { FIranYekan } from "@/config/fonts";
import { type Metadata } from "next";
import Providers from "@/providers/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Starter Template",
    default: "Next.js Starter Template",
  },
  description: "Next.js Starter Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="light"
      color-scheme="light"
      suppressHydrationWarning>
      <body
        className={cn(
          "text-text! relative mx-0 min-h-dvh overflow-x-hidden overflow-y-auto scroll-smooth! font-normal",
          FIranYekan.className,
          FIranYekan.variable,
        )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
