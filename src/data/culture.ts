// Données des 6 pages thématiques "Le Maroc" :
// - source unique consommée par Morocco.astro (vignettes cliquables)
//   et par src/pages/le-maroc/[slug].astro (rendu des pages).

export interface CultureItem {
  slug: string;
  /** Libellé court affiché en légende sur la vignette de la home. */
  caption: string;
  /** Titre de la page (H1). */
  title: string;
  /** Mot-clé SEO principal. */
  keyword: string;
  /** Meta description (150–160c). */
  description: string;
  /** Alt de l'image hero (accessibilité + SEO). */
  imageAlt: string;
  /** Chemin de la photo hero (JPG fallback). */
  image: string;
  /** Base sans extension pour WebP srcset (optionnel). */
  imageBase?: string;
  /** Paragraphes du corps (HTML autorisé pour les liens). */
  body: string[];
  /** CTA final vers une page interne. */
  cta: { label: string; href: string };
  /** Ajouter la ligne "en savoir plus" vers visitmorocco.com. */
  showVisitMorocco?: boolean;
}

export const cultureItems: CultureItem[] = [
  {
    slug: 'villages-de-l-atlas',
    caption: "Villages de l'Atlas",
    title: "Villages berbères de l'Atlas",
    keyword: "villages berbères de l'Atlas",
    description:
      "Accrochés aux flancs des montagnes, les villages berbères de l'Atlas préservent un mode de vie unique. Étapes vivantes de nos raids moto au Maroc.",
    imageAlt: "Village berbère traditionnel accroché aux flancs de l'Atlas marocain",
    image: '/img/village.jpg',
    body: [
      `Accrochés aux flancs des montagnes, les villages berbères de l'Atlas semblent surgir de la roche elle-même. Maisons de terre couleur ocre, ruelles étroites, terrasses où sèchent les récoltes : ici, le temps suit un autre rythme.`,
      `Traverser ces villages à moto, c'est croiser un mode de vie préservé, une agriculture de montagne et un accueil d'une simplicité désarmante. Les habitants, souvent amazighs, perpétuent des traditions séculaires, de la langue à l'artisanat.`,
      `Sur nos raids, ces villages ne sont pas des décors, mais des étapes vivantes où l'on partage un thé et quelques mots. C'est cette rencontre entre la piste et la culture qui fait la richesse de l'aventure. <a href="/#raids">Découvrir nos raids →</a>`,
    ],
    cta: { label: 'Voir nos raids', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'aux-portes-du-sahara',
    caption: 'Portes du Sahara',
    title: 'Aux portes du Sahara',
    keyword: 'désert du Sahara au Maroc, dunes de l\'erg',
    description:
      "Aux portes du Sahara marocain, les plateaux rocailleux laissent place aux dunes de l'erg. Terrain d'apprentissage ultime du rallye-raid.",
    imageAlt: "Cordon de dunes de l'erg aux portes du Sahara marocain",
    image: '/img/g1.jpg',
    body: [
      `Là où la piste s'efface, le grand désert commence. Aux portes du Sahara marocain, les plateaux rocailleux laissent place aux cordons de dunes de l'erg, sculptés par le vent.`,
      `Rouler dans cet univers, c'est apprendre à lire le sable, à choisir sa trace selon l'orientation des dunes, et à savourer le silence des immensités. Au coucher du soleil, la lumière transforme le paysage en un océan doré.`,
      `Le désert est le terrain d'apprentissage ultime du rallye-raid, exigeant et grisant. Nos bivouacs sous les étoiles, loin de toute lumière, comptent parmi les souvenirs les plus forts que l'on rapporte. <a href="/#raids">Nos raids dans le désert →</a>`,
    ],
    cta: { label: 'Voir nos raids', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'l-immensite',
    caption: "L'immensité",
    title: 'L\'immensité du Sud marocain',
    keyword: 'grands espaces Maroc, paysages du Sud marocain',
    description:
      "Plateaux à perte de vue, horizons sans fin : dans les grands espaces du Sud marocain, la moto devient un terrain de liberté.",
    imageAlt: "Plateaux et horizons sans fin dans le Sud marocain",
    image: '/img/vast.jpg',
    body: [
      `Ce qui frappe d'abord au Sud du Maroc, c'est l'échelle. Des plateaux à perte de vue, des horizons sans fin, une nature brute où l'on se sent tout petit. L'immensité, ici, n'est pas un mot, c'est une sensation.`,
      `À moto, cette immensité devient un terrain de liberté. On avale les kilomètres, on suit un cap, on se laisse porter par la diversité des reliefs, des oueds asséchés aux crêtes de l'Anti-Atlas.`,
      `C'est dans ces grands espaces que l'on se reconnecte à l'essentiel, et que chaque étape prend une dimension presque méditative. <a href="/reserver">Réserver un raid →</a>`,
    ],
    cta: { label: 'Réserver un raid', href: '/reserver' },
    showVisitMorocco: false,
  },
  {
    slug: 'the-a-la-menthe',
    caption: 'Thé à la menthe',
    title: 'Le thé à la menthe marocain',
    keyword: 'thé à la menthe marocain, tradition Maroc',
    description:
      "Bien plus qu'une boisson, le thé à la menthe est un rituel d'hospitalité au Maroc. Un moment central de nos raids moto.",
    imageAlt: "Thé à la menthe versé de haut dans un verre garni de menthe fraîche",
    image: '/img/culture/mint-tea-optimized.jpg',
    imageBase: '/img/culture/mint-tea',
    body: [
      `Servi de haut, dans un filet mousseux et parfumé, le thé à la menthe est bien plus qu'une boisson au Maroc : c'est un rituel d'hospitalité. On le partage à l'arrivée, à l'ombre d'une palmeraie ou sous la tente d'un bivouac.`,
      `Préparé avec du thé vert, de la menthe fraîche et beaucoup de sucre, il rythme les journées et scelle les rencontres. Refuser un verre serait presque impensable ; le partager, c'est entrer dans le quotidien marocain.`,
      `Sur nos raids, ces pauses thé sont des moments suspendus, où l'on souffle, où l'on échange, où l'aventure prend tout son sens. <a href="/edouard-de-moor">L'expérience CDM Motorsport →</a>`,
    ],
    cta: { label: 'Réserver un raid', href: '/reserver' },
    showVisitMorocco: true,
  },
  {
    slug: 'kasbah-berbere',
    caption: 'Kasbah berbère',
    title: 'La kasbah berbère',
    keyword: 'kasbah Maroc, architecture de terre',
    description:
      "Forteresses de terre crue au cœur des vallées, les kasbahs racontent l'histoire du Sud marocain. Étapes emblématiques de nos raids.",
    imageAlt: "Kasbah berbère en pisé au cœur d'une vallée du Sud marocain",
    image: '/img/culture/berber-village-optimized.jpg',
    imageBase: '/img/culture/berber-village',
    body: [
      `Forteresses de terre crue dressées au cœur des vallées, les kasbahs racontent l'histoire du Sud marocain. Leurs murs ocre, leurs tours crénelées et leurs motifs géométriques témoignent d'un savoir-faire ancestral.`,
      `Autrefois refuges et greniers fortifiés le long des routes caravanières, beaucoup veillent encore sur les oasis et les palmeraies. Certaines, comme les plus célèbres de la région de Ouarzazate, ont servi de décor à de grands films.`,
      `Croiser une kasbah au détour d'une piste, c'est toucher du regard des siècles d'histoire. Un contraste saisissant avec la vitesse et la modernité de nos machines. <a href="/#raids">Nos itinéraires →</a>`,
    ],
    cta: { label: 'Voir nos raids', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'rencontre',
    caption: 'Rencontre',
    title: 'Rencontres, l\'hospitalité marocaine',
    keyword: 'rencontres Maroc, hospitalité marocaine',
    description:
      "Un berger, un enfant, un hôte : l'hospitalité marocaine donne à un raid moto sa vraie profondeur. Récit et esprit de nos aventures.",
    imageAlt: "Homme en djellaba, portrait d'hospitalité marocaine",
    image: '/img/culture/local-portrait-optimized.jpg',
    imageBase: '/img/culture/local-portrait',
    body: [
      `Au-delà des pistes et des paysages, ce que l'on retient d'un raid au Maroc, ce sont les gens. Un berger croisé au milieu de nulle part, un enfant qui salue au bord de la piste, un hôte qui partage son repas : l'hospitalité marocaine n'est pas une formule, c'est une manière d'être.`,
      `Ces échanges, souvent sans langue commune mais toujours sincères, donnent à l'aventure sa vraie profondeur. On repart avec des images plein la tête, mais surtout avec des rencontres qui restent.`,
      `Parce qu'au final, ce ne sont pas les kilomètres que l'on garde en mémoire, mais tout ce qui a été vécu et partagé sur le chemin. <a href="/reserver">Partez à l'aventure →</a>`,
    ],
    cta: { label: 'Réserver un raid', href: '/reserver' },
    showVisitMorocco: false,
  },
];
