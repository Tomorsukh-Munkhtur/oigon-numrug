"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { reNavLinks } from "@/lib/real-estate/content";

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="re-topbar">
      <div className="re-topbar-inner">
        <Link href="/real-estate" className="re-brand" aria-label="Нүүр хуудас">
          <Image
            src="/Logo_Primary color - 2.png"
            alt="Oigon Numrug Properties"
            width={720}
            height={190}
            priority
            className="re-brand-logo"
          />
        </Link>

        <nav className="re-nav" aria-label="Үндсэн навигац">
          {reNavLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/real-estate" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/real-estate/contact" className="re-cta-button">
          <span>Холбоо барих</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
