"use client";

import { useEffect, useRef } from "react";

type Segment = { text: string; em?: boolean };

type Props = {
  segments: Segment[];
  className?: string;
};

/** Гүйлгэх явцаар үг бүр бүдгээс тод болж уншигдана. */
export default function RevealText({ segments, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  const words = segments.flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, em: segment.em }))
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Доод хэсгээс орж ирээд дэлгэцийн 40%-д хүрэхэд бүрэн тодорно.
      const progress = (vh * 0.9 - rect.top) / (vh * 0.5 + rect.height);
      el.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(4));
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
    <p ref={ref} className={`re-reveal-text ${className ?? ""}`} style={{ "--n": words.length } as React.CSSProperties}>
      {words.map(({ word, em }, index) => {
        const style = { "--i": index } as React.CSSProperties;
        return (
          <span key={`${word}-${index}`} style={style}>
            {em ? <em>{word}</em> : word}{" "}
          </span>
        );
      })}
    </p>
  );
}
