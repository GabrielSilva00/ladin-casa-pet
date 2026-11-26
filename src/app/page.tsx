import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { Services } from "@/components/landing/Services";
import { Tour } from "@/components/landing/Tour";
import { Menu } from "@/components/landing/Menu";
import { BookingPreview } from "@/components/landing/BookingPreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { Visit } from "@/components/landing/Visit";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <Services />
        <Tour />
        <Menu />
        <BookingPreview />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
