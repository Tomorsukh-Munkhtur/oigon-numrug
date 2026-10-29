"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Slow network: reveal the page anyway after this long. */
const MAX_WAIT = 15000;
/** Cached loads finish instantly — keep the screen up briefly so it doesn't flash. */
const MIN_SHOW = 700;
/** Pause at 100% before the curtain lifts. */
const HOLD = 180;
/** The 3D tower has no byte progress, so it counts as several units and creeps while it builds. */
const SCENE_WEIGHT = 4;

type Phase = "loading" | "leaving" | "gone";

/**
 * Хуудас бүрэн ачаалагдтал (бүх зураг, фонт, script, 3D барилгын эхний бүрэн кадр)
 * лого ба хувь харуулаад, дараа нь хөшиг шиг дээш гарна. Сервер HTML-д шууд орсон тул
 * эхний агшнаас харагдана; JS ажиллахгүй бол <noscript> нууна.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const start = performance.now();
    let total = 0;
    let done = 0;
    const task = (weight: number) => {
      total += weight;
      let finished = false;
      return () => {
        if (finished) return;
        finished = true;
        done += weight;
      };
    };

    // Every image on the page; lazy ones are switched to eager so "everything" really is everything
    for (const img of Array.from(document.images)) {
      if (rootRef.current?.contains(img)) continue;
      const finish = task(1);
      if (img.loading === "lazy") img.loading = "eager";
      if (img.complete) finish();
      else {
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", finish, { once: true });
      }
    }

    const fontsDone = task(1);
    if (document.fonts) document.fonts.ready.then(fontsDone, fontsDone);
    else fontsDone();

    const loadDone = task(1);
    if (document.readyState === "complete") loadDone();
    else window.addEventListener("load", loadDone, { once: true });

    // SkyHero sets data-3d to "ready" (first full frame drawn) or "off" (no WebGL / reduced motion)
    const sky = document.getElementById("re-sky");
    const sceneDone = task(SCENE_WEIGHT);
    let sceneFinished = false;
    const checkScene = () => {
      const state = sky?.dataset["3d"];
      if (!sky || state === "ready" || state === "off") {
        sceneFinished = true;
        sceneDone();
      }
    };
    const observer = sky ? new MutationObserver(checkScene) : null;
    if (sky) observer?.observe(sky, { attributes: true, attributeFilter: ["data-3d"] });
    checkScene();

    // Before hydration a CSS animation nudges the bar forward; continue from where it is
    let shown = 0;
    const bar = barRef.current;
    if (bar) {
      const matrix = getComputedStyle(bar).transform;
      shown = matrix && matrix !== "none" ? new DOMMatrixReadOnly(matrix).a : 0;
      bar.style.transform = `scaleX(${shown})`;
    }
    rootRef.current?.setAttribute("data-js", "");
    let finishedAt = 0;
    let frame = 0;
    const tick = (now: number) => {
      const creep = sceneFinished ? 0 : SCENE_WEIGHT * 0.8 * (1 - Math.exp(-(now - start) / 2500));
      const timedOut = now - start > MAX_WAIT;
      const target = timedOut ? 1 : Math.min(1, total ? (done + creep) / total : 1);
      // Only ever moves forward, easing towards the real progress
      if (target > shown) shown += (target - shown) * 0.12;
      if (target - shown < 0.002 && target >= shown) shown = target;

      const percent = Math.round(shown * 100);
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown})`;
      if (pctRef.current) pctRef.current.textContent = `${percent}%`;
      rootRef.current?.setAttribute("aria-valuenow", String(percent));

      if ((done >= total || timedOut) && shown >= 1 && now - start >= MIN_SHOW) {
        if (!finishedAt) finishedAt = now;
        if (now - finishedAt >= HOLD) {
          root.style.overflow = previousOverflow;
          setPhase("leaving");
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      root.style.overflow = previousOverflow;
    };
  }, []);

  // Remove the curtain once it has lifted (timer backs up a missed transitionend)
  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = window.setTimeout(() => setPhase("gone"), 1400);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <>
      <div
        ref={rootRef}
        className="re-loader"
        data-state={phase}
        role="progressbar"
        aria-label="Хуудас ачаалж байна"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && phase === "leaving") setPhase("gone");
        }}
      >
        <div className="re-loader__inner">
          <Image
            src="/real-estate/logo-white.webp"
            alt="Ойгон Нөмрөг Properties"
            width={720}
            height={183}
            priority
            className="re-loader__logo"
          />
          <div className="re-loader__progress">
            <span className="re-loader__bar">
              <span ref={barRef} />
            </span>
            <span ref={pctRef} className="re-loader__pct">
              0%
            </span>
          </div>
        </div>
      </div>
      <noscript>
        <style>{".re-loader{display:none}"}</style>
      </noscript>
    </>
  );
}
