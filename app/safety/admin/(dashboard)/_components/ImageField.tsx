"use client";

import { useEffect, useId, useRef, useState } from "react";

type Aspect = "16:9" | "4:3" | "1:1" | "logo";

type Props = {
  name: string;
  fileName: string;
  initialPath: string;
  aspect?: Aspect;
  hint?: string;
  urlPlaceholder?: string;
  transparent?: boolean;
};

const ASPECT_CLASS: Record<Aspect, string> = {
  "16:9": "admin-image-preview--16-9",
  "4:3": "admin-image-preview--4-3",
  "1:1": "admin-image-preview--1-1",
  logo: "admin-image-preview--logo",
};

export default function ImageField({
  name,
  fileName,
  initialPath,
  aspect = "16:9",
  hint,
  urlPlaceholder = "/uploads/safety/... эсвэл https://...",
  transparent = false,
}: Props) {
  const inputId = useId();
  const [path, setPath] = useState(initialPath);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const preview = filePreview ?? (path ? path : null);

  function handleFiles(files: FileList | null | undefined) {
    const file = files?.[0];
    if (filePreview) URL.revokeObjectURL(filePreview);
    if (!file) {
      setFilePreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      window.alert("Зөвхөн зураг файл сонгоно уу.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFilePreview(URL.createObjectURL(file));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInputRef.current.files = dataTransfer.files;
    }
    handleFiles(files);
  }

  function clearImage() {
    setPath("");
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const previewClass = [
    "admin-image-preview",
    ASPECT_CLASS[aspect],
    transparent ? "admin-image-preview--transparent" : "",
    isDragging ? "admin-image-preview--dragging" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="admin-image-field">
      <div
        className={previewClass}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-live="polite"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Зургийн урьдчилсан харагдац" />
        ) : (
          <label htmlFor={inputId} className="admin-image-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span>Зураг сонгох эсвэл энд чирэх</span>
            <small>PNG, JPG, WebP — 90MB хүртэл</small>
          </label>
        )}

        {isDragging && (
          <div className="admin-image-drop-hint" aria-hidden="true">
            Энд тавь
          </div>
        )}
      </div>

      <div className="admin-image-actions">
        <label className="admin-image-upload" htmlFor={inputId}>
          <input
            id={inputId}
            ref={fileInputRef}
            name={fileName}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <span className="admin-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            {preview ? "Өөр зураг сонгох" : "Компьютерээс сонгох"}
          </span>
        </label>
        {preview && (
          <button type="button" className="admin-image-remove" onClick={clearImage}>
            Устгах
          </button>
        )}
      </div>

      <details className="admin-image-url">
        <summary>Эсвэл URL/зам оруулах</summary>
        <input
          name={name}
          value={path}
          onChange={(event) => setPath(event.target.value)}
          placeholder={urlPlaceholder}
        />
        {hint && <p className="admin-hint">{hint}</p>}
      </details>
    </div>
  );
}
