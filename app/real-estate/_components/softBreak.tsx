/** Long e-mail addresses wrap before "@" instead of mid-word. */
export function softBreak(value: string): React.ReactNode {
  const at = value.indexOf("@");
  if (at <= 0) return value;
  return (
    <>
      {value.slice(0, at)}
      <wbr />
      {value.slice(at)}
    </>
  );
}

/** External links open in a new tab. */
export function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
