import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";


export function Header() {
    const [open, setOpen] = useState(false);
    const nav = [
      ['About us', '/about-us'],
      ['ERP & software', '/erp'],
      ['Careers', '/careers'],
      ['Insights', '/blog'],
    ];
    return (
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="container-tajin flex h-[82px] items-center justify-between">
          <Logo light />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link key={href} to={href} className="focus-ring text-[13px] font-medium text-white/75 transition-colors hover:text-white" data-testid={`link-nav-${href.slice(1).replace('-', '')}`}>
                {label}
              </Link>
            ))}
            <Link to="/contact-us" className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-white/65 hover:bg-white/10" data-testid="link-nav-contact">
              Start a conversation <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </nav>
          <button
            type="button"
            className="focus-ring rounded-lg p-2 text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            data-testid="button-toggle-navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="mx-5 rounded-2xl border border-white/15 bg-[hsl(var(--primary))] p-3 shadow-2xl md:hidden" aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setOpen(false)} className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white" data-testid={`link-mobile-${href.slice(1).replace('-', '')}`}>
                {label}
              </Link>
            ))}
            <Link to="/contact-us" onClick={() => setOpen(false)} className="focus-ring mt-2 block rounded-xl bg-[hsl(var(--accent))] px-4 py-3 text-center text-sm font-semibold text-white" data-testid="link-mobile-contact">
              Start a conversation
            </Link>
          </nav>
        )}
      </header>
    );
  }