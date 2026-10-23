"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, PhoneIcon } from "./icons";

const NAV = [
  { href: "/real-estate/projects", label: "Төслүүд" },
  { href: "/real-estate/services", label: "Үйлчилгээ" },
  { href: "/real-estate/about", label: "Бидний тухай" },
  { href: "/real-estate/contact", label: "Холбоо барих" },
];

type Props = {
  phone?: { label: string; href: string };
  email?: { label: string; href: string };
};

export default function Header({ phone, email }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Нүүр хуудасны тэнгэрийн hero дээр байх үед header тунгалаг.
  const [overSky, setOverSky] = useState(pathname === "/real-estate");

  useEffect(() => {
    const sky = pathname === "/real-estate" ? document.getElementById("re-sky") : null;
    if (!sky) {
      setOverSky(false);
      return;
    }
    const update = () => setOverSky(sky.getBoundingClientRect().bottom > 90);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <>
      <header className={`re-header${overSky && !open ? " re-header--clear" : ""}`}>
        <div className="re-wrap re-header__bar">
          <Link href="/real-estate" className="re-header__logo" aria-label="Oigon Numrug Properties — нүүр" onClick={close}>
            <Image src="/Logo_Primary color - 2.png" alt="Oigon Numrug Properties" width={5884} height={1493} priority />
          </Link>

          <nav className="re-header__nav" aria-label="Үндсэн цэс">
            {NAV.map((item, index) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                <span>{String(index + 1).padStart(2, "0")}</span>
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
            <Link href="/real-estate/contact" className="re-btn re-btn--ink re-btn--sm">
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
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              tabIndex={open ? undefined : -1}
              onClick={close}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
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
