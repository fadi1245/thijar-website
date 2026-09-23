import { Header } from "@/components/layout/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
    return (
      <>
        <Header />
        <section className="min-h-screen bg-[hsl(var(--primary))] pt-32">
          <div className="container-tajin">
            <h1 className="font-display text-6xl text-white">
              Hero Section
            </h1>
          </div>
        </section>
      </>
    );
  }