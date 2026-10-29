import type { Metadata } from "next";
import LegacyRedirect from "../_components/LegacyRedirect";

// Хуучин хуудас — нүүр хуудасны хэсэг рүү шилжүүлнэ.
export const metadata: Metadata = {
  robots: { index: false },
  alternates: { canonical: "/real-estate" },
};

export default function Page() {
  return <LegacyRedirect to="/real-estate#about" />;
}
