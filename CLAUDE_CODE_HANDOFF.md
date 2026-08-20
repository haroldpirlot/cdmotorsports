# CDMotorsports — Dossier de passation pour Claude Code

Ce document contient tout ce qu'il faut pour transformer la **maquette statique** (dossier `site_v3/`)
en **site de production**. Ouvre ce dossier dans Claude Code et suis les sections ci-dessous.

---

## 1. Le projet en deux lignes

Site vitrine premium pour **CDMotorsports** — raids moto (rallye-raid) au Maroc, en KOVE 450 Rally.
Positionnement : *« Every ride tells a story — Live the rally. Ride the legend. »* Univers désert / rallye-raid,
très visuel, peu de texte, alternance photo plein cadre et blanc texturé.

---

## 2. Stack recommandée

| Besoin | Choix recommandé | Pourquoi |
|---|---|---|
| Base du site | **Astro** (ou 11ty) — site statique | Rapide, SEO, reprend directement le HTML/CSS actuel |
| CMS (édition autonome) | **Decap CMS** (ex-Netlify CMS) | Gratuit, git-based, pas de serveur |
| Hébergement + déploiement | **Netlify** (ou Cloudflare Pages) | Gratuit, CI/CD, HTTPS auto, formulaires inclus |
| Formulaire de contact | **Netlify Forms** ou Formspree | Envoi d'emails sans backend |
| Emails automatisés | **Brevo** (ex-Sendinblue) / Mailchimp | Séquence de 6 messages (voir §7) |
| Multilingue FR/EN | i18n Astro + `hreflang` | Clientèle internationale |
| Analytics | GA4 + Search Console + Google Business | Mesure + SEO local |

> Le site actuel est en **HTML/CSS/JS pur** : il peut être porté tel quel dans des composants Astro,
> puis « componentiser » l'en-tête, le pied de page, la carte-raid et la page-raid.

---

## 3. Contenu du dossier `site_v3/`

- `index.html` — redirige vers l'accueil
- `Mockup_CDMotorsports_v2.html` — **accueil** (hero vidéo, 7 raids, Pourquoi CDMotorsports, histoire, Le Maroc, galerie, infos pratiques, contact)
- `Raid_1..7-*.html` — **7 pages-raid** (itinéraire, carte, étapes, inclus/non inclus, galerie, moto)
- `Moto_KOVE-450-Rally_CDMotorsports.html`, `Option-4x4_...`, `Actualites_...`, `Article_...`, `Partenaires_...`, `Reserver_...`, `Boutique_...` (coming soon)
- `CGV_...`, `Mentions-Legales_...`, `Confidentialite_...`
- `hero-video.mp4` — vidéo hero (⚠ actuellement SD, à remplacer par du 1080p)
- `assets/img/` — photos HD (`*.jpg`) + **cartes d'itinéraire** (`map_raid1..7.png`)

---

## 4. Design system

**Couleurs**
- Encre : `#1a1613` — Sable (accent) : `#B4642C` — Papier : `#FBF8F3` — Crème : `#F6F1E9`
- Ligne : `#E4DBCD` — Vert (check) : `#3F7A57`

**Typographie (Google Fonts)** — *à valider, aucune retenue à ce jour*
- Titres : `Bricolage Grotesque` (placeholder actuel)
- Texte / UI : `Hanken Grotesk`

**Composants réutilisables à extraire** : header (mix-blend), footer, carte-raid (`.rcard`),
page-raid (hero + étapes + carte + inclus/non inclus + galerie + moto + CTA), bande photo parallaxe,
galerie lightbox, curseur personnalisé, révélations au scroll (IntersectionObserver).

---

## 5. Modèle de contenu (pour le CMS)

### Collection « Raids » (7 entrées réelles)

| # | Nom (proposé, à valider) | Itinéraire | Jours | Distance* | Niveau (proposé) |
|---|---|---|---|---|---|
| 1 | Odyssée du Sud | Agadir → Ouarzazate (par le sud) | 7 | 1 480 km | Confirmé |
| 2 | Boucle de l'Anti-Atlas | Ouarzazate → Ouarzazate | 5 | 924 km | Intermédiaire |
| 3 | Cap Merzouga | Ouarzazate → Ouarzazate (par Merzouga) | 6 | 1 232 km | Confirmé |
| 4 | Océan & Atlas | Agadir → Marrakech | 6 | 1 290 km | Confirmé |
| 5 | Escapade Drâa | Ouarzazate → Ouarzazate | 3 | 800 km | Confirmé |
| 6 | Échappée Atlantique | Agadir → Agadir | 3 | 665 km | Intermédiaire |
| 7 | Immersion Erg | Errachidia → Errachidia | 3 | 460 km | Découverte |

\* Distance = somme des étapes ; **à confirmer** avec les totaux du client (léger écart d'arrondi).
Le détail ville par ville et km par étape est déjà intégré dans chaque page-raid.
Champs par raid : nom, slug, itinéraire, jours, niveau, distance, étapes[], prix (sur demande),
carte (image), galerie[], hero.

### Inclus / non inclus (identiques pour tous, fournis par le client)
- **Inclus** : transferts aéroport A/R · hôtel demi-pension (1er → dernier jour) · moto KOVE 450 Rally · trace GPS · logistique · assistance mécanique.
- **Non inclus** : billet d'avion · carburant · boissons en journée (midi et soir inclus, sans alcool) · activités/visites · dépenses personnelles.

### Textes de marque (fournis, déjà intégrés à l'accueil)
Accroche, « Pourquoi CDMotorsports » (6 points), « What will you remember ». Source : mail client.

### CGV
Intégrées dans `CGV_...html` à partir de la base fournie (Ténéré Spirit), adaptées à CDMotorsports.
⚠ **Identité juridique + droit applicable = placeholders à compléter** ; validation finale recommandée (juriste).

---

## 6. Fonctionnalités à développer

- [ ] **Formulaire de contact / réservation** fonctionnel (Netlify Forms) → email vers CDMotorsports.
- [ ] **Multilingue FR/EN** (contenu + `hreflang` + sélecteur).
- [ ] **SEO** : `<title>`/meta uniques par page, Open Graph, **JSON-LD** (`LocalBusiness`, `TouristTrip` par raid, `FAQPage`, `Review`), `sitemap.xml`, `robots.txt`, alt d'images.
- [ ] **Analytics** : GA4 + Search Console + fiche Google Business.
- [ ] **Calendrier « dates sur demande »** (pas de réservation en ligne pour l'instant ; sélecteur type Airbnb = Phase 2).
- [ ] **Boutique** : Phase 2 (page « Coming soon » déjà en place).
- [ ] **Déploiement** : domaine + Netlify + SSL + redirections.
- [ ] **Performance** : conversion images en WebP/AVIF + `srcset`, lazy-load.

---

## 7. Séquence d'emails automatisés (à concevoir avec Harold)

Six messages voulus par le client, à câbler (Brevo/Mailchimp + déclencheurs) :
1. Après la demande de réservation
2. Message de confirmation
3. Message d'infos (préparation, équipement, formalités)
4. Message commercial entre la réservation et le départ
5. Message une semaine avant le départ
6. Message après l'expérience (retour / avis / fidélisation)

---

## 8. Éléments encore manquants (à réclamer au client)

- [ ] **Logo** CDMotorsports (actuellement en texte).
- [ ] **Vidéo hero en 1080p** (l'actuelle est en SD → floue en plein écran).
- [ ] **Prix** de chaque raid (affiché « sur demande » en attendant).
- [ ] **Dates / saisons** (même en « sur demande »).
- [ ] **Photos culturelles** du Maroc (villages, gastronomie, artisanat, portraits) — à sourcer (droits !).
- [ ] **Traces GPX** des 7 raids (les cartes actuelles relient les villes ; le GPX permettrait le tracé exact).
- [ ] **Identité juridique** pour CGV / mentions légales.

---

## 9. Décisions à trancher

- **Typographie** définitive (aucune proposition retenue à ce jour).
- **Noms & niveaux des raids** (propositions ci-dessus à valider).
- **Totaux de distance** (somme des étapes vs chiffres du client).
- **KOVE** : conservé en **partenaire** (motos achetées, pas un partenariat commercial — libellé à ajuster si besoin).
- **Médias / backlinks** à contacter à la mise en ligne : KOVE Benelux, One Race, MX Mag, Enduro Magazine.

---

## 10. Ordre de construction suggéré (Claude Code)

1. Initialiser le projet Astro + git ; importer le design system (couleurs, fonts, CSS).
2. Créer les composants : Layout, Header, Footer, RaidCard, RaidPage, Gallery.
3. Modéliser les données `raids` (7 entrées) + contenus globaux ; brancher Decap CMS.
4. Reprendre les pages depuis `site_v3/` ; intégrer cartes + galeries.
5. Formulaire (Netlify Forms) + page Réserver.
6. Multilingue FR/EN + SEO (JSON-LD, sitemap, metas) + analytics.
7. Déploiement Netlify + domaine + SSL.
8. Séquence d'emails (Brevo) + Google Business.
9. Phase 2 : boutique, calendrier type Airbnb.

---
*Base : maquette réalisée dans Cowork. Photos © CDMotorsports / Harold Pirlot de Corbion.*
