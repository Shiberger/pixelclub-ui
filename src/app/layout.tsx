import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const ui = Plus_Jakarta_Sans({
  variable: "--font-ui-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Outfit({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PixelClub — Cobblemon UI · Design 2.0",
  description:
    "Design 2.0 of the PixelClub Cobblemon server UI: modern-premium, violet-forward, with a Poké Ball × prism motif.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#06040d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ui.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
