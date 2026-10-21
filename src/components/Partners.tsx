import { partners } from "./PartnerLogos";
import { Reveal } from "./Reveal";

export function Partners() {
  // The list is rendered twice so the CSS translateX(-50%) loop is seamless
  return (
    <section id="partners" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-900/45">
            <span className="h-px w-8 bg-ink-900/15" />
            Уже работают с нашими студентами
            <span className="h-px w-8 bg-ink-900/15" />
          </span>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-10 md:mt-12">
        <div className="marquee-track mask-fade-x relative w-full overflow-hidden">
          <div className="marquee-inner flex w-max items-center animate-marquee">
            {[0, 1].map((half) => (
              <div
                key={half}
                className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8"
                aria-hidden={half === 1 ? true : undefined}
              >
                {partners.map((p) => (
                  <div
                    key={`${p.id}-${half}`}
                    className="group flex h-24 w-[240px] shrink-0 items-center justify-center rounded-2xl border border-ink-900/6 bg-gradient-to-b from-white to-zinc-50 px-8 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-[0_16px_40px_-18px_rgb(0_0_0/0.25)] md:h-28 md:w-[280px]"
                    aria-label={p.name}
                  >
                    <div className="flex items-center justify-center opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0">
                      {p.render()}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
