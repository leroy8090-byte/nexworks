/**
 * Animations d'entrée présentées sur la page du service Design & UX/UI (/services/refonte-site-web#animations) :
 * chaque animation se lance en plein écran sur /animations/<slug> (page non référencée).
 * « Le défilé » (Defile.tsx) est mis de côté pour l'instant : ni listé ni accessible.
 *   Pour le remettre : recopier ses photos (port-voiliers, piscine-debordement, sejour-vue, villa-blanche, en 640, 1280 et 1920)
 *   depuis maeriva/public/photos vers public/animations, puis le réinscrire ici, dans Player.tsx et dans une page fixe.
 */
export type AnimationEntry = {
  slug: string;
  name: string;
  /** Une phrase pour la carte */
  pitch: string;
  /** Les étapes, dans l'ordre */
  steps: string[];
  duration: string;
  /** Le site de démonstration sur lequel l'animation a été conçue */
  madeFor: string;
  /** Pour quel type de client elle convient */
  fits: string;
  /** Photos affichées (pour les crédits) */
  photos: string[];
};

export const animations: AnimationEntry[] = [
  {
    slug: "golfe-a-travers-le-nom",
    name: "Le golfe à travers le nom",
    pitch: "Le paysage apparaît à travers les lettres de la marque, puis on plonge dedans jusqu'à la page d'accueil.",
    steps: [
      "Sur fond blanc, les lettres du nom se resserrent et se remplissent de la photo, l'une après l'autre.",
      "Le nom grandit et l'on plonge dans le I jusqu'à ce que la photo remplisse l'écran.",
      "La photo se range dans le cadre de la page d'accueil pendant que le titre apparaît.",
      "Elle s'efface sur la photo de l'accueil, qui se pose.",
    ],
    duration: "4 s",
    madeFor: "MAÉRIVA, agence immobilière de prestige (démonstration)",
    fits: "Marques au nom court : immobilier, hôtellerie, mode, domaines viticoles.",
    photos: ["ponche-aerien", "villa-moderne"],
  },
];

/** Crédits des seules photos affichées par les animations listées */
export const shownPhotoCredits = () => { const used = new Set(animations.flatMap((a) => a.photos)); return animationPhotoCredits.filter((c) => used.has(c.file)); };

export const animationBySlug = (slug: string) => animations.find((a) => a.slug === slug);

/** Photographies libres de droits (Wikimedia Commons), reprises du site de démonstration MAÉRIVA. */
export const animationPhotoCredits = [
  { file: "ponche-aerien", title: "Aerial view of Ponche Beach, Saint-Tropez, France (52723268452)", author: "dronepicr", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Ponche_Beach,_Saint-Tropez,_France_(52723268452).jpg" },
  { file: "villa-moderne", title: "Private Villa Ibiza", author: "Giulia Notarpietro", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Private_Villa_Ibiza.jpg" },
  { file: "port-voiliers", title: "Saint-Tropez - Port de plaisance 01", author: "Kev22", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_-_Port_de_plaisance_01.jpg" },
  { file: "piscine-debordement", title: "Villa Miragalli infinity swimminh pool", author: "Bruno Acampora", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", page: "https://commons.wikimedia.org/wiki/File:Villa_Miragalli_infinity_swimminh_pool.jpg" },
  { file: "sejour-vue", title: "Villa Tugendhat Haus house Brno Brünn Bauhaus classic living room MD284", author: "Mike Duchstein", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Villa_Tugendhat_Haus_house_Brno_Br%C3%BCnn_Bauhaus_classic_living_room_MD284.jpg" },
  { file: "villa-blanche", title: "SVS-VillaPhoto", author: "Jonathan Tessier", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:SVS-VillaPhoto.jpg" },
];

/** Chemin d'une photo du laboratoire (versions 640, 1280 et 1920 px de large) */
export const animPhoto = (file: string, w: 640 | 1280 | 1920 = 1920) => `/animations/${file}-${w}.webp`;
export const animSrcSet = (file: string) => `${animPhoto(file, 1280)} 1280w, ${animPhoto(file, 1920)} 1920w`;
