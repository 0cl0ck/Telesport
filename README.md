# Olympic Games Data Visualization

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Fonctionnalités

- Affichage d'un graphique montrant le nombre total de médailles par pays
- Vue détaillée pour chaque pays montrant les performances aux JO au fil du temps
- Design responsive pour s'adapter à différentes tailles d'écran

## Prérequis

- Node.js (version 14 ou supérieure)
- Angular CLI (version 18.0.3)

## Installation

1. Clonez ce dépôt
2. Naviguez dans le dossier du projet
3. Exécutez `npm install` pour installer les dépendances

## Serveur de développement

Exécutez `ng serve` pour démarrer un serveur de développement. Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source.

## Construction

Exécutez `ng build` pour construire le projet. Les artefacts de construction seront stockés dans le répertoire `dist/`.

## Structure du projet

L'architecture prédéfinie inclut (en plus de l'architecture Angular par défaut) :

- `components` : contient les composants réutilisables
- `pages` : contient les composants utilisés pour le routage
- `core` : contient la logique métier (`services` et `models`)

## Par où commencer

1. Familiarisez-vous avec le code de démarrage, en portant une attention particulière aux fichiers `app-routing.module.ts` et `olympic.service.ts`.
2. Examinez les interfaces TypeScript dans le dossier `models`. Trois fichiers ont déjà été créés, correspondant aux données incluses dans `olympic.json`.
3. Implémentez des fonctionnalités en vous basant sur la structure existante du projet.

Ce projet est prêt pour le développement des fonctionnalités.

Bonne chance !

## Tests

Exécutez `ng test` pour lancer les tests unitaires via Karma.
