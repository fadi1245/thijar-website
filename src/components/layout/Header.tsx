import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.jpeg";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    ["About us", "/about-us"],
    ["ERP & software", "/erp"],
    ["Services", "/service"],
    ["Careers", "/careers"],
  ];

  // solid when the mobile menu is open so links stay readable
  const solid = scrolled || open;

  return (
    <header
      className={`fixed py-3 inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "border-white/10 bg-[hsl(var(--primary)/0.72)] shadow-[0_8px_30px_rgba(0,0,0,.12)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`container-tajin flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-[68px]" : "h-[82px]"
        }`}
      >
        <Link to="/" className="flex items-center gap-5" data-testid="link-logo-home">
          <img
            src={logo}
            alt="Thijar logo"
            className="w-13 lg:w-15 rounded-lg object-cover"
          />
          <h2 className="text-3xl font-extrabold text-white">THIJAR</h2>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className="focus-ring relative text-[13px] font-medium text-white/75 transition-colors hover:text-white after:absolute after:bottom-[-6px] after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-white after:transition-all after:duration-300 hover:after:w-full [&.active]:text-white [&.active]:after:w-full"
              data-testid={`link-nav-${href.slice(1).replace("-", "")}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact-us"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-white/65 hover:bg-white/10"
            data-testid="link-nav-contact"
          >
            Start a conversation{" "}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>

        <button
          type="button"
          className="focus-ring rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          data-testid="button-toggle-navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="mx-5mb-4 rounded-2xl border border-white/15 bg-[hsl(var(--primary)/0.95)] p-3 shadow-2xl backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className="focus-ring block rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              data-testid={`link-mobile-${href.slice(1).replace("-", "")}`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact-us"
            onClick={() => setOpen(false)}
            className="focus-ring mt-2 block rounded-xl bg-[hsl(var(--accent))] px-4 py-3 text-center text-sm font-semibold text-white"
            data-testid="link-mobile-contact"
          >
            Start a conversation
          </Link>
        </nav>
      )}
    </header>
  );
}