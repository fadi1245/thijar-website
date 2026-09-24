import clientLogo from "../../assets/logo/clientlogo.png";

export function ClientSection() {
  return (
    <section
      className="overflow-hidden border-b border-[hsl(var(--border))] bg-white py-16 md:py-20"
      aria-label="Client partners"
    >
      <div className="container-tajin">
        <div className="flex flex-col gap-3">
          <p className="font-mono-brand text-[10px] font-medium tracking-[.18em] text-[hsl(var(--accent))]">
            CLIENT PARTNERS
          </p>
          <h2 className="font-display max-w-2xl text-3xl font-bold leading-tight tracking-[-.045em] text-[hsl(var(--primary))] md:text-4xl">
            Growing with businesses that move forward.
          </h2>
        </div>
        <div
          className="relative mt-10 overflow-hidden border-y border-[hsl(var(--primary)/.14)]"
          role="presentation"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent md:w-32" />
          <div className="marquee-track-right flex w-max items-center gap-10 py-10 md:gap-14 md:py-12">
            {[...Array(2)].flatMap((_, loopIndex) =>
              [...Array(8)].map((__, logoIndex) => (
                <div
                  key={`${loopIndex}-${logoIndex}`}
                  className="grid h-28 w-28 shrink-0 place-items-center rounded-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3 shadow-[var(--shadow-sm)] md:h-36 md:w-36"
                >
                  <img
                    src={clientLogo}
                    alt={
                      loopIndex === 0 && logoIndex === 0
                        ? "Client partner logo"
                        : ""
                    }
                    aria-hidden={loopIndex !== 0 || logoIndex !== 0}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
