import { useState } from "react";
import { mockJobs } from "@/data/adminMockData";
import type { Job } from "@/types/admin";
import { AdminPageHeader } from "../AdminPageHeader";
import { SubTabs } from "../shared/SubTabs";
import { JobsPanel } from "./JobsPanel";
import { ApplicationsPanel } from "./ApplicationPanel";

type View = "jobs" | "applications";

const views: { id: View; label: string }[] = [
  { id: "jobs", label: "Jobs" },
  { id: "applications", label: "Applications" },
];

export function CareersTab() {
  const [view, setView] = useState<View>("jobs");
  // Held here so both views share the same jobs (titles, filter options)
  const [jobs, setJobs] = useState<Job[]>(mockJobs);

  return (
    <>
      <AdminPageHeader
        title="Jobs & careers"
        description="Manage job listings and review applications."
      />
      <SubTabs items={views} value={view} onChange={setView} />
      {view === "jobs" ? (
        <JobsPanel jobs={jobs} setJobs={setJobs} />
      ) : (
        <ApplicationsPanel jobs={jobs} />
      )}
    </>
  );
}