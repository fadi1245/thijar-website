import { useState, type FormEvent } from "react";
import {
  EMPLOYMENT_TYPES,
  JOB_STATUSES,
  type EmploymentType,
  type Job,
  type JobStatus,
} from "@/types/admin";
import { Button } from "../shared/Button";
import { FormField, inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";

type JobData = Omit<Job, "id">;
type Errors = Partial<Record<"title" | "location" | "experience" | "description", string>>;

export function JobFormModal({
  job,
  onSave,
  onClose,
}: {
  job?: Job;
  onSave: (data: JobData) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(job?.title ?? "");
  const [location, setLocation] = useState(job?.location ?? "");
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    job?.employmentType ?? "Full-time",
  );
  const [experience, setExperience] = useState(job?.experience ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [status, setStatus] = useState<JobStatus>(job?.status ?? "open");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      title: title.trim() ? undefined : "Enter the job title.",
      location: location.trim() ? undefined : "Enter the location.",
      experience: experience.trim() ? undefined : "Enter the experience needed.",
      description: description.trim() ? undefined : "Enter a short description.",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    onSave({
      title: title.trim(),
      location: location.trim(),
      employmentType,
      experience: experience.trim(),
      description: description.trim(),
      status,
    });
  }

  return (
    <Modal
      title={job ? "Edit job" : "Add job"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="job-form">
            {job ? "Save changes" : "Add job"}
          </Button>
        </>
      }
    >
      <form id="job-form" onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <FormField label="Job title" error={errors.title}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Accountant"
            className={inputClass}
          />
        </FormField>

        <FormField label="Location" error={errors.location}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kochi, India"
            className={inputClass}
          />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Employment type">
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
              className={inputClass}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Experience (years)"
            hint='Shown as "2-4 Years Experience".'
            error={errors.experience}
          >
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2-4"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Description" error={errors.description}>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What the role involves and what you are looking for."
            className={inputClass}
          />
        </FormField>

        <FormField
          label="Status"
          hint="Only open jobs appear on the careers page."
        >
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
            className={inputClass}
          >
            {JOB_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "open" ? "Open" : "Closed"}
              </option>
            ))}
          </select>
        </FormField>
      </form>
    </Modal>
  );
}