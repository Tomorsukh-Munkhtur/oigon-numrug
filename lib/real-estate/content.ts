export type RealEstateStat = {
  value: string;
  label: string;
};

export type RealEstateFloorPlan = {
  id: string;
  label: string;
  rooms: string;
  area: string;
  image: string;
};

export type RealEstateProject = {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  status: string;
  price: string;
  size?: string;
  summary?: string;
  longDescription?: string;
  developer?: string;
  completion?: string;
  floors?: string;
  units?: string;
  parking?: string;
  highlights?: string[];
  amenities?: string[];
  gallery?: string[];
  floorPlans?: RealEstateFloorPlan[];
};

export type RealEstateNews = {
  id: string;
  category: string;
  date: string;
  readMinutes: number;
  title: string;
  excerpt: string;
  image: string;
};

export type RealEstateService = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

export type RealEstateMilestone = {
  year: string;
  text: string;
};

export const reStats: RealEstateStat[] = [
  { value: "120+", label: "Хүлээлгэн өгсөн төсөл" },
  { value: "12", label: "Жилийн туршлага" },
  { value: "3,400", label: "Сэтгэл хангалуун харилцагч" },
  { value: "₮48 тэрбум", label: "Гүйцэтгэсэн гүйлгээ" },
];

export const reProjects: RealEstateProject[] = [
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
    gallery: [
      "/project-office.jpg",
      "/real-estate-bg.jpg",
      "/project-residence.jpg",
    ],
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
      "Garden Village нь Орхон голын эргийн дагуу 14 га талбайд барьсан, 180 айлын зөвхөн гэр бүлд зориулсан хотхон. Хотхон дотроо 1-р ангиас 5-р анги хүртэлх сургууль, 120 хүүхдийн цэцэрлэг, 6 ширхэг цэцэрлэгт хүрээлэн, эмчилгээний цэгтэй. Айл бүр өөрийн гэсэн жижиг хашаа, зогсоол, агуулахтай ба нийтийн ногоон бүсэд хүүхдийн тоглоомын талбай, хөгшинчүүлд зориулсан амрах бүс зохион байгуулжээ.",
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
    gallery: [
      "/project-garden.jpg",
      "/project-residence.jpg",
      "/real-estate-bg.jpg",
    ],
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
      "Darkhan Plaza нь Хуучин Дарханы 6-р багт байрлах, 1-2 давхарт дэлгүүр, ресторан, 3-5 давхарт оффис, 6-12 давхарт орон сууц багтсан 12 давхар холимог зориулалттай цогцолбор. Анхны давхрууд нь хувиараа бизнес эрхлэгчдэд тохирох жижиг талбайнуудаас 220 м² хүртэлх дэлгүүрийн талбайтай. Дээд давхрын орон сууцууд хотын панорам үзэмжтэй.",
    developer: "Plaza Group",
    completion: "2027 III улирал",
    floors: "12 давхар (R-1, 11 газрын дээгүүр)",
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
    gallery: [
      "/real-estate-bg.jpg",
      "/project-office.jpg",
      "/project-residence.jpg",
    ],
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
      "Northern Heights нь Шинэ Дарханы 11-р багт барьсан 9 давхар, 144 айлын дунд зэрэглэлийн орон сууцны төсөл. Энэ хорооллын дэд бүтэц 100% бэлэн, цэцэрлэг, сургууль, эмнэлэг ойр. Орон сууц авагчдад тохирох үнэ, төлбөрийн уян хатан нөхцөл, ипотек зээлийн зөвлөгөө багтсан.",
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
    gallery: [
      "/project-residence.jpg",
      "/project-garden.jpg",
      "/real-estate-bg.jpg",
    ],
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
      "Lakeside Residences нь Орхон голын эргийн дагуу барьсан 6 давхар, нийт 48 айл бүхий эксклюзив зэрэглэлийн орон сууцны цогцолбор. Айл бүрд хувийн террас, гол руу нээгдэх том цонхтой, орон сууц бүрийн доторх засал нь өндөр чанарын материалаар хийгдсэн. Зөвхөн 48 айл байх тул хязгаарлагдмал, нууцлал өндөртэй амьдралд тохирно.",
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
      { id: "lake-3br", label: "Type A · 3 өрөө", rooms: "3 өрөө", area: "118.7 м²", image: "/floorplans/plan-3br.svg" },
      { id: "lake-4br", label: "Type B · 4 өрөө · Penthouse", rooms: "4 өрөө + Penthouse", area: "162.8 м²", image: "/floorplans/plan-4br.svg" },
    ],
  },
];

export const reNews: RealEstateNews[] = [
  {
    id: "darkhan-market-2026-q1",
    category: "Зах зээлийн тойм",
    date: "2026.05.18",
    readMinutes: 6,
    title: "Дархан хотын орон сууцны үнэ 2026 оны эхний улиралд 6.8%-иар өслөө",
    excerpt:
      "Шинэ бүтээн байгуулалт удааширсан, эрэлт өндөр хэвээр үлдсэн нь дунд зэрэглэлийн орон сууцны үнийг түлхэж байна.",
    image: "/project-residence.jpg",
  },
  {
    id: "office-vacancy",
    category: "Арилжааны үл хөдлөх",
    date: "2026.05.11",
    readMinutes: 4,
    title: "Дархан хотын А зэрэглэлийн оффисын сул хувь түүхэн доод түвшинд хүрэв",
    excerpt:
      "Дархан хотын төвийн оффисын сул хувь 4.2% болж буурсан нь түрээслэгчдийн сонголтыг улам нарийсгаж байна.",
    image: "/project-office.jpg",
  },
  {
    id: "green-district",
    category: "Хөрөнгө оруулалт",
    date: "2026.04.29",
    readMinutes: 5,
    title: "Орхон голын эргийн ногоон бүсийн газрын үнэ 9% өслөө",
    excerpt:
      "Дархан-Шарын голын дэд бүтцийн шинэчлэлт, шинэ хотхоны төслүүд эдгээр бүсийг урт хугацааны хөрөнгө оруулалтад илүү сонирхолтой болгож байна.",
    image: "/project-garden.jpg",
  },
  {
    id: "buyer-guide",
    category: "Зөвлөмж",
    date: "2026.04.22",
    readMinutes: 7,
    title: "Анх удаа орон сууц авч буй хүмүүст зориулсан 7 алхамт хяналтын жагсаалт",
    excerpt:
      "Зээлийн зөвлөгөөнөөс эхлээд гэрээний нарийн заалт хүртэл — туршлагатай зөвлөхүүдийн санал болгож буй дараалал.",
    image: "/real-estate-bg.jpg",
  },
  {
    id: "rent-vs-buy",
    category: "Шинжилгээ",
    date: "2026.04.14",
    readMinutes: 6,
    title: "Түрээслэх үү, худалдан авах уу — 2026 оны зээлийн нөхцөлд хийсэн харьцуулалт",
    excerpt:
      "Орон сууцны зээлийн хүү буурсан энэ үед түрээслэхтэй харьцуулсан санхүүгийн өгөөж хэрхэн өөрчлөгдсөнийг шинжилнэ.",
    image: "/project-residence.jpg",
  },
  {
    id: "infra-roads",
    category: "Дэд бүтэц",
    date: "2026.04.03",
    readMinutes: 4,
    title: "Шинэ автозамын төслүүд Дархан хотын баруун бүсийн үл хөдлөхөд хэрхэн нөлөөлөх вэ",
    excerpt:
      "Дархан-Эрдэнэт, Шарын гол чиглэлийг холбосон шинэ замын төсөл орон сууцны үнэд 2027 он гэхэд дунджаар 5% нэмэлт өсөлт авчрах төлөвтэй байна.",
    image: "/real-estate-bg.jpg",
  },
];

export const reServices: RealEstateService[] = [
  {
    id: "sales",
    title: "Борлуулалт ба түрээсийн зуучлал",
    description:
      "Зорилтот зах зээл, үнийн стратегиар хүлээлгэн өгөх хүртэлх бүх явцыг нэг цэгээс удирдана.",
    points: ["Үнэлгээ, үнийн судалгаа", "Зорилтот харилцагчид хүрэх", "Гэрээ, шилжүүлгийн зөвлөгөө"],
  },
  {
    id: "marketing",
    title: "Төслийн маркетингийн байршуулалт",
    description:
      "Барилгын төслийг зах зээлд танигдсан, үнэ цэнэтэй брэнд болгон төлөвлөж байршуулна.",
    points: ["Брэнд платформ", "Дижитал кампанит ажил", "Үзвэр, нээлтийн зохион байгуулалт"],
  },
  {
    id: "advisory",
    title: "Хөрөнгийн зөвлөгөө, портфолио",
    description:
      "Хувийн болон институцийн хөрөнгө оруулагчдад зориулсан үл хөдлөх портфолиогийн стратеги.",
    points: ["Эрсдэлийн шинжилгээ", "Орлогын төсөөлөл", "Гарах стратеги"],
  },
  {
    id: "valuation",
    title: "Үнэлгээ ба зах зээлийн судалгаа",
    description:
      "Гэрээ, зээл, татварын зориулалтаар ашиглах боломжтой бие даасан үнэлгээний тайлан.",
    points: ["Харьцуулсан үнэлгээ", "Орлогын аргачлал", "Зах зээлийн прогноз"],
  },
];

export const reMilestones: RealEstateMilestone[] = [
  { year: "2014", text: "Үүсгэн байгуулагдсан, эхний борлуулалтын баг" },
  { year: "2017", text: "Анхны хотхоны төсөл маркетингийн хамтрал" },
  { year: "2020", text: "Дижитал зуучлалын платформоо нэвтрүүлсэн" },
  { year: "2024", text: "100+ төсөлд оролцож, бүсчилсэн үйлчилгээтэй болсон" },
  { year: "2026", text: "Хөрөнгийн зөвлөх үйлчилгээгээ өргөжүүлж байна" },
];

export const reNavLinks = [
  { href: "/real-estate/projects", label: "Төслүүд" },
  { href: "/real-estate/about", label: "Бидний тухай" },
  { href: "/real-estate/services", label: "Үйлчилгээ" },
];
