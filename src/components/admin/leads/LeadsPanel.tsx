import { useMemo, useState } from "react";
import { Eye, Inbox, Search } from "lucide-react";
import { mockLeads } from "@/data/adminMockData";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/types/admin";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";
import { inputClass } from "../shared/FormField";
import { StatusPill } from "../shared/StatusPill";
import { leadStatusMeta } from "./LeadStatus";
import { formatDate } from "@/lib/formData";
import { LeadDetailModal } from "./LeadsDetailModal";

export function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | LeadStatus>("all");
  // Store the id so the modal always shows the latest data after a status change
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Lead | null>(null);

  const selected = leads.find((l) => l.id === selectedId) ?? null;
  const newCount = leads.filter((l) => l.status === "new").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads
      .filter((l) => statusFilter === "all" || l.status === statusFilter)
      .filter(
        (l) =>
          !q ||
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company ?? "").toLowerCase().includes(q) ||
          (l.service ?? "").toLowerCase().includes(q) ||
          l.message.toLowerCase().includes(q),
      )
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  }, [leads, query, statusFilter]);

  function handleStatusChange(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  return (
    <AdminPanel
      title="Contact form leads"
      description={`${leads.length} ${leads.length === 1 ? "lead" : "leads"}, ${newCount} new.`}
    >
      {/* Filters */}
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_12rem]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, company, email or message"
            aria-label="Search leads"
            className={`${inputClass} !mt-0 pl-10`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | LeadStatus)}
          aria-label="Filter by status"
          className={`${inputClass} !mt-0`}
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {leadStatusMeta[s].label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={leads.length === 0 ? "No leads yet" : "No leads found"}
          text={
            leads.length === 0
              ? "Messages sent through the Contact us form will show up here."
              : "Try a different search or status filter."
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-[hsl(var(--primary)/.12)] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#eaf5f6] text-xs text-[hsl(var(--muted-foreground))]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Service</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Message</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--primary)/.1)]">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-[#eaf5f6]/50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[hsl(var(--primary))]">{l.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{l.email}</p>
                      {l.company && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{l.company}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--primary))]">{l.service || "—"}</td>
                    <td className="max-w-xs px-4 py-3 text-[hsl(var(--muted-foreground))]">
                      <p className="truncate">{l.message}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[hsl(var(--primary))]">
                      {formatDate(l.receivedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill tone={leadStatusMeta[l.status].tone}>
                        {leadStatusMeta[l.status].label}
                      </StatusPill>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <IconButton label={`View ${l.name}'s message`} onClick={() => setSelectedId(l.id)}>
                          <Eye className="h-4 w-4" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="grid gap-3 md:hidden">
            {filtered.map((l) => (
              <li key={l.id} className="rounded-xl border border-[hsl(var(--primary)/.12)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-[hsl(var(--primary))]">{l.name}</p>
                    <p className="mt-0.5 break-words text-xs text-[hsl(var(--muted-foreground))]">
                      {l.email}
                    </p>
                  </div>
                  <StatusPill tone={leadStatusMeta[l.status].tone}>
                    {leadStatusMeta[l.status].label}
                  </StatusPill>
                </div>
                {(l.company || l.service) && (
                  <p className="mt-2 text-xs font-semibold text-[hsl(var(--primary))]">
                    {[l.company, l.service].filter(Boolean).join(" · ")}
                  </p>
                )}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                  {l.message}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {formatDate(l.receivedAt)}
                  </span>
                  <Button variant="secondary" onClick={() => setSelectedId(l.id)}>
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {selected && (
        <LeadDetailModal
          lead={selected}
          onStatusChange={(status) => handleStatusChange(selected.id, status)}
          onDelete={() => setToDelete(selected)}
          onClose={() => setSelectedId(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete lead?"
          message={`The message from "${toDelete.name}" will be permanently removed. This can't be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            setLeads((prev) => prev.filter((l) => l.id !== toDelete.id));
            setToDelete(null);
            setSelectedId(null);
          }}
        />
      )}
    </AdminPanel>
  );
}