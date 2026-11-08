import type { ReactNode } from "react";
import { Container } from "./ui";

/** Mise en page sobre des pages légales. */
export function Legal({ title, children, lang = "fr" }: { title: string; children: ReactNode; lang?: "fr" | "en" }) {
  return (
    <section className="bg-white pt-44 pb-28 sm:pt-52">
      <Container className="max-w-4xl">
        <p className="rise kicker">{lang === "fr" ? "Informations" : "Information"}</p>
        <h1 className="rise mt-6 text-[3rem] text-ink sm:text-[4.6rem]" style={{ animationDelay: "120ms" }}>{title}</h1>
        <div className="rise mt-12 space-y-10 text-[16px] leading-[1.85] text-ink/85 [&_h2]:text-[2rem] [&_h2]:text-ink [&_a]:underline [&_a]:underline-offset-2" style={{ animationDelay: "240ms" }}>{children}</div>
      </Container>
    </section>
  );
}
