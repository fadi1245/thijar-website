import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/contact-us")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        label="CONTACT / START HERE"
        title="Tell us what you are building."
        text="Share a little about the business, the market, or the problem in front of you. We will bring the right people into the first conversation."
      />

      <section className="container-tajin grid gap-16 py-24 md:grid-cols-[.7fr_1.3fr] md:py-32">
        <ContactInfoSection />
        <ContactFormSection />
      </section>
    </>
  );
}