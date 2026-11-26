import { Instrument_Serif, Manrope, JetBrains_Mono } from "next/font/google";

export const fraunces = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap"
});

export const inter = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});
