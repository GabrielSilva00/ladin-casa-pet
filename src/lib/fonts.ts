import { Unbounded, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/* Display: Unbounded — geométrica, com personalidade. Nada a ver com serifa IA-padrão. */
export const fraunces = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

/* Sans / body: Hanken Grotesk — humanista, moderna, clara. */
export const inter = Hanken_Grotesk({
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
