# DEPLOY.md — Checklist mise en production

Ce document liste **tout ce qu'il faut changer** le jour où le vrai domaine
`cdmotorsport.com` est acheté et pointé sur Vercel. À suivre dans l'ordre.

---

## 1. Registrar & DNS (~5 min + propagation)

- [ ] Acheter `cdmotorsport.com` chez un registrar (OVH, Gandi, Namecheap, Porkbun…)
- [ ] Sur **Vercel → cdmotorsports → Settings → Domains → Add Domain** : entrer `cdmotorsport.com` et `www.cdmotorsport.com`
- [ ] Vercel affiche les **DNS records** à créer chez le registrar. Deux options :
  - **Nameservers Vercel** (le plus simple, Vercel gère tout) : basculer les NS du domaine sur `ns1.vercel-dns.com` + `ns2.vercel-dns.com`
  - **Records manuels** : ajouter les A/CNAME/TXT indiqués par Vercel dans la zone DNS du registrar
- [ ] Attendre la propagation DNS (5 min à 24 h). Vérifier avec `dig cdmotorsport.com` — doit répondre depuis Vercel
- [ ] Vercel émet automatiquement le certificat SSL Let's Encrypt une fois DNS propagé

---

## 2. Code — mettre à jour les URLs

Trois fichiers à modifier :

### `src/config.ts`

```ts
export const SITE = {
  // ...
  url: 'https://cdmotorsport.com',  // ← anciennement 'https://cdmotorsports.vercel.app'
  // ...
};
```

### `astro.config.mjs`

```js
export default defineConfig({
  site: 'https://cdmotorsport.com',  // ← anciennement 'https://cdmotorsports.vercel.app'
  integrations: [sitemap()],
});
```

### `public/admin/config.yml` (Decap CMS)

```yaml
backend:
  name: github
  repo: haroldpirlot/cdmotorsports
  branch: main
  base_url: https://cdmotorsport.com  # ← anciennement https://cdmotorsports.vercel.app
  auth_endpoint: api/auth
```

### `public/robots.txt`

```
Sitemap: https://cdmotorsport.com/sitemap-index.xml
```

### Vérif — les autres endroits utilisent `SITE.url` dynamiquement, aucune modif nécessaire :
- Meta OG (`og:url`, `og:image`) → construits via `new URL(..., SITE.url)`
- Canonical → construit via `new URL(..., SITE.url)`
- JSON-LD `TravelAgency` + `TouristTrip` → utilise `SITE.url`
- Formulaire Réserver `_next` redirect après soumission → utilise `SITE.url`

---

## 3. OAuth App GitHub (Decap CMS)

Sinon le login CMS casse.

- [ ] Aller sur https://github.com/settings/developers → OAuth Apps → **CDMotorsports CMS**
- [ ] Mettre à jour :
  - **Homepage URL** : `https://cdmotorsport.com`
  - **Authorization callback URL** : `https://cdmotorsport.com/api/callback`
- [ ] Update application. Le client_id + secret restent inchangés (pas besoin de les régénérer, ni de changer les env vars Vercel).

---

## 4. Vercel — redirections (automatique)

Une fois le domaine principal défini sur Vercel :
- `cdmotorsports.vercel.app/*` → **redirect 308** vers `cdmotorsport.com/*` (Vercel fait ça tout seul)
- Assure-toi que **Primary Domain = cdmotorsport.com** dans Settings → Domains

---

## 5. Google Analytics 4 (déjà OK, cosmétique)

Le tag `G-7VF98VWPFT` tracke depuis n'importe quelle URL. Facultatif :
- [ ] GA4 → Admin → Data Streams → mettre à jour le "Stream URL" de `https://cdmotorsport.com` (déjà configuré comme ça)

---

## 6. Google Search Console

- [ ] https://search.google.com/search-console → **Ajouter une propriété** → **Préfixe d'URL** → `https://cdmotorsport.com/`
- [ ] Vérification via **Google Analytics** (1 clic, marche car GA4 est en place)
- [ ] Une fois vérifié : soumettre le **sitemap** dans Sitemaps → `https://cdmotorsport.com/sitemap-index.xml`
- [ ] Optionnel : ajouter aussi `https://www.cdmotorsport.com/` comme propriété séparée

---

## 7. Email pro & séquence Brevo (J5 bis)

Nécessite le domaine pour envoyer depuis `contact@cdmotorsport.com` ou `bonjour@cdmotorsport.com`.

- [ ] Créer un compte Brevo (gratuit jusqu'à 300 emails/jour)
- [ ] Brevo → **Sender & IP** → ajouter `cdmotorsport.com` comme domaine émetteur
- [ ] Ajouter les records **SPF + DKIM** fournis par Brevo dans la zone DNS Vercel/registrar
- [ ] Attendre la vérification (~15 min)
- [ ] Créer une boîte email `contact@cdmotorsport.com` (option registrar : mail forwarding, ou Google Workspace / Zoho gratuit)
- [ ] Migrer le formulaire Réserver : remplacer Formspree par une **Vercel Function `api/contact.js`** qui appelle l'API Brevo transactional (garde le client_secret Brevo en env var)
- [ ] Créer les **6 templates Brevo** (voir handoff §7) :
  1. Confirmation de demande (auto après submit)
  2. Confirmation de réservation (manuel/auto après validation Edouard)
  3. Infos préparation (J-30)
  4. Message commercial (J-15)
  5. Rappel J-7
  6. Retour d'expérience (J+3)

---

## 8. Google Business Profile

Nécessite l'identité juridique Edouard (SIREN/SIRET, adresse pro).

- [ ] Créer https://business.google.com → **Add your business** → CDMotorSport
- [ ] Catégorie : **Tour Operator** (ou "Adventure travel")
- [ ] Zone de service : Maroc (adresse pro si applicable)
- [ ] Ajouter site web, téléphone, horaires
- [ ] Verification postale (Google envoie un code physique — 2-3 semaines)

---

## 9. Contenu — remplacements finaux

À faire quand le client fournit :
- [ ] **Vidéo hero 1080p** → `public/hero-video.mp4` (actuel SD, flou en plein écran)
- [ ] **Logo CDMotorSport** → remplacer le texte du Header par un `<svg>` ou `<img>`
- [ ] **Photos culturelles Maroc** → sourcer + intégrer dans `public/img/` (Villages, gastronomie, artisanat)
- [ ] **Prix des raids** → mettre à jour les 7 markdown dans `src/content/raids/`
- [ ] **Dates / saisons** → idem
- [ ] **Traces GPX** → intégrer par raid (nouveau champ dans le schema Zod + composant Map interactif)
- [ ] **Identité juridique** → compléter CGV, Mentions légales, Confidentialité (chercher `[à compléter]` dans les 3 fichiers `src/pages/`)

---

## 10. Post-deploy — checklist de vérification

À la fin, vérifier :

- [ ] `cdmotorsport.com` répond en HTTPS avec le contenu du site
- [ ] `cdmotorsports.vercel.app/*` redirige (308) vers `cdmotorsport.com/*`
- [ ] `cdmotorsport.com/robots.txt` accessible, mentionne le bon sitemap
- [ ] `cdmotorsport.com/sitemap-index.xml` accessible
- [ ] `cdmotorsport.com/admin/` : login GitHub fonctionne (test manuel)
- [ ] `cdmotorsport.com/reserver` : formulaire soumettable (test complet avec un vrai email)
- [ ] GA4 Realtime : voit tes visites
- [ ] Google Rich Results Test : `TouristTrip` + `FAQPage` + `TravelAgency` détectés
- [ ] Facebook Sharing Debugger : preview OG correct
- [ ] Meta description en clair dans les résultats Google (après indexation ~7 jours)

---

## 11. Sécurité — traces GPX (confidentiel client)

Les fichiers GPX bruts du client (`_gpx_private/*.gpx` en local) **ne doivent
jamais être commit** — propriété client, ultra-confidentiel.

**Règles en place** :
- Dossier `_gpx_private/` git-ignoré
- `scripts/parse-gpx.mjs` lit depuis `_gpx_private/`, ne génère que du JSON
  dérivé (polylines décimées) commit dans `src/data/gpx/`
- Aucun fichier `.gpx` servi sur `cdmotorsports.vercel.app`
- Pas de bouton "Télécharger la trace GPX" côté visiteur

**Si un leak survient à l'avenir** (fichier commit par erreur) :
1. `git rm public/gpx/*.gpx` + commit
2. `brew install git-filter-repo` (si pas installé)
3. `git filter-repo --path public/gpx --invert-paths --force`
4. `git remote add origin https://github.com/haroldpirlot/cdmotorsports.git`
5. `git push --force origin main`
6. **Important** : GitHub garde les blobs orphelins ~90 jours (accessibles via
   SHA direct). Pour purge complète : ouvrir un ticket [GitHub Support](https://support.github.com/contact/private-information)
   avec les SHA à purger + confirmation que c'est de la data confidentielle.
   Cf. https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
7. Vérifier qu'aucun fork n'a été fait entre le leak et la purge (`gh api repos/haroldpirlot/cdmotorsports/forks`)

---

## 12. Optim images (à faire en même temps que les vraies photos)

Quand le client livre les photos HD :

- [ ] Déplacer `public/img/` → `src/assets/img/`
- [ ] Migrer les `<img src="/img/...">` vers `<Image src={import(...)} ...>` d'Astro
- [ ] Modifier le schema Zod des raids pour utiliser `image()` au lieu de `z.string()`
- [ ] Gérer les `background-image` CSS séparément (garder en `public/` ou pré-optimiser avec `sharp`)
- [ ] Cible : Lighthouse Performance ≥ 95, LCP < 2.5s

---

*Dernière mise à jour : 2026-08-24*
