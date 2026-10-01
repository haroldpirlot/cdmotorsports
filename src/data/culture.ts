// Données des 6 pages thématiques "Le Maroc" :
// - source unique consommée par Morocco.astro (vignettes cliquables)
//   et par src/pages/le-maroc/[slug].astro (rendu des pages).
//
// FR : `cultureItems` (export historique, utilisé partout en français).
// EN : `cultureItemsEn` (même shape, textes traduits).
// Utiliser `getCulture(lang)` pour résoudre selon la langue.

import type { Lang } from '../i18n';

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

export const cultureItemsEn: CultureItem[] = [
  {
    slug: 'villages-de-l-atlas',
    caption: 'Villages of the Atlas',
    title: 'Villages of the Atlas',
    keyword: 'Berber villages of the Atlas, Morocco',
    description:
      "Berber villages of the Atlas: a preserved Amazigh way of life in Morocco's mountains. Living stops on every CDM Motorsport raid.",
    imageAlt: 'Traditional Berber village clinging to the Moroccan Atlas slopes',
    image: '/img/village.jpg',
    body: [
      `Clinging to the mountainsides, the Berber villages of the Atlas look like they grew out of the rock itself. Earthen houses the color of ochre, stacked one against the next, narrow alleys where you cross a mule more often than a car, flat rooftops where the harvest is laid out to dry. You almost always arrive at a crawl, and that's just as well: time here doesn't run at the same speed as it does anywhere else.`,
      `These villages are the heart of the Amazigh world, the Berber people who settled in these mountains long before the Arabs ever arrived. People still speak Tamazight, still grow barley, walnuts, almonds and apples on terraced slopes, and still raise goats and sheep on hillsides you'd swear were impossible to walk, let alone farm. The houses are built of pisé, that mix of raw earth and straw that keeps the cool inside in summer and holds the warmth in winter. An architecture born of common sense and climate, handed down from one generation to the next.`,
      `Riding through them on a motorcycle, you brush up against a way of life that has held its ground against modernity, and against a kind of welcome whose simplicity disarms you. You stop at a water point, an old man raises a hand, kids come running, you swap three words and a smile, and sometimes you leave again with a handful of dates or a glass of tea you never asked for.`,
      `On my raids, these villages aren't postcards you shoot through a visor on the way past: they're living stops, the places where the adventure takes on its real human flavor. Behind every pass, there are people, a story, a way of living in the mountains that commands respect. <a href="/en/#raids">Discover my raids →</a>`,
    ],
    cta: { label: 'Discover my raids', href: '/en/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'aux-portes-du-sahara',
    caption: 'At the gates of the Sahara',
    title: 'At the gates of the Sahara',
    keyword: 'Moroccan Sahara desert, erg dunes',
    description:
      'At the gates of the Moroccan Sahara: erg Chebbi and Chegaga dunes, silence and bivouacs under the stars. The ultimate rally-raid terrain.',
    imageAlt: 'Line of erg dunes at the gates of the Moroccan Sahara',
    image: '/img/g1.jpg',
    body: [
      `Where the piste fades out, the great desert begins. The rocky plateaus and stony regs slowly give way to the long dune ridges of the erg, those waves of sand the wind redraws every single day. The first time you see them rise up on the horizon it always catches you, and more than anything it makes you itch to ride straight into them.`,
      `Morocco has two great mythical ergs: erg Chebbi, near Merzouga, with its tall dunes that glow red at sunrise, and erg Chegaga, wilder, out at the far end of the Drâa valley, where the road truly stops. Between the two, a whole world of nomads, dromedaries and hidden oases where the date palms grow. This desert isn't empty: it's inhabited, crossed for centuries by the caravans that linked sub-Saharan Africa to the north of the continent.`,
      `Riding here means learning to read the sand, to feel how firm it is, to pick your line according to how the dunes are aligned and where the light is coming from. You come away with smoother, more supple riding, and a serious dose of humility. And then there's that silence you don't find anywhere else, so complete you can hear your own heartbeat. At sunset, the whole landscape turns to gold, then pink, before the cold drops in all at once.`,
      `This is the ultimate training ground for rally-raid, demanding and intoxicating at the same time. And our bivouacs under the stars, far from any artificial light, with the Milky Way splitting the sky in two, are among the strongest memories you bring home from a raid. <a href="/en/#raids">My desert raids →</a>`,
    ],
    cta: { label: 'My desert raids', href: '/en/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'l-immensite',
    caption: 'The immensity',
    title: 'The immensity',
    keyword: 'wide open spaces Morocco, landscapes southern Morocco',
    description:
      "Southern Morocco's wide open spaces: endless plateaus, horizons without end, hamadas and oueds. On a bike, immensity turns into freedom.",
    imageAlt: 'Endless plateaus and horizons in southern Morocco',
    image: '/img/vast.jpg',
    body: [
      `The first thing that hits you in southern Morocco is the scale. Plateaus running on as far as the eye can see, horizons without end, mountains that cut their shape fifty kilometers away in air so clean it feels unreal. Raw, mineral country where you feel tiny. Immensity here isn't a word borrowed from a brochure: you feel it in your gut the moment you cut the engine.`,
      `The scenery keeps changing and never repeats itself. You move from hamadas, those black stone plateaus swept by the wind, to dry oueds lined with oleander, from the deep gorges of the Atlas to the rounded, colored ridges of the Anti-Atlas, ochre, violet, verdigris depending on the rock. In a single day you can cross three or four landscapes that have nothing in common with each other.`,
      `On a bike, that immensity becomes pure open ground. You eat the kilometers, you hold a bearing, you let the terrain carry you. There's no fence, no sign, no noise: just the piste ahead, and your choice of line. It's a feeling you forget quickly in our crowded lives, and that comes rushing back the moment you ride out here.`,
      `It's in these wide open spaces that you reconnect with the essentials, and that your head really empties out. Each stage then takes on something almost meditative: you ride, you look, you breathe, and the rest can wait. <a href="/en/reserver">Book a raid →</a>`,
    ],
    cta: { label: 'Book a raid', href: '/en/reserver' },
    showVisitMorocco: false,
  },
  {
    slug: 'the-a-la-menthe',
    caption: 'Mint tea',
    title: 'Mint tea',
    keyword: 'Moroccan mint tea, Morocco tradition',
    description:
      'Mint tea, the Moroccan ritual of hospitality, poured from high up in a foamy stream. A core moment of every CDM Motorsport raid.',
    imageAlt: 'Mint tea poured from high up into a glass garnished with fresh mint',
    image: '/img/culture/mint-tea-optimized.jpg',
    imageBase: '/img/culture/mint-tea',
    body: [
      `Poured from high up, in a long foamy, fragrant stream that fills the little glass without spilling a drop, mint tea in Morocco is far more than a drink. It's a ritual, a language all of its own. You share it on arrival, in the shade of a palm grove, on a rug laid straight on the ground or under the canvas of a bivouac, and turning it down would almost be like turning down an outstretched hand.`,
      `The recipe is simple and jealously guarded: gunpowder green tea, a generous handful of fresh mint, and plenty of sugar. You prepare it carefully, you pour it, pour it back into the pot to blend it, taste, adjust. People say the three glasses traditionally served each have their own character: the first bitter like life, the second strong like love, the third sweet like death. True or not, the saying tells you plenty about the place this drink holds in daily life.`,
      `This tea sets the rhythm of the day and seals every encounter. It's offered to the traveler, the neighbor, the stranger passing through, and that single gesture opens every door. Accepting a glass is stepping into someone's life for a moment, taking the time to sit down when you were in a hurry, listening to a story you only half understand but that warms you all the same.`,
      `On my raids, these tea breaks are suspended moments. We cut the engines, pull off the helmets, breathe out, talk, and it's often there, more than out on the piste, that the adventure takes on its full meaning. <a href="/en/edouard-de-moor">The CDM Motorsport experience →</a>`,
    ],
    cta: { label: 'The CDM Motorsport experience', href: '/en/edouard-de-moor' },
    showVisitMorocco: true,
  },
  {
    slug: 'kasbah-berbere',
    caption: 'Berber kasbah',
    title: 'Berber kasbah',
    keyword: 'kasbah Morocco, earthen architecture',
    description:
      'Raw-earth fortresses rising in the valleys of southern Morocco, the kasbahs tell centuries of history. Living stops on our rally-raid routes.',
    imageAlt: 'Berber pisé kasbah at the heart of a southern Moroccan valley',
    image: '/img/culture/berber-village-optimized.jpg',
    imageBase: '/img/culture/berber-village',
    body: [
      `Earthen fortresses rising up in the heart of the valleys, the kasbahs tell the story of southern Morocco all on their own. Their tall ochre walls, their crenellated corner towers and the geometric patterns carved into the pisé bear witness to a craft passed down over centuries, where entire palaces were built without a single stone, using only the earth of the place, mixed with straw and dried in the sun.`,
      `Many of these kasbahs, along with the ksour (the fortified villages), once guarded the caravan routes coming up from the Sahara loaded with gold, salt and spices. They served at once as a refuge, a shared granary and a show of power for the great families who controlled the valleys, like the Glaoui. Along the Drâa or the Dadès valleys, you pass dozens of them, some still inhabited, others slowly returning to the earth they came from.`,
      `The most famous, Aït-Ben-Haddou, has stood with its towers above the oued since the Middle Ages and is now a UNESCO World Heritage site. Not far from there, Ouarzazate has become a small capital of cinema: its kasbahs and sets have hosted dozens of major films and series. You ride through places where others imagined whole worlds.`,
      `Coming across one at the bend of a track, pulling up for a minute at the foot of its walls, you're looking straight at centuries of history, a striking contrast with the growl of our modern bikes. That's Morocco too: riding fast through a country that has, itself, taken its time. <a href="/en/#raids">My routes →</a>`,
    ],
    cta: { label: 'My routes', href: '/en/#raids' },
    showVisitMorocco: true,
  },
  {
    slug: 'rencontre',
    caption: 'Encounters',
    title: 'Encounters',
    keyword: 'encounters Morocco, Moroccan hospitality',
    description:
      "A shepherd, a child, a host: Moroccan hospitality is what gives a motorcycle raid its real depth. Stories of encounters in southern Morocco.",
    imageAlt: 'Man in djellaba, portrait of Moroccan hospitality',
    image: '/img/culture/local-portrait-optimized.jpg',
    imageBase: '/img/culture/local-portrait',
    body: [
      `Beyond the pistes and the landscapes, what really sticks with you from a raid in Morocco is the people. A shepherd who appears out of nowhere, right where you thought you were alone in the world. A kid running along the edge of the track, hand up, just to say hello. A host who shares his meal without being asked, and who would almost be hurt if you turned him down.`,
      `Hospitality in Morocco isn't a polite formula: it's a deep, almost sacred value. You take in the stranger, you feed him, you offer him tea, because tomorrow you might be the one on the road. That kind of generosity, which so often comes from those who have the least, puts your head back on straight and stays with you long after you've gone home.`,
      `These exchanges usually happen without a shared language: a mix of Arabic, Tamazight, scraps of French, and above all gestures and glances. And yet, you understand each other. A thumbs-up, a shared laugh over a bogged-down bike, a photo pulled up on a phone: that's all it takes to build a real connection.`,
      `That's what gives the adventure its true depth. You come home with your head full of images, of pistes and dunes, but above all with those encounters that stay. Because in the end, it isn't the kilometers you hold on to, it's everything you lived and shared along the way. <a href="/en/reserver">Head out on the adventure →</a>`,
    ],
    cta: { label: 'Head out on the adventure', href: '/en/reserver' },
    showVisitMorocco: false,
  },
];

export function getCulture(lang: Lang): CultureItem[] {
  return lang === 'en' ? cultureItemsEn : cultureItems;
}
