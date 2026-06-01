import { DatabaseSync } from "node:sqlite";

const DEFAULTS = {
  home_hero_image: "/real-estate-bg.jpg",
  home_hero_eyebrow: "Oigon Numrug Properties · Real Estate Advisory",
  home_hero_title_pre: "Үл хөдлөх хөрөнгийн",
  home_hero_title_em: "үнэ цэнийг",
  home_hero_title_post: "мэдрэмжтэй, мэдээлэлтэй удирддаг түнш.",
  home_hero_lead:
    "12 жил, 120+ төсөл, 3,400+ харилцагч. Бид орон сууц, оффис болон арилжааны хөрөнгөд зориулсан зах зээлийн судалгаа, маркетинг, зуучлал ба хөрөнгө оруулалтын зөвлөгөөг нэг цэгээс хүргэдэг.",
  home_hero_cta_primary_label: "Онцлох төслүүд",
  home_hero_cta_primary_href: "/real-estate/projects",
  home_hero_cta_secondary_label: "Сүүлийн мэдээ",
  home_hero_cta_secondary_href: "/real-estate/news",
  home_trust_1_label: "Зах зээлд",
  home_trust_1_value: "12 жил",
  home_trust_2_label: "Гүйцэтгэсэн төсөл",
  home_trust_2_value: "120+",
  home_trust_3_label: "Зөвлөгөөний цаг",
  home_trust_3_value: "24/7",
  home_market_pill: "Зах зээлийн товч · 2026 II сар",
  home_market_title: "Дархан хотын зах зээл",
  home_market_row_1_label: "Орон сууцны үнэ",
  home_market_row_1_value: "3.2 сая ₮/м²",
  home_market_row_1_delta: "▲ 6.8%",
  home_market_row_1_kind: "up",
  home_market_row_2_label: "А зэрэглэлийн оффис түрээс",
  home_market_row_2_value: "41,200 ₮/м²",
  home_market_row_2_delta: "▲ 4.2%",
  home_market_row_2_kind: "up",
  home_market_row_3_label: "Газрын дундаж үнэ",
  home_market_row_3_value: "620,000 ₮/м²",
  home_market_row_3_delta: "▼ 0.9%",
  home_market_row_3_kind: "down",
  home_market_footer: "Эх сурвалж — манай дотоод судалгаа",
  home_projects_eyebrow: "Онцлох портфолио",
  home_projects_title: "Хамтран ажиллаж буй сонгомол төслүүд",
  home_projects_description:
    "Бид төслийг зах зээлд эрсдэлгүй байршуулах, дуусгахаас өмнө борлуулалтыг хурдасгахад мэргэшсэн.",
  home_cta_eyebrow: "Холбоо барих",
  home_cta_title_line1: "Төслөө зөв байршуулах,",
  home_cta_title_line2: "шийдвэрээ итгэлтэй гаргах цаг.",
  home_cta_description:
    "Эхний 30 минутын зөвлөгөөг үнэ төлбөргүй хүргэнэ — таны зорилго, боломж, хязгаарлалтыг сонсож, дараагийн алхамыг тодорхой төлөвлөж өгнө.",
  home_cta_primary_label: "Зөвлөгөө захиалах",
  home_cta_primary_href: "/real-estate/contact",
  home_cta_secondary_label: "Бидний тухай",
  home_cta_secondary_href: "/real-estate/about",
};

const db = new DatabaseSync("data/real-estate.db");
db.exec(`CREATE TABLE IF NOT EXISTS re_page_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);

const upsert = db.prepare(
  "INSERT INTO re_page_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO NOTHING"
);
let added = 0;
for (const [key, value] of Object.entries(DEFAULTS)) {
  const r = upsert.run(key, value);
  if (r.changes) added++;
}
console.log(`Seeded ${added} settings. Total keys: ${Object.keys(DEFAULTS).length}.`);
