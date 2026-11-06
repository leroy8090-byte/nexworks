import type { Metadata } from "next";
import { FavoritesList } from "@/components/FavoritesList";
import { Container } from "@/components/ui";
import { getCards } from "@/lib/listings";

export const metadata: Metadata = { title: "Mes favoris", robots: { index: false, follow: true } };

export default function Favoris() {
  return (
    <section className="pb-24 pt-44 sm:pt-52">
      <Container>
        <h1 className="title-in text-[3.1rem] leading-[1.03] text-night sm:text-[4.6rem]">Mes favoris</h1>
        <div className="mt-10"><FavoritesList cards={getCards()} /></div>
      </Container>
    </section>
  );
}
