import type { RealEstateProject } from "./content-types";

export const DEFAULT_RE_CONTACT_SETTINGS: Record<string, string> = {
  contact_hero_image: "",
  contact_hero_eyebrow: "Холбоо барих",
  contact_hero_title_pre: "Бид тантай",
  contact_hero_title_em: "хэдэн минутын",
  contact_hero_title_post: "дотор холбогдоно.",
  contact_hero_description:
    "Утсаар, и-мэйлээр, эсвэл оффис дээр ирж уулзаж болно. Аль ч сувгаар хандсан таны хэрэгцээ, асуултанд хариу өгөхөд бэлэн.",

  contact_channels_json: JSON.stringify([
    {
      kind: "phone",
      label: "Утсаар холбогдох",
      value: "+976 0000 0000",
      detail: "Даваа — Баасан, 09:00 — 19:00",
      href: "tel:+97600000000",
      cta: "Залгах",
    },
    {
      kind: "email",
      label: "И-мэйл илгээх",
      value: "info@oigonnumrug.mn",
      detail: "Ажлын 24 цагт хариу өгнө.",
      href: "mailto:info@oigonnumrug.mn",
      cta: "И-мэйл бичих",
    },
    {
      kind: "location",
      label: "Очиж уулзах",
      value: "Дархан хот, 14-р баг",
      detail: "Энэрэлийн гудамж 12, 4-р давхар",
      href: "#office",
      cta: "Газрын зураг",
    },
  ]),

};

export const DEFAULT_RE_SERVICES_SETTINGS: Record<string, string> = {
  services_hero_image: "",
  services_hero_eyebrow: "Үйлчилгээ",
  services_hero_title_pre: "Төслийн санаанаас",
  services_hero_title_em: "хүлээлгэн өгөх",
  services_hero_title_post: "хүртэлх дэмжлэг",
  services_hero_description:
    "4 үндсэн чиглэл нэгдсэн стратегиэр ажилладаг. Захиалга бүрт зориулсан баг, оролцоо, тайлагналт.",

  services_list_json: JSON.stringify([
    {
      title: "Борлуулалт ба түрээсийн зуучлал",
      description:
        "Зорилтот зах зээл, үнийн стратегиар хүлээлгэн өгөх хүртэлх бүх явцыг нэг цэгээс удирдана.",
      points: [
        "Үнэлгээ, үнийн судалгаа",
        "Зорилтот харилцагчид хүрэх",
        "Гэрээ, шилжүүлгийн зөвлөгөө",
      ],
    },
    {
      title: "Төслийн маркетингийн байршуулалт",
      description:
        "Барилгын төслийг зах зээлд танигдсан, үнэ цэнэтэй брэнд болгон төлөвлөж байршуулна.",
      points: ["Брэнд платформ", "Дижитал кампанит ажил", "Үзвэр, нээлтийн зохион байгуулалт"],
    },
    {
      title: "Хөрөнгийн зөвлөгөө, портфолио",
      description:
        "Хувийн болон институцийн хөрөнгө оруулагчдад зориулсан үл хөдлөх портфолиогийн стратеги.",
      points: ["Эрсдэлийн шинжилгээ", "Орлогын төсөөлөл", "Гарах стратеги"],
    },
    {
      title: "Үнэлгээ ба зах зээлийн судалгаа",
      description:
        "Гэрээ, зээл, татварын зориулалтаар ашиглах боломжтой бие даасан үнэлгээний тайлан.",
      points: ["Харьцуулсан үнэлгээ", "Орлогын аргачлал", "Зах зээлийн прогноз"],
    },
  ]),

  services_process_eyebrow: "Үйл явц",
  services_process_title: "Бид хэрхэн ажилладаг вэ",
  services_process_paragraph:
    "Эхний уулзалтаас хүлээлгэн өгөх хүртэлх дөрвөн алхамт явц. Үе шат бүрд та юу хүлээж авах, бид юу гүйцэтгэхээ урьдчилан тохироно.",

  services_process_json: JSON.stringify([
    {
      step: "01",
      title: "Танилцах уулзалт",
      body: "Зорилго, нөхцөл, хязгаарлалтыг сонсож, хэрэгцээг тодорхойлно. Үнэ төлбөргүй.",
    },
    {
      step: "02",
      title: "Судалгаа ба санал",
      body: "Зах зээлийн өгөгдөл дээр тулгуурлан стратеги, хугацаа, төсөвт нийцсэн санал гаргана.",
    },
    {
      step: "03",
      title: "Гэрээ ба гүйцэтгэл",
      body: "Эрх зүйн ил тод гэрээ үндсэн дээр баг хуваарилж, ажлыг үе шаттай гүйцэтгэнэ.",
    },
    {
      step: "04",
      title: "Үр дүн ба дараах дэмжлэг",
      body: "Гэрээ хаалт, шилжүүлгийн дараа ашиглалт, портфолиогийн зөвлөгөөг үргэлжлүүлнэ.",
    },
  ]),

  services_cta_eyebrow: "Эхлэх",
  services_cta_title: "Аль үйлчилгээ тань хэрэгтэй вэ?",
  services_cta_paragraph:
    "Бид эхний уулзалт дээр тань хамгийн тохиромжтой хувилбарыг тодорхойлоход туслана.",
  services_cta_primary_label: "Зөвлөгөө захиалах",
  services_cta_primary_href: "/real-estate/contact",
  services_cta_secondary_label: "Төслүүдийг үзэх",
  services_cta_secondary_href: "/real-estate/projects",
};

export const DEFAULT_RE_ABOUT_SETTINGS: Record<string, string> = {
  about_hero_image: "",
  about_hero_eyebrow: "Бидний тухай",
  about_hero_title_pre: "Тоо баримттай, зах зээлд тулгуурласан,",
  about_hero_title_em: "хүн төвтэй зөвлөгөө.",
  about_hero_title_post: "",
  about_hero_description:
    "Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн шийдвэрийг бодит мэдээлэл, ил тод үйл явцаар дэмждэг хараат бус зөвлөх баг.",

  about_mission_eyebrow: "Бидний эрхэм зорилго",
  about_mission_title_pre: "Хүний хамгийн чухал шийдвэрийг",
  about_mission_title_em: "тайван, итгэлтэй болгох.",
  about_mission_title_post: "",
  about_mission_paragraph:
    "Үл хөдлөх хөрөнгө бол ихэнх хүний амьдралд хийдэг хамгийн том хөрөнгө оруулалт. Бид энэ шийдвэрийг таны өмнөөс хийдэггүй — харин зөв сонголтыг бие даан хийхэд тань хэрэгтэй мэдээлэл, шинжилгээ, дэмжлэгийг өгдөг.",
  about_mission_checklist_json: JSON.stringify([
    "Ил тод үнэлгээ ба бие даасан судалгаа",
    "Зорилтот зах зээлд тулгуурласан маркетинг",
    "Гэрээ, шилжүүлгийн эрх зүйн дэмжлэг",
    "Хөрөнгө оруулалтын дараах ашиглалтын зөвлөгөө",
  ]),

  about_values_eyebrow: "Бидний үнэт зүйлс",
  about_values_title: "Юу биднийг ялгаатай болгож байна вэ",
  about_values_description:
    "4 үндсэн зарчим биднийг өдөр тутмын шийдвэрт чиглүүлдэг. Энэ нь манай харилцагч, түнш, төслийн эздэд ялгаа авчирдаг гол шалтгаан юм.",
  about_values_json: JSON.stringify([
    {
      title: "Ил тод байдал",
      body:
        "Бид үнэлгээ, гэрээний нөхцөл, мөнгөн гүйлгээний бүх алхамыг тодорхой бичигдсэн байх ёстой гэж үздэг.",
    },
    {
      title: "Тоо баримтанд тулгуурла",
      body:
        "Бид зөвхөн зөн совин дээр шийдвэр гаргуулдаггүй — зах зээлийн өгөгдөл, харьцуулсан судалгаа дээр тулгуурлана.",
    },
    {
      title: "Урт хугацааны харилцаа",
      body:
        "Нэг удаагийн гэрээ биш — олон жилийн портфолиогийн хамт өсөж буй харилцагч, төслийн эзэдтэй ажиллана.",
    },
    {
      title: "Хараат бус зөвлөгөө",
      body:
        "Бид аль нэг төсөлд харьяалагдалгүй, харилцагчийн талын төлөөлөл болж ажиллана.",
    },
  ]),

  about_milestones_json: JSON.stringify([
    { year: "2014", text: "Үүсгэн байгуулагдсан, эхний борлуулалтын баг" },
    { year: "2017", text: "Анхны хотхоны төсөл маркетингийн хамтрал" },
    { year: "2020", text: "Дижитал зуучлалын платформоо нэвтрүүлсэн" },
    { year: "2024", text: "100+ төсөлд оролцож, бүсчилсэн үйлчилгээтэй болсон" },
    { year: "2026", text: "Хөрөнгийн зөвлөх үйлчилгээгээ өргөжүүлж байна" },
  ]),

  about_cta_eyebrow: "Бидэнтэй хамтран ажиллах",
  about_cta_title: "Бидний тухай илүү ихийг сонсох уу?",
  about_cta_paragraph:
    "Танай төсөл, эсвэл хувийн шийдвэрт зориулсан 30 минутын үнэ төлбөргүй зөвлөгөө захиалаарай.",
  about_cta_primary_label: "Уулзалт товлох",
  about_cta_primary_href: "/real-estate/contact",
  about_cta_secondary_label: "Төслүүдийг үзэх",
  about_cta_secondary_href: "/real-estate/projects",
};

export const DEFAULT_RE_HOME_SETTINGS: Record<string, string> = {
  home_hero_image: "/real-estate-bg.jpg",
  home_hero_eyebrow: "Oigon Numrug Properties · Real Estate Advisory",
  home_hero_title_pre: "Үл хөдлөх хөрөнгийн",
  home_hero_title_em: "үнэ цэнийг",
  home_hero_title_post: "мэдрэмжтэй, мэдээлэлтэй удирддаг түнш.",
  home_hero_lead:
    "12 жил, 120+ төсөл, 3,400+ харилцагч. Бид орон сууц, оффис болон арилжааны хөрөнгөд зориулсан зах зээлийн судалгаа, маркетинг, зуучлал ба хөрөнгө оруулалтын зөвлөгөөг нэг цэгээс хүргэдэг.",
  home_hero_cta_primary_label: "Онцлох төслүүд",
  home_hero_cta_primary_href: "/real-estate/projects",
  home_hero_cta_secondary_label: "Бидний тухай",
  home_hero_cta_secondary_href: "/real-estate/about",

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

  home_marquee_names_json: JSON.stringify([
    "Skyline Residence",
    "Civic Office Tower",
    "Garden Village",
    "Darkhan Plaza",
    "Northern Heights",
    "Lakeside Residences",
    "Capital Park",
  ]),

  home_stats_json: JSON.stringify([
    { value: "120+", label: "Хүлээлгэн өгсөн төсөл" },
    { value: "12", label: "Жилийн туршлага" },
    { value: "3,400", label: "Сэтгэл хангалуун харилцагч" },
    { value: "₮48 тэрбум", label: "Гүйцэтгэсэн гүйлгээ" },
  ]),

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


export const DEFAULT_RE_PROJECTS: RealEstateProject[] = [
  {
    id: "skyline-residence",
    title: "Skyline Residence",
    type: "Премиум орон сууц",
    location: "Шинэ Дархан, 14-р баг",
    image: "/project-residence.jpg",
    status: "Шинээр зарагдаж байна",
    price: "₮ 3.6 сая / м²-ээс",
    size: "65 — 180 м²",
    summary:
      "Дархан хотын төвд байрлах 16 давхар, ил задгай тэнгэр харсан премиум орон сууцны цогцолбор.",
    longDescription:
      "Skyline Residence нь Шинэ Дарханы хамгийн өндөр бүсэд байрлах 16 давхар, 192 айлын премиум зэрэглэлийн орон сууцны цогцолбор юм. Барилгын фасадыг дулаалга-ханын систем, цас, салхинд тэсвэртэй гадуурх бүрхүүлээр шийдсэн ба өрөө бүр энерги хэмнэлттэй цонхтой. Цогцолборын төв атриумаас 7 хүрэлцэхүйц лифт ажиллаж, давхар бүрд нийтийн хоридор, гал унтраах систем, ухаалаг түгжээний шийдэл бүрэн нэвтрэгдсэн.",
    developer: "Oigon Numrug Development",
    completion: "2027 II улирал",
    floors: "16 давхар",
    units: "192 айл",
    parking: "230 машины газар доорх зогсоол",
    highlights: [
      "Хотын төвөөс 5 минутын зайтай",
      "Тэнгэр харсан 360° үзэмж",
      "Дулаан тусгаарлалт А зэрэглэл",
      "24/7 хамгаалалт ба ухаалаг хяналт",
    ],
    amenities: [
      "Газар доорх зогсоол",
      "Биеийн тамирын танхим",
      "Хүүхдийн тоглоомын талбай",
      "Зочны хүлээлгийн өрөө",
      "Гадаа сэлгээний дээвэр",
      "EV цэнэглэх станц",
    ],
    gallery: [
      "/project-residence.jpg",
      "/real-estate-bg.jpg",
      "/project-office.jpg",
      "/project-garden.jpg",
    ],
    floorPlans: [
      { id: "1br", label: "1 өрөө · 51 м²", rooms: "1 өрөө", area: "51 м²", image: "/floorplans/plan-1br.svg" },
      { id: "2br", label: "2 өрөө · 82.9 м²", rooms: "2 өрөө", area: "82.9 м²", image: "/floorplans/plan-2br.svg" },
      { id: "3br", label: "3 өрөө · 118.7 м²", rooms: "3 өрөө", area: "118.7 м²", image: "/floorplans/plan-3br.svg" },
    ],
  },
  {
    id: "civic-office-tower",
    title: "Civic Office Tower",
    type: "А зэрэглэлийн оффис",
    location: "Дархан хотын төв",
    image: "/project-office.jpg",
    status: "Түрээсийн зуучлал",
    price: "₮ 42,000 / м² сар",
    size: "120 — 1,200 м²",
    summary:
      "Дархан-Уул аймгийн төвд байрлах, инженерийн дэд бүтэц, ухаалаг хяналттай оффисын цогцолбор.",
    longDescription:
      "Civic Office Tower нь Дархан хотын төв байршилд барьсан 12 давхар, нийт 14,400 м² ашиглалтын талбайтай А зэрэглэлийн оффисын цогцолбор. Барилгын ил тод цэнхэр шилэн фасад, нээлттэй plan-table зохион байгуулалт, ухаалаг агаар сэлгэлт, хяналтын систем нь олон улсын стандартын шаардлагыг бүрэн хангана. 1-р давхарт зочлох талбай, кафе, 2-р давхарт хурлын байр түрээслэх боломжтой.",
    developer: "Civic Development LLC",
    completion: "Ашиглалтад орсон (2024)",
    floors: "12 давхар",
    units: "Нийт 14,400 м² түрээслэгдэх талбай",
    parking: "180 машины зогсоол + зочдын талбай",
    highlights: [
      "А зэрэглэлийн инженерийн систем",
      "BREEAM Good сертификат",
      "Файбер интернэт + UPS",
      "Хурлын өрөө + ивээн тэтгэгчид зориулсан танхим",
    ],
    amenities: [
      "1-р давхарт кафе, банкны салбар",
      "Лоби, зочны хүлээлгэ",
      "Хурлын танхим (50 хүний)",
      "Машины зогсоол",
      "Цэвэрлэгээ, хүлээн авагчийн үйлчилгээ",
      "Гал унтраах автомат систем",
    ],
    gallery: ["/project-office.jpg", "/real-estate-bg.jpg", "/project-residence.jpg"],
    floorPlans: [
      { id: "office-s", label: "S блок · 120 м²", rooms: "Open-plan", area: "120 м²", image: "/floorplans/plan-studio.svg" },
      { id: "office-m", label: "M блок · 240 м²", rooms: "2 хэсэг", area: "240 м²", image: "/floorplans/plan-2br.svg" },
      { id: "office-l", label: "L блок · 480 м²", rooms: "Бүхэл давхар", area: "480 м²", image: "/floorplans/plan-3br.svg" },
    ],
  },
  {
    id: "garden-village",
    title: "Garden Village",
    type: "Гэр бүлийн хотхон",
    location: "Орхон голын эрэг, ногоон бүс",
    image: "/project-garden.jpg",
    status: "Зөвлөгөө + борлуулалт",
    price: "₮ 4.4 сая / м²-ээс",
    size: "110 — 240 м²",
    summary:
      "Гэр бүлд зориулсан, нийтийн талбай, цэцэрлэгт хүрээлэн, сургуультай Дархан хотын хотхон.",
    longDescription:
      "Garden Village нь Орхон голын эргийн дагуу 14 га талбайд барьсан, 180 айлын зөвхөн гэр бүлд зориулсан хотхон. Хотхон дотроо 1-р ангиас 5-р анги хүртэлх сургууль, 120 хүүхдийн цэцэрлэг, 6 ширхэг цэцэрлэгт хүрээлэн, эмчилгээний цэгтэй.",
    developer: "Green Habitat LLC",
    completion: "2026 IV улирал",
    floors: "2 — 3 давхар",
    units: "180 айл",
    parking: "Айл тус бүрд 2 зогсоол",
    highlights: [
      "Орхон голын эрэг рүү хардаг",
      "Хотхон дотор сургууль, цэцэрлэгтэй",
      "Хүүхэд найдвартай хаалттай хотхон",
      "Дэлгүүр, эмнэлэгийн цэг алхаа дотор",
    ],
    amenities: [
      "Хувийн цэцэрлэг",
      "Сургууль, цэцэрлэг",
      "Цэцэрлэгт хүрээлэн",
      "Спорт талбай",
      "Машины зогсоол",
      "24/7 хаалттай хамгаалалт",
    ],
    gallery: ["/project-garden.jpg", "/project-residence.jpg", "/real-estate-bg.jpg"],
    floorPlans: [
      { id: "village-3br", label: "Type A · 3 өрөө", rooms: "3 өрөө", area: "118.7 м²", image: "/floorplans/plan-3br.svg" },
      { id: "village-4br", label: "Type B · 4 өрөө", rooms: "4 өрөө", area: "162.8 м²", image: "/floorplans/plan-4br.svg" },
    ],
  },
  {
    id: "darkhan-plaza",
    title: "Darkhan Plaza",
    type: "Холимог зориулалт",
    location: "Хуучин Дархан, 6-р баг",
    image: "/real-estate-bg.jpg",
    status: "Маркетингийн байршуулалт",
    price: "₮ 3.9 сая / м²-ээс",
    size: "48 — 220 м²",
    summary:
      "Дэлгүүр, оффис, орон сууцыг нэгтгэсэн Дархан хотын төв байрлалын холимог зориулалттай төсөл.",
    longDescription:
      "Darkhan Plaza нь Хуучин Дарханы 6-р багт байрлах, 1-2 давхарт дэлгүүр, ресторан, 3-5 давхарт оффис, 6-12 давхарт орон сууц багтсан 12 давхар холимог зориулалттай цогцолбор.",
    developer: "Plaza Group",
    completion: "2027 III улирал",
    floors: "12 давхар",
    units: "120 айл + 28 оффис + 22 дэлгүүр",
    parking: "320 машины 3 давхар зогсоол",
    highlights: [
      "Худалдаа, ажил, амьдрал нэг газар",
      "Хуучин Дарханы төв байршил",
      "Метро автобусны буудалд ойр",
      "Том дэлгүүр + ресторан газардуулалт",
    ],
    amenities: [
      "Дэлгүүр, ресторан",
      "Олон давхарт зогсоол",
      "Оффисын хэсэг тусдаа орцтой",
      "Орон сууцны хэсгийн lobby",
      "Цэвэрлэгээ, аюулгүйн алба",
      "Лифт 6, шатны 4 хэсэг",
    ],
    gallery: ["/real-estate-bg.jpg", "/project-office.jpg", "/project-residence.jpg"],
    floorPlans: [
      { id: "plaza-studio", label: "Студи айл · 41.8 м²", rooms: "Студи", area: "41.8 м²", image: "/floorplans/plan-studio.svg" },
      { id: "plaza-1br", label: "1 өрөө айл · 51 м²", rooms: "1 өрөө", area: "51 м²", image: "/floorplans/plan-1br.svg" },
      { id: "plaza-2br", label: "2 өрөө айл · 82.9 м²", rooms: "2 өрөө", area: "82.9 м²", image: "/floorplans/plan-2br.svg" },
    ],
  },
  {
    id: "northern-heights",
    title: "Northern Heights",
    type: "Дунд зэрэглэлийн орон сууц",
    location: "Дархан, 11-р баг",
    image: "/project-residence.jpg",
    status: "Шинэ үе шат",
    price: "₮ 2.8 сая / м²-ээс",
    size: "55 — 130 м²",
    summary:
      "Дэд бүтэц бэлэн болсон Шинэ Дарханы шинэ хорооллын дунд зэрэглэлийн орон сууцны төсөл.",
    longDescription:
      "Northern Heights нь Шинэ Дарханы 11-р багт барьсан 9 давхар, 144 айлын дунд зэрэглэлийн орон сууцны төсөл.",
    developer: "North Build LLC",
    completion: "2026 III улирал",
    floors: "9 давхар",
    units: "144 айл",
    parking: "120 машины зогсоол",
    highlights: [
      "Хямд боловч чанартай",
      "Ипотек зээлд тэнцэх нөхцөл",
      "Сургууль, цэцэрлэг ойр",
      "Шинэ хорооллын дэд бүтэц бэлэн",
    ],
    amenities: [
      "Машины зогсоол",
      "Хүүхдийн тоглоомын талбай",
      "Дугуйны зогсоол",
      "Лифт 2",
      "Видео хяналтын систем",
    ],
    gallery: ["/project-residence.jpg", "/project-garden.jpg", "/real-estate-bg.jpg"],
    floorPlans: [
      { id: "nh-1br", label: "1 өрөө · 51 м²", rooms: "1 өрөө", area: "51 м²", image: "/floorplans/plan-1br.svg" },
      { id: "nh-2br", label: "2 өрөө · 82.9 м²", rooms: "2 өрөө", area: "82.9 м²", image: "/floorplans/plan-2br.svg" },
    ],
  },
  {
    id: "lakeside-residences",
    title: "Lakeside Residences",
    type: "Боттик орон сууц",
    location: "Дархан, Орхон голын эрэг",
    image: "/project-garden.jpg",
    status: "Эксклюзив зуучлал",
    price: "₮ 5.6 сая / м²-ээс",
    size: "90 — 320 м²",
    summary:
      "Орхон голын эргийн дагуу барьсан, Дархан хотын хязгаарлагдмал тооны эксклюзив орон сууц.",
    longDescription:
      "Lakeside Residences нь Орхон голын эргийн дагуу барьсан 6 давхар, нийт 48 айл бүхий эксклюзив зэрэглэлийн орон сууцны цогцолбор.",
    developer: "Premier Estates",
    completion: "2028 II улирал",
    floors: "6 давхар",
    units: "48 айл (хязгаарлагдмал)",
    parking: "Айл тус бүрд 2 зогсоол + хадгалах өрөө",
    highlights: [
      "Орхон голын ил үзэмж",
      "Хязгаарлагдмал 48 айл",
      "Хувийн террас",
      "Premium засал бэлтгэгдсэн",
    ],
    amenities: [
      "Хувийн зогсоол + хадгалах өрөө",
      "Concierge үйлчилгээ",
      "Биеийн тамирын танхим",
      "SPA, savana",
      "Зочны өрөө",
      "Үйлчилгээний автомат",
    ],
    gallery: ["/project-garden.jpg", "/project-residence.jpg", "/real-estate-bg.jpg", "/project-office.jpg"],
    floorPlans: [
      { id: "lake-3br", label: "Type A · 3 өрөө", rooms: "3 өрөө", area: "118.7 м²", image: "/floorplans/plan-3br.svg" },
      { id: "lake-4br", label: "Type B · 4 өрөө · Penthouse", rooms: "4 өрөө + Penthouse", area: "162.8 м²", image: "/floorplans/plan-4br.svg" },
    ],
  },
];
