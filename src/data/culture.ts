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
    title: "Villages de l'Atlas",
    keyword: "villages berbères de l'Atlas, Maroc",
    description:
      "Villages berbères de l'Atlas, un mode de vie amazigh préservé dans la montagne marocaine. Étapes vivantes des raids CDM Motorsport.",
    imageAlt: "Village berbère traditionnel accroché aux flancs de l'Atlas marocain",
    image: '/img/village.jpg',
    body: [
      `Accrochés aux flancs de la montagne, les villages berbères de l'Atlas semblent avoir poussé dans la roche elle-même. Des maisons de terre couleur ocre, empilées les unes contre les autres, des ruelles étroites où l'on croise plus souvent une mule qu'une voiture, des terrasses plates où sèchent les récoltes. On y arrive presque toujours au ralenti, et c'est tant mieux : ici, le temps ne file pas à la même vitesse qu'ailleurs.`,
      `Ces villages sont le cœur du monde amazigh, ce peuple berbère installé dans les montagnes bien avant l'arrivée des Arabes. On y parle encore le tamazight, on y cultive en terrasses l'orge, les noix, les amandes et les pommes, et l'on y élève chèvres et moutons sur des pentes que l'on croirait impraticables. Les maisons sont bâties en pisé, cette terre crue mêlée de paille qui garde le frais l'été et la chaleur l'hiver. Une architecture née du bon sens et du climat, transmise de génération en génération.`,
      `Les traverser à moto, c'est croiser un mode de vie qui a tenu bon face à la modernité, et un accueil d'une simplicité qui désarme. On s'arrête à un point d'eau, un ancien lève la main, des enfants accourent, on échange trois mots et un sourire, et parfois on repart avec une poignée de dattes ou un verre de thé qu'on n'avait rien demandé.`,
      `Sur mes raids, ces villages ne sont pas des cartes postales qu'on photographie au passage : ce sont des étapes vivantes, là où l'aventure prend toute sa saveur humaine. Derrière chaque col, il y a des gens, une histoire, une manière d'habiter la montagne qui force le respect. <a href="/#raids">Découvrir mes raids →</a>`,
    ],
    cta: { label: 'Découvrir mes raids', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'aux-portes-du-sahara',
    caption: 'Aux portes du Sahara',
    title: 'Aux portes du Sahara',
    keyword: "désert du Sahara au Maroc, dunes de l'erg",
    description:
      "Aux portes du Sahara marocain, dunes de l'erg Chebbi et Chegaga, silence et bivouacs sous les étoiles. Terrain ultime du rallye-raid.",
    imageAlt: "Cordon de dunes de l'erg aux portes du Sahara marocain",
    image: '/img/g1.jpg',
    body: [
      `Là où la piste s'efface, le grand désert commence. Les plateaux rocailleux et les regs caillouteux laissent peu à peu place aux cordons de dunes de l'erg, ces vagues de sable redessinées chaque jour par le vent. La première fois qu'on les voit se dresser à l'horizon, ça impressionne toujours un peu, et ça donne surtout une furieuse envie d'y aller.`,
      `Le Maroc a deux grands ergs mythiques : l'erg Chebbi, près de Merzouga, avec ses dunes qui montent haut et rougeoient au lever du soleil, et l'erg Chegaga, plus sauvage, au bout de la vallée du Drâa, là où la route s'arrête vraiment. Entre les deux, un monde de nomades, de dromadaires et d'oasis cachées où poussent les palmiers dattiers. Ce désert n'est pas vide : il est habité, parcouru depuis des siècles par les caravanes qui reliaient l'Afrique noire au nord du continent.`,
      `Rouler ici, c'est apprendre à lire le sable, à sentir sa portance, à choisir sa ligne selon l'orientation des dunes et la lumière. On y gagne un pilotage plus fin, plus souple, et une sacrée dose d'humilité. Et puis il y a ce silence qu'on ne trouve nulle part ailleurs, si total qu'on entend son propre cœur. Au coucher du soleil, tout le paysage vire à l'or, puis au rose, avant que le froid ne tombe d'un coup.`,
      `C'est le terrain d'apprentissage ultime du rallye-raid, exigeant et grisant à la fois. Et nos bivouacs sous les étoiles, loin de la moindre lumière artificielle, avec la Voie lactée qui barre le ciel, comptent parmi les souvenirs les plus forts que l'on remporte d'un raid. <a href="/#raids">Mes raids dans le désert →</a>`,
    ],
    cta: { label: 'Mes raids dans le désert', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'l-immensite',
    caption: "L'immensité",
    title: "L'immensité",
    keyword: 'grands espaces Maroc, paysages du Sud marocain',
    description:
      "Grands espaces du Sud marocain : plateaux à perte de vue, horizons sans fin, hamadas et oueds. À moto, l'immensité devient liberté.",
    imageAlt: 'Plateaux et horizons sans fin dans le Sud marocain',
    image: '/img/vast.jpg',
    body: [
      `Ce qui frappe d'abord dans le Sud marocain, c'est l'échelle. Des plateaux qui filent à perte de vue, des horizons sans fin, des montagnes qui se découpent à cinquante kilomètres dans un air d'une pureté incroyable. Une nature brute, minérale, où l'on se sent minuscule. L'immensité, ici, ce n'est pas un mot de brochure : ça se ressent au creux du ventre dès qu'on coupe le moteur.`,
      `Le décor change sans cesse et ne se ressemble jamais. On passe des hamadas, ces plateaux de pierre noire balayés par le vent, aux oueds asséchés bordés de lauriers-roses, des gorges encaissées de l'Atlas aux croupes arrondies et colorées de l'Anti-Atlas, ocre, violet, vert-de-gris selon la roche. En une seule journée, on peut traverser trois ou quatre paysages qui n'ont rien à voir les uns avec les autres.`,
      `À moto, cette immensité devient un terrain de liberté totale. On avale les kilomètres, on suit un cap, on se laisse porter par le relief. Il n'y a pas de barrière, pas de panneau, pas de bruit : juste la piste devant, et le choix de sa trajectoire. C'est une sensation qu'on oublie vite dans nos vies encombrées, et qu'on retrouve d'un coup ici.`,
      `C'est dans ces grands espaces qu'on se reconnecte à l'essentiel, et que la tête se vide vraiment. Chaque étape prend alors quelque chose de presque méditatif : on roule, on regarde, on respire, et le reste attendra. <a href="/reserver">Réserver un raid →</a>`,
    ],
    cta: { label: 'Réserver un raid', href: '/reserver' },
    showVisitMorocco: false,
  },
  {
    slug: 'the-a-la-menthe',
    caption: 'Le thé à la menthe',
    title: 'Le thé à la menthe',
    keyword: 'thé à la menthe marocain, tradition Maroc',
    description:
      "Le thé à la menthe, rituel d'hospitalité marocain servi de haut dans un filet mousseux. Un moment central des raids CDM Motorsport.",
    imageAlt: 'Thé à la menthe versé de haut dans un verre garni de menthe fraîche',
    image: '/img/culture/mint-tea-optimized.jpg',
    imageBase: '/img/culture/mint-tea',
    body: [
      `Servi de haut, dans un long filet mousseux et parfumé qui remplit le petit verre sans une goutte à côté, le thé à la menthe est bien plus qu'une boisson au Maroc. C'est un rituel, un langage à lui tout seul. On le partage à l'arrivée, à l'ombre d'une palmeraie, sur un tapis posé à même le sol ou sous la tente d'un bivouac, et le refuser reviendrait presque à refuser la main tendue.`,
      `La recette est simple et jalousement gardée : du thé vert gunpowder, une bonne poignée de menthe fraîche, et beaucoup de sucre. On le prépare avec soin, on le verse, on le reverse dans la théière pour le mélanger, on goûte, on ajuste. On raconte que les trois verres qu'on sert traditionnellement ont chacun leur caractère : le premier amer comme la vie, le deuxième fort comme l'amour, le troisième doux comme la mort. Vrai ou pas, la formule dit bien la place que cette boisson occupe dans le quotidien.`,
      `Ce thé rythme les journées et scelle les rencontres. On l'offre au voyageur, au voisin, à l'inconnu de passage, et ce simple geste ouvre toutes les portes. Accepter un verre, c'est entrer un instant dans la vie des gens, prendre le temps de s'asseoir alors qu'on était pressé, écouter une histoire qu'on ne comprend qu'à moitié mais qui fait chaud au cœur.`,
      `Sur mes raids, ces pauses thé sont des moments suspendus. On coupe les moteurs, on enlève le casque, on souffle, on discute, et c'est souvent là, plus que sur la piste, que l'aventure prend tout son sens. <a href="/edouard-de-moor">L'expérience CDM Motorsport →</a>`,
    ],
    cta: { label: 'L\'expérience CDM Motorsport', href: '/edouard-de-moor' },
    showVisitMorocco: true,
  },
  {
    slug: 'kasbah-berbere',
    caption: 'Kasbah berbère',
    title: 'Kasbah berbère',
    keyword: 'kasbah Maroc, architecture de terre',
    description:
      "Forteresses de terre crue dressées dans les vallées du Sud marocain, les kasbahs racontent des siècles d'histoire. Étapes de rallye-raid.",
    imageAlt: "Kasbah berbère en pisé au cœur d'une vallée du Sud marocain",
    image: '/img/culture/berber-village-optimized.jpg',
    imageBase: '/img/culture/berber-village',
    body: [
      `Forteresses de terre crue dressées au cœur des vallées, les kasbahs racontent à elles seules l'histoire du Sud marocain. Leurs hauts murs ocre, leurs tours d'angle crénelées et leurs motifs géométriques gravés dans le pisé témoignent d'un savoir-faire transmis depuis des siècles, où l'on bâtissait des palais entiers sans une seule pierre, uniquement avec la terre du lieu, mélangée à la paille et séchée au soleil.`,
      `Beaucoup de ces kasbahs, et les ksour (ces villages fortifiés), gardaient autrefois les routes caravanières qui remontaient du Sahara chargées d'or, de sel et d'épices. Elles servaient à la fois de refuge, de grenier collectif et de démonstration de puissance pour les grandes familles qui contrôlaient les vallées, comme les Glaoui. Le long de la vallée du Drâa ou de celle du Dadès, on en croise des dizaines, certaines encore habitées, d'autres lentement rendues à la terre dont elles sont nées.`,
      `La plus célèbre, Aït-Ben-Haddou, dresse ses tours au-dessus de l'oued depuis le Moyen Âge et est aujourd'hui classée au patrimoine mondial de l'UNESCO. Non loin, Ouarzazate est devenue une petite capitale du cinéma : ses kasbahs et ses décors ont servi à des dizaines de grands films et de séries. On roule là où d'autres ont imaginé des mondes entiers.`,
      `En croiser une au détour d'une piste, se garer un instant au pied de ses murs, c'est toucher du regard des siècles d'histoire, un contraste saisissant avec le grondement de nos motos modernes. C'est aussi ça, le Maroc : rouler vite dans un pays qui, lui, a pris son temps. <a href="/#raids">Mes itinéraires →</a>`,
    ],
    cta: { label: 'Mes itinéraires', href: '/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'rencontre',
    caption: 'Rencontre',
    title: 'Rencontre',
    keyword: 'rencontres Maroc, hospitalité marocaine',
    description:
      "Un berger, un enfant, un hôte : l'hospitalité marocaine donne à un raid moto sa vraie profondeur. Récits de rencontres au Sud du Maroc.",
    imageAlt: "Homme en djellaba, portrait d'hospitalité marocaine",
    image: '/img/culture/local-portrait-optimized.jpg',
    imageBase: '/img/culture/local-portrait',
    body: [
      `Au-delà des pistes et des paysages, ce qu'on retient vraiment d'un raid au Maroc, ce sont les gens. Un berger surgi au milieu de nulle part, là où l'on se croyait seul au monde. Un gamin qui court au bord de la piste, la main levée, juste pour un salut. Un hôte qui partage son repas sans qu'on lui demande rien, et qui serait presque vexé qu'on refuse.`,
      `L'hospitalité, au Maroc, n'est pas une formule de politesse : c'est une valeur profonde, presque sacrée. On accueille l'étranger, on le nourrit, on lui offre le thé, parce que demain c'est peut-être soi qui sera sur la route. Cette générosité-là, qui vient souvent de ceux qui ont le moins, remet les idées en place et reste longtemps après le retour.`,
      `Ces échanges se font souvent sans langue commune : un mélange d'arabe, de tamazight, de bribes de français et surtout de gestes et de regards. Et pourtant, on se comprend. Un pouce levé, un rire partagé devant une moto embourbée, une photo qu'on montre sur son téléphone : il n'en faut pas plus pour créer un lien sincère.`,
      `C'est ce qui donne à l'aventure sa vraie profondeur. On repart avec des images plein la tête, des pistes et des dunes, mais surtout avec ces rencontres qui restent. Parce qu'au fond, ce ne sont pas les kilomètres qu'on garde en mémoire, mais tout ce qu'on a vécu et partagé en chemin. <a href="/reserver">Partir à l'aventure →</a>`,
    ],
    cta: { label: "Partir à l'aventure", href: '/reserver' },
    showVisitMorocco: false,
  },
];
