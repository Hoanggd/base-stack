import "@workspace/ui/globals.css";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Providers } from "./providers";
import { PROJECT_DESCRIPTION, PROJECT_NAME } from "@/constants/common";

const fontSans = Inter({ subsets: ["latin"] });
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: PROJECT_NAME,
    template: `%s | ${PROJECT_NAME}`,
  },
  description: PROJECT_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.className} ${fontMono.variable}`}
    >
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`antialiased text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
