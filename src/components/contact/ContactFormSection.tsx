import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
// Deploy → New deployment → Web app → "Anyone" access → copy /exec URL
// ─────────────────────────────────────────────────────────────
const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzI7P7fVYVWEDLNIeDQooqWvHtMeYyqqF_o84_J8xKYQKqKeEpGiXJb1yrgtc1EuvWD/exec";

type Status = "idle" | "sending" | "sent" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9\s\-()+]+$/;

const SERVICES = [
  "Accounting Services",
  "Tax Consultation",
  "Auditing",
  "ERP Software",
  "Custom Software",
  "E-Commerce",
  "Company Formation",
  "Other",
];

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+973", label: "🇧🇭 +973" },
  { code: "+968", label: "🇴🇲 +968" },
  { code: "+974", label: "🇶🇦 +974" },
  { code: "+965", label: "🇰🇼 +965" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
];

const inputClass =
  "focus-ring w-full rounded-lg border border-[hsl(var(--border))] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]";
const labelClass = "grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]";
const optionalTag = <span className="font-normal text-[hsl(var(--muted-foreground))]">(optional)</span>;

export function ContactFormSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot — real users never touch this
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setCompany("");
    setCountryCode("");
    setPhone("");
    setService("");
    setMessage("");
    setConsent(false);
    setWebsite("");
  };

  const fail = (msg: string) => {
    setErrorMessage(msg);
    setStatus("error");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: if the hidden field is filled it's almost certainly a bot.
    // Pretend success so the bot learns nothing, but don't send anything.
    if (website.trim()) {
      setStatus("sent");
      resetForm();
      return;
    }

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      return fail("Please fill in all required fields.");
    }
    if (!emailRegex.test(email.trim())) {
      return fail("Please enter a valid email address.");
    }
    if (phone.trim() && !countryCode) {
      return fail("Please select a country code.");
    }
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      return fail("Please enter a valid phone number.");
    }

    setStatus("sending");
    setErrorMessage("");
    try {
      await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script doesn't return CORS headers; response is opaque
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          phone: phone.trim() ? `${countryCode} ${phone.trim()}` : "",
          service,
          message: message.trim(),
          consent,
          submittedAt: new Date().toISOString(),
          source: "Website Contact Form",
          website,
        }),
      });
      setStatus("sent");
      resetForm();
    } catch (err) {
      console.error(err);
      fail("Something went wrong while sending. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl bg-[#eaf5f6] p-6 md:p-10">
      {status === "sent" ? (
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
            onClick={() => setStatus("idle")}
            className="focus-ring mt-8 w-fit text-sm font-bold text-[hsl(var(--primary))] underline underline-offset-4"
            data-testid="button-contact-another"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
          {/* Honeypot — hidden from real users and assistive tech */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Full name
              <input
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Your full name"
                data-testid="input-contact-name"
              />
            </label>

            <label className={labelClass}>
              Work email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@company.com"
                data-testid="input-contact-email"
              />
            </label>
          </div>

          <label className={labelClass}>
            <span>Company {optionalTag}</span>
            <input
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              placeholder="Company name"
              data-testid="input-contact-company"
            />
          </label>

          <div className="grid gap-2 text-xs font-semibold text-[hsl(var(--primary))]">
            <label htmlFor="phone">Phone {optionalTag}</label>
            <div className="flex gap-2">
              <select
                id="countryCode"
                aria-label="Country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="focus-ring w-28 shrink-0 rounded-lg border border-[hsl(var(--border))] bg-white px-2 py-3 text-sm font-normal outline-none focus:border-[hsl(var(--accent))]"
                data-testid="select-contact-country-code"
              >
                <option value="">Code</option>
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${inputClass} min-w-0 flex-1`}
                placeholder="Phone number"
                data-testid="input-contact-phone"
              />
            </div>
            {phone.trim() && !countryCode && (
              <p className="text-xs font-normal text-red-500">
                Please select a country code for your number.
              </p>
            )}
          </div>

          <label className={labelClass}>
            <span>Service interested in {optionalTag}</span>
            <select
              name="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={inputClass}
              data-testid="select-contact-service"
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            What can we help with?
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="Tell us a little about your goals or the challenge..."
              data-testid="input-contact-message"
            />
          </label>

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--accent))]"
              data-testid="checkbox-contact-consent"
            />
            I agree to be contacted by phone on the number I've provided, if needed.
          </label>

          {status === "error" && (
            <p className="text-xs font-medium text-red-500" role="alert">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[hsl(var(--accent))] disabled:cursor-not-allowed disabled:opacity-70"
            data-testid="button-contact-submit"
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
            {status !== "sending" && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      )}
    </div>
  );
}