import Image from "next/image";
import type { ReactNode } from "react";
import { CapButton, Reveal, SectionHead, serif, Wrap } from "./ui";

export function Steps({ title, eyebrow, items }: { title: string; eyebrow?: string; items: { t: string; d: string }[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Wrap>
        <SectionHead eyebrow={eyebrow} title={title} />
        <ol className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.08}>
                <p className={`${serif} text-[3rem] leading-none text-[#183B50]/35`}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className={`${serif} mt-4 text-[1.6rem] leading-tight text-[#252A2D]`}>{s.t}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.8] text-[#252A2D]/70">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

export function Split({
  eyebrow,
  title,
  children,
  image,
  alt,
  reverse = false,
  tone = "light",
  id,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  image?: string;
  alt?: string;
  reverse?: boolean;
  tone?: "light" | "sand";
  id?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-32 py-20 sm:py-28 ${tone === "sand" ? "bg-[#E8E0D4]/55" : ""}`}>
      <Wrap className={`grid items-center gap-12 lg:gap-24 ${image ? "lg:grid-cols-2" : ""}`}>
        {image && (
          <Reveal className={`relative aspect-[4/3] overflow-hidden bg-[#E8E0D4] ${reverse ? "lg:order-2" : ""}`}>
            <Image src={image} alt={alt ?? ""} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
        )}
        <div className={image ? "" : "max-w-3xl"}>
          <SectionHead eyebrow={eyebrow} title={title} />
          <Reveal delay={0.1} className="mt-6 space-y-5 text-[16.5px] leading-[1.85] text-[#252A2D]/72">
            {children}
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}

export function CtaBand({ title, text, primary, secondary }: { title: string; text?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="bg-[#183B50] py-20 text-[#F8F7F3] sm:py-24">
      <Wrap className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className={`${serif} text-[2.2rem] leading-[1.1] sm:text-[3rem]`}>{title}</h2>
          {text && <p className="mt-4 text-[16.5px] leading-[1.8] text-[#F8F7F3]/75">{text}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CapButton href={primary.href} variant="sand">
            {primary.label}
          </CapButton>
          {secondary && (
            <CapButton href={secondary.href} variant="light">
              {secondary.label}
            </CapButton>
          )}
        </div>
      </Wrap>
    </section>
  );
}

export function ToComplete({ children }: { children: ReactNode }) {
  return <span className="rounded-sm bg-[#B07A52]/15 px-1.5 py-0.5 text-[0.92em] text-[#7a4d2a]">{children}</span>;
}
