"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    // Observe elements in the entire layout tree
    const observer = obs.current;
    document.querySelectorAll(".sf-reveal").forEach((el) => observer.observe(el));
    
    // MutationObserver to catch new elements on route changes
    const mo = new MutationObserver(() => {
      document.querySelectorAll(".sf-reveal:not(.sf-visible)").forEach((el) => observer.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <main className="sf-page">
      <nav className="sf-nav">
        <div className="sf-container">
          <div className="sf-nav-inner">
            <Link href="/safety">
              <Image src="/safety-logo-hab.png" alt="Oigon Numrug HABEA" width={280} height={80} priority className="sf-nav-logo" />
            </Link>
            <div className="sf-nav-links">
              <Link href="/safety/about">Бидний тухай</Link>
              <Link href="/safety/training">Сургалтууд</Link>
              <Link href="/safety/services">Үйлчилгээ</Link>
              <Link href="/safety/contact" className="sf-nav-cta">Холбоо барих</Link>
            </div>
          </div>
        </div>
      </nav>

      {children}

      {/* CTA Section - Shared */}
      <section className="sf-cta" id="contact">
        <div className="sf-container">
          <div className="sf-cta-inner sf-reveal">
            <div className="sf-cta-text">
              <span className="sf-tag sf-tag--light">ОДОО ХОЛБОГДОХ</span>
              <h2>Аюулгүй ажиллагааны зөвлөгөө авъя</h2>
              <div className="sf-contact-row">
                <div className="sf-contact-chip"><span>📞</span><div><small>Шуурхай утас</small><strong>+976 8800 0000</strong></div></div>
                <div className="sf-contact-chip"><span>✉️</span><div><small>И-мэйл хаяг</small><strong>safety@oigonnumrug.mn</strong></div></div>
              </div>
            </div>
            <a href="tel:+97688000000" className="sf-btn sf-btn--dark sf-btn--lg">
              <span>Зөвлөгөө авах</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="sf-footer">
        <div className="sf-footer-pattern" />
        <Image src="/safety-logo-hab.png" alt="Oigon Numrug HABEA" width={220} height={60} className="sf-footer-logo" />
        <p>© 2025 Oigon Numrug HABEA. Safety First - Integrity Always.</p>
      </footer>
    </main>
  );
}
