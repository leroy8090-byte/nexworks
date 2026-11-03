import type { Metadata } from "next";
import { AdminApp } from "@/components/sierra/AdminApp";

export const metadata: Metadata = {
  title: "Back-office annonces",
  robots: { index: false, follow: false },
};

export default function SierraAdminPage() {
  return <AdminApp />;
}
