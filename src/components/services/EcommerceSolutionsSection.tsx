import {
    Store,
    CreditCard,
    Truck,
    ReceiptText,
  } from "lucide-react";
  import { SectionLabel } from "../shared/SectionLabel";
  
  const ecommerceServices = [
    {
      icon: Store,
      title: "Storefront Setup",
      description:
        "Fast, mobile-friendly online stores with multi-currency support and Arabic/English language options.",
    },
    {
      icon: CreditCard,
      title: "Payment Gateways",
      description:
        "Integrate Mada, BenefitPay, KNET, Razorpay, Apple Pay, and major credit card payment providers.",
    },
    {
      icon: Truck,
      title: "Courier Integration",
      description:
        "Automated shipping labels, tracking updates, and integrations with Aramex, SMSA, DHL, and local delivery partners.",
    },
    {
      icon: ReceiptText,
      title: "Automated Invoices",
      description:
        "Generate GST, VAT, and QR-code compliant invoices automatically whenever an order is placed.",
    },
  ];
  
  export function EcommerceSolutionsSection() {
    return (
      <section className="py-14 md:py-12">
        <div className="container-tajin">
          <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            {/* Left Content */}
            <div>
              <SectionLabel>SERVICE 07</SectionLabel>
  
              <h2 className="font-display mt-5 text-4xl font-extrabold leading-[1.03] tracking-[-.05em] text-[hsl(var(--primary))] md:text-5xl">
                E-Commerce
                <br />
                Solutions
              </h2>
  
              <div className="mt-8 space-y-6 text-[15px] leading-8 text-[hsl(var(--muted-foreground))]">
                <p>
                  Launch online sales quickly with professionally configured
                  storefronts, payment gateway integrations, and automated order
                  processing workflows.
                </p>
  
                <p>
                  Designed for businesses operating across India and the GCC,
                  helping you manage products, payments, deliveries, and tax
                  compliance from a single system.
                </p>
              </div>
  
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  LOCAL GATEWAYS
                </span>
  
                <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  COURIER TRACKING
                </span>
  
                <span className="rounded bg-[hsl(var(--secondary))] px-3 py-2 font-mono-brand text-[10px] tracking-[.18em] text-[hsl(var(--primary))]">
                  TAX INVOICES
                </span>
              </div>
            </div>
  
            {/* Right Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {ecommerceServices.map((item) => {
                const Icon = item.icon;
  
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-[hsl(var(--border))] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--accent)/.08)]">
                      <Icon className="h-5 w-5 text-[hsl(var(--accent))]" />
                    </div>
  
                    <h3 className="mt-6 text-2xl font-bold leading-tight text-[hsl(var(--primary))]">
                      {item.title}
                    </h3>
  
                    <p className="mt-4 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }