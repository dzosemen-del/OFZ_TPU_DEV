import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/utils/cn";

const steps = [
  {
    n: "01",
    title: "Вы заполняете форму",
    text: "Расскажите о задаче и приложите ТЗ, если оно есть. Для начала достаточно описания идеи.",
  },
  {
    n: "02",
    title: "Мы анализируем",
    text: "Передаём заявку в профильный институт. Эксперты оценивают задачу за 1–2 дня.",
  },
  {
    n: "03",
    title: "Формируем команду",
    text: "Подбираем студентов и учёных с нужными компетенциями под вашу задачу.",
  },
  {
    n: "04",
    title: "Вы получаете решение",
    text: "Передаём результат работы команды по вашей задаче.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="scroll-mt-28 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-y-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-x-16 xl:gap-x-24">
          <div className="lg:col-start-1 lg:row-start-1">
            <Reveal>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 sm:text-xs">
                От заявки до решения
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="how-title"
                className="mt-5 text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink-900 sm:text-5xl xl:text-[3.75rem]"
              >
                Как это{" "}
                <br />
                <span className="text-brand-700">работает?</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[22rem] text-base leading-relaxed text-ink-900/60 sm:text-lg">
                Четыре понятных шага, чтобы ваша задача нашла свою команду.
              </p>
            </Reveal>
          </div>

          <ol role="list" className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;

              return (
                <Reveal
                  key={step.n}
                  as="li"
                  delay={i * 100}
                  className="process-step relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-5 py-7 last:pb-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-x-7 sm:py-8"
                >
                  <span className="process-step-line" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-[3rem] font-medium leading-none tracking-[-0.07em] tabular-nums sm:text-[4rem]",
                      isLast ? "text-brand-700" : "text-ink-900/30",
                    )}
                  >
                    {step.n}
                  </span>
                  <div className="min-w-0 pt-1 sm:pt-1.5">
                    <h3
                      className={cn(
                        "text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-[25px]",
                        isLast ? "text-brand-700" : "text-ink-900",
                      )}
                    >
                      <span className="sr-only">Шаг {i + 1}. </span>
                      {step.title}
                    </h3>
                    <p className="mt-2.5 max-w-[28rem] text-sm leading-relaxed text-ink-900/60 sm:text-[15px]">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={200} className="lg:col-start-1 lg:row-start-2 lg:self-end">
            <a
              href="#form"
              className="group inline-flex min-h-14 items-center justify-center gap-6 rounded-full bg-brand-600 px-6 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
            >
              Перейти к заявке
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
