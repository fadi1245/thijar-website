import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { clearToken, isAdminLoggedIn } from "@/lib/adminAuth";
import { ADMIN_TABS, type AdminTab } from "@/types/admin";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | THIJAR" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { tab: AdminTab } => ({
    tab: ADMIN_TABS.includes(search.tab as AdminTab)
      ? (search.tab as AdminTab)
      : "content",
  }),
  component: AdminPage,
});

function AdminPage() {
  const { tab } = Route.useSearch();
  // null = not checked yet (avoids a login flash and SSR mismatch)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setLoggedIn(isAdminLoggedIn());
  }, []);

  if (loggedIn === null) return null;

  if (!loggedIn) {
    return <AdminLogin onSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <AdminShell
      tab={tab}
      onLogout={() => {
        clearToken();
        setLoggedIn(false);
      }}
    />
  );
}