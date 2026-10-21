import { useEffect, useRef, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  const imgRef = useRef<HTMLDivElement | null>(null);

  // Lightweight parallax on the background photo
  useEffect(() => {
    const node = imgRef.current;
    if (!node) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        node.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.08)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink-950">
      {/* Photo */}
      <div
        ref={imgRef}
        className="absolute inset-0 -z-20 origin-center animate-scale-in will-change-transform"
        style={{ transform: "scale(1.08)" }}
      >
        <img
          src={heroImg}
          alt="Студенты Томского политеха в компьютерном классе"
          className="h-full w-full object-cover object-[62%_center]"
          fetchPriority="high"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-ink-950/15" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/40" />
      <div className="blob absolute -left-32 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-500/25 animate-pulse-soft" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pb-28 lg:px-8">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur-md animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            Томский политехнический университет · R&amp;D для бизнеса
          </div>

          <h1 className="text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            <span className="block overflow-hidden">
              <span className="block animate-fade-up" style={{ animationDelay: "250ms" }}>
                Ваш вызов —
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-fade-up" style={{ animationDelay: "380ms" }}>
                наша <span className="text-gradient">компетенция</span>
              </span>
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/80 animate-fade-up sm:text-xl md:text-2xl"
            style={{ animationDelay: "520ms" }}
          >
            Оставьте заявку, и мы соберём команду студентов и учёных под вашу задачу.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up"
            style={{ animationDelay: "650ms" }}
          >
            <a
              href="#form"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-4 text-[15px] font-semibold text-white shadow-[0_18px_40px_-12px_rgb(0_166_81/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-[0_22px_44px_-12px_rgb(0_166_81/1)]"
            >
              Отправить заявку
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/15"
            >
              Как это работает
            </a>
          </div>
        </div>

        {/* Floating fact chips (visible on large screens) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26%] xl:block" aria-hidden="true">
          <div className="absolute right-[14%] top-[30%] animate-float">
            <Chip icon={<Zap className="h-4 w-4" />} title="Старт за 2 недели" sub="быстрый запуск проекта" />
          </div>
          <div className="absolute right-[30%] top-[47%] animate-float-delayed">
            <Chip icon={<Clock className="h-4 w-4" />} title="Ответ за 2 дня" sub="анализ в профильном институте" />
          </div>
          <div className="absolute right-[10%] top-[64%] animate-float" style={{ animationDelay: "2.4s" }}>
            <Chip icon={<ShieldCheck className="h-4 w-4" />} title="NDA при необходимости" sub="гарантия конфиденциальности" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#partners"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white md:flex animate-fade-in"
        style={{ animationDelay: "1.2s" }}
      >
        Листайте
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </span>
      </a>
    </section>
  );
}

function Chip({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-[0_8px_20px_-6px_rgb(0_166_81/0.9)]">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[14px] font-bold text-white">{title}</span>
        <span className="text-[12px] text-white/65">{sub}</span>
      </span>
    </div>
  );
}
