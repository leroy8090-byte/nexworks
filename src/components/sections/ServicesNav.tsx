"use client";

import { useEffect, useState } from "react";
import { servicesFor } from "@/data/localized";
import { useLang } from "@/i18n/use-lang";
import { cn } from "@/lib/utils";

/** Le sommaire reste à portée pendant la lecture, et indique où l'on se trouve. */
export function ServicesNav() {
  const lang = useLang();
  const services = servicesFor(lang);
  const [active, setActive] = useState<string>(services[0].id);
  useEffect(() => {
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.querySelector("[data-service]")?.getAttribute("data-service");
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    document.querySelectorAll("article:has([data-service])").forEach((a) => seen.observe(a));
    return () => seen.disconnect();
  }, []);

  return (
    <nav aria-label={lang === "en" ? "Jump to a service" : "Aller à un service"} className="sticky top-[76px] z-30 -mx-5 mb-10 overflow-x-auto bg-ink/85 px-5 py-3 backdrop-blur-md no-scrollbar sm:mx-0 sm:rounded-full sm:border sm:border-white/10 sm:px-2 sm:py-2">
      <ul className="flex w-max gap-2 sm:w-auto sm:justify-between">
        {services.map((s) => (
          <li key={s.id} className="sm:flex-1">
            <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} className={cn("block whitespace-nowrap rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-colors", active === s.id ? "bg-sky text-ink" : "text-white/75 hover:bg-white/10 hover:text-white")}>
              {s.plainTitle}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
