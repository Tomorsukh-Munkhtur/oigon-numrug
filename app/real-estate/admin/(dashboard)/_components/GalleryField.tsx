"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  /** Hidden field carrying newline-separated existing image paths. */
  name: string;
  /** File input name for newly uploaded gallery files. */
  fileFieldName: string;
  /** Existing gallery paths (newline-separated). */
  defaultValue?: string;
};

type PendingFile = {
  uid: string;
  file: File;
  url: string;
};

function makeUid() {
  return `g-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export default function GalleryField({
  name,
  fileFieldName,
  defaultValue = "",
}: Props) {
  const initialPaths = useMemo(
    () =>
      defaultValue
        .split(/\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean),
    [defaultValue]
  );

  const [paths, setPaths] = useState<string[]>(initialPaths);
  const [pending, setPending] = useState<PendingFile[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      pending.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // We intentionally clean up only on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Re-sync the file input's FileList with our pending state. */
  const syncFileInput = (next: PendingFile[]) => {
    if (!fileRef.current) return;
    const dt = new DataTransfer();
    for (const p of next) dt.items.add(p.file);
    fileRef.current.files = dt.files;
  };

  const handleFilesPicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    const additions: PendingFile[] = picked.map((file) => ({
      uid: makeUid(),
      file,
      url: URL.createObjectURL(file),
    }));

    setPending((prev) => {
      const next = [...prev, ...additions];
      syncFileInput(next);
      return next;
    });
  };

  const removePending = (uid: string) => {
    setPending((prev) => {
      const next = prev.filter((p) => p.uid !== uid);
      const removed = prev.find((p) => p.uid === uid);
      if (removed) URL.revokeObjectURL(removed.url);
      syncFileInput(next);
      return next;
    });
  };

  const removeExisting = (index: number) => {
    setPaths((prev) => prev.filter((_, i) => i !== index));
  };

  const moveExisting = (index: number, direction: -1 | 1) => {
    setPaths((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const totalCount = paths.length + pending.length;

  return (
    <div className="re-gallery-field">
      <input type="hidden" name={name} value={paths.join("\n")} />
      <input
        ref={fileRef}
        type="file"
        name={fileFieldName}
        accept="image/*"
        multiple
        onChange={handleFilesPicked}
        className="re-image-field__file"
        id={`${name}-file`}
      />

      {totalCount === 0 ? (
        <p className="re-gallery-field__empty">
          Галерейд зураг сонгогдоогүй. Доорхоос upload хийж эхлээрэй.
        </p>
      ) : (
        <ol className="re-gallery-selected">
          {paths.map((p, idx) => {
            const filename = p.split("/").pop();
            return (
              <li key={`existing-${p}-${idx}`}>
                <span className="re-gallery-selected__order">{idx + 1}</span>
                <div className="re-gallery-selected__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p} alt={filename ?? "Галерейн зураг"} loading="lazy" />
                </div>
                <span className="re-gallery-selected__name" title={p}>
                  {filename}
                </span>
                <div className="re-gallery-selected__controls">
                  <button
                    type="button"
                    onClick={() => moveExisting(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Дээш зөөх"
                    title="Дээш зөөх"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveExisting(idx, +1)}
                    disabled={idx === paths.length - 1}
                    aria-label="Доош зөөх"
                    title="Доош зөөх"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="re-gallery-selected__remove"
                    onClick={() => removeExisting(idx)}
                    aria-label="Хасах"
                    title="Хасах"
                  >
                    ×
                  </button>
                </div>
              </li>
            );
          })}

          {pending.map((p, idx) => (
            <li key={p.uid} className="re-gallery-selected re-gallery-selected--pending">
              <span className="re-gallery-selected__order">
                {paths.length + idx + 1}
              </span>
              <div className="re-gallery-selected__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.file.name} />
              </div>
              <span className="re-gallery-selected__name" title={p.file.name}>
                {p.file.name}
                <span className="re-gallery-selected__tag">Шинэ</span>
              </span>
              <div className="re-gallery-selected__controls">
                <button
                  type="button"
                  className="re-gallery-selected__remove"
                  onClick={() => removePending(p.uid)}
                  aria-label="Хасах"
                  title="Хасах"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <label
        htmlFor={`${name}-file`}
        className="re-image-field__btn re-image-field__btn--primary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        Шинэ зураг upload (олон сонгож болно)
      </label>
    </div>
  );
}
