import Link from "next/link";
import { channelHref, contactContent } from "@/lib/real-estate/content";
import { ArrowRight } from "./icons";

type Action = { label: string; href: string };

type Props = {
  kicker: string;
  title: React.ReactNode;
  description?: string;
  primary?: Action;
  secondary?: Action;
};

export default function CtaBand({ kicker, title, description, primary, secondary }: Props) {
  return (
    <section className="re-cta">
      <div className="re-wrap re-cta__grid">
        <div className="re-reveal">
          <p className="re-kicker">{kicker}</p>
          <h2 className="re-display re-cta__title">{title}</h2>
          {description && <p className="re-cta__text">{description}</p>}
          {(primary?.label || secondary?.label) && (
            <div className="re-actions">
              {primary?.label && (
                <Link href={primary.href} className="re-btn re-btn--accent">
                  {primary.label}
                  <ArrowRight />
                </Link>
              )}
              {secondary?.label && (
                <Link href={secondary.href} className="re-btn re-btn--light">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>

        <ul className="re-cta__contacts re-reveal">
          {contactContent.channels.map((channel) => (
            <li key={channel.label}>
              <a href={channelHref(channel)}>
                <span>{channel.label}</span>
                <strong>{channel.value}</strong>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
