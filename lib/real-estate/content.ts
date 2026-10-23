// Oigon Numrug Properties — танилцуулгын сайтын бүх контент.
// Текст, зураг, төсөл өөрчлөх бол энэ файлыг засаад push хийнэ (DB, admin байхгүй).
// Зургууд public/ хавтсанд байна (жишээ нь "/project-office.jpg").

import type {
  RealEstateFloorPlan,
  RealEstateMilestone,
  RealEstateProject,
  RealEstateService,
  RealEstateStat,
} from "./content-types";

export type {
  RealEstateFloorPlan,
  RealEstateMilestone,
  RealEstateProject,
  RealEstateService,
  RealEstateStat,
};

export type HomeContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroLead: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;

  trust1Label: string;
  trust1Value: string;
  trust2Label: string;
  trust2Value: string;
  trust3Label: string;
  trust3Value: string;

  marketPill: string;
  marketTitle: string;
  marketRow1Label: string;
  marketRow1Value: string;
  marketRow1Delta: string;
  marketRow1Kind: "up" | "down";
  marketRow2Label: string;
  marketRow2Value: string;
  marketRow2Delta: string;
  marketRow2Kind: "up" | "down";
  marketRow3Label: string;
  marketRow3Value: string;
  marketRow3Delta: string;
  marketRow3Kind: "up" | "down";
  marketFooter: string;

  marqueeNames: string[];
  stats: RealEstateStat[];

  projectsEyebrow: string;
  projectsTitle: string;
  projectsDescription: string;

  ctaEyebrow: string;
  ctaTitleLine1: string;
  ctaTitleLine2: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type AboutValueItem = { title: string; body: string };

export type AboutContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  missionEyebrow: string;
  missionTitlePre: string;
  missionTitleEm: string;
  missionTitlePost: string;
  missionParagraph: string;
  missionChecklist: string[];

  valuesEyebrow: string;
  valuesTitle: string;
  valuesDescription: string;
  values: AboutValueItem[];

  milestones: RealEstateMilestone[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type ServicesProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type ServicesContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  items: Omit<RealEstateService, "id">[];

  processEyebrow: string;
  processTitle: string;
  processParagraph: string;
  processSteps: ServicesProcessStep[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export type ContactChannelKind = "phone" | "email" | "location";

export type ContactChannel = {
  kind: ContactChannelKind;
  label: string;
  value: string;
  detail: string;
  href: string;
  cta: string;
};

export type ContactContent = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  channels: ContactChannel[];
};

export const reStats: RealEstateStat[] = [
  { value: "120+", label: "Хүлээлгэн өгсөн төсөл" },
  { value: "12", label: "Жилийн туршлага" },
  { value: "3,400", label: "Сэтгэл хангалуун харилцагч" },
  { value: "₮48 тэрбум", label: "Гүйцэтгэсэн гүйлгээ" },
];

export function getProject(id: string): RealEstateProject | null {
  return projects.find((project) => project.id === id) ?? null;
}

export function getContactChannel(kind: ContactChannelKind): ContactChannel | undefined {
  return contactContent.channels.find((channel) => channel.kind === kind);
}

/** "#office" мэт хуудас доторх холбоосыг аль ч хуудаснаас ажиллахаар болгоно. */
export function channelHref(channel: ContactChannel) {
  return channel.href.startsWith("#") ? `/real-estate/contact${channel.href}` : channel.href;
}

export const projects: RealEstateProject[] = [
  {
    id: "skyline-residence",
    title: "Skyline Residence",
    type: "Премиум орон сууц",
    location: "Шинэ Дархан, 14-р баг",
    image: "/project-residence.jpg",
    status: "Шинээр зарагдаж байна",
    price: "₮ 3.6 сая / м²-ээс",
    size: "65 — 180 м²",
    summary: "Дархан хотын төвд байрлах 16 давхар, ил задгай тэнгэр харсан премиум орон сууцны цогцолбор.",
    longDescription: "Skyline Residence нь Шинэ Дарханы хамгийн өндөр бүсэд байрлах 16 давхар, 192 айлын премиум зэрэглэлийн орон сууцны цогцолбор юм. Барилгын фасадыг дулаалга-ханын систем, цас, салхинд тэсвэртэй гадуурх бүрхүүлээр шийдсэн ба өрөө бүр энерги хэмнэлттэй цонхтой. Цогцолборын төв атриумаас 7 хүрэлцэхүйц лифт ажиллаж, давхар бүрд нийтийн хоридор, гал унтраах систем, ухаалаг түгжээний шийдэл бүрэн нэвтрэгдсэн.",
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
      {
        id: "1br",
        label: "1 өрөө · 51 м²",
        rooms: "1 өрөө",
        area: "51 м²",
        image: "/floorplans/plan-1br.svg",
      },
      {
        id: "2br",
        label: "2 өрөө · 82.9 м²",
        rooms: "2 өрөө",
        area: "82.9 м²",
        image: "/floorplans/plan-2br.svg",
      },
      {
        id: "3br",
        label: "3 өрөө · 118.7 м²",
        rooms: "3 өрөө",
        area: "118.7 м²",
        image: "/floorplans/plan-3br.svg",
      },
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
    summary: "Дархан-Уул аймгийн төвд байрлах, инженерийн дэд бүтэц, ухаалаг хяналттай оффисын цогцолбор.",
    longDescription: "Civic Office Tower нь Дархан хотын төв байршилд барьсан 12 давхар, нийт 14,400 м² ашиглалтын талбайтай А зэрэглэлийн оффисын цогцолбор. Барилгын ил тод цэнхэр шилэн фасад, нээлттэй plan-table зохион байгуулалт, ухаалаг агаар сэлгэлт, хяналтын систем нь олон улсын стандартын шаардлагыг бүрэн хангана. 1-р давхарт зочлох талбай, кафе, 2-р давхарт хурлын байр түрээслэх боломжтой.",
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
      {
        id: "office-s",
        label: "S блок · 120 м²",
        rooms: "Open-plan",
        area: "120 м²",
        image: "/floorplans/plan-studio.svg",
      },
      {
        id: "office-m",
        label: "M блок · 240 м²",
        rooms: "2 хэсэг",
        area: "240 м²",
        image: "/floorplans/plan-2br.svg",
      },
      {
        id: "office-l",
        label: "L блок · 480 м²",
        rooms: "Бүхэл давхар",
        area: "480 м²",
        image: "/floorplans/plan-3br.svg",
      },
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
    summary: "Гэр бүлд зориулсан, нийтийн талбай, цэцэрлэгт хүрээлэн, сургуультай Дархан хотын хотхон.",
    longDescription: "Garden Village нь Орхон голын эргийн дагуу 14 га талбайд барьсан, 180 айлын зөвхөн гэр бүлд зориулсан хотхон. Хотхон дотроо 1-р ангиас 5-р анги хүртэлх сургууль, 120 хүүхдийн цэцэрлэг, 6 ширхэг цэцэрлэгт хүрээлэн, эмчилгээний цэгтэй.",
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
      {
        id: "village-3br",
        label: "Type A · 3 өрөө",
        rooms: "3 өрөө",
        area: "118.7 м²",
        image: "/floorplans/plan-3br.svg",
      },
      {
        id: "village-4br",
        label: "Type B · 4 өрөө",
        rooms: "4 өрөө",
        area: "162.8 м²",
        image: "/floorplans/plan-4br.svg",
      },
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
    summary: "Дэлгүүр, оффис, орон сууцыг нэгтгэсэн Дархан хотын төв байрлалын холимог зориулалттай төсөл.",
    longDescription: "Darkhan Plaza нь Хуучин Дарханы 6-р багт байрлах, 1-2 давхарт дэлгүүр, ресторан, 3-5 давхарт оффис, 6-12 давхарт орон сууц багтсан 12 давхар холимог зориулалттай цогцолбор.",
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
      {
        id: "plaza-studio",
        label: "Студи айл · 41.8 м²",
        rooms: "Студи",
        area: "41.8 м²",
        image: "/floorplans/plan-studio.svg",
      },
      {
        id: "plaza-1br",
        label: "1 өрөө айл · 51 м²",
        rooms: "1 өрөө",
        area: "51 м²",
        image: "/floorplans/plan-1br.svg",
      },
      {
        id: "plaza-2br",
        label: "2 өрөө айл · 82.9 м²",
        rooms: "2 өрөө",
        area: "82.9 м²",
        image: "/floorplans/plan-2br.svg",
      },
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
    summary: "Дэд бүтэц бэлэн болсон Шинэ Дарханы шинэ хорооллын дунд зэрэглэлийн орон сууцны төсөл.",
    longDescription: "Northern Heights нь Шинэ Дарханы 11-р багт барьсан 9 давхар, 144 айлын дунд зэрэглэлийн орон сууцны төсөл.",
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
      {
        id: "nh-1br",
        label: "1 өрөө · 51 м²",
        rooms: "1 өрөө",
        area: "51 м²",
        image: "/floorplans/plan-1br.svg",
      },
      {
        id: "nh-2br",
        label: "2 өрөө · 82.9 м²",
        rooms: "2 өрөө",
        area: "82.9 м²",
        image: "/floorplans/plan-2br.svg",
      },
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
    summary: "Орхон голын эргийн дагуу барьсан, Дархан хотын хязгаарлагдмал тооны эксклюзив орон сууц.",
    longDescription: "Lakeside Residences нь Орхон голын эргийн дагуу барьсан 6 давхар, нийт 48 айл бүхий эксклюзив зэрэглэлийн орон сууцны цогцолбор.",
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
    gallery: [
      "/project-garden.jpg",
      "/project-residence.jpg",
      "/real-estate-bg.jpg",
      "/project-office.jpg",
    ],
    floorPlans: [
      {
        id: "lake-3br",
        label: "Type A · 3 өрөө",
        rooms: "3 өрөө",
        area: "118.7 м²",
        image: "/floorplans/plan-3br.svg",
      },
      {
        id: "lake-4br",
        label: "Type B · 4 өрөө · Penthouse",
        rooms: "4 өрөө + Penthouse",
        area: "162.8 м²",
        image: "/floorplans/plan-4br.svg",
      },
    ],
  },
];

export const homeContent: HomeContent = {
  heroImage: "/real-estate-bg.jpg",
  heroEyebrow: "Oigon Numrug Properties · Real Estate Advisory",
  heroTitlePre: "Үл хөдлөх хөрөнгийн",
  heroTitleEm: "үнэ цэнийг",
  heroTitlePost: "мэдрэмжтэй, мэдээлэлтэй удирддаг түнш.",
  heroLead: "12 жил, 120+ төсөл, 3,400+ харилцагч. Бид орон сууц, оффис болон арилжааны хөрөнгөд зориулсан зах зээлийн судалгаа, маркетинг, зуучлал ба хөрөнгө оруулалтын зөвлөгөөг нэг цэгээс хүргэдэг.",
  heroPrimaryLabel: "Онцлох төслүүд",
  heroPrimaryHref: "/real-estate/projects",
  heroSecondaryLabel: "Бидний тухай",
  heroSecondaryHref: "/real-estate/about",
  trust1Label: "Зах зээлд",
  trust1Value: "12 жил",
  trust2Label: "Гүйцэтгэсэн төсөл",
  trust2Value: "120+",
  trust3Label: "Зөвлөгөөний цаг",
  trust3Value: "24/7",
  marketPill: "Зах зээлийн товч · 2026 II сар",
  marketTitle: "Дархан хотын зах зээл",
  marketRow1Label: "Орон сууцны үнэ",
  marketRow1Value: "3.2 сая ₮/м²",
  marketRow1Delta: "▲ 6.8%",
  marketRow1Kind: "up",
  marketRow2Label: "А зэрэглэлийн оффис түрээс",
  marketRow2Value: "41,200 ₮/м²",
  marketRow2Delta: "▲ 4.2%",
  marketRow2Kind: "up",
  marketRow3Label: "Газрын дундаж үнэ",
  marketRow3Value: "620,000 ₮/м²",
  marketRow3Delta: "▼ 0.9%",
  marketRow3Kind: "down",
  marketFooter: "Эх сурвалж — манай дотоод судалгаа",
  marqueeNames: [
    "Skyline Residence",
    "Civic Office Tower",
    "Garden Village",
    "Darkhan Plaza",
    "Northern Heights",
    "Lakeside Residences",
    "Capital Park",
  ],
  stats: [
    {
      value: "120+",
      label: "Хүлээлгэн өгсөн төсөл",
    },
    {
      value: "12",
      label: "Жилийн туршлага",
    },
    {
      value: "3,400",
      label: "Сэтгэл хангалуун харилцагч",
    },
    {
      value: "₮48 тэрбум",
      label: "Гүйцэтгэсэн гүйлгээ",
    },
  ],
  projectsEyebrow: "Онцлох портфолио",
  projectsTitle: "Хамтран ажиллаж буй сонгомол төслүүд",
  projectsDescription: "Бид төслийг зах зээлд эрсдэлгүй байршуулах, дуусгахаас өмнө борлуулалтыг хурдасгахад мэргэшсэн.",
  ctaEyebrow: "Холбоо барих",
  ctaTitleLine1: "Төслөө зөв байршуулах,",
  ctaTitleLine2: "шийдвэрээ итгэлтэй гаргах цаг.",
  ctaDescription: "Эхний 30 минутын зөвлөгөөг үнэ төлбөргүй хүргэнэ — таны зорилго, боломж, хязгаарлалтыг сонсож, дараагийн алхамыг тодорхой төлөвлөж өгнө.",
  ctaPrimaryLabel: "Зөвлөгөө захиалах",
  ctaPrimaryHref: "/real-estate/contact",
  ctaSecondaryLabel: "Бидний тухай",
  ctaSecondaryHref: "/real-estate/about",
};

export const aboutContent: AboutContent = {
  heroImage: "/project-garden.jpg",
  heroEyebrow: "Бидний тухай",
  heroTitlePre: "Тоо баримттай, зах зээлд тулгуурласан,",
  heroTitleEm: "хүн төвтэй зөвлөгөө.",
  heroTitlePost: "",
  heroDescription: "Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн шийдвэрийг бодит мэдээлэл, ил тод үйл явцаар дэмждэг хараат бус зөвлөх баг.",
  missionEyebrow: "Бидний эрхэм зорилго",
  missionTitlePre: "Хүний хамгийн чухал шийдвэрийг",
  missionTitleEm: "тайван, итгэлтэй болгох.",
  missionTitlePost: "",
  missionParagraph: "Үл хөдлөх хөрөнгө бол ихэнх хүний амьдралд хийдэг хамгийн том хөрөнгө оруулалт. Бид энэ шийдвэрийг таны өмнөөс хийдэггүй — харин зөв сонголтыг бие даан хийхэд тань хэрэгтэй мэдээлэл, шинжилгээ, дэмжлэгийг өгдөг.",
  missionChecklist: [
    "Ил тод үнэлгээ ба бие даасан судалгаа",
    "Зорилтот зах зээлд тулгуурласан маркетинг",
    "Гэрээ, шилжүүлгийн эрх зүйн дэмжлэг",
    "Хөрөнгө оруулалтын дараах ашиглалтын зөвлөгөө",
  ],
  valuesEyebrow: "Бидний үнэт зүйлс",
  valuesTitle: "Юу биднийг ялгаатай болгож байна вэ",
  valuesDescription: "4 үндсэн зарчим биднийг өдөр тутмын шийдвэрт чиглүүлдэг. Энэ нь манай харилцагч, түнш, төслийн эздэд ялгаа авчирдаг гол шалтгаан юм.",
  values: [
    {
      title: "Ил тод байдал",
      body: "Бид үнэлгээ, гэрээний нөхцөл, мөнгөн гүйлгээний бүх алхамыг тодорхой бичигдсэн байх ёстой гэж үздэг.",
    },
    {
      title: "Тоо баримтанд тулгуурла",
      body: "Бид зөвхөн зөн совин дээр шийдвэр гаргуулдаггүй — зах зээлийн өгөгдөл, харьцуулсан судалгаа дээр тулгуурлана.",
    },
    {
      title: "Урт хугацааны харилцаа",
      body: "Нэг удаагийн гэрээ биш — олон жилийн портфолиогийн хамт өсөж буй харилцагч, төслийн эзэдтэй ажиллана.",
    },
    {
      title: "Хараат бус зөвлөгөө",
      body: "Бид аль нэг төсөлд харьяалагдалгүй, харилцагчийн талын төлөөлөл болж ажиллана.",
    },
  ],
  milestones: [
    {
      year: "2014",
      text: "Үүсгэн байгуулагдсан, эхний борлуулалтын баг",
    },
    {
      year: "2017",
      text: "Анхны хотхоны төсөл маркетингийн хамтрал",
    },
    {
      year: "2020",
      text: "Дижитал зуучлалын платформоо нэвтрүүлсэн",
    },
    {
      year: "2024",
      text: "100+ төсөлд оролцож, бүсчилсэн үйлчилгээтэй болсон",
    },
    {
      year: "2026",
      text: "Хөрөнгийн зөвлөх үйлчилгээгээ өргөжүүлж байна",
    },
  ],
  ctaEyebrow: "Бидэнтэй хамтран ажиллах",
  ctaTitle: "Бидний тухай илүү ихийг сонсох уу?",
  ctaParagraph: "Танай төсөл, эсвэл хувийн шийдвэрт зориулсан 30 минутын үнэ төлбөргүй зөвлөгөө захиалаарай.",
  ctaPrimaryLabel: "Уулзалт товлох",
  ctaPrimaryHref: "/real-estate/contact",
  ctaSecondaryLabel: "Төслүүдийг үзэх",
  ctaSecondaryHref: "/real-estate/projects",
};

export const servicesContent: ServicesContent = {
  heroImage: "/project-office.jpg",
  heroEyebrow: "Үйлчилгээ",
  heroTitlePre: "Төслийн санаанаас",
  heroTitleEm: "хүлээлгэн өгөх",
  heroTitlePost: "хүртэлх дэмжлэг",
  heroDescription: "4 үндсэн чиглэл нэгдсэн стратегиэр ажилладаг. Захиалга бүрт зориулсан баг, оролцоо, тайлагналт.",
  items: [
    {
      title: "Борлуулалт ба түрээсийн зуучлал",
      description: "Зорилтот зах зээл, үнийн стратегиар хүлээлгэн өгөх хүртэлх бүх явцыг нэг цэгээс удирдана.",
      points: ["Үнэлгээ, үнийн судалгаа", "Зорилтот харилцагчид хүрэх", "Гэрээ, шилжүүлгийн зөвлөгөө"],
    },
    {
      title: "Төслийн маркетингийн байршуулалт",
      description: "Барилгын төслийг зах зээлд танигдсан, үнэ цэнэтэй брэнд болгон төлөвлөж байршуулна.",
      points: ["Брэнд платформ", "Дижитал кампанит ажил", "Үзвэр, нээлтийн зохион байгуулалт"],
    },
    {
      title: "Хөрөнгийн зөвлөгөө, портфолио",
      description: "Хувийн болон институцийн хөрөнгө оруулагчдад зориулсан үл хөдлөх портфолиогийн стратеги.",
      points: ["Эрсдэлийн шинжилгээ", "Орлогын төсөөлөл", "Гарах стратеги"],
    },
    {
      title: "Үнэлгээ ба зах зээлийн судалгаа",
      description: "Гэрээ, зээл, татварын зориулалтаар ашиглах боломжтой бие даасан үнэлгээний тайлан.",
      points: ["Харьцуулсан үнэлгээ", "Орлогын аргачлал", "Зах зээлийн прогноз"],
    },
  ],
  processEyebrow: "Үйл явц",
  processTitle: "Бид хэрхэн ажилладаг вэ",
  processParagraph: "Эхний уулзалтаас хүлээлгэн өгөх хүртэлх дөрвөн алхамт явц. Үе шат бүрд та юу хүлээж авах, бид юу гүйцэтгэхээ урьдчилан тохироно.",
  processSteps: [
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
  ],
  ctaEyebrow: "Эхлэх",
  ctaTitle: "Аль үйлчилгээ тань хэрэгтэй вэ?",
  ctaParagraph: "Бид эхний уулзалт дээр тань хамгийн тохиромжтой хувилбарыг тодорхойлоход туслана.",
  ctaPrimaryLabel: "Зөвлөгөө захиалах",
  ctaPrimaryHref: "/real-estate/contact",
  ctaSecondaryLabel: "Төслүүдийг үзэх",
  ctaSecondaryHref: "/real-estate/projects",
};

export const contactContent: ContactContent = {
  heroImage: "",
  heroEyebrow: "Холбоо барих",
  heroTitlePre: "Бид тантай",
  heroTitleEm: "хэдэн минутын",
  heroTitlePost: "дотор холбогдоно.",
  heroDescription: "Утсаар, и-мэйлээр, эсвэл оффис дээр ирж уулзаж болно. Аль ч сувгаар хандсан таны хэрэгцээ, асуултанд хариу өгөхөд бэлэн.",
  channels: [
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
  ],
};
