import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

export function ContactFormSection() {
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl bg-[#eaf5f6] p-6 md:p-10">
      {sent ? (
        <div className="flex min-h-[360px] flex-col justify-center">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[hsl(var(--accent))] text-white">
            <Check />
          </div>

          <h2 className="font-display mt-7 text-3xl font-extrabold tracking-[-.04em] text-[hsl(var(--primary))]">
            Thank you — we'll be in touch.
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">
            Your enquiry is ready for the right TAJIN team member. Expect a
            considered response, not a hand-off.
          </p>

          <button
            type="button"
            onClick={() => setSent(false)}
            className="focus-ring mt-8 w-fit text-sm font-bold text-[hsl(var(--primary))] underline underline-offset-4"
            data-testid="button-contact-another"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
          className="grid gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]">
              Name
              <input
                required
                name="name"
                className="focus-ring rounded-lg border border-[hsl(var(--border))] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]"
                placeholder="Your name"
                data-testid="input-contact-name"
              />
            </label>

            <label className="grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]">
              Work email
              <input
                required
                type="email"
                name="email"
                className="focus-ring rounded-lg border border-[hsl(var(--border))] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]"
                placeholder="you@company.com"
                data-testid="input-contact-email"
              />
            </label>
          </div>

          <label className="grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]">
            Company
            <input
              name="company"
              className="focus-ring rounded-lg border border-[hsl(var(--border))] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]"
              placeholder="Company name"
              data-testid="input-contact-company"
            />
          </label>

          <label className="grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]">
            What can we help with?
            <textarea
              required
              name="message"
              rows={5}
              className="focus-ring resize-none rounded-lg border border-[hsl(var(--border))] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]"
              placeholder="Tell us a little about your goals or the challenge..."
              data-testid="input-contact-message"
            />
          </label>

          <button
            type="submit"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[hsl(var(--accent))]"
            data-testid="button-contact-submit"
          >
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}