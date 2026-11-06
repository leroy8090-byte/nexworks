import { type Property, type Transaction } from "@/data/capital";
import { getProperties } from "@/lib/capital-properties";
import { ListingClient, type ListValues } from "./ListingClient";
import { DemoNotice, Wrap } from "./ui";

export type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** Le navigateur reçoit de quoi filtrer, sans les longs textes des fiches. */
export const toCard = (p: Property): Property => ({ ...p, description: [], videos: [] });

/** Liste : les biens viennent du logiciel NEXWORKS ESTATE, le filtrage se fait instantanément dans le navigateur. */
export async function Listing({ basePath, sp, transaction }: { basePath: string; sp: SP; transaction?: Transaction }) {
  const all = await getProperties();
  const initial: ListValues = {
    type: one(sp.type),
    commune: one(sp.commune),
    budget: one(sp.budget),
    rooms: one(sp.rooms),
    surface: one(sp.surface),
    sort: one(sp.sort),
    transaction: transaction ?? one(sp.transaction),
    feature: one(sp.feature),
  };
  return (
    <section className="pb-20 pt-10 sm:pb-28">
      <Wrap>
        <DemoNotice className="mb-6" />
        <ListingClient properties={all.map(toCard)} basePath={basePath} initial={initial} fixedTransaction={transaction} />
      </Wrap>
    </section>
  );
}
