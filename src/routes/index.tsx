import { Hero } from "@/components/home/Hero";
import { createFileRoute } from "@tanstack/react-router";
import { TrustBar } from "@/components/home/TrustBar";
import { MetricSection } from "@/components/home/MetricSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ERPHighlight } from "@/components/home/ERPHighlight";
import { ServiceSection } from "@/components/home/ServiceSection";
import { TeamSection } from "@/components/home/TeamSection";
import { ClientSection } from "@/components/home/ClientSection";
import { CTASection } from "@/components/home/CTASection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
    return (
      <>
        <main>
        <Hero/>
        <TrustBar/>
        <MetricSection/>
        <AboutSection/>
        <ERPHighlight/>
        <ServiceSection/>
        <TeamSection/>
        <ClientSection/>
        <CTASection/>
        </main>
      </>
    );
  }