import { AboutCTASection } from "@/components/about/AboutCTASection";
import { AboutOverviewSection } from "@/components/about/AboutOverviewSection";
import { AboutServicesSection } from "@/components/about/AboutServicesSections";
import { TeamExpertiseSection } from "@/components/about/TeamExpertiseSection";
import { TimelineMilestonesSection } from "@/components/about/TimelineMileStone";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <PageHero
        label="ABOUT THIJAR"
        title="A Steady hand for businesses in motion."
        text="THIJAR is a business servbices company for leaders building across markets. We bring financial rigor, local insight, and practical technology inot one conversation."
      />

      <AboutOverviewSection />
      <AboutServicesSection />
      <TimelineMilestonesSection />
      <TeamExpertiseSection />
      <AboutCTASection />
    </main>
  );
}
