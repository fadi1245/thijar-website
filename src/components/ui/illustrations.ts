import { lazy } from "react";

// Desktop-only hero artwork (see PageHero): each is split into its own chunk
// and only downloaded when the viewport is wide enough to show it.
export const AboutHeroIllustration = lazy(() => import("./AboutHeroIllustration"));
export const CareerIllustration = lazy(() => import("./CareerIllustration"));
export const ContactUsIllustration = lazy(() => import("./ContactUsIllustration"));
export const ERPIllustration = lazy(() => import("./ERPIllustration"));
export const ServiceIllustration = lazy(() => import("./ServiceIllustration"));
