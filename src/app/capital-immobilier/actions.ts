"use server";

export type InquiryInput = {
  type: "general" | "property" | "estimation";
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyReference?: string;
  origin: string;
};

/** La clé secrète reste sur le serveur : le navigateur ne parle jamais directement à l'API du logiciel. */
export async function sendInquiry(i: InquiryInput): Promise<{ ok: boolean }> {
  const base = process.env.ESTATE_API_URL;
  const key = process.env.ESTATE_API_KEY;
  if (!base || !key) return { ok: false };
  const [first, ...rest] = String(i.name).trim().split(/\s+/);
  try {
    const res = await fetch(`${base}/inquiries`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        type: i.type,
        first_name: first,
        last_name: rest.join(" "),
        email: i.email,
        phone: i.phone || undefined,
        message: i.message,
        property_reference: i.propertyReference || undefined,
        origin: i.origin,
      }),
      cache: "no-store",
    });
    if (!res.ok) console.error("Demande refusée par le logiciel", res.status);
    return { ok: res.ok };
  } catch (e) {
    console.error("Logiciel injoignable", e);
    return { ok: false };
  }
}
