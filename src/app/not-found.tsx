import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container, Glow } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Page introuvable", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Glow className="left-1/2 top-1/4 h-[560px] w-[760px] -translate-x-1/2" />
      <Container className="relative text-center">
        <p className="font-display text-[clamp(5rem,16vw,11rem)] font-semibold leading-none text-sky-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Cette page n&apos;existe pas.</h1>
        <p className="mx-auto mt-4 max-w-md text-mist">Le lien est peut-être incorrect, ou la page a été déplacée.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" arrow>
            Retour à l&apos;accueil
          </Button>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </div>
      </Container>
    </section>
  );
}
