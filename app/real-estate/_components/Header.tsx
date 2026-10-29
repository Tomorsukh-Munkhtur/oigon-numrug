"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sectionHref, sections, type SectionId } from "@/lib/real-estate/content";
import { ArrowRight, PhoneIcon } from "./icons";

// Нэг хуудастай сайт: цэс бүр нүүр хуудасны хэсэг рүү гүйлгэнэ.
const NAV = sections.map((section) => ({ id: section.id, href: sectionHref(section.id), label: section.label }));

type Props = {
  phone?: { label: string; href: string };
  email?: { label: string; href: string };
};

export default function Header({ phone, email }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Нүүр хуудасны тэнгэрийн hero дээр байх үед header тунгалаг.
  const [overSky, setOverSky] = useState(pathname === "/real-estate");
  // Одоо дэлгэцэн дээр байгаа хэсэг — цэсэнд тодорно.
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sky = pathname === "/real-estate" ? document.getElementById("re-sky") : null;
    if (!sky) {
      setOverSky(false);
      return;
    }
    // Clear only over the dark sky: once the white clouds cover the screen (~70% of the hero
    // scroll) the light nav text would vanish, so the solid bar comes back.
    const update = () => {
      const rect = sky.getBoundingClientRect();
      const total = sky.offsetHeight - window.innerHeight;
      const progress = total > 0 ? -rect.top / total : 1;
      setOverSky(rect.bottom > 90 && progress < 0.7);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    const targets = NAV.map((item) => document.getElementById(item.id)).filter((el) => el !== null);
    if (targets.length === 0) return;
    const visible = new Set<string>();
    // A section is current while it crosses a thin band just above the middle of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = NAV.filter((item) => visible.has(item.id)).at(-1);
        setActive(current ? current.id : null);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`re-header${overSky && !open ? " re-header--clear" : ""}`}>
        <div className="re-wrap re-header__bar">
          <Link href="/real-estate" className="re-header__logo" aria-label="Ойгон Нөмрөг Properties — нүүр" onClick={close}>
            <Image src="/Logo_White color - 2.png" alt="Ойгон Нөмрөг Properties" width={5884} height={1493} priority />
          </Link>

          <nav className="re-header__nav" aria-label="Үндсэн цэс">
            {NAV.map((item) => (
              <Link key={item.id} href={item.href} aria-current={active === item.id ? "true" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="re-header__actions">
            {phone && (
              <a href={phone.href} className="re-header__phone">
                <PhoneIcon size={15} />
                {phone.label}
              </a>
            )}
            <Link href={sectionHref("contact")} className="re-btn re-btn--ink re-btn--sm">
              Зөвлөгөө авах
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              className="re-header__toggle"
              aria-expanded={open}
              aria-controls="re-menu"
              aria-label={open ? "Цэс хаах" : "Цэс нээх"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="re-menu" className="re-menu" data-open={open} aria-hidden={!open}>
        <nav className="re-menu__links" aria-label="Гар утасны цэс">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active === item.id ? "true" : undefined}
              tabIndex={open ? undefined : -1}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="re-menu__foot">
          {phone && (
            <a href={phone.href} className="re-btn re-btn--ink re-btn--block" tabIndex={open ? undefined : -1}>
              <PhoneIcon size={16} />
              {phone.label}
            </a>
          )}
          {email && (
            <a href={email.href} className="re-btn re-btn--line re-btn--block" tabIndex={open ? undefined : -1}>
              {email.label}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
