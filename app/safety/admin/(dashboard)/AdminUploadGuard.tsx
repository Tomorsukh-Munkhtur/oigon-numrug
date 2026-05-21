"use client";

import { useEffect } from "react";

const MAX_UPLOAD_MB = 90;
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

function oversizedFiles(input: HTMLInputElement) {
  return Array.from(input.files ?? []).filter((file) => file.size > MAX_UPLOAD_BYTES);
}

export default function AdminUploadGuard() {
  useEffect(() => {
    const handleChange = (event: Event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== "file") return;

      const files = oversizedFiles(input);
      if (files.length === 0) return;

      input.value = "";
      window.alert(`Зураг ${MAX_UPLOAD_MB}MB-аас их байна. Зургаа багасгаад дахин оруулна уу.`);
    };

    const handleSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      const fileInputs = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'));
      const hasOversizedFile = fileInputs.some((input) => oversizedFiles(input).length > 0);

      if (hasOversizedFile) {
        event.preventDefault();
        window.alert(`Upload хийх зураг ${MAX_UPLOAD_MB}MB-аас бага байх ёстой.`);
      }
    };

    document.addEventListener("change", handleChange);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("change", handleChange);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
