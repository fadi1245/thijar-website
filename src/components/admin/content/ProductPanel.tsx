import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ExternalLink, Globe, Monitor, Pencil, Plus, Trash2, Upload } from "lucide-react";
import type { ComponentType } from "react";
import { mockAppInstaller, mockWebAppUrl } from "@/data/adminMockData";

import type { AppInstaller } from "@/types/admin";
import { AdminPanel } from "../shared/AdminPanel";
import { Button, IconButton } from "../shared/Button";
import { ConfirmDialog } from "../shared/ConfirmDialog";
import { FormField, inputClass } from "../shared/FormField";
import { Modal } from "../shared/Modal";
import { formatFileSize } from "@/lib/formFileSize";
import { formatDate } from "@/lib/formData";

/* ---------- Small helper ---------- */
function ProductCard({
  icon: Icon,
  title,
  description,
  children,
  actions,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  children: ReactNode;
  actions: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-[hsl(var(--primary)/.12)] p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--primary)/.08)] text-[hsl(var(--accent))]">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-[hsl(var(--primary))]">{title}</h3>
          <p className="mt-0.5 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{description}</p>
        </div>
      </div>
      <div className="mt-5 flex-1">{children}</div>
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[hsl(var(--primary)/.1)] pt-4">
        {actions}
      </div>
    </div>
  );
}

/* ---------- Installer form ---------- */
function InstallerFormModal({
  current,
  onSave,
  onClose,
}: {
  current: AppInstaller | null;
  onSave: (data: AppInstaller) => void;
  onClose: () => void;
}) {
  const [version, setVersion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ version?: string; file?: string }>({});

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    if (picked) setErrors((prev) => ({ ...prev, file: undefined }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = {
      version: version.trim() ? undefined : "Enter the version number.",
      file: !file
        ? "Choose the installer file."
        : file.name.toLowerCase().endsWith(".exe")
          ? undefined
          : "The installer must be an .exe file.",
    };
    setErrors(next);
    if (next.version || next.file || !file) return;

    // Design phase: only the file's details are kept. The backend upload replaces this.
    onSave({
      fileName: file.name,
      sizeBytes: file.size,
      version: version.trim(),
      uploadedAt: new Date().toISOString(),
    });
  }

  return (
    <Modal
      title={current ? "Upload new version" : "Upload installer"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="installer-form">
            Upload
          </Button>
        </>
      }
    >
      <form id="installer-form" onSubmit={handleSubmit} className="grid gap-5" noValidate>
        <FormField
          label="Version"
          hint={current ? `Current version is ${current.version}.` : undefined}
          error={errors.version}
        >
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="e.g. 2.5.0"
            className={inputClass}
          />
        </FormField>

        <FormField
          label="Installer file"
          hint={current ? "This replaces the current installer on the website." : "Windows .exe file."}
          error={errors.file}
        >
          <span className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[hsl(var(--primary)/.25)] bg-[#eaf5f6] px-4 py-4 text-sm font-semibold text-[hsl(var(--primary))] hover:border-[hsl(var(--accent)/.5)]">
            <Upload className="h-4 w-4 shrink-0" />
            <span className="min-w-0 break-all">
              {file ? `${file.name} (${formatFileSize(file.size)})` : "Choose .exe file"}
            </span>
            <input type="file" accept=".exe" onChange={handleFile} className="sr-only" />
          </span>
        </FormField>
      </form>
    </Modal>
  );
}

/* ---------- Web link form ---------- */
function WebLinkFormModal({
  current,
  onSave,
  onClose,
}: {
  current: string;
  onSave: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(current);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = url.trim();
    let valid = false;
    try {
      const parsed = new URL(value);
      valid = parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      valid = false;
    }
    if (!valid) {
      setError("Enter a full link starting with https://");
      return;
    }
    onSave(value);
  }

  return (
    <Modal
      title={current ? "Change web app link" : "Add web app link"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="weblink-form">
            {current ? "Save link" : "Add link"}
          </Button>
        </>
      }
    >
      <form id="weblink-form" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Web application URL"
          hint="Visitors open this from the ERP page."
          error={error}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://app.thijar.com"
            className={inputClass}
          />
        </FormField>
      </form>
    </Modal>
  );
}

/* ---------- Panel ---------- */
type Dialog = "installer" | "link" | "remove-installer" | "remove-link" | null;

export function ProductPanel() {
  const [installer, setInstaller] = useState<AppInstaller | null>(mockAppInstaller);
  const [webUrl, setWebUrl] = useState(mockWebAppUrl);
  const [dialog, setDialog] = useState<Dialog>(null);

  return (
    <AdminPanel
      title="THIJAR ERP downloads"
      description="The installer and web link visitors use to get the product."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {/* Desktop app */}
        <ProductCard
          icon={Monitor}
          title="Windows desktop app"
          description="The installer visitors download from the ERP page."
          actions={
            installer ? (
              <>
                <Button variant="secondary" onClick={() => setDialog("installer")}>
                  <Upload className="h-4 w-4" />
                  Upload new version
                </Button>
                <IconButton
                  label="Remove installer"
                  tone="danger"
                  onClick={() => setDialog("remove-installer")}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </>
            ) : (
              <Button onClick={() => setDialog("installer")}>
                <Plus className="h-4 w-4" />
                Upload installer
              </Button>
            )
          }
        >
          {installer ? (
            <dl className="grid gap-3">
              <div>
                <dt className="text-xs text-[hsl(var(--muted-foreground))]">File</dt>
                <dd className="mt-0.5 break-all text-sm font-bold text-[hsl(var(--primary))]">
                  {installer.fileName}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">Version</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[hsl(var(--primary))]">
                    {installer.version}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">Size</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[hsl(var(--primary))]">
                    {formatFileSize(installer.sizeBytes)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[hsl(var(--muted-foreground))]">Uploaded</dt>
                  <dd className="mt-0.5 text-sm font-bold text-[hsl(var(--primary))]">
                    {formatDate(installer.uploadedAt)}
                  </dd>
                </div>
              </div>
            </dl>
          ) : (
            <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              No installer uploaded yet. Upload the .exe so visitors can download the app.
            </p>
          )}
        </ProductCard>

        {/* Web app */}
        <ProductCard
          icon={Globe}
          title="Web application"
          description="The link visitors open to use the ERP in the browser."
          actions={
            webUrl ? (
              <>
                <Button variant="secondary" onClick={() => setDialog("link")}>
                  <Pencil className="h-4 w-4" />
                  Change link
                </Button>
                <IconButton
                  label="Remove web app link"
                  tone="danger"
                  onClick={() => setDialog("remove-link")}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </>
            ) : (
              <Button onClick={() => setDialog("link")}>
                <Plus className="h-4 w-4" />
                Add link
              </Button>
            )
          }
        >
          {webUrl ? (
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Link</p>
              <a
                href={webUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-0.5 inline-flex max-w-full items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:underline"
              >
                <span className="break-all">{webUrl}</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[hsl(var(--accent))]" />
              </a>
            </div>
          ) : (
            <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">
              No web app link yet. Add the address where the ERP runs online.
            </p>
          )}
        </ProductCard>
      </div>

      {dialog === "installer" && (
        <InstallerFormModal
          current={installer}
          onSave={(data) => {
            setInstaller(data);
            setDialog(null);
          }}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog === "link" && (
        <WebLinkFormModal
          current={webUrl}
          onSave={(url) => {
            setWebUrl(url);
            setDialog(null);
          }}
          onClose={() => setDialog(null)}
        />
      )}

      {dialog === "remove-installer" && (
        <ConfirmDialog
          title="Remove installer?"
          message="The download button will stop working on the website until you upload a new installer."
          confirmLabel="Remove"
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            setInstaller(null);
            setDialog(null);
          }}
        />
      )}

      {dialog === "remove-link" && (
        <ConfirmDialog
          title="Remove web app link?"
          message="Visitors will no longer be able to open the web application from the website."
          confirmLabel="Remove"
          onCancel={() => setDialog(null)}
          onConfirm={() => {
            setWebUrl("");
            setDialog(null);
          }}
        />
      )}
    </AdminPanel>
  );
}