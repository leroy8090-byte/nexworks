import type { ServiceId } from "./services";

/**
 * Pages détaillées de chaque service. Elles répondent directement aux questions posées à Google et aux assistants IA.
 * Règle : uniquement des informations vraies et vérifiables. Pas de chiffres inventés, pas de client fictif présenté
 * comme réel, pas de prix (tout passe par un devis), pas de promesse de position sur Google ou dans une IA.
 */
export type ServicePage = {
  id: ServiceId;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** La réponse directe, en tête de page : ce que lit d'abord un visiteur ou une IA */
  answer: string;
  sections: { title: string; text?: string; points?: { title: string; text: string }[] }[];
  forWho: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const servicePages: ServicePage[] = [
  {
    id: "creation-web",
    slug: "creation-site-web",
    metaTitle: "Création de site internet sur mesure | NEXWORKS AGENCY",
    metaDescription:
      "Création de site internet professionnel et sur mesure : site vitrine, restaurant, hôtel, artisan. Rapide, adapté au mobile, prêt pour Google. Devis personnalisé.",
    eyebrow: "Création de site internet",
    h1: "Un site internet sur mesure, *qui donne envie de vous contacter.*",
    answer:
      "NEXWORKS AGENCY crée des sites internet sur mesure pour les entreprises, les indépendants, les restaurants et les hôtels. Chaque site explique clairement ce que vous proposez, s'affiche vite sur téléphone comme sur ordinateur, et guide le visiteur jusqu'à la prise de contact. Le prix est fixé sur devis, selon votre projet.",
    sections: [
      {
        title: "Ce qu'un bon site doit faire pour vous",
        text: "Un site n'est pas une simple carte de visite en ligne. Quand quelqu'un arrive sur votre page, il doit comprendre en quelques secondes ce que vous faites, si c'est pour lui, et comment vous joindre. Tout le reste découle de ces trois questions.",
        points: [
          { title: "Être compris tout de suite", text: "Des titres clairs et des phrases simples : ce que vous proposez, à qui, et pourquoi vous choisir." },
          { title: "S'afficher vite, surtout sur téléphone", text: "Une grande partie des visites se fait sur mobile. Le site est conçu et testé pour ces écrans, pas simplement réduit." },
          { title: "Faciliter la prise de contact", text: "Formulaire, téléphone, réservation ou itinéraire : l'action utile est toujours à portée de main." },
          { title: "Être prêt pour Google", text: "La structure, les titres et la technique sont posés correctement dès le départ, pour ne pas avoir à tout reprendre ensuite." },
        ],
      },
      {
        title: "Quel type de site pour votre activité ?",
        points: [
          { title: "Site vitrine", text: "Pour présenter votre entreprise, vos services et recevoir des demandes. C'est le format le plus courant." },
          { title: "Site de restaurant", text: "La carte lisible sur téléphone, les horaires, l'adresse et la réservation visibles dès l'arrivée." },
          { title: "Site d'hôtel", text: "Les chambres, les services et un accès direct à la réservation, pour dépendre moins des plateformes." },
          { title: "Page d'atterrissage", text: "Une seule page centrée sur une offre précise, utile pour une campagne ou un lancement." },
        ],
      },
    ],
    forWho: [
      "Vous n'avez pas encore de site et vous voulez partir sur de bonnes bases",
      "Vos clients vous cherchent en ligne et ne vous trouvent pas",
      "Vous voulez recevoir des demandes par votre site, pas seulement exister en ligne",
      "Vous préférez déléguer plutôt que de construire le site vous-même",
    ],
    steps: [
      { title: "On échange sur votre activité", text: "Vos clients, vos objectifs et ce que le site doit vous apporter." },
      { title: "Vous recevez un devis", text: "Un prix clair et le contenu du projet, avant de décider." },
      { title: "On dessine les pages", text: "Vous voyez le résultat avant le développement, et vous le validez." },
      { title: "On développe et on met en ligne", text: "Tests sur téléphone et ordinateur, puis mise en ligne avec vous." },
    ],
    faq: [
      {
        q: "Combien coûte la création d'un site internet ?",
        a: "Le prix dépend du nombre de pages, des fonctionnalités et du contenu à produire. NEXWORKS AGENCY travaille uniquement sur devis : vous décrivez votre projet et vous recevez un prix clair avant de vous engager.",
      },
      {
        q: "Combien de temps faut-il pour créer un site ?",
        a: "Cela dépend de la taille du site et de la rapidité des validations. Le délai est précisé dans le devis, une fois le projet défini.",
      },
      {
        q: "Mon site sera-t-il adapté au téléphone ?",
        a: "Oui. Chaque site est conçu pour s'afficher correctement sur téléphone, tablette et ordinateur, et il est testé sur ces écrans avant la mise en ligne.",
      },
      {
        q: "Vais-je pouvoir modifier mon site ensuite ?",
        a: "Oui, les évolutions sont prévues. Selon votre besoin, nous les réalisons pour vous dans le cadre d'un accompagnement, ou nous vous indiquons comment procéder.",
      },
      {
        q: "Un nouveau site sera-t-il automatiquement bien placé sur Google ?",
        a: "Non. Un site bien construit part sur de bonnes bases, mais le référencement demande un travail spécifique et du temps. Personne ne peut garantir une position sur Google.",
      },
    ],
  },
  {
    id: "design-ux",
    slug: "refonte-site-web",
    metaTitle: "Refonte de site internet et design UX/UI | NEXWORKS AGENCY",
    metaDescription:
      "Votre site n'est plus dans l'ère du temps ou vous apporte trop peu de demandes ? Refonte de site web et design UX/UI : plus clair, plus rapide, adapté au mobile.",
    eyebrow: "Refonte et design UX/UI",
    h1: "Votre site n'est plus dans l'ère du temps ? *On le remet à niveau.*",
    answer:
      "Une refonte de site consiste à repenser le design, les textes, la navigation et la technique d'un site existant pour qu'il inspire confiance et apporte plus de demandes. NEXWORKS AGENCY analyse d'abord ce qui fonctionne et ce qui freine vos visiteurs, puis conserve l'utile et corrige le reste.",
    sections: [
      {
        title: "Les signes qu'une refonte devient utile",
        points: [
          { title: "Le site fait daté", text: "Une image vieillissante peut faire douter de votre sérieux, même si votre travail est excellent." },
          { title: "Il s'affiche mal sur téléphone", text: "Textes trop petits, boutons difficiles à toucher, pages qui débordent : autant de visiteurs qui repartent." },
          { title: "Il vous apporte peu de demandes", text: "Le site reçoit des visites, mais peu de contacts : le message ou le parcours est souvent en cause." },
          { title: "Il est lent ou difficile à faire évoluer", text: "Chaque modification devient compliquée, et les pages mettent du temps à s'afficher." },
        ],
      },
      {
        title: "Que veut dire « UX/UI » ?",
        text: "L'UX (expérience utilisateur) désigne la facilité avec laquelle un visiteur trouve ce qu'il cherche et accomplit ce qu'il est venu faire. L'UI (interface utilisateur) désigne ce qu'il voit : couleurs, typographie, boutons et mise en page. Les deux vont ensemble : un beau site difficile à utiliser ne rapporte pas plus qu'un site pratique mais peu engageant.",
      },
      {
        title: "Une refonte sans repartir de zéro",
        text: "Une refonte bien menée ne jette pas tout. Les contenus utiles sont conservés, et les pages déjà connues de Google sont redirigées vers leur nouvelle adresse si elles changent, afin de préserver au mieux votre visibilité.",
      },
    ],
    forWho: [
      "Votre site a plusieurs années et ne reflète plus votre activité",
      "Vous avez des visites mais trop peu de demandes",
      "Votre site est difficile à utiliser sur téléphone",
      "Vous voulez moderniser votre image sans perdre ce qui fonctionne",
    ],
    steps: [
      { title: "On analyse votre site actuel", text: "Design, parcours, mobile, vitesse et structure : ce qui marche et ce qui freine." },
      { title: "Vous recevez un devis", text: "Les priorités, le contenu de la refonte et un prix clair." },
      { title: "On repense les pages clés", text: "Vous validez les maquettes avant le développement." },
      { title: "On met en ligne proprement", text: "Tests, redirections des anciennes adresses et vérifications après la mise en ligne." },
    ],
    faq: [
      {
        q: "Quand faut-il refaire son site internet ?",
        a: "Une refonte est utile quand le site fait daté, s'affiche mal sur téléphone, est lent ou apporte peu de demandes malgré des visites. Une analyse permet de décider entre une refonte complète et quelques améliorations ciblées.",
      },
      {
        q: "Une refonte fait-elle perdre son référencement ?",
        a: "Elle peut le faire si elle est mal préparée. Pour limiter ce risque, les pages importantes sont conservées ou redirigées vers leur nouvelle adresse, et la structure est vérifiée avant et après la mise en ligne.",
      },
      {
        q: "Combien coûte une refonte de site ?",
        a: "Le prix dépend de la taille du site et de l'ampleur des changements. NEXWORKS AGENCY établit un devis après avoir analysé votre site et vos objectifs.",
      },
      {
        q: "Puis-je garder mon nom de domaine et mes contenus ?",
        a: "Oui. Votre nom de domaine reste le vôtre, et les contenus utiles sont repris. Nous vous disons simplement lesquels gagneraient à être réécrits.",
      },
    ],
  },
  {
    id: "seo",
    slug: "referencement-seo",
    metaTitle: "Référencement naturel SEO : audit et optimisation | NEXWORKS",
    metaDescription:
      "Le SEO aide votre entreprise à être trouvée sur Google par ceux qui cherchent vos services : audit, technique, contenus et référencement local. Sur devis.",
    eyebrow: "Référencement naturel (SEO)",
    h1: "Être trouvé sur Google par ceux qui *cherchent vos services.*",
    answer:
      "Le SEO, ou référencement naturel, regroupe les actions qui aident Google à comprendre un site et à le proposer aux personnes qui recherchent ce qu'il offre, sans payer de publicité. NEXWORKS AGENCY améliore la technique, les contenus et la présence locale de votre entreprise. Aucune position n'est garantie : personne ne contrôle les résultats de Google.",
    sections: [
      {
        title: "Les trois piliers du référencement",
        points: [
          { title: "La technique", text: "Vitesse, affichage sur mobile, structure des pages et accès pour les robots : les moteurs doivent pouvoir lire votre site sans obstacle." },
          { title: "Les contenus", text: "Des pages qui répondent clairement aux questions de vos clients, avec des titres précis et des informations utiles." },
          { title: "La présence locale", text: "Une fiche Google complète et des informations cohérentes partout, pour apparaître quand on vous cherche près de chez soi." },
        ],
      },
      {
        title: "Référencement naturel ou publicité ?",
        text: "La publicité (SEA) affiche votre site tant que vous payez chaque clic. Le référencement naturel (SEO) ne se paie pas au clic : c'est un travail de fond, plus lent à produire ses effets, mais qui continue de servir dans la durée. Les deux peuvent se compléter selon vos objectifs.",
      },
      {
        title: "Ce que nous ne promettons pas",
        text: "Méfiez-vous des promesses de « première place garantie ». Google décide seul de ses classements, et ils changent en permanence. Nous agissons sur ce qui dépend réellement de votre site, nous vous expliquons nos priorités et nous mesurons l'évolution.",
      },
    ],
    forWho: [
      "Votre entreprise n'apparaît pas quand on cherche votre métier",
      "Vous dépendez trop de la publicité ou du bouche-à-oreille",
      "Vous avez un commerce ou une activité locale",
      "Vous voulez comprendre ce qui bloque, en termes simples",
    ],
    steps: [
      { title: "L'audit", text: "On regarde la technique, les contenus, la concurrence et votre présence locale." },
      { title: "Les priorités", text: "Une liste claire de ce qui aura le plus d'effet, expliquée simplement, et un devis." },
      { title: "Les optimisations", text: "Corrections techniques, titres, contenus et fiche Google." },
      { title: "Le suivi", text: "Search Console et mesures régulières, pour voir ce qui évolue et ajuster." },
    ],
    faq: [
      {
        q: "Qu'est-ce que le SEO ?",
        a: "SEO signifie Search Engine Optimization, ou référencement naturel. Il regroupe les actions techniques, éditoriales et locales qui aident un site à être compris par les moteurs de recherche et proposé aux personnes qui recherchent ce qu'il offre.",
      },
      {
        q: "Combien de temps faut-il pour voir des résultats en SEO ?",
        a: "Le référencement naturel demande en général plusieurs mois avant de produire des effets nets. Le délai dépend de votre secteur, de la concurrence et de l'état de départ du site.",
      },
      {
        q: "Pouvez-vous garantir la première place sur Google ?",
        a: "Non, et personne ne le peut honnêtement. Google décide seul de ses classements. Nous travaillons sur les éléments qui dépendent de votre site et de votre présence en ligne.",
      },
      {
        q: "Qu'est-ce que le référencement local ?",
        a: "Le référencement local aide une entreprise à apparaître dans les recherches liées à une zone, par exemple « plombier près de chez moi », notamment grâce à une fiche Google complète et à des informations cohérentes sur le web.",
      },
      {
        q: "Combien coûte le référencement d'un site ?",
        a: "Le prix dépend de l'état du site, de vos objectifs et de la concurrence. NEXWORKS AGENCY propose un devis après avoir évalué ce qui est réellement utile pour vous.",
      },
    ],
  },
  {
    id: "geo",
    slug: "optimisation-geo",
    metaTitle: "Optimisation GEO : être compris par les IA | NEXWORKS AGENCY",
    metaDescription:
      "Qu'est-ce que le GEO ? Rendre votre entreprise facile à comprendre et à citer par ChatGPT, Gemini, Perplexity et les réponses IA de Google. Sans promesse de citation.",
    eyebrow: "Optimisation GEO",
    h1: "Quand vos clients demandent à une IA, *qu'est-ce qu'elle répond ?*",
    answer:
      "Le GEO (Generative Engine Optimization) consiste à rendre une entreprise facile à comprendre et à citer correctement par les assistants et moteurs de réponse basés sur l'IA, comme ChatGPT, Gemini, Perplexity ou les réponses IA de Google. NEXWORKS AGENCY clarifie et structure vos informations sur le web. Aucune citation n'est garantie.",
    sections: [
      {
        title: "Pourquoi le GEO compte aujourd'hui",
        text: "Une partie des recherches passe désormais par des questions posées directement à des assistants : « quelle agence choisir ? », « quel restaurant pour ce soir ? ». Pour vous citer correctement, ces outils doivent trouver des informations claires, cohérentes et fiables sur votre entreprise.",
      },
      {
        title: "SEO et GEO : quelle différence ?",
        text: "Le SEO vise à apparaître dans la liste de résultats d'un moteur de recherche. Le GEO vise à être bien compris et cité dans la réponse rédigée par une IA. Les deux se complètent et reposent sur la même base : un site techniquement sain, des contenus utiles et des informations fiables.",
      },
      {
        title: "Ce que nous mettons en place",
        points: [
          { title: "Des informations claires", text: "Qui vous êtes, ce que vous faites et où vous intervenez, dit simplement et sans ambiguïté." },
          { title: "Des contenus qui répondent", text: "Des réponses directes aux questions de vos clients, faciles à reprendre par une IA." },
          { title: "Des données structurées", text: "Un balisage qui décrit précisément votre entreprise et vos services aux machines." },
          { title: "Un accès pour les robots d'IA", text: "Un site lisible par ces robots, qui n'exécutent pas tous le JavaScript, et qui autorise leur passage." },
          { title: "Une présence cohérente", text: "Le même nom, les mêmes coordonnées et les mêmes informations partout sur le web." },
        ],
      },
      {
        title: "Ce que nous ne promettons pas",
        text: "Aucun prestataire ne peut garantir d'apparaître dans ChatGPT, Gemini, Perplexity ou Google : ces outils décident seuls de leurs réponses, et celles-ci varient. Le GEO améliore ce qui est dans notre champ d'action, sans promesse de résultat.",
      },
    ],
    forWho: [
      "Vous voulez savoir ce que les IA disent de votre entreprise",
      "Vos informations sont incomplètes ou différentes selon les sites",
      "Vous travaillez déjà votre SEO et voulez préparer la suite",
      "Vos clients posent de plus en plus leurs questions à des assistants",
    ],
    steps: [
      { title: "On interroge les IA", text: "On regarde ce qu'elles répondent sur votre entreprise et votre secteur." },
      { title: "On audite vos informations", text: "Site, fiche Google, annuaires : ce qui manque ou se contredit, avec un devis." },
      { title: "On structure et on clarifie", text: "Contenus, questions-réponses, données structurées et accès des robots." },
      { title: "On suit l'évolution", text: "On réinterroge régulièrement les IA et on ajuste." },
    ],
    faq: [
      {
        q: "Qu'est-ce que le GEO ?",
        a: "GEO signifie Generative Engine Optimization. C'est le travail qui rend une entreprise facile à comprendre et à citer correctement par les moteurs de réponse et les assistants IA, grâce à des informations claires, structurées et cohérentes sur le web.",
      },
      {
        q: "Quelle est la différence entre SEO et GEO ?",
        a: "Le SEO vise à apparaître dans les résultats d'un moteur de recherche. Le GEO vise à être bien compris et cité dans les réponses rédigées par une IA. Les deux se complètent et partagent la même base : un site sain et des contenus fiables.",
      },
      {
        q: "Comment apparaître dans les réponses de ChatGPT ?",
        a: "Personne ne peut le garantir. On peut en revanche augmenter ses chances : autoriser l'accès des robots, publier des informations claires et fiables, répondre aux questions de ses clients et rester cohérent sur tout le web.",
      },
      {
        q: "Le GEO remplace-t-il le SEO ?",
        a: "Non. Le GEO s'appuie sur les bases du SEO. Un site difficile à lire pour Google l'est généralement aussi pour une IA, c'est pourquoi les deux se travaillent ensemble.",
      },
      {
        q: "Peut-on garantir d'être cité par une IA ?",
        a: "Non. Les IA décident seules de leurs réponses, et celles-ci peuvent changer d'une question à l'autre. Nous améliorons la qualité et la clarté des informations qu'elles peuvent trouver sur vous.",
      },
    ],
  },
];

export const getServicePage = (slug: string) => servicePages.find((p) => p.slug === slug);
export const servicePagePath = (id: ServiceId) => `/services/${servicePages.find((p) => p.id === id)?.slug}`;
