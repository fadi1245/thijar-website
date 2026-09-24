import { SectionLabel } from "../shared/SectionLabel";

export function PageHero({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="hero-slice relative h-[600px] overflow-hidden bg-[hsl(var(--primary))] text-white sm:h-[640px] lg:h-[700px]">
      <div className="hero-grid absolute inset-0 opacity-35" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-white/10 bg-[hsl(var(--accent)/.12)] md:h-96 md:w-96" />
      <div className="container-tajin relative flex h-full items-center">
        <div className="w-full max-w-4xl">
          <SectionLabel light>{label}</SectionLabel>
          <h1 className="font-display mt-7 text-[clamp(2rem,4.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-.02em] text-balance">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/66 md:text-[17px]">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}