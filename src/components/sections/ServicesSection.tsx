import { services } from "@/data/services";
import { Container, Glow, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <Glow className="-right-60 top-20 h-[700px] w-[700px]" tone="deep" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Nos services"
          title="Tout ce qu'il faut pour développer votre *présence digitale.*"
          text="De la conception à l'optimisation, nous réunissons les compétences essentielles pour faire évoluer votre entreprise en ligne."
        />
        <div className="mt-14 space-y-6 lg:space-y-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
