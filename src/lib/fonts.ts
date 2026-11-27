import { Fraunces, Figtree, IBM_Plex_Mono } from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap"
});

export const inter = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const jetbrains = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});
