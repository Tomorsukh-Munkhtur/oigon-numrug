import { Cormorant_Garamond, IBM_Plex_Mono, Manrope } from "next/font/google";
import { getContactChannel } from "@/lib/real-estate/content";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import "../real-estate.css";

// Монгол кирилл (Ө, Ү) cyrillic-ext subset-д багтдаг.
const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--re-font-display",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--re-font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
  variable: "--re-font-mono",
});

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const phone = getContactChannel("phone");
  const email = getContactChannel("email");

  return (
    <div className={`re ${display.variable} ${sans.variable} ${mono.variable}`}>
      <a href="#re-main" className="re-skip">
        Үндсэн агуулга руу шилжих
      </a>
      <Header
        phone={phone && { label: phone.value, href: phone.href }}
        email={email && { label: email.value, href: email.href }}
      />
      <main id="re-main">{children}</main>
      <Footer />
    </div>
  );
}
