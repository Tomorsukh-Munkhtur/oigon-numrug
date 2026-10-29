import Image from "next/image";
import Link from "next/link";
import { channelHref, contactContent, sectionHref, sections, servicesContent } from "@/lib/real-estate/content";
import { externalProps, softBreak } from "./softBreak";

// Нэг хуудастай сайт: холбоос бүр нүүр хуудасны хэсэг рүү гүйлгэнэ.
const LINKS = [
  { href: "/real-estate", label: "Нүүр" },
  ...sections.map((section) => ({ href: sectionHref(section.id), label: section.label })),
];

export default function Footer() {
  return (
    <footer className="re-footer">
      <div className="re-wrap">
        <div className="re-footer__top">
          <div className="re-footer__brand">
            <Image
              src="/Logo_White color - 2.png"
              alt="Ойгон Нөмрөг Properties"
              width={5884}
              height={1493}
              className="re-footer__logo"
            />
            <p>
              Ойгон Нөмрөг Properties — Дархан хотын үл хөдлөх хөрөнгийн мэргэжлийн, шуурхай зуучлал,
              санхүүгийн зөвлөгөө.
            </p>
          </div>

          <div className="re-footer__cols">
            <div>
              <h2>Цэс</h2>
              <ul>
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Үйлчилгээ</h2>
              <ul>
                {servicesContent.items.map((item, index) => (
                  <li key={item.title}>
                    <Link href={sectionHref(`service-${index + 1}`)}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Холбогдох</h2>
              <ul>
                {contactContent.channels
                  .filter((channel) => channel.kind !== "social")
                  .map((channel) => (
                    <li key={channel.label}>
                      {channel.href ? (
                        <a href={channelHref(channel)}>{softBreak(channel.value)}</a>
                      ) : (
                        <span>{softBreak(channel.value)}</span>
                      )}
                    </li>
                  ))}
                {contactContent.socials.map((social) => (
                  <li key={social.href}>
                    <a href={social.href} {...externalProps(social.href)}>
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="re-footer__bottom">
          <span>© {new Date().getFullYear()} Ойгон Нөмрөг Properties. Бүх эрх хуулиар хамгаалагдсан.</span>
          <nav aria-label="Группийн сайтууд">
            <Link href="/">Ойгон Нөмрөг групп</Link>
            <Link href="/safety">ХАБЭА чиглэл →</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
