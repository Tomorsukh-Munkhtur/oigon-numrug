import Link from "next/link";
import { notFound } from "next/navigation";
import { getSafetyNews } from "@/lib/safety/content";
import { deleteNews, saveNews } from "../../../actions";
import ImageField from "../../_components/ImageField";

export const dynamic = "force-dynamic";

const CATEGORY_SUGGESTIONS = ["Зөвлөмж", "Сургалт", "Үйл явдал", "Зарлал"];

const emptyNews = {
  id: 0,
  date: new Date().toISOString().slice(0, 10),
  category: "",
  title: "",
  description: "",
  body: "",
  image: "",
  published: 1,
  sort_order: 0,
};

export default async function SafetyAdminNewsEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const isNew = id === "new";
  const item = isNew ? emptyNews : getSafetyNews(Number(id));

  if (!item) notFound();

  return (
    <form action={saveNews.bind(null, id)} className="admin-editor">
      <header className="admin-editor__bar">
        <div className="admin-editor__bar-left">
          <Link href="/safety/admin/news" className="admin-editor__back" aria-label="Буцах">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <p className="admin-kicker">Мэдээ {isNew ? "нэмэх" : "засах"}</p>
            <h1 className="admin-editor__title">
              {isNew ? "Шинэ мэдээ" : item.title || "Гарчиггүй мэдээ"}
            </h1>
          </div>
        </div>
        <div className="admin-editor__bar-right">
          <Link href="/safety/admin/news" className="admin-secondary">
            Цуцлах
          </Link>
          <button className="admin-primary" type="submit">
            {isNew ? "Үүсгэх" : "Хадгалах"}
          </button>
        </div>
      </header>

      {query.saved && (
        <p className="admin-success admin-editor__flash" role="status">
          ✓ Мэдээ амжилттай хадгалагдлаа.
        </p>
      )}

      <div className="admin-editor__grid">
        <div className="admin-editor__main">
          <section className="admin-section">
            <header className="admin-section__head">
              <h2>Үндсэн мэдээлэл</h2>
              <p>Энэ мэдээний гарчиг болон агуулга — олон нийтэд ингэж харагдана.</p>
            </header>

            <label className="admin-field">
              <span className="admin-field__label">
                Гарчиг <span className="admin-required" aria-hidden="true">*</span>
              </span>
              <input
                name="title"
                defaultValue={item.title}
                required
                maxLength={200}
                placeholder="Жнь: ХАБЭА-н шинэ стандарт хэрэгжиж эхэллээ"
              />
              <span className="admin-hint">
                Хуудсанд харагдах гол гарчиг. 200 хүртэлх тэмдэгт.
              </span>
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Товч тайлбар</span>
              <textarea
                name="description"
                rows={4}
                defaultValue={item.description}
                placeholder="Мэдээний товч агуулга, унших хүсэл төрүүлэхүйц 2-3 өгүүлбэр."
              />
              <span className="admin-hint">
                Карт болон жагсаалт дээр харагдах товч хураангуй (2-3 өгүүлбэр).
              </span>
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Дэлгэрэнгүй агуулга</span>
              <textarea
                name="body"
                rows={14}
                defaultValue={item.body}
                placeholder="Мэдээний бүрэн агуулга. Догол мөр хооронд хоосон мөр үлдээж бичнэ үү."
              />
              <span className="admin-hint">
                Дэлгэрэнгүй хуудсанд харагдах гол агуулга. Хоосон мөрөөр догол мөр хуваагдана.
              </span>
            </label>
          </section>

          <section className="admin-section">
            <header className="admin-section__head">
              <h2>Гол зураг</h2>
              <p>Тохиромжтой харьцаа: 16:9. Хамгийн ихдээ 90MB.</p>
            </header>
            <ImageField
              name="image"
              fileName="image_file"
              initialPath={item.image}
              aspect="16:9"
              hint="Жнь: /project-office.jpg эсвэл бүрэн URL."
            />
          </section>
        </div>

        <aside className="admin-editor__side">
          <section className="admin-section admin-section--card">
            <header className="admin-section__head">
              <h2>Нийтлэх төлөв</h2>
            </header>
            <label className="admin-toggle">
              <input
                name="published"
                type="checkbox"
                defaultChecked={Boolean(item.published)}
              />
              <span className="admin-toggle__track" aria-hidden="true">
                <span className="admin-toggle__thumb" />
              </span>
              <span className="admin-toggle__text">
                <strong>Нийтлэгдсэн</strong>
                <small>Унтраавал зөвхөн админд харагдана.</small>
              </span>
            </label>
          </section>

          <section className="admin-section admin-section--card">
            <header className="admin-section__head">
              <h2>Огноо ба ангилал</h2>
            </header>

            <label className="admin-field">
              <span className="admin-field__label">
                Огноо <span className="admin-required" aria-hidden="true">*</span>
              </span>
              <input name="date" type="date" defaultValue={item.date} required />
              <span className="admin-hint">Хуудсанд харагдах нийтлэлийн огноо.</span>
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Ангилал</span>
              <input
                name="category"
                defaultValue={item.category}
                list="news-category-suggestions"
                placeholder="Жнь: Зөвлөмж"
              />
              <datalist id="news-category-suggestions">
                {CATEGORY_SUGGESTIONS.map((value) => (
                  <option key={value} value={value} />
                ))}
              </datalist>
              <span className="admin-hint">Жагсаалтаас сонгох эсвэл шинэ ангилал бичих.</span>
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Дараалал</span>
              <input
                name="sort_order"
                type="number"
                defaultValue={item.sort_order}
                min={0}
              />
              <span className="admin-hint">Жижиг тоо эхэнд харагдана (0 = автомат).</span>
            </label>
          </section>

          {!isNew && (
            <section className="admin-section admin-section--card admin-section--danger">
              <header className="admin-section__head">
                <h2>⚠ Аюултай үйлдэл</h2>
                <p>Устгасан мэдээг буцаах боломжгүй.</p>
              </header>
              <button
                type="submit"
                formAction={deleteNews.bind(null, item.id)}
                className="admin-danger admin-danger--full"
              >
                Энэ мэдээг устгах
              </button>
            </section>
          )}
        </aside>
      </div>
    </form>
  );
}
