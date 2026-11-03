"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function AccesForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/sierra-immobilier";
  const [user, setUser] = useState("client");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sierra-acces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      if (!res.ok) {
        setError("Identifiants incorrects.");
        setLoading(false);
        return;
      }
      router.replace(next.startsWith("/sierra-immobilier") ? next : "/sierra-immobilier");
      router.refresh();
    } catch {
      setError("Connexion impossible. Réessaie.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#231F31] px-5">
      <div className="w-full max-w-md border border-white/10 bg-[#2D2640] p-8 shadow-2xl">
        <Image src="/sierra-immobilier/logo.png" alt="Sierra Immobilier" width={200} height={133} className="mx-auto h-14 w-auto" />
        <h1 className="mt-6 text-center text-[1.35rem] font-semibold text-white">Accès privé</h1>
        <p className="mt-2 text-center text-[13.5px] text-white/60">Proposition de refonte — réservée au client.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="u" className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#A68936]">
              Identifiant
            </label>
            <input
              id="u"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-2 w-full border-0 border-b border-white/25 bg-transparent py-2.5 text-white outline-none focus:border-[#A68936]"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="p" className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#A68936]">
              Mot de passe
            </label>
            <input
              id="p"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="mt-2 w-full border-0 border-b border-white/25 bg-transparent py-2.5 text-white outline-none focus:border-[#A68936]"
              autoComplete="current-password"
              autoFocus
            />
          </div>
          {error && (
            <p role="alert" className="text-[13px] text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A68936] py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-[#231F31] disabled:opacity-60"
          >
            {loading ? "Connexion…" : "Entrer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AccesPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#231F31]" />}>
      <AccesForm />
    </Suspense>
  );
}
