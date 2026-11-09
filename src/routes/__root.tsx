import { useEffect } from "react";
import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useRouterState } from "@tanstack/react-router";

function RootLayout() {
  const isAdmin = useRouterState({
    select: (s) => s.location.pathname.startsWith("/admin"),
  });

  useEffect(() => {
    let cancelled = false;

    const waitForImages = async () => {
      const images = Array.from(document.images).filter(
        (img) => img.loading !== "lazy",
      );

      await Promise.all(
        images.map(async (img) => {
          // Image has already loaded or failed.
          if (img.complete) {
            if (img.naturalWidth > 0 && img.decode) {
              await img.decode().catch(() => {});
            }
            return;
          }

          // Wait for image loading, with a fallback timeout.
          await new Promise<void>((resolve) => {
            const finish = () => {
              clearTimeout(timeout);
              img.removeEventListener("load", finish);
              img.removeEventListener("error", finish);
              resolve();
            };

            const timeout = window.setTimeout(finish, 8000);

            img.addEventListener("load", finish, { once: true });
            img.addEventListener("error", finish, { once: true });
          });

          if (img.naturalWidth > 0 && img.decode) {
            await img.decode().catch(() => {});
          }
        }),
      );
    };

    const hideLoader = async () => {
      const loader = document.getElementById("page-loader");

      if (!loader) return;

      // Minimum display time, fonts and initial images.
      await Promise.all([
        new Promise<void>((resolve) => window.setTimeout(resolve, 1350)),
        document.fonts.ready.catch(() => {}),
        waitForImages(),
      ]);

      if (cancelled) return;

      // Start the upward exit animation.
      loader.classList.add("is-leaving");

      // Remove loader after the exit transition.
      window.setTimeout(() => {
        loader.remove();
      }, 720);
    };

    hideLoader();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {isAdmin ? (
        <Outlet />
      ) : (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [{ title: "THIJAR" }],
  }),
  component: RootLayout,
});
