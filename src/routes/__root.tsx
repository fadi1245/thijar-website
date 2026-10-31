import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function RootLayout() {
  return (
    // "user": framer-motion animations respect prefers-reduced-motion site-wide
    <MotionConfig reducedMotion="user">
      <HeadContent />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </MotionConfig>
  );
}

export const Route = createRootRoute({
  // Fallback for routes without their own head(), e.g. the 404 page
  head: () => ({
    meta: [{ title: "THIJAR" }],
  }),
  component: RootLayout,
});
