import { Button } from "./Button";
import { Modal } from "./Modal";

/** Mount it only while confirming: {toDelete && <ConfirmDialog ... />} */
export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
        {message}
      </p>
    </Modal>
  );
}