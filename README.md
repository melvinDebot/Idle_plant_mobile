# 🌱 Idle Plant Mobile

Bienvenue dans **Plant Growth Clicker Game**, une application mobile construite avec React Native ! Le but de ce jeu est de cultiver une plante en utilisant divers boosters et actions. Chaque mise à niveau aide votre plante à grandir et à produire plus d'oxygène !

---

## 🖼️ Aperçu de l'application



### Captures d'écran

| Écran Principal | Détails des Boosters | Mise à Niveau en Action |
| --------------- | -------------------- | ----------------------- |
|                 |                      |                         |

---

## 🚀 Installation

Suivez les étapes ci-dessous pour configurer et exécuter le projet en local.

### Prérequis

- **Node.js** (version recommandée : 16.x ou plus)
- **npm** ou **yarn** (dernier disponible)
- **React Native CLI**
- **Android Studio** (pour émulateur Android) ou **Xcode** (pour simulateur iOS)

### Étape 1 : Clôner le dépôt

```bash
git clone https://github.com/username/plant-growth-clicker.git
cd idle_plant_mobile
```

### Étape 2 : Installer les dépendances

Avec **npm** :

```bash
npm install
```

Ou avec **yarn** :

```bash
yarn install
```

### Étape 3 : Lancer l'application

#### Sur Android

1. Assurez-vous que l'émulateur Android est lancé (ou un appareil physique connecté via USB).
2. Exécutez :
   ```bash
   npx run android
   ```

#### Sur iOS

1. Ouvrez le fichier `ios/PlantGrowthClicker.xcworkspace` dans Xcode.
2. Exécutez l'application depuis Xcode ou tapez :
   ```bash
   npx run ios
   ```

### Étape 4 : Démarrer le serveur Metro

Si le serveur Metro ne se lance pas automatiquement, utilisez :

```bash
npx run start
```

---


## 🛠️ Linting

```bash
npm run lint
```

---

## Deploy on the store

### Install the latest EAS CLI

EAS CLI is the command-line app that you will use to interact with EAS services from your terminal. To install it, run the command:

```bash
  npm install -g eas-cli
```

### Log in to your Expo account
If you are already signed in to an Expo account using Expo CLI, you can skip the steps described in this section. If you are not, run the following command to log in:
```bash
  eas login
```

After you have confirmed that you have a Google Play Store or Apple App Store account and decided whether or not EAS CLI should handle app signing credentials, you can proceed with the following set of commands to build for the platform's store:
```bash
  eas build --platform all
```

### For Play Store
```bash
  eas build --platform android
```
### For App Store
```bash
  eas build --platform ios
```

---

## 🛠️ Fonctionnalités

- **Arrosage, pulvérisation et engrais** : Augmentez la production d'oxygène.
- **Pluie et Soleil** : Activez des boosts temporaires pour accélérer la croissance.
- **Mise à niveau des boosters** : Améliorez vos outils pour produire encore plus d'oxygène.
- **Progression à long terme** : Atteignez de nouveaux niveaux et débloquez des fonctionnalités avancées.

---

## 📁 Structure des fichiers

Voici un aperçu de la structure principale du projet :

```plaintext
src/
├── assets/                # Images, icônes et animations
│   ├── animation/         # Fichiers d'animation Lottie
│   └── images/            # Images et icônes
├── components/            # Composants réutilisables (OxygenCounter, BoosterCard, etc.)
├── context/               # Contexte pour les données utilisateur
├── screens/               # Écrans principaux (PlantGrowthScreen)
├── styles/                # Fichiers de styles centralisés
├── utils/                 # Fonctions utilitaires
└── App.tsx                # Point d'entrée principal de l'application
```

---

## 🛡️ Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer :

1. Forkez ce dépôt.
2. Créez une branche de fonctionnalité : `git checkout -b nouvelle-fonctionnalite`.
3. Faites vos modifications et committez : `git commit -m "Ajout d'une nouvelle fonctionnalité"`.
4. Envoyez une pull request.

---

## 📜 Licence

Ce projet est sous licence **MIT**. Consultez le fichier [LICENSE](./LICENSE) pour plus de détails.

---

## 📞 Support

Pour toute question ou problème, n'hésitez pas à créer une [issue](https://github.com/username/plant-growth-clicker/issues) ou à contacter l'équipe à l'adresse : [support@plantclicker.com](mailto\:support@plantclicker.com).

---

Merci d'avoir choisi **Plant Growth Clicker Game** ! 🌿 Happy clicking!

