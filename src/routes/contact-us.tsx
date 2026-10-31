import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { PageHero } from "@/components/shared/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { ContactUsIllustration as ContactHeroIllustration } from "@/components/ui/illustrations";


export const Route = createFileRoute("/contact-us")({
  head: () =>
    pageHead({
      path: "/contact-us",
      title: "Contact us",
      description:
        "Tell us about your business and what you need. THIJAR's accounting, tax, audit and software teams will bring the right people to the first conversation.",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        label="CONTACT / START HERE"
        title="Tell us what you are building."
        text="Share a little about the business, the market, or the problem in front of you. We will bring the right people into the first conversation."
        illustration={<ContactHeroIllustration/>}
      />

      <section className="container-tajin grid gap-16 py-24 md:grid-cols-[.7fr_1.3fr] md:py-32">
        <ContactInfoSection />
        <ContactFormSection />
      </section>
    </>
  );
}