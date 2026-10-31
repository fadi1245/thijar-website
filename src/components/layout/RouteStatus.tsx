import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

function StatusPage({
  code,
  title,
  text,
  children,
}: {
  code: string;
  title: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero-slice relative flex min-h-[80svh] items-center overflow-hidden text-white">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-25" />
      <div className="container-tajin relative py-32">
        <p className="font-mono-brand text-xs tracking-[.18em] text-white/70">{code}</p>
        <h1 className="font-display mt-5 max-w-2xl text-4xl font-extrabold leading-[1.04] tracking-[-.03em] md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/70 md:text-[17px]">{text}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {children}
          <Link
            to="/"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#36afc0]"
          >
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NotFound() {
  return (
    <StatusPage
      code="404 / PAGE NOT FOUND"
      title="This page does not exist."
      text="The link may be broken, or the page may have moved. Head back to the homepage or get in touch with our team."
    >
      <Link
        to="/contact-us"
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/65 hover:bg-white/10"
      >
        Contact us
      </Link>
    </StatusPage>
  );
}

export function RouteError({ reset }: ErrorComponentProps) {
  return (
    <StatusPage
      code="ERROR / SOMETHING WENT WRONG"
      title="This page could not be displayed."
      text="An unexpected error stopped this page from loading. Try again, or return to the homepage."
    >
      <button
        type="button"
        onClick={reset}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/65 hover:bg-white/10"
      >
        Try again
      </button>
    </StatusPage>
  );
}
