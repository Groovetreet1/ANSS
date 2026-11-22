# 🏥 Documentation du Projet : Association Nationale de Santé et Solidarité (ANSS)

## 📖 1. Présentation du Projet

Ce projet consiste à développer une plateforme web complète pour l'**Association Nationale de Santé et Solidarité**. Le site a pour but de présenter les missions de l'association (prévention, soins cardio-visuels, accompagnement social), de récolter des dons, et d'offrir un espace membre pour les patients, les bénévoles et les médecins.

## 🛠 2. Stack Technique Recommandée (Optimisée pour GitHub & Render)

Pour un déploiement fluide et gratuit/peu coûteux sur **Render**, voici la stack idéale :

* **Frontend (Interface Utilisateur) :** React.js (ou HTML/CSS/JS natif pour commencer) avec Tailwind CSS pour un design moderne et responsive.
* **Backend (Serveur & API) :** Node.js avec Express.js.
* **Base de données :** MongoDB (via MongoDB Atlas, parfait pour le cloud).
* **Authentification :** JSON Web Tokens (JWT) ou NextAuth.js pour la gestion sécurisée du `Login` et de l'`Inscription`.
* **Hébergement & CI/CD :**
  * Code source hébergé sur **GitHub**.
  * Déploiement automatisé sur **Render**.

## 🎨 3. Charte Graphique & Design (UI/UX)

Pour garantir une cohérence visuelle parfaite avec le logo 3D, les icônes et les photos du slider, le site adoptera la palette de couleurs suivante :

* 🔵 **Bleu Principal (Confiance, Sécurité, Médical) :** Utilisé pour la barre de navigation (Navbar), les textes de base et les boutons secondaires. *(Code Tailwind : `blue-800` ou `blue-600`)*
* 🟢 **Vert Turquoise (Santé, Prévention, Espoir) :** Utilisé pour les icônes, les badges de réussite, et les sections informatives. *(Code Tailwind : `teal-500` ou `teal-400`)*
* 🔴 **Rouge Corail (Cœur, Artères, Solidarité, Action) :** Utilisé pour les boutons d'appel à l'action cruciaux (Call to Action) comme **"Faire un don"** ou **"S'inscrire"**, pour attirer l'œil. *(Code Tailwind : `rose-500` ou `red-500`)*
* ⚪ **Fonds (Neutres) :** Blanc (`#FFFFFF`) et Gris très clair (`#F9FAFB`) pour garder un aspect "clinique", propre, et faire ressortir les images 3D et les photos réalistes.

**Typographie (Fonts) :**
* *Français :* **Montserrat** ou **Poppins** (Moderne, lisible, rassurant).
* *Arabe :* **Tajawal** ou **Cairo** (Élégant, clair et professionnel).

## 🗺 4. Architecture de l'Application (Sitemap)

### 🔓 A. Pages Publiques (Visiteurs)
* **`/` (Accueil) :** Slider (images marocaines), présentation globale, boutons de don, actualités récentes, icônes des services.
* **`/a-propos` :** Histoire de l'association, vision, équipe médicale.
* **`/domaines-action` :** Cardiologie, Ophtalmologie, Actions sociales.
* **`/contact` :** Formulaire de contact, adresse, Google Maps.
* **`/faire-un-don` :** Formulaire de paiement sécurisé.

### 🔒 B. Système d'Authentification
* **`/inscription` :** Création de compte (Patient, Bénévole, ou Médecin).
* **`/login` :** Connexion sécurisée.

### 🛡 C. Espace Privé & Admin
* **`/dashboard` :** Tableau de bord pour les utilisateurs (historique médical, dons).
* **`/admin` :** Gestion des membres, validation des demandes d'aide.

## 🗄 5. Structure de la Base de Données (Modèles)

1. **User (Utilisateur) :** `id`, `nom`, `email`, `password_hash`, `role`.
2. **Demande (Assistance) :** `id`, `user_id`, `type_besoin` (Coeur/Yeux/Social), `statut`.
3. **Donation :** `id`, `user_id`, `montant`, `date`.

## 🚀 6. Workflow de Déploiement (GitHub ➔ Render)

1. Créer un dépôt sur **GitHub**.
2. Pousser le code : `git add .`, `git commit -m "Initial"`, `git push`.
3. Connecter Render à GitHub et déployer en tant que "Static Site" (Frontend) et "Web Service" (Backend).