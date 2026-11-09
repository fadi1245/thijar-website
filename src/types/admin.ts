export const ADMIN_TABS = ["content", "careers", "leads"] as const;
export type AdminTab = (typeof ADMIN_TABS)[number];

/* ---------- Website content ---------- */
export interface ClientLogo {
  id: string;
  name: string;
  imageUrl: string;
}

export const CONTACT_KINDS = ["email", "phone", "location", "other"] as const;
export type ContactKind = (typeof CONTACT_KINDS)[number];

export interface ContactInfoItem {
  id: string;
  kind: ContactKind;
  label: string;
  value: string;
}

/* ---------- Jobs & careers ---------- */
export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const JOB_STATUSES = ["open", "closed"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  /** Shown on the site as "{experience} Years Experience", e.g. "2-4" */
  experience: string;
  description: string;
  status: JobStatus;
}

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  coverNote: string;
  cvUrl: string;
  /** ISO date string */
  appliedAt: string;
}

/* ---------- Leads ---------- */
export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** A submission from the Contact us form */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** Optional on the form */
  company?: string;
  /** Optional on the form, e.g. "ERP software" */
  service?: string;
  /** Checkbox on the form: true = OK to contact by phone */
  phoneConsent: boolean;
  message: string;
  status: LeadStatus;
  /** ISO date string */
  receivedAt: string;
}

/* ---------- Company product (ERP) ---------- */
export interface AppInstaller {
  fileName: string;
  sizeBytes: number;
  version: string;
  /** ISO date string */
  uploadedAt: string;
}