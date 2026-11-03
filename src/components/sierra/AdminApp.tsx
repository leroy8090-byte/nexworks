"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PropertyType } from "@/data/sierra";
import { formatPrice, sierra } from "@/data/sierra";
import type { CmsProperty } from "@/lib/sierra-cms";

type FormState = {
  title: string;
  city: string;
  price: string;
  surface: string;
  rooms: string;
  bedrooms: string;
  type: PropertyType;
  transaction: "achat" | "location";
  tagline: string;
  features: string;
  description: string;
  images: string;
  officialUrl: string;
  exclusif: boolean;
  coupDeCoeur: boolean;
  published: boolean;
};

const emptyForm = (): FormState => ({
  title: "",
  city: "Saint-Raphaël",
  price: "",
  surface: "",
  rooms: "3",
  bedrooms: "2",
  type: "appartement",
  transaction: "achat",
  tagline: "",
  features: "",
  description: "",
  images: "",
  officialUrl: "",
  exclusif: false,
  coupDeCoeur: false,
  published: true,
});

function toForm(p: CmsProperty): FormState {
  return {
    title: p.title,
    city: p.city,
    price: String(p.price),
    surface: String(p.surface),
    rooms: String(p.rooms),
    bedrooms: String(p.bedrooms),
    type: p.type,
    transaction: p.transaction,
    tagline: p.tagline,
    features: p.features.join(", "),
    description: p.description.join("\n\n"),
    images: p.images.join("\n"),
    officialUrl: p.officialUrl || "",
    exclusif: !!p.exclusif,
    coupDeCoeur: !!p.coupDeCoeur,
    published: p.published !== false,
  };
}

function fromForm(f: FormState) {
  return {
    title: f.title,
    city: f.city,
    price: Number(f.price) || 0,
    surface: Number(f.surface) || 0,
    rooms: Number(f.rooms) || 0,
    bedrooms: Number(f.bedrooms) || 0,
    type: f.type,
    transaction: f.transaction,
    tagline: f.tagline,
    features: f.features
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
    description: f.description
      .split(/\n\s*\n/)
      .map((x) => x.trim())
      .filter(Boolean),
    images: f.images
      .split(/\n/)
      .map((x) => x.trim())
      .filter(Boolean),
    officialUrl: f.officialUrl,
    exclusif: f.exclusif,
    coupDeCoeur: f.coupDeCoeur,
    published: f.published,
  };
}

const field =
  "mt-1.5 w-full border border-[#E8E4DE] bg-white px-3 py-2.5 text-[14px] text-[#231F31] outline-none focus:border-[#A68936]";
const label = "block text-[11px] font-bold uppercase tracking-[0.16em] text-[#7A7684]";

export function AdminApp() {
  const [items, setItems] = useState<CmsProperty[]>([]);
  const [storage, setStorage] = useState<{ writableSeed?: boolean; tmpExists?: boolean } | null>(null);
  const [q, setQ] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [tab, setTab] = useState<"list" | "form">("list");

  const load = useCallback(async () => {
    const res = await fetch("/api/sierra-cms?all=1", { cache: "no-store" });
    if (!res.ok) throw new Error("Chargement impossible");
    const data = await res.json();
    setItems(data.properties || []);
    setStorage(data.storage || null);
  }, []);

  useEffect(() => {
    load().catch(() => setMsg("Impossible de charger les annonces."));
  }, [load]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s) ||
        p.slug.toLowerCase().includes(s),
    );
  }, [items, q]);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setTab("form");
    setMsg("");
  }

  function startEdit(p: CmsProperty) {
    setEditingId(p.id);
    setForm(toForm(p));
    setTab("form");
    setMsg("");
  }

  async function save() {
    if (!form.title.trim()) {
      setMsg("Le titre est obligatoire.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const body = fromForm(form);
      const res = await fetch(editingId ? `/api/sierra-cms/${encodeURIComponent(editingId)}` : "/api/sierra-cms", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      await load();
      setMsg(editingId ? "Bien mis à jour." : "Bien ajouté.");
      setTab("list");
      setEditingId(null);
      setForm(emptyForm());
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur de sauvegarde");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, title: string) {
    if (!confirm(`Supprimer définitivement « ${title} » ?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/sierra-cms/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Suppression impossible");
      await load();
      setMsg("Bien supprimé.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  async function onUpload(file: File) {
    setBusy(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/sierra-cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload impossible");
      setForm((f) => ({ ...f, images: f.images ? `${data.url}\n${f.images}` : data.url }));
      setMsg("Photo ajoutée.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload impossible");
    } finally {
      setBusy(false);
    }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), properties: items }, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `sierra-cms-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }

  async function importJson(file: File) {
    setBusy(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const properties = Array.isArray(parsed) ? parsed : parsed.properties;
      if (!Array.isArray(properties)) throw new Error("JSON invalide");
      const res = await fetch("/api/sierra-cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ properties }),
      });
      if (!res.ok) throw new Error("Import impossible");
      await load();
      setMsg(`Import OK — ${properties.length} biens.`);
      setTab("list");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Import impossible");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-[#F4F2F0] text-[#231F31]">
      <header className="border-b border-[#E8E4DE] bg-[#231F31] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-4">
            <Image src={sierra.logo} alt="" width={140} height={90} className="h-10 w-auto" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A68936]">Mini logiciel</p>
              <h1 className="text-[1.15rem] font-semibold">Back-office annonces</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={sierra.basePath} className="border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-[#A68936]">
              Voir le site
            </Link>
            <button type="button" onClick={exportJson} className="border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-[#A68936]">
              Exporter
            </button>
            <label className="cursor-pointer border border-white/25 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] hover:border-[#A68936]">
              Importer
              <input
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void importJson(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab("list")}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] ${tab === "list" ? "bg-[#231F31] text-white" : "bg-white text-[#231F31]"}`}
            >
              Annonces ({items.length})
            </button>
            <button
              type="button"
              onClick={startCreate}
              className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] ${tab === "form" && !editingId ? "bg-[#A68936] text-white" : "bg-[#A68936]/90 text-white"}`}
            >
              + Ajouter un bien
            </button>
          </div>
          {tab === "list" && (
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher…"
              className="w-full max-w-xs border border-[#E8E4DE] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#A68936] sm:w-64"
            />
          )}
        </div>

        {msg && (
          <p className="mb-4 border border-[#A68936]/40 bg-white px-4 py-3 text-[14px] text-[#231F31]" role="status">
            {msg}
          </p>
        )}

        {storage && !storage.writableSeed && (
          <p className="mb-4 border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
            Hébergement serverless : les changements peuvent être temporaires. Utilise <strong>Exporter</strong> pour
            sauvegarder, puis <strong>Importer</strong> pour restaurer.
          </p>
        )}

        {tab === "list" ? (
          <div className="overflow-hidden border border-[#E8E4DE] bg-white">
            <table className="w-full text-left text-[13.5px]">
              <thead className="bg-[#F4F2F0] text-[11px] uppercase tracking-[0.12em] text-[#7A7684]">
                <tr>
                  <th className="px-4 py-3">Bien</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Ville</th>
                  <th className="px-4 py-3">Prix</th>
                  <th className="hidden px-4 py-3 md:table-cell">Statut</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t border-[#E8E4DE]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative hidden size-12 shrink-0 overflow-hidden bg-[#231F31] sm:block">
                          <Image src={p.images[0] || "/sierra-immobilier/agency.webp"} alt="" fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#231F31]">{p.title}</p>
                          <p className="text-[12px] text-[#7A7684]">
                            {p.transaction === "achat" ? "Vente" : "Location"} · {p.surface} m²
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">{p.city}</td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(p.price, p.transaction)}</td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className={`text-[11px] font-bold uppercase ${p.published === false ? "text-red-600" : "text-emerald-700"}`}>
                        {p.published === false ? "Brouillon" : "Publié"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => startEdit(p)} className="text-[11px] font-bold uppercase tracking-wide text-[#A68936]">
                          Éditer
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => void remove(p.id, p.title)}
                          className="text-[11px] font-bold uppercase tracking-wide text-red-600"
                        >
                          Suppr.
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[#7A7684]">
                      Aucune annonce.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border border-[#E8E4DE] bg-white p-5 sm:p-8">
            <h2 className="text-[1.35rem] font-semibold">{editingId ? "Modifier le bien" : "Nouveau bien"}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={label}>Titre *</label>
                <input className={field} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className={label}>Ville</label>
                <input className={field} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className={label}>Transaction</label>
                <select className={field} value={form.transaction} onChange={(e) => setForm({ ...form, transaction: e.target.value as "achat" | "location" })}>
                  <option value="achat">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>
              <div>
                <label className={label}>Type</label>
                <select className={field} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as PropertyType })}>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="villa">Villa</option>
                  <option value="terrain">Terrain</option>
                </select>
              </div>
              <div>
                <label className={label}>Prix (€)</label>
                <input className={field} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <label className={label}>Surface (m²)</label>
                <input className={field} type="number" value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })} />
              </div>
              <div>
                <label className={label}>Pièces</label>
                <input className={field} type="number" value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })} />
              </div>
              <div>
                <label className={label}>Chambres</label>
                <input className={field} type="number" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Accroche</label>
                <input className={field} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Description (paragraphes séparés par une ligne vide)</label>
                <textarea className={`${field} min-h-28`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Points forts (séparés par des virgules)</label>
                <input className={field} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Terrasse, Garage, Cave" />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Photos (une URL par ligne)</label>
                <textarea className={`${field} min-h-20`} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="https://... ou /sierra-immobilier/..." />
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-[#A68936]">
                  + Upload image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onUpload(f);
                      e.currentTarget.value = "";
                    }}
                  />
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Lien annonce officielle (facultatif)</label>
                <input className={field} value={form.officialUrl} onChange={(e) => setForm({ ...form, officialUrl: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.exclusif} onChange={(e) => setForm({ ...form, exclusif: e.target.checked })} />
                Exclusif
              </label>
              <label className="flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.coupDeCoeur} onChange={(e) => setForm({ ...form, coupDeCoeur: e.target.checked })} />
                Coup de cœur
              </label>
              <label className="flex items-center gap-2 text-[14px]">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Publié sur le site
              </label>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" disabled={busy} onClick={() => void save()} className="bg-[#A68936] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white hover:bg-[#231F31] disabled:opacity-60">
                {busy ? "Enregistrement…" : "Enregistrer"}
              </button>
              <button type="button" onClick={() => setTab("list")} className="border border-[#231F31] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em]">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
