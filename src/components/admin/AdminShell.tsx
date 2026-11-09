import { lazy, Suspense, useState } from "react";
import { Menu } from "lucide-react";
import type { AdminTab } from "@/types/admin";
import { AdminSidebar } from "./AdminSideBar";

/* ---------- Lazy tabs: a tab's code loads only when it is opened ---------- */
const ContentTab = lazy(() =>
  import("./content/ContentTab").then((m) => ({ default: m.ContentTab })),
);
const CareersTab = lazy(() =>
  import("./careers/CareersTab").then((m) => ({ default: m.CareersTab })),
);
const LeadsTab = lazy(() =>
  import("./leads/LeadsTab").then((m) => ({ default: m.LeadsTab })),
);

const tabs: Record<AdminTab, React.ComponentType> = {
  content: ContentTab,
  careers: CareersTab,
  leads: LeadsTab,
};

const tabTitles: Record<AdminTab, string> = {
  content: "Website content",
  careers: "Jobs & careers",
  leads: "Leads",
};

export function AdminShell({
  tab,
  onLogout,
}: {
  tab: AdminTab;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ActiveTab = tabs[tab];

  return (
    <div className="min-h-svh bg-[#eaf5f6] lg:pl-64">
      <AdminSidebar
        tab={tab}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={onLogout}
      />

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[hsl(var(--primary)/.12)] bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="focus-ring rounded-lg p-1.5 text-[hsl(var(--primary))]"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-display text-base font-extrabold text-[hsl(var(--primary))]">
          {tabTitles[tab]}
        </span>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:px-10 lg:py-12">
        <Suspense
          fallback={
            <div className="animate-pulse space-y-4" aria-busy="true">
              <div className="h-8 w-1/3 rounded bg-slate-200" />
              <div className="h-40 rounded-2xl bg-slate-100" />
            </div>
          }
        >
          <ActiveTab />
        </Suspense>
      </main>
    </div>
  );
}