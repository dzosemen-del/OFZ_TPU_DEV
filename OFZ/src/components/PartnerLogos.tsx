import type { ReactNode } from "react";
import yandexLogo from "@/assets/logos/yandex.svg";
import tbankLogo from "@/assets/logos/tbank.svg";
import gazpromLogo from "@/assets/logos/gazprom.svg";
import siburLogo from "@/assets/logos/sibur.svg";
import rosatomLogo from "@/assets/logos/rosatom.svg";

export type Partner = {
  id: string;
  name: string;
  render: () => ReactNode;
};

function RubiusLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 44 44" className="h-11 w-11 md:h-12 md:w-12" aria-hidden="true">
        <polygon points="3,2 11,0 13,10 5,12" fill="#2e8b3e" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={2 + col * 13.5}
              y={13 + row * 10.5}
              width="12"
              height="9"
              rx="1"
              fill="#a3141b"
            />
          )),
        )}
      </svg>
      <span className="text-[28px] font-bold tracking-tight text-[#4a4a4a] md:text-[32px]">Rubius</span>
    </span>
  );
}

export const partners: Partner[] = [
  {
    id: "yandex",
    name: "Яндекс",
    render: () => <img src={yandexLogo} alt="Яндекс" className="h-10 w-auto md:h-11" draggable={false} />,
  },
  {
    id: "rosatom",
    name: "Росатом",
    render: () => (
      <img
        src={rosatomLogo}
        alt="Росатом"
        width={184}
        height={65}
        className="h-auto w-[176px] max-w-full object-contain md:w-[208px]"
        draggable={false}
      />
    ),
  },
  {
    id: "tbank",
    name: "Т-Банк",
    render: () => <img src={tbankLogo} alt="Т-Банк" className="h-12 w-auto md:h-14" draggable={false} />,
  },
  {
    id: "gazprom",
    name: "Газпром",
    render: () => <img src={gazpromLogo} alt="Газпром" className="h-12 w-auto md:h-14" draggable={false} />,
  },
  {
    id: "rubius",
    name: "Rubius",
    render: () => <RubiusLogo />,
  },
  {
    id: "sibur",
    name: "СИБУР",
    render: () => <img src={siburLogo} alt="СИБУР" className="h-11 w-auto md:h-12" draggable={false} />,
  },
];
