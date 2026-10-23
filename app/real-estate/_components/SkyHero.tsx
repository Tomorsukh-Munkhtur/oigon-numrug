"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "./icons";

type Props = {
  titlePre: string;
  titleEm: string;
  /** Өгүүлбэр бүр тусдаа; сүүлийнх нь бүдэг өнгөөр харагдана. */
  subtitle: string[];
  cta: { label: string; href: string };
  /** Лого үсгүүдийн дотор харагдах зураг. */
  windowImage: string;
};

/**
 * Гүйлгэхэд хөдөлдөг эхлэл: тэнгэр → барилга дээшилнэ → лого үсгүүдийн дотор барилга
 * харагдана → манан бүрхэж дараагийн хэсэг рүү шилжинэ. Явцыг --p (0–1) хувьсагчаар
 * CSS-д дамжуулна; бүх хөдөлгөөн transform/opacity.
 */
export default function SkyHero({ titlePre, titleEm, subtitle, cta, windowImage }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const total = el.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
      el.style.setProperty("--p", progress.toFixed(4));
      el.dataset.head = progress < 0.16 ? "on" : "off";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="re-sky"
      className="re-sky"
      data-head="on"
      style={{ "--re-window-image": `url("${windowImage}")` } as React.CSSProperties}
    >
      <div className="re-sky__stage">
        <div className="re-sky__bg" aria-hidden="true" />
        <div className="re-sky__dusk" aria-hidden="true" />

        <Image
          src="/real-estate/hero/cloud-b.webp"
          alt=""
          width={1100}
          height={480}
          priority
          className="re-sky__cloud re-sky__cloud--b"
          aria-hidden="true"
        />

        <div className="re-sky__head">
          <h1 className="re-display re-sky__title re-rise">
            {titlePre} <em>{titleEm}</em>
          </h1>
          <p className="re-sky__sub re-rise">
            {subtitle.map((sentence, index) => (
              <span key={sentence} className={index === subtitle.length - 1 ? "is-muted" : undefined}>
                {sentence}{" "}
              </span>
            ))}
          </p>
          <div className="re-rise">
            <Link href={cta.href} className="re-btn re-btn--ink">
              {cta.label}
              <ArrowRight />
            </Link>
          </div>
        </div>

        <Image
          src="/real-estate/hero/tower.webp"
          alt="Oigon Numrug Properties-ийн хамтарсан орон сууцны төсөл"
          width={960}
          height={2045}
          priority
          sizes="(min-width: 768px) 820px, 90vw"
          className="re-sky__tower"
        />

        <Image
          src="/Logo_White color - 2.png"
          alt=""
          width={5884}
          height={1493}
          className="re-sky__mark"
          aria-hidden="true"
        />
        <div className="re-sky__window" role="img" aria-label="Oigon Numrug Properties" />

        <Image
          src="/real-estate/hero/cloud-a.webp"
          alt=""
          width={1400}
          height={620}
          priority
          className="re-sky__cloud re-sky__cloud--a"
          aria-hidden="true"
        />
        <Image
          src="/real-estate/hero/mist.webp"
          alt=""
          width={2400}
          height={760}
          priority
          className="re-sky__mist"
          aria-hidden="true"
        />
        <div className="re-sky__wash" aria-hidden="true" />
      </div>
    </section>
  );
}
