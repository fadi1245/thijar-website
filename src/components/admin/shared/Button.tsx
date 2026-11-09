import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-[hsl(var(--primary))] text-white hover:opacity-90",
  secondary:
    "border border-[hsl(var(--primary)/.18)] bg-white text-[hsl(var(--primary))] hover:border-[hsl(var(--accent)/.5)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      type={type}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

/** Small square button for edit / delete actions. `label` is required for screen readers. */
export function IconButton({
  label,
  tone = "default",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`focus-ring grid h-9 w-9 place-items-center rounded-lg border border-[hsl(var(--primary)/.14)] bg-white transition ${
        tone === "danger"
          ? "text-red-600 hover:border-red-300 hover:bg-red-50"
          : "text-[hsl(var(--primary))] hover:border-[hsl(var(--accent)/.5)]"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}