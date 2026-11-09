import { loginAdmin } from "@/lib/adminAuth";
import { useState, type FormEvent } from "react";

/* ---------- Shared classes ---------- */
const inputClass =
  "focus-ring mt-2 w-full rounded-xl border border-[hsl(var(--primary)/.18)] bg-white px-4 py-3 text-[15px] text-[hsl(var(--primary))] placeholder:text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--accent)/.5)]";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await loginAdmin(email, password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-svh place-items-center bg-[hsl(var(--primary))] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white p-6 shadow-sm sm:p-8">
        <p className="font-mono-brand text-[11px] font-semibold tracking-[.18em] text-[hsl(var(--accent))]">
          THIJAR ADMIN
        </p>
        <h1 className="font-display mt-4 text-3xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))]">
          Sign in
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
          Manage the website content, jobs and leads.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5" noValidate>
          <label className="block text-sm font-semibold text-[hsl(var(--primary))]">
            Email
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@thijar.com"
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-semibold text-[hsl(var(--primary))]">
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="focus-ring rounded-xl bg-[hsl(var(--primary))] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}