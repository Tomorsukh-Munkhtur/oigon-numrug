import { safetySettings } from "@/lib/safety/content";
import SafetyShell from "./SafetyShell";

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SafetyShell settings={safetySettings}>{children}</SafetyShell>;
}
