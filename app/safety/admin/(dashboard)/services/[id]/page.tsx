import { notFound } from "next/navigation";
import { getSafetyService } from "@/lib/safety/content";
import { saveService } from "../../../actions";

export const dynamic = "force-dynamic";

const emptyService = {
  id: 0,
  title: "",
  description: "",
  icon: "📋",
  color: "#e67e22",
  active: 1,
  sort_order: 0,
};

export default async function SafetyAdminServiceEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const item = id === "new" ? emptyService : getSafetyService(Number(id));

  if (!item) notFound();

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Service editor</p>
          <h1>{id === "new" ? "Шинэ үйлчилгээ" : item.title}</h1>
        </div>
      </div>

      {query.saved && <p className="admin-success">Хадгалагдлаа.</p>}

      <form action={saveService.bind(null, id)} className="admin-form admin-panel">
        <label>
          Гарчиг
          <input name="title" defaultValue={item.title} required />
        </label>
        <label>
          Тайлбар
          <textarea name="description" rows={5} defaultValue={item.description} />
        </label>
        <div className="admin-grid-3">
          <label>
            Icon
            <input name="icon" defaultValue={item.icon} />
          </label>
          <label>
            Өнгө
            <input name="color" type="color" defaultValue={item.color} />
          </label>
          <label>
            Дараалал
            <input name="sort_order" type="number" defaultValue={item.sort_order} />
          </label>
        </div>
        <label className="admin-check">
          <input name="active" type="checkbox" defaultChecked={Boolean(item.active)} />
          Public дээр харуулах
        </label>
        <button className="admin-primary" type="submit">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
