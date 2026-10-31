import { Hero } from "@/components/home/Hero";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { TrustBar } from "@/components/home/TrustBar";
import { MetricSection } from "@/components/home/MetricSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ERPHighlight } from "@/components/home/ERPHighlight";
import { ServiceSection } from "@/components/home/ServiceSection";
import { TeamSection } from "@/components/home/TeamSection";
import { ClientSection } from "@/components/home/ClientSection";
import { CTASection } from "@/components/home/CTASection";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "THIJAR | Accounting, Tax, Audit & ERP for India and the GCC",
      description:
        "THIJAR brings accounting, tax, audit, business advisory and ERP software together for growing businesses across India, Saudi Arabia, the UAE, Bahrain and Oman.",
    }),
  component: HomePage,
});

function HomePage() {
    return (
      <>
        <main className="overflow-x-clip">
        <Hero/>
        <TrustBar/>
        <AboutSection/>
        <ERPHighlight/>
        <ServiceSection/>
        <MetricSection/>
        <TeamSection/>
        <ClientSection/>
        <CTASection/>
        </main>
      </>
    );
  }