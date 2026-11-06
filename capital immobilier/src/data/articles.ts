/**
 * Articles de conseil : informations générales sur le droit français, à faire relire par l'agence
 * avant toute publication. Ni chiffres de marché, ni rendements, ni promesse.
 */
export type Article = {
  slug: string; title: string; metaTitle: string; description: string; eyebrow: string; image: string; alt: string; image2: string; alt2: string; updated: string;
  takeaways: string[];
  sections: { h: string; p: string[]; list?: string[] }[];
  links: { label: string; href: string }[];
};

const UPDATED = "2026-11-06";

export const articles: Article[] = [
  {
    slug: "acheter-appartement-saint-raphael", image2: "/media/vieux-port.webp", alt2: "Le Vieux-Port de Saint-Raphaël, ses bateaux et ses façades", updated: UPDATED, eyebrow: "Acheter",
    title: "Acheter un appartement à Saint-Raphaël : les étapes",
    metaTitle: "Acheter un appartement à Saint-Raphaël : les étapes",
    description: "Budget, choix du quartier, visites, documents de copropriété, offre, compromis et acte chez le notaire : les étapes d’un achat à Saint-Raphaël.",
    image: "/media/saint-raphael-port.webp", alt: "Le port de plaisance de Saint-Raphaël et sa grande roue",
    takeaways: ["Calculez un budget total, frais d’acquisition compris, avant de visiter.", "En copropriété, les documents comptent autant que la visite.", "Un acquéreur non professionnel dispose de dix jours pour se rétracter après l’avant-contrat."],
    sections: [
      { h: "Calculer son budget réel", p: ["Le budget ne se limite pas au prix affiché. Ajoutez les frais d’acquisition, souvent appelés frais de notaire : ils représentent en général de 7 à 8 % du prix dans l’ancien et de 2 à 3 % dans le neuf. Le notaire peut vous en donner le montant exact.", "Prévoyez aussi les travaux éventuels, puis les dépenses de chaque année : charges de copropriété, taxe foncière, assurance. Votre banque ou un courtier vous dira ce que vous pouvez emprunter. Disposer de cet accord de principe rend votre offre plus solide."] },
      { h: "Choisir son secteur", p: ["Saint-Raphaël s’étend sur une longue façade maritime, et ses quartiers sont très différents. Le centre et le Vieux-Port offrent la vie à pied, les commerces et la gare. Santa Lucia vit autour de son port. Boulouris, Agay et Anthéor sont plus résidentiels et plus calmes, Valescure plus boisé.", "Testez le trajet que vous ferez vraiment : le matin, à l’heure de pointe, et aussi en plein été, quand la circulation change."] },
      { h: "Visiter avec une liste", p: ["Une belle vue peut faire oublier le reste. Gardez quelques points à vérifier à chaque visite :"], list: ["L’exposition, le bruit et le vis-à-vis, à plusieurs moments de la journée", "Le stationnement : place attribuée, garage ou parking public", "L’état de l’immeuble, de la toiture, des façades et des parties communes", "Le diagnostic de performance énergétique (DPE) et les travaux qu’il annonce", "L’état des risques, à lire avec attention sur le littoral et près du massif"] },
      { h: "Lire les documents de la copropriété", p: ["C’est l’étape la plus utile, et la plus souvent négligée. Le vendeur doit fournir le règlement de copropriété, les procès-verbaux des dernières assemblées générales, le montant des charges et les éléments financiers de la copropriété.", "Cherchez ce qui a déjà été voté, ce qui est prévu et ce qui revient d’une assemblée à l’autre : travaux de façade, ascenseur, étanchéité, impayés. Vérifiez aussi ce que le règlement autorise, notamment si vous pensez à la location saisonnière."] },
      { h: "Faire une offre et signer l’avant-contrat", p: ["L’offre écrite précise le prix proposé et sa durée de validité. Si le vendeur l’accepte, vous signez un avant-contrat : le compromis ou la promesse de vente.", "Un acquéreur non professionnel dispose d’un délai de rétractation de dix jours, à compter du lendemain de la notification de l’avant-contrat. Si vous achetez à crédit, faites inscrire la condition suspensive d’obtention du prêt : si la banque refuse dans les conditions prévues, vous récupérez les sommes versées."] },
      { h: "Signer l’acte chez le notaire", p: ["Le notaire réunit les pièces, vérifie la situation du bien et interroge la commune sur son éventuel droit de préemption. Il s’écoule souvent autour de trois mois entre l’avant-contrat et l’acte authentique.", "Le jour de la signature, vous réglez le prix et les frais, et vous recevez les clés. Pensez à assurer le logement dès ce jour-là."] },
    ],
    links: [{ label: "Appartements à vendre à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" }, { label: "Déposer ma recherche", href: "/acheter#demande" }, { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }],
  },
  {
    slug: "vendre-son-bien-se-preparer", image2: "/media/basilique.webp", alt2: "Le dôme de la basilique Notre-Dame-de-la-Victoire, à Saint-Raphaël", updated: UPDATED, eyebrow: "Vendre",
    title: "Vendre son bien immobilier : comment se préparer ?",
    metaTitle: "Vendre son bien immobilier : comment se préparer ?",
    description: "Estimation, diagnostics, documents de copropriété, mise en valeur, mandat et fiscalité : ce qu’il faut préparer avant de mettre un bien en vente.",
    image: "/media/port-soir.webp", alt: "Le port de Saint-Raphaël et sa basilique, le soir",
    takeaways: ["Un prix juste dès le départ évite que le bien s’use sur le marché.", "Certains diagnostics sont obligatoires : commandez-les tôt, ils conditionnent l’annonce.", "En copropriété, rassemblez les documents à l’avance : ils accélèrent le compromis."],
    sections: [
      { h: "Faire estimer son bien", p: ["Le prix de vente se construit à partir de ventes comparables dans le même secteur, puis se corrige selon le bien : état, étage, exposition, vue, stationnement, extérieurs, performance énergétique.", "Une estimation sérieuse suppose une visite. Méfiez-vous des deux extrêmes : un prix trop haut fait perdre des semaines et finit souvent par une baisse ; un prix trop bas vous fait perdre de l’argent."] },
      { h: "Préparer les diagnostics", p: ["Le dossier de diagnostic technique doit être remis à l’acquéreur. Sa composition dépend du bien, de son âge et de sa situation :"], list: ["Le DPE, à afficher dès l’annonce", "L’amiante, pour un permis de construire antérieur au 1er juillet 1997", "Le plomb, pour un logement construit avant 1949", "L’électricité et le gaz, si l’installation a plus de quinze ans", "L’état des risques et pollutions", "Le mesurage loi Carrez, pour un lot de copropriété", "L’assainissement, pour une maison non raccordée au réseau collectif", "L’audit énergétique, pour une maison ou un immeuble en monopropriété classé E, F ou G"] },
      { h: "Rassembler les documents", p: ["Réunissez le titre de propriété, les derniers avis de taxe foncière et les factures de travaux importants. En copropriété, ajoutez le règlement, l’état descriptif de division, les procès-verbaux des trois dernières assemblées générales, les appels de charges et le carnet d’entretien. Votre syndic peut vous aider à les obtenir."] },
      { h: "Mettre le bien en valeur", p: ["Inutile d’engager de gros travaux avant de vendre : ils se rentabilisent rarement. Rangez, désencombrez, réparez ce qui se voit, ouvrez les volets et aérez. De bonnes photos et un texte exact font ensuite le reste.", "Soyez précis sur ce qui peut poser question : charges, travaux votés, exposition. Une information donnée tôt rassure et évite une renégociation au dernier moment."] },
      { h: "Choisir son mandat", p: ["Pour commercialiser votre bien, une agence doit disposer d’un mandat écrit. Il peut être simple, si vous gardez la possibilité de vendre par vous-même ou par d’autres intermédiaires, ou exclusif, si une seule agence s’en occupe pendant une durée fixée. Lisez sa durée, ses conditions de résiliation et le montant des honoraires."] },
      { h: "Anticiper la fiscalité et le calendrier", p: ["La résidence principale est en général exonérée d’impôt sur la plus-value. Pour une résidence secondaire ou un investissement, la plus-value peut être imposée, avec des abattements selon la durée de détention. Votre notaire peut en faire le calcul avant la mise en vente.", "Pensez aussi au calendrier : il s’écoule souvent autour de trois mois entre le compromis et l’acte authentique."] },
    ],
    links: [{ label: "Demander une estimation", href: "/estimation" }, { label: "Vendre avec l’agence", href: "/vendre" }, { label: "Barème des honoraires", href: "/honoraires" }],
  },
  {
    slug: "comprendre-gestion-locative", image2: "/media/frejus-residences.webp", alt2: "Des résidences de Port-Fréjus, avec leurs bateaux au pied des immeubles", updated: UPDATED, eyebrow: "Gestion locative",
    title: "Comprendre la gestion locative",
    metaTitle: "Comprendre la gestion locative : le mandat, les règles",
    description: "Mandat de gestion, missions du gestionnaire, obligations du bailleur, durée du bail et assurance des loyers : la gestion locative expliquée simplement.",
    image: "/media/cap-esterel-allee.webp", alt: "Une allée de résidences et de palmiers à Cap Estérel",
    takeaways: ["Le mandat de gestion fixe précisément ce que le gestionnaire fait, ou non, à votre place.", "Le bailleur reste propriétaire et décide : le gestionnaire agit en son nom.", "Un logement classé G au DPE ne peut plus faire l’objet d’un nouveau bail, ni d’un renouvellement."],
    sections: [
      { h: "Ce qu’est un mandat de gestion", p: ["La gestion locative consiste à confier à un professionnel l’administration d’un bien loué. Elle repose sur un mandat écrit, qui précise les missions, la durée, les honoraires et les conditions de résiliation.", "Le professionnel doit détenir une carte professionnelle portant la mention « gestion immobilière » et justifier d’une garantie financière."] },
      { h: "Ce que fait le gestionnaire", p: ["Selon le mandat, ses missions peuvent couvrir toute la vie de la location :"], list: ["Rechercher un locataire et étudier son dossier", "Rédiger le bail et réaliser les états des lieux", "Encaisser les loyers et les charges, relancer en cas de retard", "Réviser le loyer et régulariser les charges", "Suivre les réparations et les travaux", "Rendre compte au propriétaire de sa gestion"] },
      { h: "Ce qui reste au propriétaire", p: ["Vous restez décisionnaire pour les choix importants, comme les gros travaux, selon ce que prévoit le mandat. Vous restez aussi responsable de vos obligations : fournir un logement décent, assurer le bien selon les cas, et déclarer vos revenus fonciers."] },
      { h: "Les règles du bail à connaître", p: ["Pour un logement vide loué par un particulier, le bail dure au moins trois ans, et le dépôt de garantie est limité à un mois de loyer hors charges. Pour un logement meublé, le bail dure au moins un an, ou neuf mois pour un étudiant, et le dépôt de garantie est limité à deux mois.", "La performance énergétique compte désormais : les logements classés G sont exclus des nouveaux baux et des renouvellements depuis 2025. L’interdiction doit s’étendre aux logements classés F en 2028, puis E en 2034."] },
      { h: "Se protéger des impayés", p: ["Une assurance loyers impayés peut couvrir les loyers non réglés, selon les conditions du contrat : profil des locataires acceptés, plafonds et exclusions. Lisez-les avant de signer le bail, car le dossier du locataire doit y répondre dès le départ."] },
      { h: "Comment comparer deux gestionnaires", p: ["Comparez ce qui est inclus, et non seulement le taux affiché. Demandez ce qui est facturé en plus, la fréquence des comptes rendus, le délai de versement du loyer et le nom de la personne qui suivra votre bien. Les honoraires de gestion sont en principe déductibles de vos revenus fonciers si vous êtes au régime réel."] },
    ],
    links: [{ label: "La gestion locative avec l’agence", href: "/gestion-locative" }, { label: "Confier mon bien", href: "/gestion-locative#demande" }, { label: "Barème des honoraires", href: "/honoraires" }],
  },
  {
    slug: "role-du-syndic-de-copropriete", image2: "/media/cap-esterel.webp", alt2: "Cap Estérel et ses résidences, au pied du massif", updated: UPDATED, eyebrow: "Syndic",
    title: "Le rôle du syndic de copropriété",
    metaTitle: "Le rôle du syndic de copropriété : missions et choix",
    description: "Missions du syndic, désignation, contrat, conseil syndical, fonds de travaux et changement de syndic : l’essentiel à connaître pour les copropriétaires.",
    image: "/media/frejus-residences.webp", alt: "Des résidences de Port-Fréjus, avec leurs bateaux au pied des immeubles",
    takeaways: ["Le syndic exécute les décisions de l’assemblée générale et administre l’immeuble.", "Son mandat dure trois ans au plus, et son contrat suit un modèle réglementaire.", "Le conseil syndical l’assiste et contrôle sa gestion."],
    sections: [
      { h: "Ses missions", p: ["Le rôle du syndic est fixé par la loi du 10 juillet 1965. Il agit pour le compte du syndicat des copropriétaires, c’est-à-dire de l’ensemble des copropriétaires :"], list: ["Exécuter les décisions de l’assemblée générale", "Administrer l’immeuble, veiller à sa conservation et à son entretien", "Établir le budget prévisionnel et tenir la comptabilité", "Appeler les charges et recouvrer les impayés", "Tenir le carnet d’entretien et conserver les archives", "Représenter le syndicat, notamment en justice", "Tenir à jour l’immatriculation de la copropriété"] },
      { h: "Comment il est désigné", p: ["Le syndic est désigné par l’assemblée générale, pour trois ans au plus. Il peut s’agir d’un professionnel, titulaire d’une carte « syndic de copropriété », ou d’un copropriétaire bénévole.", "Avant le vote, le conseil syndical met en concurrence plusieurs projets de contrat, sauf si l’assemblée l’en a dispensé."] },
      { h: "Le contrat et les honoraires", p: ["Le contrat de syndic professionnel suit un contrat type, fixé par décret en 2015. Il distingue le forfait annuel des prestations particulières, facturées en plus. C’est ce modèle commun qui permet de comparer les offres : regardez ce que couvre le forfait, le nombre de visites et de réunions prévues, et le tarif des prestations particulières."] },
      { h: "Le conseil syndical", p: ["Le conseil syndical, composé de copropriétaires élus, assiste le syndic et contrôle sa gestion, en particulier la comptabilité et les contrats. Il peut consulter toutes les pièces relatives à la gestion. Un conseil syndical actif et un syndic joignable, c’est souvent ce qui fait la différence au quotidien."] },
      { h: "Les travaux et leur financement", p: ["Le syndic prépare les décisions de travaux et les met en œuvre une fois votés. Sauf exception, les copropriétés d’habitation alimentent un fonds de travaux. Celles de plus de quinze ans doivent aussi disposer d’un projet de plan pluriannuel de travaux, présenté à l’assemblée générale."] },
      { h: "Changer de syndic", p: ["Le changement se vote en assemblée générale : la question doit donc figurer à l’ordre du jour, avec le nouveau contrat proposé. L’ancien syndic doit ensuite transmettre les documents et les fonds de la copropriété à son successeur, dans les délais prévus par la loi."] },
      { h: "Le cas des petites copropriétés", p: ["La loi prévoit des règles adaptées à certaines petites copropriétés. Dans ces immeubles, la proximité compte beaucoup : un interlocuteur identifié, une réponse rapide en cas d’urgence et des assemblées bien préparées pèsent souvent autant que le montant du forfait."] },
    ],
    links: [{ label: "Le syndic de copropriété avec l’agence", href: "/syndic" }, { label: "Demander une proposition", href: "/syndic#demande" }, { label: "ASL et ASA : quelles différences ?", href: "/conseils/asl-asa-differences" }],
  },
  {
    slug: "asl-asa-differences", image2: "/media/cap-esterel-allee.webp", alt2: "L’allée des Fleurs à Cap Estérel, entre palmiers et résidences", updated: UPDATED, eyebrow: "ASL et ASA",
    title: "ASL et ASA : quelles différences ?",
    metaTitle: "ASL et ASA : quelles différences ?",
    description: "Association syndicale libre ou autorisée : statut, création, adhésion, recettes et fonctionnement, pour comprendre ce qui les distingue d’une copropriété.",
    image: "/media/cap-esterel.webp", alt: "Cap Estérel et ses résidences, au pied du massif",
    takeaways: ["L’ASL relève du droit privé, l’ASA est un établissement public.", "L’ASL suppose l’accord écrit de tous ses membres, l’ASA un arrêté préfectoral.", "Dans les deux cas, les droits et obligations suivent le bien."],
    sections: [
      { h: "Ce qu’elles ont en commun", p: ["L’association syndicale libre (ASL) et l’association syndicale autorisée (ASA) réunissent des propriétaires autour d’intérêts communs : voies, réseaux, espaces verts, digues, canaux ou équipements collectifs. Toutes deux relèvent de l’ordonnance du 1er juillet 2004.", "Leur point commun essentiel : l’appartenance est attachée au bien. Quand le bien est vendu, le nouveau propriétaire reprend les droits et les obligations."] },
      { h: "L’ASL, une association de droit privé", p: ["L’ASL se crée avec le consentement unanime des propriétaires concernés, constaté par écrit. Ses statuts fixent son objet, son périmètre et son fonctionnement. Elle est ensuite déclarée en préfecture et un extrait de ses statuts est publié.", "On la rencontre souvent dans les lotissements et les domaines, pour gérer les équipements communs."] },
      { h: "L’ASA, un établissement public", p: ["L’ASA est un établissement public à caractère administratif. Sa création est autorisée par arrêté préfectoral, après une enquête publique et une consultation des propriétaires, sans exiger leur unanimité : les propriétaires compris dans le périmètre en font partie, même s’ils n’ont pas voté pour.", "Ses redevances sont recouvrées comme des créances publiques, et elle est soumise aux règles de la comptabilité publique."] },
      { h: "Et l’association syndicale constituée d’office ?", p: ["Il existe une troisième forme, plus rare : lorsqu’une ASA ne peut pas être créée alors que les travaux sont nécessaires, le préfet peut, dans certains cas, constituer d’office une association syndicale."] },
      { h: "La différence avec une copropriété", p: ["Une copropriété divise un immeuble bâti en lots, chacun comprenant une partie privative et une quote-part de parties communes. Une ASL ou une ASA réunit au contraire des propriétaires distincts, qui possèdent chacun leur terrain ou leur maison, autour d’équipements ou d’intérêts communs.", "Un même bien peut d’ailleurs relever des deux : une résidence en copropriété peut faire partie d’une ASL qui gère les voies du domaine."] },
      { h: "Si vous êtes membre", p: ["Lisez les statuts, le dernier budget et les comptes rendus d’assemblée. Avant de vendre ou d’acheter, signalez ou demandez l’existence de l’association au notaire : les cotisations et les travaux décidés comptent dans la décision d’achat."] },
    ],
    links: [{ label: "La gestion d’ASL et d’ASA", href: "/asl-asa" }, { label: "Présenter mon association", href: "/asl-asa#demande" }, { label: "Le rôle du syndic de copropriété", href: "/conseils/role-du-syndic-de-copropriete" }],
  },
  {
    slug: "quartiers-saint-raphael", image2: "/media/ile-or.webp", alt2: "L’île d’Or et sa tour, au large du Dramont", updated: UPDATED, eyebrow: "Saint-Raphaël",
    title: "Les quartiers de Saint-Raphaël",
    metaTitle: "Les quartiers de Saint-Raphaël : où chercher ?",
    description: "Centre, Santa Lucia, Boulouris, Valescure, Agay, Anthéor : le caractère de chaque quartier de Saint-Raphaël, pour orienter votre recherche immobilière.",
    image: "/media/agay.webp", alt: "La rade d’Agay vue du Dramont",
    takeaways: ["Saint-Raphaël s’étire du centre-ville jusqu’aux roches rouges de l’Estérel.", "Le choix dépend d’abord de votre mode de vie : à pied en ville, ou plus au calme.", "Allez voir le quartier à plusieurs moments de l’année, car la saison change beaucoup de choses."],
    sections: [
      { h: "Le centre-ville et le Vieux-Port", p: ["C’est le Saint-Raphaël à pied : le port, la basilique Notre-Dame-de-la-Victoire, le front de mer, les commerces et la gare. On y trouve surtout des appartements dans des immeubles et des résidences. Il convient bien à ceux qui veulent se passer de voiture au quotidien. Pensez à vérifier le stationnement et le bruit, surtout en été."] },
      { h: "Santa Lucia", p: ["À l’est du centre, le quartier vit autour de son port de plaisance et de son front de mer, avec la pointe et ses roches rouges tout près. On y cherche la vue, l’accès à la mer et la proximité du centre, en restant à l’écart de son animation."] },
      { h: "Boulouris", p: ["Plus à l’est, Boulouris est un quartier résidentiel, entre pins parasols et petites plages, avec sa propre gare. Le bord de mer et le haut du quartier n’offrent pas la même ambiance : regardez bien la distance à la plage, et si elle se fait vraiment à pied."] },
      { h: "Valescure", p: ["Sur les hauteurs, en direction de l’Estérel, Valescure est un secteur résidentiel et boisé, connu pour son golf. On y vient pour l’espace et le calme, avec une voiture presque indispensable. C’est un quartier de maisons et de résidences."] },
      { h: "Agay et le Dramont", p: ["Rattachée à Saint-Raphaël, Agay s’ouvre sur une rade abritée, dominée par les roches rouges. Le Dramont, tout proche, regarde l’île d’Or. Le secteur a sa gare, ses plages et une vraie vie de saison. On y regarde la vue, mais aussi l’accès en voiture et les services ouverts à l’année."] },
      { h: "Anthéor et la corniche d’Or", p: ["Plus loin encore, Anthéor s’accroche à la corniche, entre le viaduc, les calanques et la mer. La route est spectaculaire, mais le trajet vers le centre est plus long. C’est un choix de cadre avant tout : à essayer aussi en dehors de l’été."] },
      { h: "Comment choisir", p: ["Posez-vous trois questions : ferez-vous vos trajets à pied ou en voiture ? Vivrez-vous ici toute l’année ou par périodes ? Préférez-vous l’animation ou le calme ? Vos réponses réduisent souvent la recherche à deux ou trois quartiers."] },
    ],
    links: [{ label: "L’immobilier à Saint-Raphaël", href: "/secteurs/saint-raphael" }, { label: "Tous nos secteurs", href: "/secteurs" }, { label: "Appartements à vendre à Saint-Raphaël", href: "/annonces/appartements-a-vendre-saint-raphael" }],
  },
  {
    slug: "investir-immobilier-saint-raphael", image2: "/media/plage-veillat.webp", alt2: "La plage du Veillat et la baie de Saint-Raphaël", updated: UPDATED, eyebrow: "Investir",
    title: "Investir dans l’immobilier à Saint-Raphaël",
    metaTitle: "Investir dans l’immobilier à Saint-Raphaël",
    description: "Location à l’année ou saisonnière, charges, DPE, règlement de copropriété et fiscalité : les questions à se poser avant d’investir à Saint-Raphaël.",
    image: "/media/santa-lucia.webp", alt: "Les roches rouges de la pointe de Santa Lucia, à Saint-Raphaël",
    takeaways: ["Choisissez d’abord l’usage : location à l’année, saisonnière, ou résidence secondaire.", "Calculez un rendement net de toutes les charges, pas un rendement affiché.", "Vérifiez le DPE et le règlement de copropriété avant de faire une offre."],
    sections: [
      { h: "Définir son objectif", p: ["Cherchez-vous un revenu régulier, un bien à occuper une partie de l’année, ou un patrimoine à transmettre ? Ces objectifs ne mènent ni au même quartier, ni au même bien. Saint-Raphaël combine une activité à l’année et une forte saison touristique : deux logiques différentes pour un investisseur."] },
      { h: "Location à l’année ou saisonnière", p: ["La location à l’année offre plus de stabilité et moins de gestion, avec les règles du bail d’habitation. La location saisonnière dépend davantage de la saison, demande plus de présence, et son cadre juridique évolue.", "Avant d’acheter pour louer en saisonnier, vérifiez trois points : les obligations de déclaration ou d’enregistrement en mairie, les règles propres à la commune, et ce qu’autorise le règlement de copropriété. Ce dernier peut limiter cet usage."] },
      { h: "Calculer un rendement net", p: ["Partez du loyer annuel réaliste, puis retirez ce qui pèse vraiment : charges non récupérables, taxe foncière, assurance, honoraires de gestion, vacance entre deux locataires, entretien. Comparez le résultat à ce que vous coûte réellement l’achat, frais d’acquisition et travaux inclus. Ajoutez enfin l’impôt.", "Méfiez-vous des rendements annoncés sans ce détail : ils ne disent pas ce qui restera réellement chaque année."] },
      { h: "Regarder le DPE de près", p: ["Un logement classé G ne peut plus faire l’objet d’un nouveau bail ni d’un renouvellement depuis 2025 ; l’interdiction doit s’étendre à la classe F en 2028, puis à la classe E en 2034. Pour un investisseur, le coût des travaux de rénovation doit donc entrer dans le calcul dès le départ. En copropriété, certains travaux dépendent aussi d’un vote en assemblée."] },
      { h: "Choisir le bien et le quartier", p: ["Pensez à votre futur locataire avant de penser à vous : proximité de la gare et des commerces pour une location à l’année ; proximité de la mer, stationnement et équipements pour un séjour. Un petit appartement bien placé et un grand appartement avec vue ne s’adressent pas aux mêmes publics.", "Lisez les procès-verbaux d’assemblée générale pour repérer les gros travaux à venir."] },
      { h: "Se faire accompagner", p: ["La fiscalité dépend de votre situation et du type de location : location nue ou meublée, régime micro ou réel. Ces règles changent régulièrement : demandez conseil à un notaire ou à un expert-comptable avant de signer. Une fois le bien acheté, la gestion peut être confiée à un professionnel si vous n’habitez pas sur place."] },
    ],
    links: [{ label: "Tous les biens à vendre", href: "/biens?transaction=vente" }, { label: "Confier la gestion de mon bien", href: "/gestion-locative" }, { label: "Les quartiers de Saint-Raphaël", href: "/conseils/quartiers-saint-raphael" }],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
