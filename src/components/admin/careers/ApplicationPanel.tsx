import { useMemo, useState } from "react";
import { Download, Eye, FileText, Search } from "lucide-react";
import { mockApplications } from "@/data/adminMockData";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { EmptyState } from "../shared/EmptyState";
import { inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";
import type { Application, Job } from "@/types/admin";
import { formatDate } from "@/lib/formData";

const linkButtonClass =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90";

/* ---------- Detail modal ---------- */
function ApplicationDetailModal({
  application,
  jobTitle,
  onClose,
}: {
  application: Application;
  jobTitle: string;
  onClose: () => void;
}) {
  const rows: [string, React.ReactNode][] = [
    ["Applied for", jobTitle],
    [
      "Email",
      <a key="e" href={`mailto:${application.email}`} className="hover:underline">
        {application.email}
      </a>,
    ],
    [
      "Phone",
      <a key="p" href={`tel:${application.phone.replace(/\s/g, "")}`} className="hover:underline">
        {application.phone}
      </a>,
    ],
    ["Applied on", formatDate(application.appliedAt)],
  ];

  return (
    <Modal
      title={application.name}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <a href={application.cvUrl} target="_blank" rel="noreferrer" className={linkButtonClass}>
            <Download className="h-4 w-4" />
            View CV
          </a>
        </>
      }
    >
      <dl className="grid gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-[hsl(var(--muted-foreground))]">{label}</dt>
            <dd className="mt-0.5 break-words text-sm font-bold text-[hsl(var(--primary))]">
              {value}
            </dd>
          </div>
        ))}
        <div>
          <dt className="text-xs text-[hsl(var(--muted-foreground))]">Cover note</dt>
          <dd className="mt-1 whitespace-pre-line break-words text-sm leading-6 text-[hsl(var(--primary))]">
            {application.coverNote || "No cover note was added."}
          </dd>
        </div>
      </dl>
    </Modal>
  );
}

/* ---------- Panel ---------- */
export function ApplicationsPanel({ jobs }: { jobs: Job[] }) {
  const [jobFilter, setJobFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);

  const jobTitle = (jobId: string) =>
    jobs.find((j) => j.id === jobId)?.title ?? "Deleted job";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockApplications
      .filter((a) => jobFilter === "all" || a.jobId === jobFilter)
      .filter(
        (a) => !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q),
      )
      .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));
  }, [jobFilter, query]);

  return (
    <AdminPanel
      title="Applications"
      description={`${mockApplications.length} received through the careers page.`}
    >
      {/* Filters */}
      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_16rem]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email"
            aria-label="Search applications"
            className={`${inputClass} !mt-0 pl-10`}
          />
        </div>
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          aria-label="Filter by job"
          className={`${inputClass} !mt-0`}
        >
          <option value="all">All jobs</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>
              {j.title}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications found"
          text="Try a different search or job filter."
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-[hsl(var(--primary)/.12)] md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#eaf5f6] text-xs text-[hsl(var(--muted-foreground))]">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Applicant</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Applied for</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Phone</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Date</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--primary)/.1)]">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-[#eaf5f6]/50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-[hsl(var(--primary))]">{a.name}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{a.email}</p>
                    </td>
                    <td className="px-4 py-3 text-[hsl(var(--primary))]">{jobTitle(a.jobId)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-[hsl(var(--primary))]">{a.phone}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-[hsl(var(--primary))]">
                      {formatDate(a.appliedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <IconButton label={`View ${a.name}'s application`} onClick={() => setSelected(a)}>
                          <Eye className="h-4 w-4" />
                        </IconButton>
                        <a
                          href={a.cvUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View ${a.name}'s CV`}
                          title="View CV"
                          className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-[hsl(var(--primary)/.14)] bg-white text-[hsl(var(--primary))] transition hover:border-[hsl(var(--accent)/.5)]"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="grid gap-3 md:hidden">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="rounded-xl border border-[hsl(var(--primary)/.12)] p-4"
              >
                <p className="font-bold text-[hsl(var(--primary))]">{a.name}</p>
                <p className="mt-0.5 break-words text-xs text-[hsl(var(--muted-foreground))]">
                  {a.email}
                </p>
                <p className="mt-3 text-sm text-[hsl(var(--primary))]">{jobTitle(a.jobId)}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {formatDate(a.appliedAt)}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" onClick={() => setSelected(a)}>
                    <Eye className="h-4 w-4" />
                    Details
                  </Button>
                  <a href={a.cvUrl} target="_blank" rel="noreferrer" className={linkButtonClass}>
                    <Download className="h-4 w-4" />
                    CV
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {selected && (
        <ApplicationDetailModal
          application={selected}
          jobTitle={jobTitle(selected.jobId)}
          onClose={() => setSelected(null)}
        />
      )}
    </AdminPanel>
  );
}