import { ArrowUp, Mail, MapPin, Phone, Send } from "lucide-react";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.8 18.5C6.6 18.5 3.1 14.3 3 7.2h3.1c.1 5.2 2.4 7.4 4.2 7.9V7.2h2.9v4.5c1.8-.2 3.7-2.2 4.3-4.5h2.9c-.5 2.8-2.5 4.8-4 5.6 1.5.7 3.8 2.4 4.7 5.7h-3.2c-.7-2.2-2.4-3.9-4.7-4.1v4.1h-.4Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden bg-ink-950 text-white">
      <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,black_10%,transparent_60%)]" />
      <div className="blob absolute -bottom-40 right-0 h-[26rem] w-[26rem] rounded-full bg-brand-600/20" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <Reveal>
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-white/55">
              Национальный исследовательский Томский политехнический университет. Соберём команду студентов и учёных под вашу задачу.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/40">Контакты</h4>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li>
                <a href="tel:+73822701777" className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-colors group-hover:border-brand-400/40">
                    <Phone className="h-4 w-4" />
                  </span>
                  +7 (3822) 701-777
                </a>
              </li>
              <li>
                <a href="mailto:tpu@tpu.ru" className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-colors group-hover:border-brand-400/40">
                    <Mail className="h-4 w-4" />
                  </span>
                  tpu@tpu.ru
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-white/80">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400">
                  <MapPin className="h-4 w-4" />
                </span>
                г. Томск, ул. Ленина, 30
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/40">Социальные сети</h4>
            <ul className="mt-5 space-y-3.5 text-[15px]">
              <li>
                <a
                  href="https://t.me/tpunews"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-all group-hover:border-brand-400/40 group-hover:bg-brand-500 group-hover:text-white">
                    <Send className="h-4 w-4" />
                  </span>
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://vk.com/tpunews"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-400 transition-all group-hover:border-brand-400/40 group-hover:bg-brand-500 group-hover:text-white">
                    <VkIcon className="h-4 w-4" />
                  </span>
                  VKontakte
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center">
          <p>© 2026 Национальный исследовательский Томский политехнический университет</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 font-medium text-white/60 transition-all hover:border-brand-400/40 hover:text-white"
          >
            Наверх
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
