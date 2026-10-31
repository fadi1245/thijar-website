import { CareerBenefitsSection } from "@/components/carrers/CareerBenefitSection";
import { CareerStatusSection } from "@/components/carrers/CareerStatusSection";
import { CareerCultureSection } from "@/components/carrers/CarrerCultureSection";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { CareerIllustration as CultureIllustration } from "@/components/ui/illustrations";
// import HeroImage from '../assets/images/career.avif'
export const Route = createFileRoute("/careers")({
  head: () =>
    pageHead({
      path: "/careers",
      title: "Careers",
      description:
        "Join THIJAR's team of chartered accountants, auditors, engineers and consultants working across India and the GCC, and see current openings.",
    }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <main>
      <PageHero 
        label="CAREERS / GROW WITH US"
        title="Where talent meets momentum."
        text="Bring your discipline, curiosity, and point of view. We are building a team that helps ambitious businesses operate with more confidence."
        illustration={<CultureIllustration/>}
      />

      <CareerBenefitsSection />
      <CareerCultureSection />
      <CareerStatusSection/>
    </main>
  );
}