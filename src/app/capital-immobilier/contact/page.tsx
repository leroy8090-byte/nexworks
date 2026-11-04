import { ContactForm } from "@/components/capital/Forms";
import { capitalMeta } from "@/components/capital/seo";
import { PageIntro, Wrap, serif } from "@/components/capital/ui";
import { capital } from "@/data/capital";
import { getProperty } from "@/lib/capital-properties";

export const metadata = capitalMeta("Contact", "Contacter CAPITAL IMMOBILIER à Saint-Raphaël : téléphone, adresse, e-mail et formulaire de contact.", "/contact");

export default async function Contact({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.bien) ? sp.bien[0] : sp.bien;
  const prop = raw ? await getProperty(raw) : undefined;
  const bien = prop ? `${prop.title} — ${prop.commune} (${prop.ref})` : undefined;
  return (
    <>
      <PageIntro eyebrow="Contact" title="Confiez-nous votre projet." text={bien ? `Votre demande concerne : ${bien}.` : "Achat, vente, location, gestion ou copropriété : décrivez votre projet, nous vous répondons."} />
      <section className="py-16 sm:py-24">
        <Wrap className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <h2 className={`${serif} text-[2rem]`}>Coordonnées de l&apos;agence</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">Téléphone</dt>
                <dd className="mt-1">
                  <a href={`tel:${capital.phoneHref}`} className={`${serif} text-[2rem] text-[#183B50] hover:underline`}>
                    {capital.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">Adresse</dt>
                <dd className="mt-1 text-[16px]">
                  {capital.address.street}
                  <br />
                  {capital.address.postalCode} {capital.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#183B50]/70">E-mail</dt>
                <dd className="mt-1">
                  <a href={`mailto:${capital.email}`} className="break-all text-[16px] underline underline-offset-4">
                    {capital.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-[13.5px] leading-relaxed text-[#252A2D]/60">Site de test : le formulaire ci-contre arrive dans le logiciel NEXWORKS ESTATE, pas chez l&apos;agence. Pour joindre l&apos;agence, utilisez le téléphone ou l&apos;e-mail.</p>
          </div>
          <div className="bg-white p-7 shadow-[0_30px_70px_-45px_rgba(24,59,80,.4)] sm:p-10">
            <ContactForm bien={bien} reference={prop?.ref} idPrefix="contact" />
          </div>
        </Wrap>
      </section>
    </>
  );
}
