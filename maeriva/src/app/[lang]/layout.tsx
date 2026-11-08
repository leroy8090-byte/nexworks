import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer, MobileBar } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/Motion";
import { JsonLd } from "@/components/ui";
import { agencyFor } from "@/data/localized";
import { LIVE } from "@/data/site";
import { isLang, LOCALES } from "@/i18n/config";
import { agencyLd, SITE_URL } from "@/lib/seo";
import "../globals.css";

// Cormorant pour les titres, proche des lettres du logo ; Jost pour le texte, comme « REAL ESTATE ».
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-mv-serif", display: "swap" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-mv-sans", display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const a = agencyFor(isLang(lang) ? lang : "fr");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${a.name} | ${lang === "en" ? "Luxury real estate in Saint-Tropez" : "Immobilier de prestige à Saint-Tropez"}`, template: `%s | ${a.name}` },
    description: a.description,
    // Démonstration : fermée aux moteurs tant que le site n'est pas mis en service.
    robots: LIVE ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" };

// Décidé avant l'affichage : la vidéo d'introduction ne se joue qu'à la première visite de l'accueil (français ou anglais),
// rejouable avec ?intro dans l'adresse, jamais si le visiteur a demandé moins d'animations ou économise ses données.
const INTRO_DECISION = `try{var p=location.pathname,f=/[?&]intro(=|&|$)/.test(location.search),c=navigator.connection;if((p==="/"||p==="/en"||p==="/en/")&&(f||!sessionStorage.getItem("maeriva:intro"))&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!(c&&c.saveData))document.documentElement.dataset.intro="1"}catch(e){}`;

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: INTRO_DECISION }} /><noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.reveal-cover{display:none!important}"}</style></noscript></head>
      <body className="min-h-dvh">
        <JsonLd data={agencyLd(lang)} />
        <MotionProvider>
          <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-5 focus:py-2">{lang === "fr" ? "Aller au contenu" : "Skip to content"}</a>
          <Header lang={lang} />
          <main id="contenu">{children}</main>
          <Footer lang={lang} />
          <MobileBar lang={lang} />
        </MotionProvider>
      </body>
    </html>
  );
}
