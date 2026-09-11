import type { Metadata, Viewport } from "next";
import { Baloo_2, Fredoka, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Baloo_2({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const pixel = Pixelify_Sans({
  variable: "--font-pixel-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "PixelClub — Cobblemon UI Prototype",
  description: "Web-based UX/UI prototype for the PixelClub Cobblemon Minecraft server.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${display.variable} ${pixel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
