import { CareerBenefitsSection } from "@/components/carrers/CareerBenefitSection";
import { CareerStatusSection } from "@/components/carrers/CareerStatusSection";
import { CareerCultureSection } from "@/components/carrers/CarrerCultureSection";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
});

function CareersPage() {
  return (
    <main>
      <PageHero 
        label="CAREERS / GROW WITH US"
        title="Where talent meets momentum."
        text="Bring your discipline, curiosity, and point of view. We are building a team that helps ambitious businesses operate with more confidence."
      />

      <CareerCultureSection />
      <CareerBenefitsSection />
      <CareerStatusSection/>
    </main>
  );
}