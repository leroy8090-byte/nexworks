import { Button } from "@/components/ui/Button";
import { Container, Glow } from "@/components/ui/Section";
import { pagePath } from "@/i18n/lang";

/**
 * Page 404. Le serveur ne connaît pas la langue de l'adresse demandée : le message est donc donné
 * dans les deux langues, sans rien lire côté navigateur (pas d'écart entre serveur et navigateur).
 */
export function NotFoundContent() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-28">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <Glow className="left-1/2 top-1/4 h-[560px] w-[760px] -translate-x-1/2" />
      <Container className="relative text-center">
        <p className="font-display text-[clamp(5rem,16vw,11rem)] font-semibold leading-none text-sky-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          <span lang="fr">Cette page n&apos;existe pas.</span>
          <span className="mt-2 block text-xl text-white/70 sm:text-2xl" lang="en">This page doesn&apos;t exist.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-mist">
          <span lang="fr">Le lien est peut-être incorrect, ou la page a été déplacée.</span>
          <span className="mt-1 block" lang="en">The link may be incorrect, or the page may have moved.</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={pagePath("fr", "home")} arrow>
            Retour à l&apos;accueil
          </Button>
          <Button href={pagePath("en", "home")} variant="secondary">
            Back to the homepage
          </Button>
        </div>
      </Container>
    </section>
  );
}
