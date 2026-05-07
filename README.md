# TechPro.tg — Site Vitrine Statique

Site vitrine professionnel pour TechPro.tg, hébergeable sur **GitHub Pages** (HTML/CSS/JS pur).

## Structure

```
techpro-site/
├── index.html          ← Page d'accueil
├── produits.html       ← Catalogue produits (avec filtre + recherche)
├── about.html          ← Page À propos
├── contact.html        ← Page Contact
├── css/
│   └── style.css       ← Tous les styles
├── js/
│   ├── data.js         ← Catalogue produits + config (MODIFIER ICI)
│   └── main.js         ← Logique JS globale
└── admin/
    └── index.html      ← Panel admin (caché, non lié depuis le site public)
```

## Déploiement GitHub Pages

1. Créer un dépôt GitHub (ex: `techpro-site`)
2. Uploader tous les fichiers
3. Aller dans **Settings → Pages → Source → main branch → / (root)**
4. Le site est disponible sur `https://votre-pseudo.github.io/techpro-site/`

## Accès Admin

URL admin (non visible depuis le site public) :
```
https://votre-site.github.io/techpro-site/admin/
```
Ou en local XAMPP :
```
http://localhost/techpro-site/admin/
```

**Identifiants par défaut** (à changer dans `js/data.js`) :
- Utilisateur : `admin`
- Mot de passe : `TechPro@2025`

Pour changer les identifiants, modifier dans `js/data.js` :
```js
const SITE_CONFIG = {
  adminUser: 'votre-identifiant',
  adminPass: 'VotreMotDePasse@2025',
  ...
};
```

## Ajouter des produits

### Via le panel admin (recommandé)
1. Aller sur `/admin/`
2. Se connecter
3. Onglet "Ajouter un produit"
4. Remplir le formulaire → Enregistrer
5. Exporter le JSON et mettre à jour `js/data.js` si vous voulez que les changements soient permanents sur GitHub

### Directement dans js/data.js
Ajouter un objet dans le tableau `PRODUCTS` :
```js
{
  id: 999,
  name: 'Nom du produit',
  category: 'workstation', // workstation | server | network | display | accessory
  price: 1500000,          // en FCFA
  badge: 'Nouveau',        // optionnel
  badgeColor: 'green',     // accent | blue | green
  desc: 'Description courte...',
  img: 'https://images.unsplash.com/photo-XXXXX?w=600&q=80',
  specs: ['Spec 1', 'Spec 2', 'Spec 3'],
  featured: false,         // true = affiché sur la page d'accueil
}
```

## Note sur l'authentification AD

Le panel admin utilise une authentification JS locale (credentials dans `js/data.js`).
Une vraie auth LDAP/AD nécessite un serveur backend (PHP, Node.js, etc.).
Pour un TP, cette solution est suffisante pour démontrer la notion d'espace admin protégé.

**Domaine AD configuré :** techpro.tg  
**DC :** 10.0.10.3
