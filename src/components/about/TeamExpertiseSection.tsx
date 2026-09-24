import {
    Building2,
    FileText,
    ShieldCheck,
    Code2,
    MonitorSmartphone,
    TrendingUp,
  } from "lucide-react";
  
  import { SectionLabel } from "../shared/SectionLabel";
  
  const expertiseAreas = [
    {
      number: "01",
      icon: Building2,
      title: "Chartered Accountants (CAs)",
      description:
        "Certified public accountants and registered practitioners from India, Saudi Arabia, Egypt, Sudan, and Yemen, delivering comprehensive cross-border compliance.",
      tags: ["50+ Personnel", "SOCPA / ICAI"],
    },
    {
      number: "02",
      icon: FileText,
      title: "Tax Advisors & Compliance",
      description:
        "Specialized squads ensuring complete regional coverage for VAT filing, Corporate Income Tax, and Zakat calculations across Gulf markets.",
      tags: ["ZATCA Compliant", "FTA & NBR"],
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Internal Auditors & Risk",
      description:
        "Independent institutional auditors delivering forensic reviews, internal process controls, and verified audit statements for statutory boards.",
      tags: ["Statutory Audits", "ISO 27001 Protocol"],
    },
    {
      number: "04",
      icon: Code2,
      title: "Software Engineers & Architects",
      description:
        "Core systems developers building low-latency database engines, automated general ledgers, and secure cloud API integrations for multi-entity setups.",
      tags: ["ERP Kernel", "Cloud Native"],
    },
    {
      number: "05",
      icon: MonitorSmartphone,
      title: "Web & Mobile Developers",
      description:
        "UI/UX designers and client-side engineers building intuitive portals, POS terminals, and mobile applications for operational visibility.",
      tags: ["Tailored Dashboards", "iOS & Android"],
    },
    {
      number: "06",
      icon: TrendingUp,
      title: "Growth & Advisory Specialists",
      description:
        "Go-to-market advisors who guide brand positioning, corporate expansion into new Gulf territories, and commercial infrastructure setup.",
      tags: ["Market Entry", "GCC Operations"],
    },
  ];
  
  export function TeamExpertiseSection() {
    return (
      <section className="bg-[hsl(var(--primary))] py-24 md:py-32">
        <div className="container-tajin">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-start">
            <div>
              <SectionLabel light>TALENT & EXPERTISE</SectionLabel>
  
              <h2 className="font-display mt-5 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-white md:text-5xl">
                Specialists who understand both the regulatory ledger and digital
                code.
              </h2>
            </div>
  
            <p className="max-w-md text-[15px] leading-7 text-white/65">
              Over 50 certified professionals working across jurisdictional
              boundaries, merging technical accounting rigor with modern software
              architecture.
            </p>
          </div>
  
          <div className="mt-16 border-t border-white/10 md:grid md:grid-flow-col md:grid-cols-2 md:grid-rows-3 md:gap-x-16 md:border-t-0">
            {expertiseAreas.map((item, index) => {
              const Icon = item.icon;
  
              return (
                <div
                  key={item.title}
                  className={`group grid gap-6 border-b border-white/10 py-3 transition-colors duration-300 hover:bg-white/[0.03] md:grid-cols-[auto_1fr] md:items-center md:gap-6 ${
                    index === 0 || index === 3 ? "md:border-t md:border-white/10" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Icon className="h-4 w-4 text-[hsl(var(--accent))]" />
                  </div>
  
                  <div>
                    <h3 className="text-lg font-bold text-white md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }