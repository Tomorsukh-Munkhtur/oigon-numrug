import Image from "next/image";
import Link from "next/link";
import { channelHref, contactContent, servicesContent } from "@/lib/real-estate/content";

const PAGES = [
  { href: "/real-estate", label: "Нүүр" },
  { href: "/real-estate/projects", label: "Төслүүд" },
  { href: "/real-estate/services", label: "Үйлчилгээ" },
  { href: "/real-estate/about", label: "Бидний тухай" },
  { href: "/real-estate/contact", label: "Холбоо барих" },
];

export default function Footer() {
  return (
    <footer className="re-footer">
      <div className="re-wrap">
        <div className="re-footer__top">
          <div className="re-footer__brand">
            <Image
              src="/Logo_White color - 2.png"
              alt="Oigon Numrug Properties"
              width={5884}
              height={1493}
              className="re-footer__logo"
            />
            <p>
              Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн зуучлал, төслийн маркетинг,
              зөвлөх үйлчилгээ.
            </p>
          </div>

          <div className="re-footer__cols">
            <div>
              <h2>Хуудсууд</h2>
              <ul>
                {PAGES.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href}>{page.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Үйлчилгээ</h2>
              <ul>
                {servicesContent.items.map((item, index) => (
                  <li key={item.title}>
                    <Link href={`/real-estate/services#service-${index + 1}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Холбогдох</h2>
              <ul>
                {contactContent.channels.map((channel) => (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a href={channelHref(channel)}>{channel.value}</a>
                    ) : (
                      <span>{channel.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="re-footer__bottom">
          <span>© {new Date().getFullYear()} Oigon Numrug Properties. Бүх эрх хуулиар хамгаалагдсан.</span>
          <nav aria-label="Группийн сайтууд">
            <Link href="/">Ойгон Нөмрөг групп</Link>
            <Link href="/safety">ХАБЭА чиглэл →</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
