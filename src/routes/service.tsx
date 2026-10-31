import { AuditAssuranceSection } from "@/components/services/AuditAssuranceSection";
import { CustomSoftwareSection } from "@/components/services/CustomSoftwareSection";
import { EcommerceSolutionsSection } from "@/components/services/EcommerceSolutionsSection";
import { ERPImplementationSection } from "@/components/services/ERPimplementationSection";
import { ProcessSection } from "@/components/services/ProcessSection";
import { ServiceDetailSection } from "@/components/services/ServiceDetailSection";
import { ServicesCTASection } from "@/components/services/ServicesCTASection";
import { ServicesStatsSection } from "@/components/services/ServiceStatsSection";
import { SoftwareSection } from "@/components/services/SoftwareSection";
import { TaxConsultationSection } from "@/components/services/TaxConsultationSection";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { ServiceIllustration as ServicesIllustration } from "@/components/ui/illustrations";
// import HeroImage from '../assets/images/service.jpeg'


export const Route = createFileRoute("/service")({
  head: () =>
    pageHead({
      path: "/service",
      title: "Services",
      description:
        "Accounting, tax consultation, audit and assurance, ERP implementation, custom software, e-commerce and company setup for growing businesses in India and the GCC.",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
    <main>
      <PageHero
        label="Services / INDIA & GCC"
        title="Clear, reliable business services for india & GCC"
        text="Practical accounting, tax, audit, software and company setup tailored specifically for growing businesses and enterprise across india and Gulf region."
        illustration={<ServicesIllustration/>}
      />

      <ServicesStatsSection/>
      <ServiceDetailSection/>
      <SoftwareSection/>
      <CustomSoftwareSection/>
      <ERPImplementationSection/>
      <EcommerceSolutionsSection/>
      <TaxConsultationSection/>
      <AuditAssuranceSection/>
      <ProcessSection/>
      <ServicesCTASection/>
      </main>
    </>
  );
}