# ANSS — Site web v1

Site vitrine de l'**Association Nationale de Santé & Solidarité**, construit à partir de `documentation_du_projet_web.md`.

## 🚀 Lancer le site

Ouvrez simplement `index.html` dans un navigateur. Aucune installation ni build n'est nécessaire.

Pour un serveur local :

```powershell
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## 📁 Structure

```
index.html                      Toutes les sections du site
css/style.css                   Charte graphique (bleu / turquoise / corail), responsive, RTL
js/main.js                      Slider, compteurs, modales, formulaires, bilingue FR/AR
assets/img/                     Logo, icônes 3D et photo du slider (copiés des dossiers fournis)
Images_Slider_Association/      Images d'origine
Icons_Association/              Icônes d'origine
documentation_du_projet_web.md  Cahier des charges
```

## ✅ Ce qui est déjà en place

- **Navbar** fixe, menu mobile, changement de langue **FR / AR** (avec mise en page RTL).
- **Hero slider** 3 diapositives : photo marocaine de l'hôpital + icônes 3D (cardiologie, ophtalmologie), flèches, dots, lecture automatique.
- **Sections** : à propos, domaines d'action, parcours d'accompagnement, chiffres d'impact, actualités, appel aux dons, contact + carte, footer.
- **Fonctionnel** : modales Connexion / Inscription / Don, validation des formulaires, notifications (toast), sélection du montant du don, compteurs animés, animations au scroll.
- **Design** conforme à la charte : bleu confiance, turquoise santé, corail action ; polices Poppins & Tajawal ; entièrement responsive.

## 🔧 Prochaines étapes (backend)

Le front est prêt à être branché sur la stack prévue dans la documentation :

- Node.js + Express + MongoDB Atlas
- JWT pour `/login` et `/inscription`
- Modèles `User`, `Demande`, `Donation`
- Déploiement : Static Site (front) + Web Service (API) sur Render

Les pages `/dashboard` et `/admin` sont à créer une fois l'authentification réelle en place.
