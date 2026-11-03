import type { Metadata } from "next";
import { ScheduleBoard } from "@/components/volt/ScheduleBoard";
import { PageIntro, Wrap } from "@/components/volt/ui";

export const metadata: Metadata = {
  title: "Planning des cours",
  description: "Planning fictif des cours de VOLT FITNESS CLUB : filtrez par jour et par niveau.",
};

export default function PlanningPage() {
  return (
    <>
      <PageIntro
        eyebrow="Planning"
        title="Les cours de la semaine."
        text="Choisissez un jour, filtrez par niveau. La réservation est une démonstration : aucune place n'est réellement réservée."
      />
      <Wrap className="py-16 sm:py-24">
        <ScheduleBoard />
      </Wrap>
    </>
  );
}
