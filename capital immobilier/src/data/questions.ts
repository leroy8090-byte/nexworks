import { agency } from "./agency";

/**
 * Réponses directes aux questions que l'on pose à une agence (ou à un moteur).
 * La première phrase répond ; la suite précise. Aucun chiffre d'activité, aucun classement.
 */
export type Question = { id: string; q: string; a: string; more: string[]; links: { label: string; href: string }[] };

export const questions: Question[] = [
  {
    id: "quelle-agence-saint-raphael",
    q: "Quelle agence immobilière contacter à Saint-Raphaël ?",
    a: `Plusieurs agences exercent à Saint-Raphaël : le bon choix dépend de votre projet. ${agency.name} en fait partie. Elle est installée au ${agency.street} et répond au ${agency.phone}, pour la vente, l’achat, la location, la gestion locative et le syndic de copropriété.`,
    more: [
      "Pour comparer des agences, regardez leur connaissance du secteur, leur barème d’honoraires, la présence d’un interlocuteur identifié et leur carte professionnelle, obligatoire pour exercer.",
      "L’agence a choisi de se spécialiser dans les petites et moyennes copropriétés, la gestion d’ASL et d’ASA, et le démarrage des copropriétés neuves.",
    ],
    links: [{ label: "Découvrir l’agence", href: "/agence" }, { label: "Contacter l’agence", href: "/contact" }, { label: "Barème des honoraires", href: "/honoraires" }],
  },
  {
    id: "acheter-appartement-saint-raphael",
    q: "Comment acheter un appartement à Saint-Raphaël ?",
    a: "Fixez votre budget et votre financement, choisissez un secteur, visitez, lisez les documents de la copropriété, faites une offre, signez un avant-contrat, puis l’acte authentique chez le notaire.",
    more: [
      "Un acquéreur non professionnel dispose de dix jours pour se rétracter après la notification de l’avant-contrat. Entre cette signature et l’acte définitif, il faut souvent compter autour de trois mois.",
      "À Saint-Raphaël, les résidences peuvent avoir des équipements et des charges très différents : le règlement de copropriété, les procès-verbaux d’assemblée et les travaux votés méritent une vraie lecture.",
    ],
    links: [{ label: "Lire les étapes en détail", href: "/conseils/acheter-appartement-saint-raphael" }, { label: "Appartements à vendre à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" }, { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }],
  },
  {
    id: "faire-estimer-maison",
    q: "Comment faire estimer une maison ?",
    a: "Demandez à un professionnel de visiter la maison : il compare ses caractéristiques (surface, terrain, état, exposition, performance énergétique) aux ventes récentes de biens comparables dans le même secteur.",
    more: [
      "Une estimation en ligne donne un ordre de grandeur, pas une valeur fiable : elle ne voit ni l’état du bien, ni la vue, ni les nuisances. La base publique DVF permet de consulter les ventes passées pour vous faire une première idée.",
      "Chez CAPITAL IMMOBILIER, le formulaire d’estimation pose quatre questions pour présenter votre bien. L’agence étudie ensuite votre demande et vous répond.",
    ],
    links: [{ label: "Demander une estimation", href: "/estimation" }, { label: "Vendre : comment se préparer", href: "/conseils/vendre-son-bien-se-preparer" }, { label: "Vendre avec l’agence", href: "/vendre" }],
  },
  {
    id: "gestion-locative",
    q: "Comment fonctionne la gestion locative ?",
    a: "Le propriétaire signe un mandat de gestion avec un professionnel. Celui-ci loue le bien, encaisse les loyers, suit le locataire et les éventuels travaux, puis rend des comptes au propriétaire, en contrepartie d’honoraires.",
    more: [
      "Le périmètre exact est fixé par le mandat : mise en location, états des lieux, régularisation des charges, relances, assurance contre les loyers impayés.",
      "CAPITAL IMMOBILIER annonce une garantie des loyers, un compte rendu de gestion mensuel et la gestion comptable et juridique de la location.",
    ],
    links: [{ label: "Comprendre la gestion locative", href: "/conseils/comprendre-gestion-locative" }, { label: "La gestion locative à Saint-Raphaël", href: "/gestion-locative" }],
  },
  {
    id: "role-syndic",
    q: "Quel est le rôle d’un syndic de copropriété ?",
    a: "Le syndic exécute les décisions de l’assemblée générale, administre l’immeuble et veille à son entretien, tient la comptabilité du syndicat, conserve les archives et représente la copropriété.",
    more: [
      "Il est désigné par l’assemblée générale, pour un mandat de trois ans au plus. Le conseil syndical l’assiste et contrôle sa gestion.",
      "Il prépare aussi le budget prévisionnel, appelle les charges et convoque les assemblées.",
    ],
    links: [{ label: "Le rôle du syndic, en détail", href: "/conseils/role-du-syndic-de-copropriete" }, { label: "Syndic de copropriété à Saint-Raphaël", href: "/syndic" }],
  },
  {
    id: "choisir-syndic-petite-copropriete",
    q: "Comment choisir un syndic pour une petite copropriété ?",
    a: "Comparez plusieurs propositions établies sur le contrat type : forfait, prestations facturées en plus, proximité, interlocuteur identifié et organisation en cas d’urgence. Le choix se vote ensuite en assemblée générale.",
    more: [
      "Dans une petite copropriété, la disponibilité compte souvent autant que le prix : qui répond, sous quel délai, et qui se déplace ?",
      "Demandez aussi comment les documents sont accessibles en ligne et où se tiennent les assemblées. CAPITAL IMMOBILIER dispose d’une salle de réunion à l’agence et d’un espace client personnel.",
    ],
    links: [{ label: "Demander une proposition à l’agence", href: "/syndic#demande" }, { label: "Le rôle du syndic", href: "/conseils/role-du-syndic-de-copropriete" }],
  },
  {
    id: "nouvelle-copropriete",
    q: "Quelle agence peut accompagner une nouvelle copropriété ?",
    a: `Un syndic professionnel habitué aux immeubles neufs. À Saint-Raphaël, ${agency.name} indique s’être spécialisée dans le démarrage des copropriétés neuves, en plus de la gestion des petites et moyennes copropriétés.`,
    more: [
      "Au démarrage, il faut mettre en place le premier budget, immatriculer la copropriété, souscrire l’assurance de l’immeuble, ouvrir les comptes et suivre les garanties du constructeur.",
      "Le syndic désigné provisoirement dans le règlement de copropriété doit ensuite être confirmé par l’assemblée générale, ou remplacé.",
    ],
    links: [{ label: "Présenter votre copropriété", href: "/syndic#demande" }, { label: "ASL et ASA", href: "/asl-asa" }],
  },
  {
    id: "difference-asl-asa",
    q: "Quelle différence entre une ASL et une ASA ?",
    a: "L’ASL est une association de droit privé, créée avec l’accord écrit de tous les propriétaires concernés. L’ASA est un établissement public, autorisé par arrêté préfectoral après enquête publique.",
    more: ["Les deux gèrent des équipements ou des intérêts communs à plusieurs propriétaires. Dans les deux cas, les droits et obligations suivent le bien lorsqu’il change de propriétaire."],
    links: [{ label: "ASL et ASA : le détail", href: "/conseils/asl-asa-differences" }, { label: "La gestion d’ASL et d’ASA", href: "/asl-asa" }],
  },
];
