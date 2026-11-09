import type { LeadStatus } from "@/types/admin";

export const leadStatusMeta: Record<
  LeadStatus,
  { label: string; tone: "amber" | "blue" | "slate" }
> = {
  new: { label: "New", tone: "amber" },
  contacted: { label: "Contacted", tone: "blue" },
  closed: { label: "Closed", tone: "slate" },
};