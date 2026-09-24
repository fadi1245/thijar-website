import { Mail, Phone, MapPin } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";

export function ContactInfoSection() {
  return (
    <div>
      <SectionLabel>THE SHORTCUT</SectionLabel>

      <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))]">
        A direct line to a useful next step.
      </h2>

      <div className="mt-10 grid gap-5">

        <a
          href="mailto:hello@tajin.com"
          className="focus-ring flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--accent)/.5)]"
        >
          <Mail className="mt-1 h-5 w-5 text-[hsl(var(--accent))]" />

          <span>
            <span className="block text-xs text-[hsl(var(--muted-foreground))]">
              Email
            </span>

            <span className="mt-1 block text-sm font-bold text-[hsl(var(--primary))]">
              hello@tajin.com
            </span>
          </span>
        </a>

        <a
          href="tel:+971000000000"
          className="focus-ring flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] p-4 hover:border-[hsl(var(--accent)/.5)]"
        >
          <Phone className="mt-1 h-5 w-5 text-[hsl(var(--accent))]" />

          <span>
            <span className="block text-xs text-[hsl(var(--muted-foreground))]">
              Phone
            </span>

            <span className="mt-1 block text-sm font-bold text-[hsl(var(--primary))]">
              +971 00 000 0000
            </span>
          </span>
        </a>

        <div className="flex items-start gap-4 rounded-xl border border-[hsl(var(--border))] p-4">
          <MapPin className="mt-1 h-5 w-5 text-[hsl(var(--accent))]" />

          <span>
            <span className="block text-xs text-[hsl(var(--muted-foreground))]">
              Coverage
            </span>

            <span className="mt-1 block text-sm font-bold text-[hsl(var(--primary))]">
              India · Bahrain · Saudi Arabia · Oman · UAE
            </span>
          </span>
        </div>

      </div>
    </div>
  );
}