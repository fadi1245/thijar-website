import { Check, Download, Globe, Monitor } from "lucide-react";
import { SectionLabel } from "../shared/SectionLabel";
import { RevealLeft } from "@/lib/revealAnimation";

// TODO: replace with your real links
const DOWNLOAD_URL = "/downloads/thijar-erp-setup.exe";
const WEB_APP_URL = "https://app.thijar.com";

const options = [
  {
    icon: Monitor,
    title: "Desktop app",
    text: "Install the .exe on Windows and launch it like any other program.",
    points: [
      "Fast, dedicated window for the counter",
      "Works with barcode scanners and receipt printers",
      "Quick launch from your desktop",
      "Windows 10 or later",
    ],
    cta: { label: "Download .exe", href: DOWNLOAD_URL, icon: Download, primary: true },
  },
  {
    icon: Globe,
    title: "Web app",
    text: "Nothing to install. Open it in your browser on any device.",
    points: [
      "Sign in from any computer, tablet or phone",
      "Always on the latest version",
      "Great for owners checking in remotely",
      "Works in Chrome, Edge, Safari and Firefox",
    ],
    cta: { label: "Open web app", href: WEB_APP_URL, icon: Globe, primary: false },
  },
];

export function InstallSection() {
  return (
    <section
      className="container-tajin py-12 md:py-14"
      aria-label="Use THIJAR ERP on desktop or web"
    >
      <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:items-start">
        <RevealLeft>
          <div>
            <SectionLabel>USE IT YOUR WAY</SectionLabel>
            <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              Available as a desktop app and on the web.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              THIJAR ERP works the same in both. Install the Windows app for the
              counter, or sign in from any browser. Same account, same data,
              always in sync.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              Use one or both. Your team can run the desktop app at the till
              while you check reports on the web.
            </p>
          </div>
        </RevealLeft>

        <RevealLeft>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-0">
            {options.map(({ icon: Icon, title, text, points, cta }, i) => {
              const CtaIcon = cta.icon;
              return (
                <div
                  key={title}
                  className={`flex flex-col ${
                    i === 1
                      ? "sm:border-l sm:border-[hsl(var(--border))] sm:pl-10"
                      : "sm:pr-10"
                  }`}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[hsl(var(--primary))] text-[hsl(var(--accent))]">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-[hsl(var(--primary))]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                    {text}
                  </p>
                  <ul className="mt-5 grid gap-3">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-6 text-[hsl(var(--primary))]"
                      >
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--accent))]"
                          strokeWidth={2.2}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={cta.href}
                    {...(cta.primary
                      ? { download: true }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className={`focus-ring mt-7 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      cta.primary
                        ? "bg-[hsl(var(--primary))] text-white hover:opacity-90"
                        : "border border-[hsl(var(--primary)/0.25)] text-[hsl(var(--primary))] hover:border-[hsl(var(--accent)/.55)]"
                    }`}
                  >
                    <CtaIcon className="h-4 w-4" />
                    {cta.label}
                  </a>
                </div>
              );
            })}
          </div>
        </RevealLeft>
      </div>
    </section>
  );
}