import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/utils/cn";

const faq = [
  {
    q: "Могу ли я предложить идею без ТЗ?",
    a: "Да, достаточно описания.",
  },
  {
    q: "Могу ли я, являясь студентом, отправить заявку?",
    a: "Да, инициативы студентов только приветствуются.",
  },
  {
    q: "Рассматриваются ли другие формы сотрудничества?",
    a: "Да, необходимо лишь подробно рассказать о вашей идее.",
  },
  {
    q: "Сколько ждать ответа?",
    a: "Ваша заявка будет рассмотрена в срок до 2 рабочих дней.",
  },
  {
    q: "Есть ли гарантия конфиденциальности?",
    a: "Да, подписываем NDA при необходимости.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-ink-950 py-20 text-white md:py-28">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
      <div className="blob absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-brand-600/25" />
      <div className="blob absolute -right-20 top-0 h-[22rem] w-[22rem] rounded-full bg-brand-400/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-400">
                FAQ
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl md:text-5xl">
                Частые вопросы
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-white/55 md:text-lg">
                Собрали ответы на то, о чём спрашивают чаще всего. Не нашли свой вопрос — напишите нам.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href="mailto:tpu@tpu.ru"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:border-brand-400/50 hover:bg-white/10"
                >
                  tpu@tpu.ru
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="tel:+73822701777"
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-[14px] font-semibold text-white/70 transition-colors hover:text-white"
                >
                  +7 (3822) 701-777
                </a>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-3">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 80}>
                  <div
                    className={cn(
                      "group rounded-2xl border transition-all duration-500",
                      isOpen
                        ? "border-brand-500/40 bg-white text-ink-900 shadow-[0_30px_60px_-30px_rgb(0_166_81/0.5)]"
                        : "border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.07]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-7"
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            "hidden text-[12px] font-bold tabular-nums sm:block",
                            isOpen ? "text-brand-600" : "text-white/35",
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span className="text-[16px] font-bold leading-snug md:text-[17px]">{item.q}</span>
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                          isOpen
                            ? "rotate-45 border-brand-600 bg-brand-600 text-white"
                            : "border-white/15 text-white/70 group-hover:border-white/30",
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    </button>
                    <div id={`faq-panel-${i}`} className="accordion-panel" data-open={isOpen}>
                      <div>
                        <p
                          className={cn(
                            "px-6 pb-6 text-[15px] leading-relaxed sm:pl-[4.25rem] md:px-7 md:pb-7 md:pl-[4.5rem]",
                            isOpen ? "text-ink-900/65" : "text-white/60",
                          )}
                        >
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
