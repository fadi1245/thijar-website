import type { AdminTab } from "@/types/admin";
import { Link } from "@tanstack/react-router";
import { Briefcase, ExternalLink, Globe, Inbox, LogOut, X } from "lucide-react";
import type { ComponentType } from "react";

/* ---------- Content ---------- */
const navItems: {
  id: AdminTab;
  label: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { id: "content", label: "Website content", icon: Globe },
  { id: "careers", label: "Jobs & careers", icon: Briefcase },
  { id: "leads", label: "Leads", icon: Inbox },
];

const footerLinkClass =
  "focus-ring flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white";

export function AdminSidebar({
  tab,
  open,
  onClose,
  onLogout,
}: {
  tab: AdminTab;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[hsl(var(--primary))] text-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="font-display text-xl font-extrabold tracking-[-.03em]">
              THIJAR
            </p>
            <p className="font-mono-brand mt-1 text-[11px] tracking-[.18em] text-white/60">
              ADMIN
            </p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="focus-ring rounded-lg p-1.5 text-white/70 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 px-3">
          <ul className="grid gap-1">
            {navItems.map(({ id, label, icon: Icon }) => {
              const active = id === tab;
              return (
                <li key={id}>
                  <Link
                    to="/admin"
                    search={{ tab: id }}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`focus-ring flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${active ? "text-[hsl(var(--accent))]" : ""}`}
                      strokeWidth={1.7}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-1 border-t border-white/15 px-3 py-4">
          <a href="/" target="_blank" rel="noreferrer" className={footerLinkClass}>
            <ExternalLink className="h-5 w-5" strokeWidth={1.7} />
            View website
          </a>
          <button type="button" onClick={onLogout} className={footerLinkClass}>
            <LogOut className="h-5 w-5" strokeWidth={1.7} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}