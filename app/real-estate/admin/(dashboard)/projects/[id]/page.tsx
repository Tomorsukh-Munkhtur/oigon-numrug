import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProject } from "@/lib/real-estate/content";
import { deleteProject, saveProject } from "../../../actions";
import ImageField from "../../_components/ImageField";
import GalleryField from "../../_components/GalleryField";
import FloorPlanField from "../../_components/FloorPlanField";

export const dynamic = "force-dynamic";

type Params = { id: string };

export default async function ProjectEditorPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const project = isNew ? null : getProject(id);

  if (!isNew && !project) notFound();

  const save = saveProject.bind(null, id);
  const remove = async () => {
    "use server";
    await deleteProject(id);
    redirect("/real-estate/admin/projects");
  };

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Төсөл</p>
          <h1>{isNew ? "Шинэ төсөл" : project?.title}</h1>
        </div>
        <Link href="/real-estate/admin/projects" className="admin-secondary">
          ← Жагсаалт руу
        </Link>
      </div>

      {saved && <p className="admin-success">Хадгалагдлаа.</p>}

      <form action={save} className="admin-form admin-panel">
        {isNew && (
          <label>
            ID (slug)
            <input
              name="id"
              placeholder="хоосон үлдээвэл гарчгийг slug болгоно"
              autoComplete="off"
            />
          </label>
        )}

        <fieldset className="admin-fieldset">
          <legend>Үндсэн мэдээлэл</legend>

          <div className="admin-grid-2">
            <label>
              Гарчиг
              <input name="title" required defaultValue={project?.title ?? ""} />
            </label>
            <label>
              Төрөл
              <input
                name="type"
                placeholder="Премиум орон сууц"
                defaultValue={project?.type ?? ""}
              />
            </label>
          </div>

          <div className="admin-grid-2">
            <label>
              Байршил
              <input
                name="location"
                placeholder="Дархан хот, 14-р баг"
                defaultValue={project?.location ?? ""}
              />
            </label>
            <label>
              Төлөв
              <input
                name="status"
                placeholder="Шинээр зарагдаж байна"
                defaultValue={project?.status ?? ""}
              />
            </label>
          </div>

          <div className="admin-grid-2">
            <label>
              Үнэ
              <input
                name="price"
                placeholder="₮ 3.6 сая / м²-ээс"
                defaultValue={project?.price ?? ""}
              />
            </label>
            <label>
              Талбайн хэмжээ
              <input
                name="size"
                placeholder="65 — 180 м²"
                defaultValue={project?.size ?? ""}
              />
            </label>
          </div>

          <label>
            Богино тайлбар (summary)
            <textarea
              name="summary"
              rows={3}
              defaultValue={project?.summary ?? ""}
            />
          </label>

          <label>
            Дэлгэрэнгүй тайлбар (long_description)
            <textarea
              name="long_description"
              rows={8}
              defaultValue={project?.longDescription ?? ""}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Барилгын мэдээлэл</legend>
          <div className="admin-grid-2">
            <label>
              Хөгжүүлэгч
              <input
                name="developer"
                defaultValue={project?.developer ?? ""}
              />
            </label>
            <label>
              Дуусах хугацаа
              <input
                name="completion"
                placeholder="2027 II улирал"
                defaultValue={project?.completion ?? ""}
              />
            </label>
          </div>
          <div className="admin-grid-3">
            <label>
              Давхар
              <input name="floors" defaultValue={project?.floors ?? ""} />
            </label>
            <label>
              Айл / нэгж
              <input name="units" defaultValue={project?.units ?? ""} />
            </label>
            <label>
              Зогсоол
              <input name="parking" defaultValue={project?.parking ?? ""} />
            </label>
          </div>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Жагсаалтууд (нэг мөрөнд нэг зүйл)</legend>
          <label>
            Онцлог (highlights)
            <textarea
              name="highlights"
              rows={5}
              defaultValue={(project?.highlights ?? []).join("\n")}
            />
          </label>
          <label>
            Тав тух (amenities)
            <textarea
              name="amenities"
              rows={5}
              defaultValue={(project?.amenities ?? []).join("\n")}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Зургийн галерей</legend>
          <p className="admin-hint">
            Олон зураг нэг дор upload хийж болно. Хадгалсны дараа дарааллыг ↑↓
            товчоор өөрчилнө.
          </p>
          <GalleryField
            name="gallery"
            fileFieldName="gallery_files"
            defaultValue={(project?.gallery ?? []).join("\n")}
          />
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Өрөөний зохион байгуулалт</legend>
          <p className="admin-hint">
            Мөр тус бүрд зураг upload хийгээд шошго, өрөөний тоо, талбайг бөглөнө.
          </p>
          <FloorPlanField
            name="floor_plans"
            defaultValue={project?.floorPlans ?? []}
          />
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Үндсэн зураг</legend>
          <ImageField
            name="image"
            fileFieldName="image_file"
            defaultValue={project?.image ?? ""}
          />
        </fieldset>

        <div className="admin-grid-2">
          <label>
            Эрэмбэ (sort_order)
            <input
              name="sort_order"
              type="number"
              defaultValue={project?.sortOrder ?? 0}
            />
          </label>
          <label className="admin-check">
            <input
              type="checkbox"
              name="published"
              defaultChecked={project?.published ?? true}
            />
            Нийтлэх
          </label>
        </div>

        <div className="admin-grid-2">
          <button className="admin-primary" type="submit">
            Хадгалах
          </button>
          {!isNew && (
            <button
              className="admin-danger"
              type="submit"
              formAction={remove}
              formNoValidate
            >
              Устгах
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
