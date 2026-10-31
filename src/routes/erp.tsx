import { ERPBenefits } from "@/components/Erp/ERPBenefits";
import { ERPCTA } from "@/components/Erp/ERPCTA";
import { ERPDashboard } from "@/components/Erp/ERPDashboard";
import { ERPFeatures } from "@/components/Erp/ERPFeatures";
import { ERPHero } from "@/components/Erp/ERPHero";
// import { ERPImplementation } from "@/components/Erp/ERPImplementation";
import { ERPReports } from "@/components/Erp/ERPReports";
import { ERPUserViews } from "@/components/Erp/ERPUserViews";
import { ERPWorkflow } from "@/components/Erp/ERPWorkflow";
import { InstallSection } from "@/components/Erp/InstallSection";
import { PosSection } from "@/components/Erp/POSDetails";
import { ZatcaSection } from "@/components/Erp/ZatcaSection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/erp")({
  component: ERPPage,
});

function ERPPage() {
  return (
    <main>
      <ERPHero />
      <ERPDashboard />
      <InstallSection/>
      {/* <ERPPromise /> */}
      <ERPFeatures />
      <ERPWorkflow />
      <PosSection/>
      <ERPReports />
      <ZatcaSection />
      <ERPUserViews />
      <ERPBenefits />
      {/* <ERPImplementation /> */}
      <ERPCTA />
    </main>
  );
}