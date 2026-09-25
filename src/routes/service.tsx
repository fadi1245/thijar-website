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
import HeroImage from '../assets/images/service.jpeg'


export const Route = createFileRoute("/service")({
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
        image={HeroImage}
      />

      <ServicesStatsSection/>
      <ServiceDetailSection/>
      <TaxConsultationSection/>
      <AuditAssuranceSection/>
      <SoftwareSection/>
      <CustomSoftwareSection/>
      <ERPImplementationSection/>
      <EcommerceSolutionsSection/>
      <ProcessSection/>
      <ServicesCTASection/>
      </main>
    </>
  );
}