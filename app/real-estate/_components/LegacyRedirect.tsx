/**
 * Хуучин тусдаа хуудас (/real-estate/about гэх мэт) — сайт нэг хуудастай болсон тул
 * нүүр хуудасны тухайн хэсэг рүү шилжүүлнэ. Static export дээр server redirect байхгүй
 * тул <meta http-equiv="refresh"> ашиглана (React үүнийг <head> руу гаргана, JS шаардлагагүй).
 */
export default function LegacyRedirect({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <div style={{ minHeight: "100vh", padding: 24, background: "#0f141d", color: "#cfcac2" }}>
        Шилжиж байна… <a href={to} style={{ color: "#f19a74" }}>Энд дарна уу</a>
      </div>
    </>
  );
}
