import { Btn, Container } from "@/components/ui";

export const metadata = { title: "Page introuvable", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="pb-28 pt-48 sm:pt-56">
      <p className="text-[15px] text-muted">Erreur 404</p>
      <h1 className="mt-4 max-w-3xl text-[3rem] leading-[1.03] text-night sm:text-[4.6rem]">Cette page n’existe pas.</h1>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Btn href="/biens" arrow>Découvrir nos biens</Btn>
        <Btn href="/" variant="line">Retour à l’accueil</Btn>
        <Btn href="/plan-du-site" variant="line">Plan du site</Btn>
      </div>
    </Container>
  );
}
