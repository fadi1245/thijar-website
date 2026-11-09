import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Mount it only while it should be visible: {editing && <Modal ...>}.
 * That way any form state inside starts fresh each time it opens.
 */
export function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Keep the latest onClose without re-running the effect on every render
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative flex max-h-[90svh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-xl outline-none"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[hsl(var(--primary)/.12)] px-5 py-4 sm:px-6">
          <h2 className="font-display text-xl font-extrabold tracking-[-.03em] text-[hsl(var(--primary))]">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="focus-ring rounded-lg p-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-[hsl(var(--primary)/.12)] px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}