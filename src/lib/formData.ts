/** "2026-11-05T09:30:00Z" -> "5 Nov 2026" */
export function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }