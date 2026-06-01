"use client";

import { useEffect, useRef, useState } from "react";

export type FloorPlanEntry = {
  id: string;
  label: string;
  rooms: string;
  area: string;
  image: string;
};

type Props = {
  /** Hidden field carrying a JSON-encoded floor plan list. */
  name: string;
  defaultValue?: FloorPlanEntry[];
};

function makeId() {
  return `plan-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export default function FloorPlanField({ name, defaultValue = [] }: Props) {
  const [plans, setPlans] = useState<FloorPlanEntry[]>(defaultValue);
  const [pendingPreviews, setPendingPreviews] = useState<Record<string, string>>({});
  const blobsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const blobs = blobsRef.current;
    return () => {
      Object.values(blobs).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const update = (i: number, patch: Partial<FloorPlanEntry>) => {
    setPlans((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  };

  const releasePreview = (id: string) => {
    const old = blobsRef.current[id];
    if (old) {
      URL.revokeObjectURL(old);
      delete blobsRef.current[id];
    }
  };

  const handleFile = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    releasePreview(id);
    if (file) {
      const url = URL.createObjectURL(file);
      blobsRef.current[id] = url;
      setPendingPreviews((prev) => ({ ...prev, [id]: url }));
    } else {
      setPendingPreviews((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const remove = (i: number) => {
    const removed = plans[i];
    if (removed) releasePreview(removed.id);
    setPlans((prev) => prev.filter((_, idx) => idx !== i));
    setPendingPreviews((prev) => {
      const next = { ...prev };
      if (removed) delete next[removed.id];
      return next;
    });
  };

  const move = (i: number, dir: -1 | 1) => {
    setPlans((prev) => {
      const target = i + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[target]] = [next[target], next[i]];
      return next;
    });
  };

  const add = () => {
    setPlans((prev) => [
      ...prev,
      { id: makeId(), label: "", rooms: "", area: "", image: "" },
    ]);
  };

  return (
    <div className="re-floorplan-field">
      <input type="hidden" name={name} value={JSON.stringify(plans)} />

      {plans.length === 0 ? (
        <p className="re-gallery-field__empty">
          Одоогоор өрөөний зохион байгуулалт нэмээгүй байна.
        </p>
      ) : (
        <ol className="re-floorplan-rows">
          {plans.map((plan, i) => {
            const fileFieldName = `floor_plan_file_${plan.id}`;
            const fileInputId = `${name}-${plan.id}-file`;
            const previewSrc = pendingPreviews[plan.id] ?? plan.image;
            const isNewFile = Boolean(pendingPreviews[plan.id]);

            return (
              <li key={plan.id} className="re-floorplan-row-wrap">
                <div className="re-floorplan-row">
                  <span className="re-floorplan-row__order">{i + 1}</span>

                  <label
                    htmlFor={fileInputId}
                    className="re-floorplan-row__thumb"
                    title="Зургийн файл сонгох"
                  >
                    {previewSrc ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewSrc} alt={plan.label || "Зохион байгуулалт"} />
                        {isNewFile && (
                          <span className="re-floorplan-row__badge">Шинэ</span>
                        )}
                      </>
                    ) : (
                      <span>+ Файл сонгох</span>
                    )}
                  </label>

                  <input
                    id={fileInputId}
                    type="file"
                    name={fileFieldName}
                    accept="image/*"
                    onChange={(e) => handleFile(plan.id, e)}
                    className="re-image-field__file"
                  />

                  <div className="re-floorplan-row__fields">
                    <label>
                      <span>Шошго</span>
                      <input
                        value={plan.label}
                        onChange={(e) => update(i, { label: e.target.value })}
                        placeholder="3 өрөө · 118.7 м²"
                      />
                    </label>
                    <label>
                      <span>Өрөө</span>
                      <input
                        value={plan.rooms}
                        onChange={(e) => update(i, { rooms: e.target.value })}
                        placeholder="3 өрөө"
                      />
                    </label>
                    <label>
                      <span>Талбай</span>
                      <input
                        value={plan.area}
                        onChange={(e) => update(i, { area: e.target.value })}
                        placeholder="118.7 м²"
                      />
                    </label>
                  </div>

                  <div className="re-floorplan-row__controls">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label="Дээш зөөх"
                      title="Дээш зөөх"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, +1)}
                      disabled={i === plans.length - 1}
                      aria-label="Доош зөөх"
                      title="Доош зөөх"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="re-gallery-selected__remove"
                      onClick={() => remove(i)}
                      aria-label="Устгах"
                      title="Устгах"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <button type="button" className="re-image-field__btn" onClick={add}>
        + Шинэ зохион байгуулалт нэмэх
      </button>
    </div>
  );
}
