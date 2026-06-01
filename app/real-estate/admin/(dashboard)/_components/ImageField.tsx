"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Hidden text field — carries existing path so unchanged saves keep it. */
  name: string;
  /** File input name — carries newly picked file. */
  fileFieldName: string;
  /** Existing image URL on the record. */
  defaultValue?: string;
};

export default function ImageField({
  name,
  fileFieldName,
  defaultValue = "",
}: Props) {
  const [previewSrc, setPreviewSrc] = useState(defaultValue);
  const [hasUpload, setHasUpload] = useState(false);
  const [cleared, setCleared] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const releaseBlob = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    releaseBlob();
    if (file) {
      const url = URL.createObjectURL(file);
      blobUrlRef.current = url;
      setPreviewSrc(url);
      setHasUpload(true);
      setCleared(false);
    } else {
      setPreviewSrc(defaultValue);
      setHasUpload(false);
    }
  };

  const clearAll = () => {
    if (fileRef.current) fileRef.current.value = "";
    releaseBlob();
    setPreviewSrc("");
    setHasUpload(false);
    setCleared(true);
  };

  // Hidden value tells the action what to do when no new file is uploaded:
  //  - "__CLEAR__"  → drop the existing image
  //  - existing path → keep it (action fallback)
  //  - "" (after upload) → action will use the uploaded file
  const hiddenValue = cleared ? "__CLEAR__" : hasUpload ? "" : defaultValue;

  return (
    <div className="re-image-field">
      <div className="re-image-field__preview">
        {previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewSrc} alt="Сонгогдсон зургийн урьдчилсан харагдац" />
        ) : (
          <div className="re-image-field__empty">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="M21 16l-5-5-7 7" />
            </svg>
            <span>Зураг сонгогдоогүй</span>
          </div>
        )}

        {hasUpload && <span className="re-image-field__badge">Шинээр upload хийгдсэн</span>}
      </div>

      <input type="hidden" name={name} value={hiddenValue} />
      <input
        ref={fileRef}
        type="file"
        name={fileFieldName}
        accept="image/*"
        onChange={handleFile}
        className="re-image-field__file"
        id={`${name}-file`}
      />

      <div className="re-image-field__actions">
        <label
          htmlFor={`${name}-file`}
          className="re-image-field__btn re-image-field__btn--primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {previewSrc ? "Зураг солих" : "Зураг сонгох"}
        </label>

        {previewSrc && (
          <button
            type="button"
            className="re-image-field__btn re-image-field__btn--danger"
            onClick={clearAll}
          >
            Цэвэрлэх
          </button>
        )}
      </div>
    </div>
  );
}
