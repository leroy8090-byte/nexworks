"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { pagePath, quotePath } from "@/i18n/lang";
import { useLang } from "@/i18n/use-lang";
import { ease } from "@/lib/utils";

/** Sur téléphone : le bouton de devis arrive une fois le premier écran passé, et s'efface en bas de page. */
export function MobileQuoteBar() {
  const pathname = usePathname();
  const lang = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const left = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setShow(window.scrollY > 600 && left > 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);
  if (pathname.startsWith(pagePath(lang, "contact"))) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 90 }} animate={{ y: 0 }} exit={{ y: 90 }} transition={{ duration: 0.4, ease }} className="fixed inset-x-3 bottom-3 z-40 md:hidden">
          <Link href={quotePath(lang)} className="flex h-14 items-center justify-center gap-2 rounded-full bg-sky text-base font-bold text-ink shadow-[0_16px_40px_-10px_rgba(0,0,0,.8)]">
            {lang === "en" ? "Request a quote" : "Demander un devis"} <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
