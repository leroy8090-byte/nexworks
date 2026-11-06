import { MapFrame } from "@/components/MapFrame";
import { Reveal } from "@/components/Motion";
import { RequestForm } from "@/components/RequestForm";
import { Container, PageHero } from "@/components/ui";
import { agency } from "@/data/agency";
import { pageMeta } from "@/lib/seo";

const DESC = `Contactez CAPITAL IMMOBILIER à Saint-Raphaël : ${agency.phone}, ${agency.email}, ${agency.street}. Achat, vente, location, gestion, syndic.`;
export const metadata = pageMeta({ title: "Contacter l’agence à Saint-Raphaël", description: DESC, path: "/contact", image: "/media/saint-raphael-port.webp" });

export default function Contact() {
  const place = `${agency.street}, ${agency.postalCode} ${agency.city}`;
  const row = "border-t border-white/25 py-5";
  return (
    <>
      <PageHero crumbs={[{"name":"Contact","path":"/contact"}]} eyebrow="Contact" title="Parlons de votre projet." text="Achat, vente, location, gestion ou syndic : décrivez votre projet, l’agence vous répond." image="/media/saint-raphael-port.webp" alt="Le port de plaisance de Saint-Raphaël et sa grande roue" />
      <section className="bg-night py-20 text-white sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <dl>
              <div className={row}><dt className="text-[14.5px] text-white/65">Téléphone</dt><dd className="mt-1"><a href={`tel:${agency.phoneHref}`} className="line-link text-[2.2rem] font-bold tracking-[-0.03em] [font-family:var(--font-display)] sm:text-[3rem]">{agency.phone}</a></dd></div>
              <div className={row}><dt className="text-[14.5px] text-white/65">E-mail</dt><dd className="mt-1 text-[18px]"><a href={`mailto:${agency.email}`} className="line-link break-all">{agency.email}</a></dd></div>
              <div className={row}><dt className="text-[14.5px] text-white/65">Adresse</dt><dd className="mt-1 text-[18px] leading-relaxed">{agency.street}<br />{agency.postalCode} {agency.city}</dd></div>
              <div className={row}><dt className="text-[14.5px] text-white/65">Fax</dt><dd className="mt-1 text-[18px]">{agency.fax}</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="bg-white p-6 text-ink sm:p-10 lg:col-span-7">
            <RequestForm id="con" kind="Contact général" fields={[{ name: "sujet", label: "Votre demande concerne", type: "select", options: ["Acheter", "Louer", "Vendre ou estimer", "Gestion locative", "Syndic de copropriété", "ASL ou ASA", "Location de vacances", "Autre"], required: true }]} />
          </Reveal>
        </Container>
      </section>
      <section className="bg-white py-20 sm:py-28"><Container><MapFrame query={place} title="Carte : l’agence à Saint-Raphaël" image="/media/saint-raphael-port.webp" /></Container></section>
    </>
  );
}
