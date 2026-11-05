import { Btn, PageTop } from "@/components/azur/ui";

export default function AzurNotFound() {
  return (
    <PageTop sign="Page introuvable" title="Ce tuyau ne mène nulle part." text="Cette page n'existe pas ou a été déplacée.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Btn href="/azur-plomberie" variant="white" arrow>Retour à l&apos;accueil</Btn>
        <Btn href="/azur-plomberie/services" variant="line-light" arrow>Voir les services</Btn>
      </div>
    </PageTop>
  );
}
