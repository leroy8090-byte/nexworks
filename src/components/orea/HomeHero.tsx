"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { BookingBar } from "./BookingBar";
import { Wrap } from "./ui";

/** La photo s'ouvre et les deux lignes du titre s'écartent au défilement. */
export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.22]);
  const left = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-16%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const shade = useTransform(scrollYProgress, [0, 1], [0.35, 0.8]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[calc(100svh-32px)] flex-col justify-end overflow-hidden bg-or-ink pb-8 pt-28 text-white sm:pb-10">
      <motion.div style={{ scale }} className="orea-reveal absolute inset-0 -z-20">
        <Image src="/orea-drive/hero.webp" alt="Voiture sur une route sinueuse au coucher du soleil" fill preload sizes="100vw" className="object-cover object-[50%_60%]" />
      </motion.div>
      <motion.div aria-hidden style={{ opacity: shade }} className="absolute inset-0 -z-10 bg-or-ink" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-or-ink via-or-ink/60 to-transparent" />

      <Wrap>
        <h1 className="text-[clamp(4.1rem,14.5vw,14rem)] leading-[0.84]">
          <motion.span style={{ x: left }} className="block">
            <span className="block overflow-hidden pb-1"><span className="word-rise" style={{ animationDelay: "0.25s" }}>La route</span></span>
          </motion.span>
          <motion.span style={{ x: right }} className="block">
            <span className="block overflow-hidden pb-1"><span className="word-rise text-or-flame" style={{ animationDelay: "0.4s" }}>vous attend.</span></span>
          </motion.span>
        </h1>
        <p className="rise mt-5 max-w-xl text-lg leading-snug text-white/90 sm:text-xl" style={{ animationDelay: "0.65s" }}>
          Louez la bonne voiture sur la Côte d&apos;Azur en moins de trois minutes. Le prix total est affiché avant de réserver.
        </p>
        <div className="rise relative z-10 mt-7" style={{ animationDelay: "0.8s" }}>
          <BookingBar />
        </div>
      </Wrap>
    </section>
  );
}
