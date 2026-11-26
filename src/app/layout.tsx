import type { Metadata } from "next";
import { fraunces, inter, jetbrains } from "@/lib/fonts";
import { SmoothScroll, ScrollProgress } from "@/components/smooth/SmoothScroll";
import { Toaster } from "sonner";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://cabanapetcafe.com.br"),
  title: {
    default: "Cabana Pet Café · Banho, tosa e café em Campinas",
    template: "%s · Cabana Pet Café"
  },
  description:
    "Banho, tosa e café de especialidade ao ar livre em Vila Paraíso, Campinas. Acompanhe o banho pelo vidro enquanto toma um cafezinho. 5,0 no Google.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Cabana Pet Café",
    images: [{ url: "/images/og.svg", width: 1200, height: 630 }]
  },
  twitter: { card: "summary_large_image", images: ["/images/og.svg"] },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-osso text-carvao antialiased">
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#1A1512",
              color: "#F4EDE0",
              border: "1px solid #B8502E",
              borderRadius: "4px",
              fontFamily: "var(--font-sans)"
            }
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "PetStore", "Cafe"],
              name: "Cabana Pet Café",
              url: process.env.NEXT_PUBLIC_SITE_URL,
              telephone: "+55 19 3199-1405",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rua José Gabeta, 522",
                addressLocality: "Campinas",
                addressRegion: "SP",
                postalCode: "13087-510",
                addressCountry: "BR"
              },
              geo: { "@type": "GeoCoordinates", latitude: -22.9015, longitude: -47.0612 },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "18:00" }
              ],
              priceRange: "R$R$"
            })
          }}
        />
      </body>
    </html>
  );
}
