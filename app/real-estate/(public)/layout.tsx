import Footer from "../_components/Footer";
import Topbar from "../_components/Topbar";

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="re-page">
      <Topbar />
      {children}
      <Footer />
    </main>
  );
}
