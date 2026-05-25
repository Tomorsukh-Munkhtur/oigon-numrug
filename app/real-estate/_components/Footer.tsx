import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="re-footer">
      <div className="re-container re-footer-inner">
        <div>
          <Image
            src="/Logo_Primary color - 2.png"
            alt="Oigon Numrug Properties"
            width={720}
            height={190}
            className="re-footer-logo"
          />
          <p>
            Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн
            зөвлөх үйлчилгээ.
          </p>
        </div>
        <div className="re-footer-cols">
          <div>
            <h4>Үйлчилгээ</h4>
            <Link href="/real-estate/services">Борлуулалт, түрээс</Link>
            <Link href="/real-estate/services">Төслийн маркетинг</Link>
            <Link href="/real-estate/services">Хөрөнгийн зөвлөгөө</Link>
            <Link href="/real-estate/services">Үнэлгээ, судалгаа</Link>
          </div>
          <div>
            <h4>Компани</h4>
            <Link href="/real-estate/about">Бидний тухай</Link>
            <Link href="/real-estate/projects">Төслүүд</Link>
            <Link href="/real-estate/news">Мэдээ ба тойм</Link>
            <Link href="/real-estate/contact">Холбоо барих</Link>
          </div>
          <div>
            <h4>Холбогдох</h4>
            <a href="tel:+97600000000">+976 0000 0000</a>
            <a href="mailto:info@oigonnumrug.mn">info@oigonnumrug.mn</a>
            <span>Дархан хот, 14-р баг</span>
          </div>
        </div>
      </div>
      <div className="re-footer-bottom">
        <span>© {new Date().getFullYear()} Oigon Numrug Properties</span>
        <span>Бүх эрх хуулиар хамгаалагдсан.</span>
      </div>
    </footer>
  );
}
