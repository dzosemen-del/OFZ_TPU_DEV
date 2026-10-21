import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/utils/cn";

const nav = [
  { href: "#benefits", label: "Преимущества" },
  { href: "#how", label: "Как это работает" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-500 md:px-5",
            scrolled
              ? "border-ink-900/8 bg-white/85 shadow-[0_8px_30px_rgb(0_0_0/0.08)] backdrop-blur-xl"
              : "border-white/10 bg-white/70 shadow-[0_8px_30px_rgb(0_0_0/0.06)] backdrop-blur-xl",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-900/70 transition-colors hover:bg-ink-900/5 hover:text-ink-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="tel:+73822701777"
              className="group hidden flex-col items-end leading-tight md:flex"
            >
              <span className="inline-flex items-center gap-1.5 text-[15px] font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                <Phone className="h-3.5 w-3.5 text-brand-600" strokeWidth={2.5} />
                +7 (3822) 701-777
              </span>
              <span className="text-[11px] text-ink-900/45">tpu@tpu.ru</span>
            </a>

            <a
              href="#form"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-600 px-4 py-2.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-8px_rgb(0_166_81/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_14px_28px_-8px_rgb(0_166_81/0.8)] md:px-5"
            >
              <span className="relative z-10">Отправить заявку</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
