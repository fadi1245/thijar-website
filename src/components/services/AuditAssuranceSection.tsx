import {
    ClipboardCheck,
    Shield,
    Package,
  } from "lucide-react";
  import { SectionLabel } from "../shared/SectionLabel";
  
  const auditServices = [
    {
      icon: ClipboardCheck,
      title: "Statutory Audits",
      description:
        "Annual financial audit reports signed by licensed practitioners for banks, ministries, and business partners.",
    },
    {
      icon: Shield,
      title: "Internal Controls",
      description:
        "Practical reviews to identify payment risks, improve billing checkpoints, and strengthen operational controls.",
    },
    {
      icon: Package,
      title: "Stock Verification",
      description:
        "Physical inventory verification and warehouse checks to ensure recorded stock matches actual assets.",
    },
  ];
  
  export function AuditAssuranceSection() {
    return (
      <section className="py-8 md:py-8">
        <div className="container-tajin">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* Left Content */}
            <div>
              {/* <SectionLabel>SERVICE 03</SectionLabel> */}
  
              <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
                Auditing & Assurance
              </h2>
  
              <div className="mt-8 space-y-6 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
                <p>
                  Independent, hassle-free statutory audits, internal control
                  reviews, and stock verification services that provide
                  stakeholders, banks, and regulators with confidence in your
                  financial reporting.
                </p>
  
                <p>
                  We keep the process collaborative and efficient, helping you
                  address compliance gaps early and strengthen operational
                  transparency across your organization.
                </p>
              </div>
  
              <div className="mt-15 flex flex-wrap gap-3">
                <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  IFRS & LOCAL STANDARDS
                </span>
  
                <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  BANK & TENDER READY
                </span>
              </div>
            </div>
  
            {/* Right Cards */}
            <div className="flex flex-col gap-5">
              {auditServices.map((item) => {
                const Icon = item.icon;
  
                return (
                  <div
                    key={item.title}
                    className="flex gap-5 rounded-3xl border border-[hsl(var(--border))] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.08)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                    </div>
  
                    <div>
                      <h3 className="text-xl font-bold leading-tight text-[hsl(var(--primary))] sm:text-xl">
                        {item.title}
                      </h3>
  
                      <p className="mt-3 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }