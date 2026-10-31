import { AboutCTASection } from "@/components/about/AboutCTASection";
import { AboutOverviewSection } from "@/components/about/AboutOverviewSection";
import { AboutServicesSection } from "@/components/about/AboutServicesSections";
import { TeamExpertiseSection } from "@/components/about/TeamExpertiseSection";
import { TimelineMilestonesSection } from "@/components/about/TimelineMileStone";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { AboutHeroIllustration as HeroIllustration } from "@/components/ui/illustrations";

export const Route = createFileRoute("/about-us")({
  head: () =>
    pageHead({
      path: "/about-us",
      title: "About us",
      description:
        "THIJAR helps leaders expand across markets, bringing financial discipline, local knowledge and practical technology together in one team across India and the GCC.",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <PageHero
        label="ABOUT THIJAR"
        title="A Steady hand for businesses in motion."
        text="THIJAR helps leaders expand across markets. We bring financial discipline, local knowledge, and practical tech solutions together into one simple conversation."
        illustration={<HeroIllustration/>}
      />

      <AboutOverviewSection />
      <TimelineMilestonesSection />
      <AboutServicesSection />
      <TeamExpertiseSection />
      <AboutCTASection />
    </main>
  );
}
