// Ойгон Нөмрөг Properties — нэг хуудастай танилцуулгын сайтын бүх контент.
// Текст өөрчлөх бол энэ файлыг засаад push хийнэ (DB, admin байхгүй).
// Зургууд public/ хавтсанд байна (жишээ нь "/project-office.jpg").
// Мэдээллийн эх сурвалж: албан ёсны Facebook хуудас — facebook.com/OigonNumrugProperties

import type { RealEstateMilestone, RealEstateService, RealEstateStat } from "./content-types";

export type { RealEstateMilestone, RealEstateService, RealEstateStat };

/** Нүүр хуудасны хэсгүүд — цэс, footer эдгээр рүү гүйлгэнэ. */
export const sections = [
  { id: "about", label: "Бидний тухай" },
  { id: "services", label: "Үйлчилгээ" },
  { id: "contact", label: "Холбоо барих" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** "/real-estate#contact" мэт хэсэг рүү чиглэсэн холбоос. */
export const sectionHref = (id: string) => `/real-estate#${id}`;

export type HomeContent = {
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

  marqueeNames: string[];
  /** Тоон үзүүлэлт. Баталгаатай тоо гарвал энд нэмнэ (хоосон бол харагдахгүй). */
  stats: RealEstateStat[];
};

export type AboutValueItem = { title: string; body: string };

export type AboutContent = {
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

  /** Түүхэн замнал — баталгаатай он, үйл явдал гарвал энд нэмнэ (хоосон бол харагдахгүй). */
  milestones: RealEstateMilestone[];
};

export type ServicesProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type ServicesContent = {
  eyebrow: string;
  titlePre: string;
  titleEm: string;
  titlePost: string;
  description: string;

  items: Omit<RealEstateService, "id">[];

  processEyebrow: string;
  processTitle: string;
  processParagraph: string;
  processSteps: ServicesProcessStep[];
};

export type ContactChannelKind = "phone" | "email" | "social" | "location";

export type ContactChannel = {
  kind: ContactChannelKind;
  label: string;
  value: string;
  detail: string;
  href: string;
  cta: string;
};

export type SocialLink = { label: string; href: string };

export type ContactContent = {
  eyebrow: string;
  titlePre: string;
  titleEm: string;
  titlePost: string;
  description: string;

  /** Ажлын цаг (Facebook: "Үргэлж онгорхой"). */
  hours: string;
  channels: ContactChannel[];
  socials: SocialLink[];
};

export function getContactChannel(kind: ContactChannelKind): ContactChannel | undefined {
  return contactContent.channels.find((channel) => channel.kind === kind);
}

/** "#office" мэт хэсэг доторх холбоосыг аль ч хуудаснаас ажиллахаар болгоно. */
export function channelHref(channel: ContactChannel) {
  return channel.href.startsWith("#") ? `/real-estate${channel.href}` : channel.href;
}

export const homeContent: HomeContent = {
  heroEyebrow: "Ойгон Нөмрөг Properties · Дархан",
  heroTitlePre: "Дархан хотын",
  heroTitleEm: "үл хөдлөх хөрөнгийн",
  heroTitlePost: "мэргэжлийн, шуурхай зуучлал.",
  heroLead:
    "Тусгай зөвшөөрөлтэй агентууд таныг залилан, луйварт өртөх эрсдэлээс хамгаална. Манай багт мэргэжлийн эдийн засагчид ажилладаг — байр сонирхсон хүн бүрт санхүүгийн зөвлөгөө өгч, боломжит бүх хувилбарын шийдлийг гаргаж, сонгосон байраа худалдаж авахад тань тусална.",
  heroPrimaryLabel: "Зөвлөгөө авах",
  heroPrimaryHref: sectionHref("contact"),
  heroSecondaryLabel: "Үйлчилгээ",
  heroSecondaryHref: sectionHref("services"),
  trust1Label: "Ажиллах цаг",
  trust1Value: "24/7",
  trust2Label: "Байршил",
  trust2Value: "Дархан",
  trust3Label: "Facebook дагагч",
  trust3Value: "2,900+",
  marqueeNames: [
    "Орон сууцны зуучлал",
    "Санхүүгийн зөвлөгөө",
    "Ипотекийн зээл",
    "Ногоон зээл",
    "Шинэ орон сууцны борлуулалт",
    "Дархан хот",
  ],
  stats: [],
};

export const aboutContent: AboutContent = {
  missionEyebrow: "Бидний зорилго",
  missionTitlePre: "Байраа",
  missionTitleEm: "итгэлтэй, аюулгүй",
  missionTitlePost: "сонгоход тань туслах.",
  missionParagraph:
    "Манай багт мэргэжлийн эдийн засагчид ажиллаж байна. Бид байр сонирхсон хүн бүрт санхүүгийн зөвлөгөө өгч, боломжит бүх хувилбарын шийдлийг гаргаж, сонгосон байраа худалдаж авахад тань тусална.",
  missionChecklist: [
    "Тусгай зөвшөөрөлтэй, албан ёсны эрхтэй агентууд",
    "Мэргэжлийн эдийн засагчийн санхүүгийн зөвлөгөө",
    "Ногоон болон ипотекийн зээлийн боломжийг тооцоолох",
    "Залилан, луйврын эрсдэлээс хамгаалсан гүйлгээ",
  ],
  valuesEyebrow: "Бидний үнэт зүйлс",
  valuesTitle: "Бидэнд итгэх шалтгаан",
  valuesDescription: "Харилцагч бүртэй ажиллахдаа баримталдаг дөрвөн зарчим.",
  values: [
    {
      title: "Мэргэжлийн",
      body: "Үл хөдлөх эд хөрөнгө зуучлалын тусгай зөвшөөрөл эзэмшигч байгууллагын албан ёсны эрхтэй агентууд ажилладаг.",
    },
    {
      title: "Шуурхай",
      body: "Бид үргэлж онгорхой — утсаар, Facebook-ээр хандсан асуултад тань цаг алдалгүй хариу өгнө.",
    },
    {
      title: "Найдвартай",
      body: "Хууль ёсны зуучлал таныг залилан, луйварт өртөх эрсдэлээс хамгаална.",
    },
    {
      title: "Санхүүгийн зөвлөгөө",
      body: "Эдийн засагчид маань таны орлого, боломжид тохирсон бүх хувилбарыг тооцоолж, зөв шийдвэр гаргахад тусална.",
    },
  ],
  milestones: [],
};

export const servicesContent: ServicesContent = {
  eyebrow: "Үйлчилгээ",
  titlePre: "Байр сонголтоос",
  titleEm: "түлхүүр гардах",
  titlePost: "хүртэлх дэмжлэг",
  description: "Зуучлал, шинэ орон сууцны борлуулалт, санхүүгийн болон зээлийн зөвлөгөөг нэг дороос.",
  items: [
    {
      title: "Үл хөдлөх хөрөнгийн зуучлал",
      description:
        "Тусгай зөвшөөрөлтэй агентууд байр сонголтоос гэрээ байгуулах хүртэл тань дагалдаж, залилан, луйврын эрсдэлээс хамгаална.",
      points: ["Байр сонголт, үзлэг", "Гэрээ, бичиг баримтын дэмжлэг", "Найдвартай, хууль ёсны гүйлгээ"],
    },
    {
      title: "Шинэ орон сууцны борлуулалт",
      description:
        "Шинэ төслүүдийн борлуулалтын албаны үүргийг гүйцэтгэж, байрны сонголт, нөхцөлийн талаар дэлгэрэнгүй мэдээлэл өгнө.",
      points: ["Байрны сонголт, талбай", "Үзэх цаг товлох", "Захиалга, гэрээ"],
    },
    {
      title: "Санхүүгийн зөвлөгөө",
      description:
        "Мэргэжлийн эдийн засагчид таны орлого, боломжид тохирсон бүх хувилбарыг тооцоолж, сонгосон байраа авахад тусална.",
      points: ["Төлбөрийн хувилбарууд", "Төсөв төлөвлөлт", "Шийдвэр гаргах дэмжлэг"],
    },
    {
      title: "Ипотек, ногоон зээлийн зөвлөгөө",
      description:
        "Ипотекийн болон ногоон зээлд хамрагдах нөхцөл, бүрдүүлэх материалыг тайлбарлаж, зээлийн явцад тань тусална.",
      points: ["Хамрагдах нөхцөл", "Бүрдүүлэх материал", "Зээлийн явцын дэмжлэг"],
    },
  ],
  processEyebrow: "Үйл явц",
  processTitle: "Бид хэрхэн ажилладаг вэ",
  processParagraph: "Анхны холбоо барихаас эхлээд байраа гардан авах хүртэлх дөрвөн алхам.",
  processSteps: [
    {
      step: "01",
      title: "Холбогдох",
      body: "Утсаар эсвэл Facebook-ээр холбогдож, ямар байр хайж байгаа, хэрэгцээгээ хэлнэ.",
    },
    {
      step: "02",
      title: "Санхүүгийн зөвлөгөө",
      body: "Эдийн засагч маань таны боломжид тохирсон төлбөр, зээлийн бүх хувилбарыг гаргана.",
    },
    {
      step: "03",
      title: "Байр сонгох",
      body: "Тохирох байруудыг хамт үзэж, сонголтоо хийнэ.",
    },
    {
      step: "04",
      title: "Гэрээ ба зээл",
      body: "Гэрээ байгуулах, зээлийн материал бүрдүүлэхэд тусалж, байраа гардан авах хүртэл дагалдана.",
    },
  ],
};

export const contactContent: ContactContent = {
  eyebrow: "Холбоо барих",
  titlePre: "Бид",
  titleEm: "үргэлж",
  titlePost: "онгорхой.",
  description: "Утсаар, и-мэйлээр эсвэл Facebook хуудсаар маань холбогдоорой. Асуултад тань шуурхай хариулна.",
  hours: "Үргэлж онгорхой",
  channels: [
    {
      kind: "phone",
      label: "Борлуулалтын алба",
      value: "7775-8885",
      detail: "Гар утас: 8888-5861, 8883-5861",
      href: "tel:+97677758885",
      cta: "Залгах",
    },
    {
      kind: "email",
      label: "И-мэйл",
      value: "bayalagkhosmandal@gmail.com",
      detail: "Асуулт, хүсэлтээ и-мэйлээр илгээгээрэй.",
      href: "mailto:bayalagkhosmandal@gmail.com",
      cta: "И-мэйл бичих",
    },
    {
      kind: "social",
      label: "Facebook хуудас",
      value: "Ойгон Нөмрөг Properties",
      detail: "Шинэ байр, зээлийн мэдээ, Messenger-ээр зурвас.",
      href: "https://www.facebook.com/OigonNumrugProperties",
      cta: "Хуудас руу орох",
    },
    {
      kind: "location",
      label: "Байршил",
      value: "Дархан хот",
      detail: "Дархан-Уул аймаг, 45000",
      href: "#office",
      cta: "Дэлгэрэнгүй",
    },
  ],
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/OigonNumrugProperties" },
    { label: "YouTube", href: "https://www.youtube.com/@OigonNumrugProperties" },
  ],
};
