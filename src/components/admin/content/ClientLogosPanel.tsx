import { useState, type ChangeEvent, type FormEvent } from "react";
import { ImageIcon, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { mockClientLogos } from "@/data/adminMockData";
import type { ClientLogo } from "@/types/admin";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";
import { FormField, inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";

/* ---------- Add / edit form ---------- */
function LogoFormModal({
  logo,
  onSave,
  onClose,
}: {
  logo?: ClientLogo;
  onSave: (name: string, imageUrl: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(logo?.name ?? "");
  const [imageUrl, setImageUrl] = useState(logo?.imageUrl ?? "");
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Design phase: local preview only. The backend upload replaces this.
    setImageUrl(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, image: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = {
      name: name.trim() ? undefined : "Enter the client name.",
      image: imageUrl ? undefined : "Choose a logo image.",
    };
    setErrors(next);
    if (next.name || next.image) return;
    onSave(name.trim(), imageUrl);
  }

  return (
    <Modal
      title={logo ? "Edit logo" : "Add logo"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="logo-form">
            {logo ? "Save changes" : "Add logo"}
          </Button>
        </>
      }
    >
      <form id="logo-form" onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <FormField label="Client name" error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Al Noor Trading"
            className={inputClass}
          />
        </FormField>

        <FormField
          label="Logo image"
          hint="PNG, JPG or SVG. A transparent background works best."
          error={errors.image}
        >
          <div className="mt-2 grid aspect-[3/2] place-items-center overflow-hidden rounded-xl border border-dashed border-[hsl(var(--primary)/.25)] bg-[#eaf5f6]">
            {imageUrl ? (
              <img src={imageUrl} alt="Logo preview" className="h-full w-full object-contain p-4" />
            ) : (
              <ImageIcon className="h-8 w-8 text-[hsl(var(--muted-foreground))]" strokeWidth={1.5} />
            )}
          </div>
          <span className="focus-within:outline mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[hsl(var(--primary)/.18)] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary))] hover:border-[hsl(var(--accent)/.5)]">
            <Upload className="h-4 w-4" />
            {imageUrl ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
          </span>
        </FormField>
      </form>
    </Modal>
  );
}

/* ---------- Panel ---------- */
type FormState = { mode: "add" } | { mode: "edit"; logo: ClientLogo } | null;

export function ClientLogosPanel() {
  const [logos, setLogos] = useState<ClientLogo[]>(mockClientLogos);
  const [form, setForm] = useState<FormState>(null);
  const [toDelete, setToDelete] = useState<ClientLogo | null>(null);

  const addButton = (
    <Button onClick={() => setForm({ mode: "add" })}>
      <Plus className="h-4 w-4" />
      Add logo
    </Button>
  );

  function handleSave(name: string, imageUrl: string) {
    if (form?.mode === "edit") {
      const id = form.logo.id;
      setLogos((prev) => prev.map((l) => (l.id === id ? { ...l, name, imageUrl } : l)));
    } else {
      setLogos((prev) => [...prev, { id: crypto.randomUUID(), name, imageUrl }]);
    }
    setForm(null);
  }

  return (
    <AdminPanel
      title="Client logos"
      description="Logos shown in the clients section of the website."
      action={logos.length > 0 ? addButton : undefined}
    >
      {logos.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No client logos yet"
          text="Add the first logo and it will appear on the website."
          action={addButton}
        />
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo) => (
            <li
              key={logo.id}
              className="group overflow-hidden rounded-xl border border-[hsl(var(--primary)/.12)] bg-white hover:border-[hsl(var(--accent)/.5)]"
            >
              <div className="aspect-[3/2] bg-[#eaf5f6]">
                <img
                  src={logo.imageUrl}
                  alt={`${logo.name} logo`}
                  className="h-full w-full object-contain p-3"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="min-w-0 truncate text-sm font-semibold text-[hsl(var(--primary))]">
                  {logo.name}
                </p>
                <div className="flex gap-1.5">
                  <IconButton
                    label={`Edit ${logo.name}`}
                    onClick={() => setForm({ mode: "edit", logo })}
                  >
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    label={`Delete ${logo.name}`}
                    tone="danger"
                    onClick={() => setToDelete(logo)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {form && (
        <LogoFormModal
          logo={form.mode === "edit" ? form.logo : undefined}
          onSave={handleSave}
          onClose={() => setForm(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete logo?"
          message={`"${toDelete.name}" will be removed from the website. This can't be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            setLogos((prev) => prev.filter((l) => l.id !== toDelete.id));
            setToDelete(null);
          }}
        />
      )}
    </AdminPanel>
  );
}