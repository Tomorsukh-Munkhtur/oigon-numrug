const organizations = [
  {
    name: "Ойгон Нөмрөг Үл Хөдлөх",
    label: "Үл хөдлөх хөрөнгө",
    description:
      "Орон сууц, газар, арилжааны талбайн зөвлөгөө, борлуулалт, түрээсийн найдвартай шийдэл.",
    href: "#real-estate",
    action: "Дэлгэрэнгүй",
    side: "realEstate",
  },
  {
    name: "Ойгон Нөмрөг ХАБ",
    label: "Хөдөлмөрийн аюулгүй байдал",
    description:
      "Ажлын байрны эрсдэлийн үнэлгээ, сургалт, хяналт, хамгаалалтын соёлыг төлөвшүүлэх үйлчилгээ.",
    href: "#safety",
    action: "Танилцах",
    side: "safety",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101412] text-white">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        {organizations.map((organization) => (
          <a
            key={organization.name}
            href={organization.href}
            className={[
              "org-panel group relative flex min-h-[50vh] overflow-hidden px-7 py-10 transition duration-300 md:min-h-screen md:px-12 lg:px-16",
              organization.side === "realEstate"
                ? "org-panel-real-estate text-[#19231f]"
                : "org-panel-safety text-[#f5f2ea]",
            ].join(" ")}
          >
            <div
              className="org-panel-pattern absolute inset-0"
              aria-hidden="true"
            />

            <div className="relative z-10 flex w-full flex-col justify-between gap-12">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span
                    className={[
                      "grid h-16 w-16 shrink-0 place-items-center rounded-md border text-xl font-bold shadow-sm",
                      organization.side === "realEstate"
                        ? "border-[#b98b36]/35 bg-white/70 text-[#80601f]"
                        : "border-[#80d0b2]/30 bg-white/8 text-[#99e0c5]",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {organization.side === "realEstate" ? "ҮХ" : "ХАБ"}
                  </span>
                  <div>
                    <p
                      className={[
                        "text-sm font-semibold uppercase tracking-[0.18em]",
                        organization.side === "realEstate"
                          ? "text-[#80601f]"
                          : "text-[#99e0c5]",
                      ].join(" ")}
                    >
                      {organization.label}
                    </p>
                    <h1 className="mt-2 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                      {organization.name}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="max-w-xl">
                <p
                  className={[
                    "text-lg leading-8 sm:text-xl",
                    organization.side === "realEstate"
                      ? "text-[#40514a]"
                      : "text-[#d7e7df]",
                  ].join(" ")}
                >
                  {organization.description}
                </p>
                <span
                  className={[
                    "mt-8 inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold transition group-hover:translate-x-1",
                    organization.side === "realEstate"
                      ? "bg-[#19231f] text-white"
                      : "bg-[#f5f2ea] text-[#13251f]",
                  ].join(" ")}
                >
                  {organization.action}
                </span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
