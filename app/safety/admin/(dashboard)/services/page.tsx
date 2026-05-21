import Link from "next/link";
import { listSafetyServices } from "@/lib/safety/content";
import { deleteService } from "../../actions";

export const dynamic = "force-dynamic";

export default function SafetyAdminServicesPage() {
  const services = listSafetyServices(true);

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Services</p>
          <h1>Үйлчилгээ</h1>
        </div>
        <Link href="/safety/admin/services/new" className="admin-primary">
          Үйлчилгээ нэмэх
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-table">
          {services.map((item) => (
            <div className="admin-row" key={item.id}>
              <span>{item.icon}</span>
              <Link href={`/safety/admin/services/${item.id}`}>
                <strong>{item.title}</strong>
              </Link>
              <em>{item.active ? "Идэвхтэй" : "Нуусан"}</em>
              <form action={deleteService.bind(null, item.id)}>
                <button className="admin-danger" type="submit">
                  Устгах
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
