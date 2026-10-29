"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "./icons";

// Three.js (~150KB gzip) loads only on the client, after the page is interactive.
const TowerScene = dynamic(() => import("./TowerScene"), { ssr: false });

// "pending" until the client has decided; the page preloader waits for "ready" or "off".
type Scene3D = "pending" | "off" | "loading" | "ready";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

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
  // Static image shows first; the 3D tower replaces it once its first frame is drawn.
  const [scene3d, setScene3d] = useState<Scene3D>("pending");
  const handleReady = useCallback(() => setScene3d("ready"), []);
  const handleFail = useCallback(() => setScene3d("off"), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScene3d("off");
      return;
    }
    setScene3d(supportsWebGL() ? "loading" : "off");

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
      data-3d={scene3d}
      style={{ "--re-window-image": `url("${windowImage}")` } as React.CSSProperties}
    >
      <div className="re-sky__stage">
        <div className="re-sky__bg" aria-hidden="true" />
        <div className="re-sky__dusk" aria-hidden="true" />
        {/* Behind every cloud: the sky turns to the page colour while the clouds stay white */}
        <div className="re-sky__wash" aria-hidden="true" />

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
          alt="Ойгон Нөмрөг Properties — орон сууцны барилга"
          width={960}
          height={2045}
          priority
          sizes="(min-width: 768px) 820px, 90vw"
          className="re-sky__tower"
        />
        {(scene3d === "loading" || scene3d === "ready") && (
          <TowerScene trackRef={ref} onReady={handleReady} onFail={handleFail} />
        )}

        <Image
          src="/Logo_White color - 2.png"
          alt=""
          width={5884}
          height={1493}
          className="re-sky__mark"
          aria-hidden="true"
        />
        <div className="re-sky__window" role="img" aria-label="Ойгон Нөмрөг Properties" />

        <Image
          src="/real-estate/hero/cloud-a.webp"
          alt=""
          width={1400}
          height={620}
          priority
          className="re-sky__cloud re-sky__cloud--a"
          aria-hidden="true"
        />
        {/* Cloud bank: rises to a white-out, then lifts away (with its underside) to reveal the page */}
        <div className="re-sky__fog" aria-hidden="true">
          <Image src="/real-estate/hero/mist.webp" alt="" width={2400} height={760} priority className="re-sky__mist" />
          <Image
            src="/real-estate/hero/mist-under.webp"
            alt=""
            width={2400}
            height={1000}
            loading="eager"
            className="re-sky__mist re-sky__mist--under"
          />
        </div>
      </div>
    </section>
  );
}
