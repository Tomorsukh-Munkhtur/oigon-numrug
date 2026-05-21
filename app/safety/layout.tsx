import { getSafetySettings } from "@/lib/safety/content";
import SafetyShell from "./SafetyShell";

export const dynamic = "force-dynamic";

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSafetySettings();

  return <SafetyShell settings={settings}>{children}</SafetyShell>;
}
