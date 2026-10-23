"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { SafetySettings } from "@/lib/safety/content";

type SafetyShellProps = {
  children: React.ReactNode;
  settings: SafetySettings;
};

export default function SafetyShell({ children, settings }: SafetyShellProps) {
  const obs = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obs.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("sf-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const observer = obs.current;
    document.querySelectorAll(".sf-reveal").forEach((el) => observer.observe(el));

    const mo = new MutationObserver(() => {
      document
        .querySelectorAll(".sf-reveal:not(.sf-visible)")
        .forEach((el) => observer.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  const navLogo = settings.nav_logo || "/safety-logo-hab.png";
  const footerLogo = settings.footer_logo || "/safety-logo-hab.png";

  return (
    <main className="sf-page">
      <nav className="sf-nav">
        <div className="sf-container">
          <div className="sf-nav-inner">
            <Link href="/safety">
              <Image
                src={navLogo}
                alt="Oigon Numrug HABEA"
                width={280}
                height={80}
                priority
                className="sf-nav-logo"
              />
            </Link>
            <div className="sf-nav-links">
              <Link href="/safety/news">Мэдээ мэдээлэл</Link>
              <Link href="/safety/about">Бидний тухай</Link>
              <Link href="/safety/services">Үйлчилгээ</Link>
              <Link href="/safety/contact" className="sf-nav-cta">
                Холбоо барих
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {children}

      <footer className="sf-footer">
        <div className="sf-footer-pattern" />
        <Image
          src={footerLogo}
          alt="Oigon Numrug HABEA"
          width={220}
          height={60}
          className="sf-footer-logo"
        />
        <p>{settings.footer_text || "© 2025 Oigon Numrug HABEA. Safety First - Integrity Always."}</p>
      </footer>
    </main>
  );
}
