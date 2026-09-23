import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
    return (
      <Link
        to="/"
        className={`focus-ring inline-flex items-center gap-3 ${light ? 'text-white' : 'text-[hsl(var(--primary))]'}`}
        data-testid="link-logo"
        aria-label="TAJIN home"
      >
        <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[11px] bg-[hsl(var(--accent))] text-[17px] font-bold tracking-[-.08em] text-white shadow-[0_8px_16px_rgba(30,150,169,.25)]">
          T<span className="absolute bottom-[5px] right-[6px] h-1.5 w-1.5 rounded-full bg-white/90" />
        </span>
        <span className="font-display text-[19px] font-extrabold tracking-[.16em]">THIJAR</span>
      </Link>
    );
  }