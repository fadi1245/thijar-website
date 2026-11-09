import type {
  AppInstaller,
  Application,
  ClientLogo,
  ContactInfoItem,
  Job,
  Lead,
} from "@/types/admin";

/* Design phase only: replaced by API calls once the backend exists. */

/* ---------- Website content ---------- */

// Placeholder "logo" images so the grid looks real without asset files.
const placeholderLogo = (text: string, bg: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="${bg}"/><text x="150" y="112" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff" text-anchor="middle">${text}</text></svg>`,
  );

export const mockClientLogos: ClientLogo[] = [
  { id: "logo-1", name: "Al Noor Trading", imageUrl: placeholderLogo("ANT", "#0f3d4c") },
  { id: "logo-2", name: "Gulf Retail Group", imageUrl: placeholderLogo("GRG", "#1f7a8c") },
  { id: "logo-3", name: "Kerala Foods", imageUrl: placeholderLogo("KF", "#3a6b5c") },
  { id: "logo-4", name: "Bahrain Logistics", imageUrl: placeholderLogo("BL", "#2c4a6e") },
  { id: "logo-5", name: "Oman Builders", imageUrl: placeholderLogo("OB", "#5b4a7a") },
];

export const mockContactInfo: ContactInfoItem[] = [
  { id: "contact-1", kind: "email", label: "Email", value: "thijarerp@gmail.com" },
  { id: "contact-2", kind: "phone", label: "Phone", value: "+971 00 000 0000" },
  {
    id: "contact-3",
    kind: "location",
    label: "Coverage",
    value: "India · Bahrain · Saudi Arabia · Oman · UAE",
  },
];

/* ---------- Jobs & careers ---------- */

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Accountant",
    location: "Kochi, India",
    employmentType: "Full-time",
    experience: "4-6",
    description:
      "Own month-end close, VAT filing and financial reporting for a portfolio of clients across the GCC.\nWork closely with auditors and the ERP implementation team.",
    status: "open",
  },
  {
    id: "job-2",
    title: "ERP Implementation Consultant",
    location: "Dubai, UAE",
    employmentType: "Full-time",
    experience: "2-4",
    description:
      "Configure THIJAR ERP for new clients, run training sessions and support go-live. Experience with ZATCA e-invoicing is a plus.",
    status: "open",
  },
  {
    id: "job-3",
    title: "Audit Associate",
    location: "Manama, Bahrain",
    employmentType: "Contract",
    experience: "1-3",
    description:
      "Support statutory and internal audit engagements, prepare working papers and communicate findings to the engagement lead.",
    status: "closed",
  },
  {
    id: "job-4",
    title: "Frontend Developer Intern",
    location: "Remote",
    employmentType: "Internship",
    experience: "0-1",
    description:
      "Help build and polish internal tools in React and TypeScript, working alongside the product team.",
    status: "open",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    phone: "+91 98470 00001",
    coverNote:
      "I have five years of experience in GCC VAT compliance and month-end reporting, and I'm keen to move into a role with more client exposure.",
    cvUrl: "#",
    appliedAt: "2026-11-05T09:30:00Z",
  },
  {
    id: "app-2",
    jobId: "job-1",
    name: "Rohan Menon",
    email: "rohan.menon@example.com",
    phone: "+91 98470 00002",
    coverNote: "Chartered accountant with a background in a Big Four audit team.",
    cvUrl: "#",
    appliedAt: "2026-11-03T14:10:00Z",
  },
  {
    id: "app-3",
    jobId: "job-2",
    name: "Fatima Al Zahra",
    email: "fatima.alzahra@example.com",
    phone: "+971 50 000 0003",
    coverNote:
      "I've led three ERP rollouts for retail clients and have worked with ZATCA Phase 2 integrations.",
    cvUrl: "#",
    appliedAt: "2026-11-02T08:45:00Z",
  },
  {
    id: "app-4",
    jobId: "job-4",
    name: "Nikhil Das",
    email: "nikhil.das@example.com",
    phone: "+91 98470 00004",
    coverNote: "Final-year computer science student. My portfolio is linked in the CV.",
    cvUrl: "#",
    appliedAt: "2026-10-30T17:20:00Z",
  },
  {
    id: "app-5",
    jobId: "job-3",
    name: "Omar Khalid",
    email: "omar.khalid@example.com",
    phone: "+973 3600 0005",
    coverNote: "",
    cvUrl: "#",
    appliedAt: "2026-10-21T11:00:00Z",
  },
  {
    id: "app-6",
    jobId: "job-2",
    name: "Sreelakshmi P",
    email: "sreelakshmi.p@example.com",
    phone: "+91 98470 00006",
    coverNote: "Two years of implementation experience with Tally and Zoho Books.",
    cvUrl: "#",
    appliedAt: "2026-10-18T10:05:00Z",
  },
];

/* ---------- Leads ---------- */

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Mohammed Al Harbi",
    email: "m.alharbi@example.com",
    phone: "+966 50 000 0001",
    company: "Al Harbi Supermarkets",
    service: "ERP software",
    phoneConsent: true,
    message:
      "We run a chain of four supermarkets in Riyadh and need an ERP with ZATCA Phase 2 e-invoicing. Could someone call me this week to discuss pricing and the POS option?",
    status: "new",
    receivedAt: "2026-11-07T16:42:00Z",
  },
  {
    id: "lead-2",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 98470 10002",
    company: "Nair Precision Works",
    service: "Tax & GST",
    phoneConsent: false,
    message: "Looking for a chartered accountant to handle GST filing and annual audit for our small manufacturing unit in Kochi. Please reply by email.",
    status: "new",
    receivedAt: "2026-11-06T10:15:00Z",
  },
  {
    id: "lead-3",
    name: "Daniel Fernandes",
    email: "daniel.f@example.com",
    phone: "+971 55 000 0003",
    service: "ERP software",
    phoneConsent: true,
    message: "Interested in a demo of the ERP for a trading company in Dubai.",
    status: "contacted",
    receivedAt: "2026-11-04T13:30:00Z",
  },
  {
    id: "lead-4",
    name: "Sana Ibrahim",
    email: "sana.ibrahim@example.com",
    phone: "+973 3600 0004",
    company: "Ibrahim Trading WLL",
    service: "Accounting & bookkeeping",
    phoneConsent: false,
    message:
      "We are setting up a new company in Bahrain and need help with VAT registration and bookkeeping. Please share your service packages.",
    status: "contacted",
    receivedAt: "2026-11-01T09:05:00Z",
  },
  {
    id: "lead-5",
    name: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 98470 10005",
    phoneConsent: true,
    message: "Do you support migrating data from Tally into your ERP?",
    status: "closed",
    receivedAt: "2026-10-26T15:50:00Z",
  },
  {
    id: "lead-6",
    name: "Layla Hassan",
    email: "layla.hassan@example.com",
    phone: "+968 9000 0006",
    company: "Hassan Logistics",
    service: "Audit",
    phoneConsent: true,
    message: "Requesting a quote for internal audit services for our logistics company in Muscat.",
    status: "closed",
    receivedAt: "2026-10-19T11:20:00Z",
  },
];

/* ---------- Company product (ERP) ---------- */

export const mockAppInstaller: AppInstaller | null = {
  fileName: "THIJAR-ERP-Setup.exe",
  sizeBytes: 86_245_000,
  version: "2.4.1",
  uploadedAt: "2026-10-28T12:00:00Z",
};

export const mockWebAppUrl = "https://app.thijar.com";