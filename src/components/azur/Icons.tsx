import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const AzurIcons = {
  wrench: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5L3.5 17.1a1.8 1.8 0 0 0 2.5 2.5l5.8-5.8a4 4 0 0 0 5-5.4l-2.4 2.4-2.1-.5-.5-2.1 2.3-2.5Z" />
    </svg>
  ),
  drop: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11Z" />
    </svg>
  ),
  bath: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2Z" />
      <path d="M6 12V6a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2" />
    </svg>
  ),
  home: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  heater: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="6" y="3" width="12" height="18" rx="3" />
      <path d="M12 8c1.5 1.5 2 2.5 2 3.5a2 2 0 0 1-4 0c0-.7.3-1.2 1-1.8" />
    </svg>
  ),
  phone: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  mail: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  pin: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 21s-6.5-5.7-6.5-11A6.5 6.5 0 0 1 18.5 10C18.5 15.3 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  ),
  check: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2.1} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  ),
  arrow: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  menu: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: P) => (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={2} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
};
