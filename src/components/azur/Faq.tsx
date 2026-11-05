import { azurFaq } from "@/data/azur";
import { Sign, Wrap } from "./ui";

export function Faq() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Wrap className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <Sign>Questions</Sign>
          <h2 className="mt-4 text-[clamp(2.7rem,5.5vw,5rem)]">Ce qu&apos;on nous demande souvent.</h2>
        </div>
        <div className="border-t-2 border-az-ink">
          {azurFaq.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b-2 border-az-ink/15 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-az-cobalt text-xl leading-none text-white transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 max-w-2xl pr-12 text-[17px] leading-relaxed text-az-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
