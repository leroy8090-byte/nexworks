import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const Check = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7.5 8 5.5 8-5.5" />
  </svg>
);
export const Target = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>
);
export const Layers = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
    <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </svg>
);
export const Gauge = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 17.5a8.5 8.5 0 1 1 15 0" />
    <path d="m12 13 4-4.5" />
    <circle cx="12" cy="13.5" r="1" fill="currentColor" />
  </svg>
);
export const Infinity = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 12c-1.8-2.6-3.4-4-5.2-4a4 4 0 0 0 0 8c1.8 0 3.4-1.4 5.2-4Zm0 0c1.8 2.6 3.4 4 5.2 4a4 4 0 0 0 0-8c-1.8 0-3.4 1.4-5.2 4Z" />
  </svg>
);
export const Hotel = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20.5V6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14M16 10h2.5a1.5 1.5 0 0 1 1.5 1.5v9M2.5 20.5h19" />
    <path d="M8 8.5h4M8 12h4M8 15.5h4" />
  </svg>
);
export const Restaurant = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 3.5v7.2M4.5 3.5v5a2.5 2.5 0 0 0 5 0v-5M7 10.7v9.8" />
    <path d="M16.5 20.5V3.5c-2.2 1.4-3.5 4-3.5 7.2 0 1.2.8 2 2 2h1.5" />
  </svg>
);
export const Business = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="2.5" />
    <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 13h17" />
    <path d="M11 13v1.5h2V13" />
  </svg>
);
export const Spark = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5ZM18.5 15.5c.2 1.5.8 2.1 2.3 2.3-1.5.2-2.1.8-2.3 2.3-.2-1.5-.8-2.1-2.3-2.3 1.5-.2 2.1-.8 2.3-2.3Z" />
  </svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5 5 6v5.5c0 4.4 2.8 7.6 7 9 4.2-1.4 7-4.6 7-9V6l-7-2.5Z" />
    <path d="m9 12 2.2 2.2L15 10.5" />
  </svg>
);
export const Linkedin = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
    <path d="M8 10.5V16M8 7.8v.01M11.5 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M11.5 10.5V16" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
  </svg>
);
