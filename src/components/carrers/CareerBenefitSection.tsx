import { SectionLabel } from "../shared/SectionLabel";

export function CareerBenefitsSection() {
  return (
    <section className="bg-[#eaf5f6] py-24 md:py-28">
      <div className="container-tajin">
        <div className="grid gap-12 md:grid-cols-[.85fr_1.15fr] md:items-start">
          <div>
            <SectionLabel>HOW WE WORK</SectionLabel>

            <h2 className="font-display mt-5 max-w-md text-4xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
              Bring your craft. Keep growing.
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              The best work happens when people are trusted to own their
              discipline and stay curious about the disciplines around them.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Learn across disciplines",
                "Work alongside CA professionals, auditors, consultants, engineers, and operators.",
              ],
              [
                "Build across borders",
                "Gain perspective from projects and colleagues across India and the Middle East.",
              ],
              [
                "Make work useful",
                "Turn expertise into decisions, systems, and outcomes that clients can feel.",
              ],
              [
                "Grow with the business",
                "Take on meaningful responsibility as THIJAR expands its capabilities and reach.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white/65 p-6"
              >
                <h3 className="font-display text-xl font-bold text-[hsl(var(--primary))]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}