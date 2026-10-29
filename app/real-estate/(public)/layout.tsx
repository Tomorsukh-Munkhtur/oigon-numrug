import { Montserrat } from "next/font/google";
import { getContactChannel } from "@/lib/real-estate/content";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Preloader from "../_components/Preloader";
import "../real-estate.css";

// Гарчиг, товч, тэмдэглэгээ — Montserrat. Үндсэн текст нь root layout-ийн Roboto (--font-roboto).
// Монгол кирилл (Ө, Ү) cyrillic-ext subset-д багтдаг.
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--re-font-display",
});

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const phone = getContactChannel("phone");
  const email = getContactChannel("email");

  return (
    <div className={`re ${montserrat.variable}`}>
      <Preloader />
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
