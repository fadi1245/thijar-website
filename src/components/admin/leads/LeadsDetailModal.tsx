import { Mail, Trash2 } from "lucide-react";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/types/admin";
import { Button } from "../shared/Button";
import { FormField, inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";
import { StatusPill } from "../shared/StatusPill";
import { leadStatusMeta } from "./LeadStatus";
import { formatDate } from "@/lib/formData";

const linkButtonClass =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90";

export function LeadDetailModal({
  lead,
  onStatusChange,
  onDelete,
  onClose,
}: {
  lead: Lead;
  onStatusChange: (status: LeadStatus) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      title={lead.name}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onDelete} className="mr-auto text-red-600">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <a href={`mailto:${lead.email}`} className={linkButtonClass}>
            <Mail className="h-4 w-4" />
            Reply
          </a>
        </>
      }
    >
      <dl className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[hsl(var(--muted-foreground))]">Email</dt>
            <dd className="mt-0.5 break-words text-sm font-bold text-[hsl(var(--primary))]">
              <a href={`mailto:${lead.email}`} className="hover:underline">
                {lead.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[hsl(var(--muted-foreground))]">Phone</dt>
            <dd className="mt-0.5 text-sm font-bold text-[hsl(var(--primary))]">
              <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="hover:underline">
                {lead.phone}
              </a>
              <span className="mt-1.5 block">
                <StatusPill tone={lead.phoneConsent ? "green" : "slate"}>
                  {lead.phoneConsent ? "OK to call" : "Email only, no calls"}
                </StatusPill>
              </span>
            </dd>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[hsl(var(--muted-foreground))]">Company</dt>
            <dd className="mt-0.5 break-words text-sm font-bold text-[hsl(var(--primary))]">
              {lead.company || "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[hsl(var(--muted-foreground))]">Service interested in</dt>
            <dd className="mt-0.5 break-words text-sm font-bold text-[hsl(var(--primary))]">
              {lead.service || "Not specified"}
            </dd>
          </div>
        </div>

        <div>
          <dt className="text-xs text-[hsl(var(--muted-foreground))]">Received</dt>
          <dd className="mt-0.5 text-sm font-bold text-[hsl(var(--primary))]">
            {formatDate(lead.receivedAt)}
          </dd>
        </div>

        <div>
          <dt className="text-xs text-[hsl(var(--muted-foreground))]">Message</dt>
          <dd className="mt-1 whitespace-pre-line break-words text-sm leading-6 text-[hsl(var(--primary))]">
            {lead.message}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[hsl(var(--primary)/.12)] pt-5">
        <FormField label="Status" hint="Track where this lead stands. Only visible to you.">
          <select
            value={lead.status}
            onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
            className={inputClass}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {leadStatusMeta[s].label}
              </option>
            ))}
          </select>
        </FormField>
      </div>
    </Modal>
  );
}