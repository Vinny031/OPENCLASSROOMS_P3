# OPENCLASSROOMS_P3

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Description du projet

OPENCLASSROOMS_P3 est une application web conçue pour gérer des œuvres d'art et des utilisateurs. Ce projet est structuré en deux parties principales : un backend construit avec Node.js et Express, et un frontend utilisant HTML, CSS et JavaScript. L'application permet aux utilisateurs de se connecter, de visualiser des œuvres, de les ajouter, de les modifier et de les supprimer.

### Fonctionnalités clés

- Gestion des utilisateurs (inscription, connexion)
- Gestion des œuvres d'art (ajout, modification, suppression)
- Interface utilisateur réactive et conviviale
- Utilisation d'une base de données SQLite pour le stockage des données

## Tech Stack

| Technologie       | Description                                   |
|-------------------|-----------------------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Environnement d'exécution JavaScript côté serveur. |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Framework web pour Node.js.                     |
| ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white) | Base de données relationnelle légère.            |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Langage de programmation utilisé pour le développement. |

## Instructions d'installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (généralement inclus avec Node.js)
- SQLite

### Guide d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Vinny031/OPENCLASSROOMS_P3.git
   cd OPENCLASSROOMS_P3
   ```

2. Installez les dépendances :
   ```bash
   cd Backend
   npm install
   ```

3. Configurez votre environnement :
   - Créez un fichier `.env` à la racine du dossier `Backend` et ajoutez les variables d'environnement nécessaires (voir `Backend/.env` pour les exemples).

4. Démarrez le serveur :
   ```bash
   node server.js
   ```

5. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Utilisation

Après avoir démarré le serveur, vous pouvez interagir avec l'API via des requêtes HTTP. Voici quelques exemples d'utilisation :

- **Inscription d'un nouvel utilisateur** : Envoyez une requête POST à `/api/auth/signup` avec les données utilisateur.
- **Connexion d'un utilisateur** : Envoyez une requête POST à `/api/auth/login` avec les informations d'identification.
- **Gestion des œuvres** : Utilisez les routes définies dans `routes/works.routes.js` pour créer, lire, mettre à jour ou supprimer des œuvres.

## Structure du projet

Voici un aperçu de la structure du projet :

```
OPENCLASSROOMS_P3/
├── Backend/
│   ├── config/                     # Configuration de la base de données
│   │   └── db.config.js            # Fichier de configuration de la base de données
│   ├── controllers/                # Contrôleurs pour gérer la logique métier
│   │   ├── categories.controller.js # Logique pour les catégories
│   │   ├── users.controller.js      # Logique pour les utilisateurs
│   │   └── works.controller.js      # Logique pour les œuvres
│   ├── middlewares/                 # Middleware pour la gestion des requêtes
│   │   ├── auth.js                  # Middleware d'authentification
│   │   ├── checkWork.js             # Middleware pour vérifier les œuvres
│   │   └── multer-config.js         # Configuration pour le téléchargement de fichiers
│   ├── models/                      # Modèles de données
│   │   ├── categories.model.js      # Modèle de catégorie
│   │   ├── users.model.js           # Modèle d'utilisateur
│   │   └── works.model.js           # Modèle d'œuvre
│   ├── routes/                      # Routes de l'application
│   │   ├── categories.routes.js     # Routes pour les catégories
│   │   ├── user.routes.js           # Routes pour les utilisateurs
│   │   └── works.routes.js          # Routes pour les œuvres
│   ├── .env                         # Variables d'environnement
│   ├── app.js                       # Point d'entrée de l'application
│   ├── database.sqlite              # Base de données SQLite
│   ├── package.json                 # Dépendances du projet
│   └── server.js                    # Fichier de démarrage du serveur
└── FrontEnd/                        # Dossier du frontend
    ├── assets/                      # Ressources statiques
    │   ├── CSS/                     # Fichiers CSS
    │   ├── icons/                   # Icônes utilisées dans l'application
    │   └── images/                  # Images utilisées dans l'application
    ├── js/                          # Scripts JavaScript
    ├── index.html                   # Page d'accueil
    └── login.html                   # Page de connexion
```

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/nouvelle-fonctionnalité`).
3. Apportez vos modifications et validez (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez vos modifications (`git push origin feature/nouvelle-fonctionnalité`).
5. Ouvrez une Pull Request.

