import { useState, type FormEvent } from "react";
import { Info, Mail, MapPin, Pencil, Phone, Plus, Trash2 } from "lucide-react";
import type { ComponentType } from "react";
import { mockContactInfo } from "@/data/adminMockData";
import { CONTACT_KINDS, type ContactInfoItem, type ContactKind } from "@/types/admin";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { EmptyState } from "../shared/EmptyState";
import { FormField, inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";

/* ---------- Content ---------- */
const kindMeta: Record<
  ContactKind,
  { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }> }
> = {
  email: { label: "Email", icon: Mail },
  phone: { label: "Phone", icon: Phone },
  location: { label: "Location", icon: MapPin },
  other: { label: "Other", icon: Info },
};

/* ---------- Add / edit form ---------- */
function ContactFormModal({
  item,
  onSave,
  onClose,
}: {
  item?: ContactInfoItem;
  onSave: (data: Omit<ContactInfoItem, "id">) => void;
  onClose: () => void;
}) {
  const [kind, setKind] = useState<ContactKind>(item?.kind ?? "email");
  const [label, setLabel] = useState(item?.label ?? "");
  const [value, setValue] = useState(item?.value ?? "");
  const [errors, setErrors] = useState<{ label?: string; value?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = {
      label: label.trim() ? undefined : "Enter a label.",
      value: value.trim() ? undefined : "Enter the contact detail.",
    };
    setErrors(next);
    if (next.label || next.value) return;
    onSave({ kind, label: label.trim(), value: value.trim() });
  }

  return (
    <Modal
      title={item ? "Edit contact detail" : "Add contact detail"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="contact-form">
            {item ? "Save changes" : "Add detail"}
          </Button>
        </>
      }
    >
      <form id="contact-form" onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <FormField label="Type" hint="Sets the icon shown on the website.">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as ContactKind)}
            className={inputClass}
          >
            {CONTACT_KINDS.map((k) => (
              <option key={k} value={k}>
                {kindMeta[k].label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Label" error={errors.label}>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Sales email"
            className={inputClass}
          />
        </FormField>

        <FormField label="Detail" error={errors.value}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. sales@thijar.com"
            className={inputClass}
          />
        </FormField>
      </form>
    </Modal>
  );
}

/* ---------- Panel ---------- */
type FormState = { mode: "add" } | { mode: "edit"; item: ContactInfoItem } | null;

export function ContactInfoPanel() {
  const [items, setItems] = useState<ContactInfoItem[]>(mockContactInfo);
  const [form, setForm] = useState<FormState>(null);
  const [toDelete, setToDelete] = useState<ContactInfoItem | null>(null);

  const addButton = (
    <Button onClick={() => setForm({ mode: "add" })}>
      <Plus className="h-4 w-4" />
      Add detail
    </Button>
  );

  function handleSave(data: Omit<ContactInfoItem, "id">) {
    if (form?.mode === "edit") {
      const id = form.item.id;
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
    } else {
      setItems((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
    }
    setForm(null);
  }

  return (
    <AdminPanel
      title="Contact information"
      description="Details shown on the Contact us page."
      action={items.length > 0 ? addButton : undefined}
    >
      {items.length === 0 ? (
        <EmptyState
          icon={Phone}
          title="No contact details yet"
          text="Add an email, phone number or address for visitors."
          action={addButton}
        />
      ) : (
        <ul className="grid gap-3">
          {items.map((item) => {
            const Icon = kindMeta[item.kind].icon;
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-[hsl(var(--primary)/.12)] p-4 hover:border-[hsl(var(--accent)/.5)]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--accent))]">
                  <Icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{item.label}</p>
                  <p className="mt-0.5 break-words text-sm font-bold text-[hsl(var(--primary))]">
                    {item.value}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <IconButton label={`Edit ${item.label}`} onClick={() => setForm({ mode: "edit", item })}>
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <IconButton label={`Delete ${item.label}`} tone="danger" onClick={() => setToDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                  </IconButton>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {form && (
        <ContactFormModal
          item={form.mode === "edit" ? form.item : undefined}
          onSave={handleSave}
          onClose={() => setForm(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete contact detail?"
          message={`"${toDelete.label}" will be removed from the website. This can't be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            setItems((prev) => prev.filter((i) => i.id !== toDelete.id));
            setToDelete(null);
          }}
        />
      )}
    </AdminPanel>
  );
}