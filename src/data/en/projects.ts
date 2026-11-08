// Version anglaise de ../projects.ts : mêmes projets (slugs, images, liens), seuls les textes sont traduits.
import { projects, type Project } from "../projects";

type Texts = Pick<Project, "categoryLabel" | "filterLabel" | "summary" | "context" | "goals" | "pages" | "features" | "highlights" | "tags" | "alt">;

const translations: Record<string, Texts> = {
  "solea-restaurant": {
    categoryLabel: "Restaurant website",
    filterLabel: "Restaurants",
    summary: "A Mediterranean digital experience imagined to showcase a restaurant, its menu and its atmosphere.",
    context:
      "SOLEA is a fictional Mediterranean restaurant in Saint-Raphaël, imagined by NEXWORKS AGENCY to illustrate our approach to restaurant websites: a warm, sunny identity, a menu that reads well on mobile, photos shown at their best and a frictionless booking journey.",
    goals: [
      "Convey the atmosphere of the place from the moment visitors arrive",
      "Present the menu clearly, especially on mobile",
      "Put booking and practical information within thumb's reach",
      "Lay the foundations for clean local SEO",
    ],
    pages: ["Home", "Our story", "The menu", "Gallery", "Booking", "Contact", "Legal pages and GDPR"],
    features: [
      "Menu that can be explored by category",
      "Photo gallery with full-screen viewer",
      "Booking form with time slots based on opening days",
      "Validated contact form, in demonstration mode",
      "Consent banner and GDPR pages",
      "Sitemap, metadata and structured restaurant data",
    ],
    highlights: ["Mediterranean atmosphere", "Menu that reads well on mobile", "Booking in the spotlight"],
    tags: ["Restaurants", "Next.js", "UX/UI", "Local SEO"],
    alt: "SOLEA Restaurant website: home page with a Mediterranean terrace facing the sea, the headline “Un goût de Méditerranée” and menu and booking buttons",
  },
  "calyra-hotel": {
    categoryLabel: "Hotel website",
    filterLabel: "Hotels",
    summary: "An elegant web experience designed to showcase a hotel and make its rooms and services easy to discover.",
    context:
      "CALYRA HOTEL is a fictional boutique hotel in Saint-Raphaël, imagined by NEXWORKS AGENCY to illustrate our approach to hotel websites: an elegant presentation, rooms shown at their best, a bilingual site and a direct path to booking.",
    goals: [
      "Create a high-end, reassuring image",
      "Showcase the rooms, experiences and services",
      "Make direct booking easier with a clear search module",
      "Structure the information for search engines and AI answer engines",
    ],
    pages: ["Home", "The hotel", "Rooms and suites", "Experiences", "Gallery", "Booking", "Contact", "Legal pages"],
    features: [
      "Bilingual French / English site with a language selector",
      "Stay search module (dates, guests, rooms)",
      "Detailed presentation of rooms and suites",
      "Photo gallery with full-screen viewer",
      "Contact, booking and newsletter forms, in demonstration mode",
      "Consent banner, sitemap, metadata and structured hotel data",
    ],
    highlights: ["High-end image", "Bilingual FR / EN site", "Easier direct booking"],
    tags: ["Hotels", "Next.js", "Bilingual", "UX/UI"],
    alt: "CALYRA Hotel website: home page with an infinity pool facing the Mediterranean and the headline “Laissez-vous porter par la Méditerranée”",
  },
  "azur-plomberie": {
    categoryLabel: "Tradesperson showcase website",
    filterLabel: "Tradespeople",
    summary:
      "A fictional plumber's website in Saint-Raphaël: an interactive house to pinpoint the problem, the right reflex in case of a leak, and a 3-step request.",
    context:
      "AZUR PLOMBERIE is a fictional business, designed by NEXWORKS AGENCY to show what a website can do for a tradesperson. Someone with a leak has no time to read: the site helps them understand their problem and tells them what to do right away, before inviting them to make a request.",
    goals: [
      "Separate emergencies from projects straight away",
      "Help visitors name the problem, even without knowing plumbing",
      "Give the right reflex before asking for anything",
      "A distinctive identity: enamel, ceramic tile and copper, far from the usual tradesperson template",
      "Stay honest: no fake reviews, no certifications, no invented phone numbers",
    ],
    pages: [
      "Home",
      "Services",
      "Emergency repairs",
      "Leak detection",
      "Drain unblocking",
      "Sanitary installation",
      "Water heaters",
      "Bathroom",
      "Service area",
      "About",
      "Contact",
      "Legal notice",
      "Privacy",
    ],
    features: [
      "Interactive cutaway house: you tap what is wrong, the site explains what to do",
      "Hero animated on scroll: the water rises until it fills the screen",
      "Animated valve and the right reflex in case of a leak, step by step",
      "Services as enamel tiles that flip over, bathroom revealed tile by tile",
      "Three-step request, pre-filled from the house and the service pages",
      "Custom hand-drawn illustrations, English version and reduced-motion settings respected",
    ],
    highlights: ["Interactive house", "Custom illustrations", "3-step request"],
    tags: ["Tradesperson", "Plumbing", "Next.js", "Saint-Raphaël"],
    alt: "AZUR PLOMBERIE website: enamel-blue hero “Ça fuit ? On s'en occupe.” with copper piping and a dripping tap",
  },
  "maison-riviera": {
    categoryLabel: "Luxury real estate website",
    filterLabel: "Real estate",
    summary:
      "An editorial website for a fictional luxury real estate agency on the French Riviera: property search, detailed listings and valuation.",
    context:
      "MAISON RIVIERA is a fictional agency based in Saint-Raphaël, imagined by NEXWORKS AGENCY to illustrate a high-end real estate website: immersive photography, filtered search, property listings with a full-screen gallery and forms in demonstration mode.",
    goals: [
      "Create an editorial, premium atmosphere",
      "Make searching by location, type, budget and surface area easy",
      "Showcase each property with a gallery and a viewing request one click away",
      "Stay honest: no fake reviews, no invented contact details",
    ],
    pages: [
      "Home",
      "Buy",
      "Sell",
      "Our properties",
      "Property listings",
      "The agency",
      "Contact",
      "Legal notice",
      "Privacy",
    ],
    features: [
      "Filtered search synchronised with the URL",
      "Listings with gallery, full-screen lightbox and viewing request button",
      "Contact and valuation forms in demonstration mode",
      "Transparency banner: demonstration for a fictional agency",
    ],
    highlights: ["Editorial", "Property search", "Detailed listings"],
    tags: ["Real estate", "Luxury", "Next.js", "French Riviera"],
    alt: "MAISON RIVIERA website: hero “L'exception a une adresse” with a luxury villa facing the Mediterranean",
  },
  "volt-fitness-club": {
    categoryLabel: "Fitness club website",
    filterLabel: "Fitness",
    summary:
      "An athletic, immersive website for a fictional fitness club in Saint-Raphaël: interactive timetable, membership plans and programmes.",
    context:
      "VOLT FITNESS CLUB is a fictional club based in Saint-Raphaël, imagined by NEXWORKS AGENCY to illustrate a premium sports website: massive typography, dark cinematic photography, electric green accents, an interactive class timetable and forms in demonstration mode.",
    goals: [
      "Create an athletic, dark and premium identity",
      "Make the timetable and classes easy to browse on mobile",
      "Present the membership plans clearly",
      "Stay honest: no fake reviews, no promise of results, no invented contact details",
    ],
    pages: ["Home", "Club", "Programmes", "Timetable", "Memberships", "Contact", "Legal notice", "Privacy"],
    features: [
      "Parallax hero, animated counters and reading progress bar",
      "Interactive timetable: day selector, level filter, booking in demonstration mode",
      "START / PERFORMANCE / ELITE plans with a comparison table",
      "Validated contact form, honeypot and demonstration mode",
      "Transparency banner: demonstration for a fictional club",
    ],
    highlights: ["Massive typography", "Interactive timetable", "Clear plans"],
    tags: ["Fitness", "Sport", "Next.js", "Saint-Raphaël"],
    alt: "VOLT FITNESS CLUB website: hero “BUILT TO BE STRONGER.” with an athlete in a dark gym and electric green accents",
  },
  "orea-drive": {
    categoryLabel: "Car rental website",
    filterLabel: "Car rental",
    summary:
      "A fictional car rental website on the French Riviera: a catalogue of 160 vehicles, complete booking and a live-calculated price.",
    context:
      "ORÉA DRIVE is a fictional rental company imagined by NEXWORKS AGENCY to show what a rental website can offer: a visitor chooses a place and dates, compares vehicles with the total price shown, then follows a clear booking journey, all carried by large scroll animations.",
    goals: [
      "Let visitors find the right vehicle and its total price in a few clicks",
      "Make every booking step obvious, especially on a phone",
      "Give the brand a strong identity, inspired by road signage",
      "Stay honest: no fake bookings, no payment, no fake reviews",
    ],
    pages: ["Home", "Vehicles", "Vehicle page", "Booking", "Destinations", "Branches", "Contact", "Legal notice", "Privacy"],
    features: [
      "Search by branch and dates, with the total price recalculated on every vehicle",
      "Three-step booking journey with options, review and summary",
      "Fleet in horizontal scroll and a road that draws itself as the page scrolls",
      "Interactive speedometer that calculates the price live",
      "Catalogue of 160 vehicles in 8 categories, with search, filters and progressive loading",
      "English version and support for reduced-motion settings",
    ],
    highlights: ["Complete booking", "Large animations", "Live price"],
    tags: ["Car rental", "Booking", "Next.js", "French Riviera"],
    alt: "ORÉA DRIVE website: large headline “La route vous attend.” over a photo of a car and a search bar for place and dates",
  },
  "capital-immobilier": {
    categoryLabel: "Estate agency website",
    filterLabel: "Real estate",
    summary:
      "A redesign concept for an estate agency in Saint-Raphaël: filterable listings, guided valuation and clear pages for property management and managing agent services.",
    context:
      "CAPITAL IMMOBILIER is a real agency in Saint-Raphaël. NEXWORKS AGENCY imagined a complete redesign of its website from its public information: a black, white and red design, large scroll animations and a simple journey to buy, rent, sell or entrust a property.",
    goals: [
      "Find a property in a few clicks, on phone and computer alike",
      "Explain the agency's trades clearly, including managing agent services and management of ASL and ASA associations",
      "Make requests easy: valuation, viewing, managing agent proposal",
      "Stay honest: no fake reviews, no invented figures, forms that say whether they are connected",
    ],
    pages: ["Home", "Listings", "Property page", "Buy", "Rent", "Sell", "Valuation", "Rental management", "Managing agent", "ASL and ASA", "Areas", "Advice", "Questions", "The agency", "Contact"],
    features: [
      "Search and filters with the number of results updated live",
      "Complete listings with gallery, features, energy rating, favourites and similar properties",
      "Four-step valuation, with the exact address of the property",
      "Animated opening with the logo and a cookie banner offering a real choice",
      "Scroll animations, adapted to reduced-motion settings",
      "Structured data and redirects ready in case of launch",
    ],
    highlights: ["Filterable catalogue", "Guided valuation", "Large animations"],
    tags: ["Estate agency", "Managing agent", "Next.js", "Saint-Raphaël"],
    alt: "CAPITAL IMMOBILIER redesign concept: large headline “Votre prochain chapitre commence ici.” over a photo of the Esterel massif",
  },
  maeriva: {
    categoryLabel: "Luxury real estate website",
    filterLabel: "Real estate",
    summary:
      "A fictional luxury real estate agency on the Gulf of Saint-Tropez: a clean white website, bilingual French and English, with an animated introduction and a journey designed to sell.",
    context:
      "MAÉRIVA is a fictional agency created by NEXWORKS AGENCY to show what a luxury real estate website can do: villas, bastides and village houses in Saint-Tropez, Sainte-Maxime and Saint-Raphaël. The site opens with a short animation, the gulf seen through the agency's name, then gives all the room to photos and properties.",
    goals: [
      "Convey a high-end, understated and luminous image, worthy of the properties shown",
      "Help sell: search, valuation and appointment booking from the first screen",
      "Welcome international clients with a complete English version",
      "Stay honest: agency, properties and prices are fictional, clearly flagged",
    ],
    pages: ["Home", "Properties", "Property page", "Destinations", "Saint-Tropez", "Sainte-Maxime", "Saint-Raphaël", "Sell and value", "Private collection", "The agency", "My selection", "Contact"],
    features: [
      "Animated introduction: Saint-Tropez appears through the name, then the photo settles into the home page",
      "Bilingual French and English site, translated addresses and an FR / EN button",
      "Search and filters kept in the page address",
      "Listings with full-screen gallery, energy rating, favourites selection and group viewing",
      "Five-step valuation and access to a private collection on request",
      "Structured listing data and language tags for search visibility",
    ],
    highlights: ["Animated introduction", "Bilingual FR / EN", "Designed to sell"],
    tags: ["Luxury real estate", "Bilingual", "Next.js", "Saint-Tropez"],
    alt: "MAÉRIVA website: large headline “Les plus belles maisons du golfe, en toute discrétion.” beside a photo of a contemporary white villa",
  },
};

export const projectsEn: Project[] = projects.map((p) => ({ ...p, ...translations[p.slug] }));
