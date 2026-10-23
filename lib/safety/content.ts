// Oigon Numrug ХАБЭА — танилцуулгын сайтын бүх контент.
// Текст, мэдээ, үйлчилгээ өөрчлөх бол энэ файлыг засаад push хийнэ (DB, admin байхгүй).
// Зургууд public/ хавтсанд байна (жишээ нь "/safety-bg.jpg").

export type SafetyPageSlug = "home" | "news" | "about" | "services" | "contact";

export type SafetyPage = {
  hero_tag: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  hero_image: string;
  section_tag: string;
  section_title: string;
  section_highlight: string;
  section_description: string;
  body: string;
  visual_image: string;
  primary_button_text: string;
  primary_button_href: string;
};

export type SafetyWeather = {
  weatherIcon: string;
  weatherCity: string;
  weatherTemp: string;
  weatherCondition: string;
  weatherWind: string;
  weatherHumidity: string;
};

export type SafetyNews = {
  id: number;
  /** YYYY-MM-DD */
  date: string;
  category: string;
  title: string;
  description: string;
  /** Дэлгэрэнгүй текст; догол мөрүүдийг хоосон мөрөөр (\n\n) тусгаарлана. */
  body: string;
  image: string;
};

export type SafetyService = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type SafetySettings = {
  nav_logo: string;
  footer_logo: string;
  footer_text: string;
  contact_phone: string;
  contact_phone_note: string;
  contact_email: string;
  contact_email_note: string;
  contact_address: string;
  contact_address_note: string;
};

/** Мэдээг шинэ нь эхэндээ байхаар эрэмбэлнэ. */
export function listSafetyNews(limit?: number) {
  const sorted = [...safetyNews].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getSafetyNews(id: number) {
  return safetyNews.find((news) => news.id === id);
}

export const safetySettings: SafetySettings = {
  nav_logo: "/safety-logo-hab.png",
  footer_logo: "/safety-logo-hab.png",
  footer_text: "© 2025 Oigon Numrug HABEA. Safety First - Integrity Always.",
  contact_phone: "+976 8800 0000",
  contact_phone_note: "Ажлын цагаар холбогдоно уу.",
  contact_email: "safety@oigonnumrug.mn",
  contact_email_note: "Бид 24 цагийн дотор хариулах болно.",
  contact_address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
  contact_address_note: "Ойгон Нөмрөг Төв байр",
};

export const safetyPages: Record<SafetyPageSlug, SafetyPage> = {
  home: {
    hero_tag: "",
    hero_title: "Аюулгүй байдлын",
    hero_highlight: "стандарт тогтооно",
    hero_description: "Бид олон улсын стандартын дагуу ажлын байрны эрсдэлийг бууруулж, хамгаалалтын дэвшилтэт соёлыг таны байгууллагад нутагшуулна.",
    hero_image: "/safety-bg.jpg",
    section_tag: "Мэдээ мэдээлэл",
    section_title: "Сүүлийн үеийн",
    section_highlight: "онцлох",
    section_description: "",
    body: "",
    visual_image: "",
    primary_button_text: "Бүх үйлчилгээ",
    primary_button_href: "/safety/services",
  },
  news: {
    hero_tag: "Мэдээ мэдээлэл",
    hero_title: "Сүүлийн үеийн",
    hero_highlight: "мэдээлэл",
    hero_description: "",
    hero_image: "/safety-bg.jpg",
    section_tag: "",
    section_title: "",
    section_highlight: "",
    section_description: "",
    body: "",
    visual_image: "",
    primary_button_text: "",
    primary_button_href: "",
  },
  about: {
    hero_tag: "Бидний тухай",
    hero_title: "Мэргэжлийн",
    hero_highlight: "хандлага",
    hero_description: "",
    hero_image: "/project-office.jpg",
    section_tag: "Бидний түүх",
    section_title: "Таны аюулгүй байдал",
    section_highlight: "Бидний хариуцлага",
    section_description: "",
    body: "Ойгон Нөмрөг ХАБЭА нь байгууллагын аюулгүй ажиллагааны тогтолцоог сайжруулах, эрсдэлийг урьдчилан таамаглах, хянах чиглэлээр мэргэшсэн баг хамт олон юм.",
    visual_image: "/project-office.jpg",
    primary_button_text: "",
    primary_button_href: "",
  },
  services: {
    hero_tag: "Манай үйлчилгээ",
    hero_title: "Аюулгүй байдлын",
    hero_highlight: "цогц шийдэл",
    hero_description: "",
    hero_image: "/project-garden.jpg",
    section_tag: "Үйлчилгээнүүд",
    section_title: "Бид юу",
    section_highlight: "хийж чадах вэ?",
    section_description: "",
    body: "",
    visual_image: "",
    primary_button_text: "",
    primary_button_href: "",
  },
  contact: {
    hero_tag: "Холбоо барих",
    hero_title: "Бидэнтэй",
    hero_highlight: "холбогдоно уу",
    hero_description: "",
    hero_image: "/real-estate-bg.jpg",
    section_tag: "Мэдээлэл",
    section_title: "Шуурхай",
    section_highlight: "холбоо барих",
    section_description: "Та аюулгүй ажиллагааны зөвлөгөө авах эсвэл хамтран ажиллах хүсэлтээ илгээнэ үү.",
    body: "",
    visual_image: "",
    primary_button_text: "",
    primary_button_href: "",
  },
};

export const safetyHomeWeather: SafetyWeather = {
  weatherIcon: "🌤️",
  weatherCity: "Дархан хот",
  weatherTemp: "+18°C",
  weatherCondition: "Цэлмэг, бага зэргийн үүлтэй",
  weatherWind: "Салхи: 4 м/с",
  weatherHumidity: "Чийгшил: 45%",
};

export const safetyAboutFeatures: string[] = [
  "Олон улсын стандарт (ISO 45001)",
  "Мэргэжлийн багаж, тоног төхөөрөмж",
  "Эрсдэлийн бодит үнэлгээ, шинжилгээ",
];

export const safetyNews: SafetyNews[] = [
  {
    id: 1,
    date: "2026-05-15",
    category: "Зөвлөмж",
    title: "ХАБЭА-н шинэ стандарт хэрэгжиж эхэллээ",
    description: "Олон улсын ISO 45001 стандартын хүрээнд байгууллагууд юуг анхаарах хэрэгтэй вэ? Шинэ стандарт нь хөдөлмөрийн аюулгүй байдлыг сайжруулах зорилготой.",
    body: "",
    image: "/project-office.jpg",
  },
  {
    id: 2,
    date: "2026-05-10",
    category: "Сургалт",
    title: "Өндөрт ажиллах үеийн эрсдэлээс сэргийлэх нь",
    description: "Барилгын талбайд өндөрт ажиллах үеийн ослын шалтгаан, түүнээс урьдчилан сэргийлэх арга замуудын талаарх дэлгэрэнгүй зөвлөгөө.",
    body: "",
    image: "/safety-bg.jpg",
  },
  {
    id: 3,
    date: "2026-05-02",
    category: "Үйл явдал",
    title: "Галын аюулгүй байдлын сургалт амжилттай боллоо",
    description: "Өнгөрсөн 7 хоногт зохион байгуулагдсан галын аюулаас урьдчилан сэргийлэх практик сургалтын тайлан. Сургалтад 50 гаруй ажилтан хамрагдсан.",
    body: "",
    image: "/real-estate-bg.jpg",
  },
  {
    id: 4,
    date: "2026-04-28",
    category: "Зөвлөмж",
    title: "Ажлын байрны стресс ба ХАБЭА",
    description: "Ажилтны сэтгэл зүйн эрүүл мэнд ажлын бүтээмжид хэрхэн нөлөөлөх вэ? Стрессийг бууруулах аргууд болон нөлөөлөл.",
    body: "",
    image: "/project-office.jpg",
  },
  {
    id: 5,
    date: "2026-04-20",
    category: "Сургалт",
    title: "Анхны тусламж үзүүлэх чадварыг сайжруулах",
    description: "Ажлын байранд осол гарсан үед үзүүлэх анхны тусламжийн 5 чухал алхам болон шаардлагатай мэдлэгүүд.",
    body: "",
    image: "/safety-bg.jpg",
  },
  {
    id: 6,
    date: "2026-04-15",
    category: "Үйл явдал",
    title: "Шинэ ажилтнуудад зориулсан ХАБЭА өдөрлөг",
    description: "Компанид шинээр орсон ажилтнуудад зориулсан хөдөлмөрийн аюулгүй байдлын анхан шатны танилцуулга өдөрлөг амжилттай болж өндөрлөлөө.",
    body: "",
    image: "/real-estate-bg.jpg",
  },
];

export const safetyServices: SafetyService[] = [
  {
    id: 1,
    title: "Ажлын байрны эрсдэлийн үнэлгээ",
    description: "Ажлын байрны аюулгүй нөхцөлийг бүрэн шинжилж, эрсдэлийг тодорхойлно.",
    icon: "📋",
    color: "#e67e22",
  },
  {
    id: 2,
    title: "Аюулгүй байдлын сургалт ба сертификат",
    description: "Олон улсын стандартад нийцсэн сургалт, сертификатын хөтөлбөрүүд.",
    icon: "🎓",
    color: "#2980b9",
  },
  {
    id: 3,
    title: "Ажлын байрны аудит ба шинжилгээ",
    description: "Тогтмол хяналт шалгалт, дүн шинжилгээ, тайлан гаргах үйлчилгээ.",
    icon: "🔍",
    color: "#27ae60",
  },
  {
    id: 4,
    title: "Эрүүлжүүлэлтийн хамтын ажиллагаа",
    description: "Ажилчдын эрүүл мэнд, сэтгэл зүйн дэмжлэг, хамтын ажиллагаа.",
    icon: "🤝",
    color: "#8e44ad",
  },
];
