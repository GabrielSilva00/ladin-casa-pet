import { Fredoka, Nunito, JetBrains_Mono } from "next/font/google";

/* Display: Fredoka — bold rounded, friendly, estilo pet-shop template */
export const fraunces = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

/* Body: Nunito — rounded sans legível, familiar aos templates */
export const inter = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

/* Mono */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});
