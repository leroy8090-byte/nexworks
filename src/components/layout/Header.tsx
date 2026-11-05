"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, quoteHref } from "@/config/site";
import { cn, ease } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Close, Menu } from "@/components/ui/Icons";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Ferme le menu à chaque navigation
  useEffect(() => setOpen(false), [pathname]);

  // Verrouille le défilement + Échap
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className={cn("fixed inset-x-0 z-50 px-3 transition-[top] duration-500 sm:px-5", scrolled ? "top-2 sm:top-3" : "top-3 sm:top-5")}>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-sky focus:px-4 focus:py-2 focus:text-ink"
        >
          Aller au contenu
        </a>
        <div
          className={cn(
            "relative mx-auto flex h-[60px] w-full max-w-[1240px] items-center justify-between gap-4 overflow-hidden rounded-full border pl-5 pr-2.5 transition-colors duration-500 sm:pl-6",
            scrolled || open ? "border-white/15 bg-[#0a0e13]/90 backdrop-blur-xl" : "border-white/10 bg-[#0a0e13]/55 backdrop-blur-md",
          )}
        >
          <Logo priority className="h-7 sm:h-8" />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors", active ? "text-white" : "text-white/70 hover:text-white")}
                >
                  {active && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href={quoteHref}>Demander un devis</Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition active:scale-95 lg:hidden"
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {/* Avancement dans la page */}
          <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-x-6 bottom-0 h-px origin-left bg-sky" aria-hidden />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink/95 px-5 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Navigation mobile" className="relative flex flex-col">
              {navigation.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease }}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn("flex items-center border-b border-white/10 py-5 font-display text-3xl font-bold", isActive(item.href) ? "text-sky" : "text-white")}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6, ease }} className="relative mt-10">
              <Button href={quoteHref} size="lg" arrow className="w-full">
                Demander un devis
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
