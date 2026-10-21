import type { ReactNode } from "react";
import { GraduationCap, Rocket, SlidersHorizontal, Users } from "lucide-react";
import { Reveal } from "./Reveal";

type Benefit = {
  icon: ReactNode;
  title: string;
  text: string;
  accent: string;
};

const benefits: Benefit[] = [
  {
    icon: <SlidersHorizontal className="h-6 w-6" strokeWidth={2.2} />,
    title: "Гибкие форматы",
    text: "от разовых исследований до долгосрочных R&D-проектов.",
    accent: "from-brand-400 to-brand-600",
  },
  {
    icon: <GraduationCap className="h-6 w-6" strokeWidth={2.2} />,
    title: "Академическая валидация",
    text: "ваши идеи проходят экспертную оценку.",
    accent: "from-emerald-400 to-brand-600",
  },
  {
    icon: <Users className="h-6 w-6" strokeWidth={2.2} />,
    title: "Доступ к талантам",
    text: "студенты, аспиранты под руководством научных руководителей.",
    accent: "from-brand-500 to-teal-600",
  },
  {
    icon: <Rocket className="h-6 w-6" strokeWidth={2.2} />,
    title: "Скорость запуска",
    text: "старт проекта в течение 2 недель.",
    accent: "from-lime-400 to-brand-600",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="relative overflow-hidden bg-zinc-50 py-20 md:py-28">
      <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="blob absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-400/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-700">
              Почему ТПУ
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-[-0.02em] text-ink-900 sm:text-4xl md:text-5xl">
              Университет как ваша R&amp;D-команда
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-900/60 md:text-lg">
              Подключаем компетенции профильных институтов и энергию студентов — без лишней бюрократии.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 110}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-ink-900/6 bg-white p-7 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-500/25 hover:shadow-[0_24px_50px_-24px_rgb(0_166_81/0.35)]">
                <div
                  className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${b.accent} opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-30`}
                />
                <div
                  className={`relative mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${b.accent} text-white shadow-[0_12px_24px_-10px_rgb(0_166_81/0.8)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
                >
                  {b.icon}
                </div>
                <h3 className="relative text-lg font-bold leading-snug text-ink-900">{b.title}</h3>
                <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink-900/60">{b.text}</p>
                <span className="absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
