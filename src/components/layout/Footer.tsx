import { Link } from "@tanstack/react-router";
import logo from '../../assets/logo/logo.jpeg';
import { ArrowRight, Mail, Phone } from "lucide-react";

const countryContacts = [
  { country: "India", phone: "+91 00000 00000" },
  { country: "Bahrain", phone: "+973 0000 0000" },
  { country: "Saudi Arabia", phone: "+966 00 000 0000" },
  { country: "Oman", phone: "+968 0000 0000" },
  { country: "UAE", phone: "+971 00 000 0000" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[hsl(var(--primary))] text-white">
      <div className="container-tajin grid gap-12 py-16 md:grid-cols-[1.4fr_.7fr_.7fr_1fr] md:py-20">
        {/* Company */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Thijar logo"
              className="w-15 rounded-lg object-cover"
            />
            <h2 className="text-3xl font-extrabold text-white">THIJAR</h2>
          </div>

          <p className="mt-7 max-w-xs text-[14px] leading-7 text-white/55">
            One experienced team for the numbers, systems, and decisions that
            move your business forward.
          </p>

          <Link
            to="/contact-us"
            className="focus-ring mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--accent))] hover:text-white"
            data-testid="link-footer-talk"
          >
            Talk to THIJAR <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Explore */}
        <div>
          <p className="font-mono-brand text-[10px] tracking-[.18em] text-white/35">
            EXPLORE
          </p>

          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <Link
              to="/about-us"
              className="focus-ring hover:text-white"
              data-testid="link-footer-about"
            >
              About us
            </Link>

            <Link
              to="/erp"
              className="focus-ring hover:text-white"
              data-testid="link-footer-erp"
            >
              ERP & Software
            </Link>

            <Link
              to="/careers"
              className="focus-ring hover:text-white"
              data-testid="link-footer-careers"
            >
              Careers
            </Link>
          </div>
        </div>

        {/* Locations */}
        <div>
          <p className="font-mono-brand text-[10px] tracking-[.18em] text-white/35">
            LOCATIONS
          </p>

          <div className="mt-5 grid gap-3 text-sm text-white/65">
            <span>India</span>
            <span>Bahrain</span>
            <span>Saudi Arabia</span>
            <span>Oman</span>
            <span>UAE</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="font-mono-brand text-[10px] tracking-[.18em] text-white/35">
            LET&apos;S CONNECT
          </p>

          <a
            href="mailto:hello@tajin.com"
            className="focus-ring mt-5 flex items-center gap-2 text-sm text-white/70 hover:text-white"
            data-testid="link-footer-email"
          >
            <Mail className="h-4 w-4 text-[hsl(var(--accent))]" />
            hello@tajin.com
          </a>

          <div className="mt-4 grid gap-2.5">
            {countryContacts.map(({ country, phone }) => (
              <a
                key={country}
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="focus-ring flex items-center gap-2 text-sm text-white/70 hover:text-white"
                data-testid={`link-footer-phone-${country
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <Phone className="h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />

                <span className="text-white/45">{country}:</span>

                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-tajin flex flex-col justify-between gap-3 py-5 text-[11px] text-white/35 sm:flex-row">
          <span>
            © 2026 THIJAR PVT LTD. Built for the next chapter.
          </span>

          <span>Accounting · Advisory · Technology</span>
        </div>
      </div>
    </footer>
  );
}