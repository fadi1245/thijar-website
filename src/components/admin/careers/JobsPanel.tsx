import { useState, type Dispatch, type SetStateAction } from "react";
import { Briefcase, Clock, MapPin, Pencil, Plus, Trash2, Users } from "lucide-react";
import type { ReactNode } from "react";
import { mockApplications } from "@/data/adminMockData";
import type { Job } from "@/types/admin";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";
import { StatusPill } from "../shared/StatusPill";
import { JobFormModal } from "./JobFormModal";

/* ---------- Small helper ---------- */
function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-lg bg-[#eaf5f6] px-3 py-1.5 text-[13px] font-medium text-[hsl(var(--primary))]">
      <span className="text-[hsl(var(--accent))]">{icon}</span>
      {children}
    </li>
  );
}

type FormState = { mode: "add" } | { mode: "edit"; job: Job } | null;

export function JobsPanel({
  jobs,
  setJobs,
}: {
  jobs: Job[];
  setJobs: Dispatch<SetStateAction<Job[]>>;
}) {
  const [form, setForm] = useState<FormState>(null);
  const [toDelete, setToDelete] = useState<Job | null>(null);

  const addButton = (
    <Button onClick={() => setForm({ mode: "add" })}>
      <Plus className="h-4 w-4" />
      Add job
    </Button>
  );

  const applicationCount = (jobId: string) =>
    mockApplications.filter((a) => a.jobId === jobId).length;

  function handleSave(data: Omit<Job, "id">) {
    if (form?.mode === "edit") {
      const id = form.job.id;
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...data } : j)));
    } else {
      setJobs((prev) => [{ id: crypto.randomUUID(), ...data }, ...prev]);
    }
    setForm(null);
  }

  const openCount = jobs.filter((j) => j.status === "open").length;

  return (
    <AdminPanel
      title="Job listings"
      description={`${jobs.length} ${jobs.length === 1 ? "job" : "jobs"}, ${openCount} open and visible on the careers page.`}
      action={jobs.length > 0 ? addButton : undefined}
    >
      {jobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs yet"
          text="Add a job and, once it is open, it will appear on the careers page."
          action={addButton}
        />
      ) : (
        <ul className="grid gap-4">
          {jobs.map((job) => {
            const count = applicationCount(job.id);
            return (
              <li
                key={job.id}
                className="relative overflow-hidden rounded-xl border border-[hsl(var(--primary)/.12)] bg-white hover:border-[hsl(var(--accent)/.5)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-[hsl(var(--accent))]"
                />
                <div className="flex flex-col gap-4 p-5 pl-6 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="break-words text-lg font-bold leading-snug text-[hsl(var(--primary))]">
                        {job.title}
                      </h3>
                      <StatusPill tone={job.status === "open" ? "green" : "slate"}>
                        {job.status === "open" ? "Open" : "Closed"}
                      </StatusPill>
                    </div>

                    <ul className="mt-3 flex flex-wrap gap-2">
                      <MetaItem icon={<MapPin className="h-4 w-4" />}>{job.location}</MetaItem>
                      <MetaItem icon={<Briefcase className="h-4 w-4" />}>
                        {job.employmentType}
                      </MetaItem>
                      <MetaItem icon={<Clock className="h-4 w-4" />}>
                        {job.experience} Years Experience
                      </MetaItem>
                      <MetaItem icon={<Users className="h-4 w-4" />}>
                        {count} {count === 1 ? "application" : "applications"}
                      </MetaItem>
                    </ul>

                    <p className="mt-4 line-clamp-2 max-w-2xl whitespace-pre-line break-words text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-1.5">
                    <IconButton label={`Edit ${job.title}`} onClick={() => setForm({ mode: "edit", job })}>
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={`Delete ${job.title}`} tone="danger" onClick={() => setToDelete(job)}>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {form && (
        <JobFormModal
          job={form.mode === "edit" ? form.job : undefined}
          onSave={handleSave}
          onClose={() => setForm(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete job?"
          message={`"${toDelete.title}" will be removed from the careers page. This can't be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            setJobs((prev) => prev.filter((j) => j.id !== toDelete.id));
            setToDelete(null);
          }}
        />
      )}
    </AdminPanel>
  );
}