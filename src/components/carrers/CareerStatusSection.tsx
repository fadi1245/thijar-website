import { useEffect, useState } from "react";
import { sanity } from "@/lib/sanity";

interface Job {
  _id: string;
  title: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  status: string;
}

/* ---------- Small inline icons (no extra dependency) ---------- */
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg {...iconProps}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

/* ---------- Shared pieces ---------- */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[hsl(var(--accent)/.12)] px-3 py-1 font-mono-brand text-[10px] font-semibold tracking-[.16em] text-[hsl(var(--accent))]">
      {children}
    </span>
  );
}

function MetaItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 rounded-lg bg-[#eaf5f6] px-3 py-1.5 text-[13px] font-medium text-[hsl(var(--primary))]">
      <span className="text-[hsl(var(--accent))]">{icon}</span>
      {children}
    </li>
  );
}

function JobSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white p-5 sm:p-7">
      <div className="h-6 w-1/2 rounded bg-slate-200" />
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-7 w-28 rounded-lg bg-slate-100" />
        <div className="h-7 w-24 rounded-lg bg-slate-100" />
        <div className="h-7 w-32 rounded-lg bg-slate-100" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-slate-100" />
        <div className="h-3 w-5/6 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export function CareerStatusSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanity
      .fetch(`*[_type == "job" && status == "open"] | order(publishedAt desc)`)
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <section
        className="bg-[#eaf5f6] py-12 sm:py-16 lg:py-20"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="container-tajin">
          <p className="sr-only">Loading opportunities...</p>
          <div className="mx-auto grid max-w-4xl gap-4 sm:gap-5">
            <JobSkeleton />
            <JobSkeleton />
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Empty ---------- */
  if (jobs.length === 0) {
    return (
      <section className="bg-[#eaf5f6] py-12 sm:py-16 lg:py-20">
        <div className="container-tajin">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[hsl(var(--primary)/.15)] bg-white px-5 py-12 text-center sm:px-10 sm:py-16">
            <Badge>CURRENT STATUS</Badge>

            <h2 className="font-display mt-6 text-2xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))] sm:text-3xl md:text-4xl">
              No open positions right now.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
              We are not actively hiring at this moment, but that can change as
              our teams grow. Check back here for future openings, or introduce
              yourself so we can keep your details in mind.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Job list ---------- */
  return (
    <section className="bg-[#eaf5f6] py-12 sm:py-16 lg:py-20">
      <div className="container-tajin">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <Badge>CURRENT OPENINGS</Badge>

          <h2 className="font-display mt-5 text-3xl font-extrabold tracking-[-.05em] text-[hsl(var(--primary))] sm:text-4xl">
            Join Our Team
          </h2>

          <p className="mt-3 text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
            {jobs.length} open {jobs.length === 1 ? "position" : "positions"}
          </p>

          
          <h2 className="font-display mt-5 text-xl font-light tracking-[-.05em] text-[hsl(var(--primary))] sm:text-lg">
            Send your CV's to admin@thijar.com
          </h2>
        </div>

        <ul className="mx-auto grid max-w-4xl gap-4 sm:gap-5">
          {jobs.map((job) => (
            <li key={job._id}>
              <article className="group relative overflow-hidden rounded-2xl border border-[hsl(var(--primary)/.12)] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
                {/* Accent rail */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 bg-[hsl(var(--accent))]"
                />

                <div className="flex flex-col gap-5 p-5 pl-6 sm:p-7 sm:pl-8 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-xl font-bold leading-snug tracking-tight text-[hsl(var(--primary))] sm:text-2xl">
                      {job.title}
                    </h3>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      <MetaItem icon={<PinIcon />}>{job.location}</MetaItem>
                      <MetaItem icon={<BriefcaseIcon />}>
                        {job.employmentType}
                      </MetaItem>
                      <MetaItem icon={<ClockIcon />}>
                        {job.experience} Years Experience
                      </MetaItem>
                    </ul>

                    <p className="mt-5 max-w-2xl whitespace-pre-line break-words text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                      {job.description}
                    </p>
                  </div>

                  <div className="md:shrink-0 md:pt-1">
                    {/* <button className="w-full rounded-xl bg-[hsl(var(--primary))] px-6 py-3 font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))] md:w-auto">
                      Apply Now
                    </button> */}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}