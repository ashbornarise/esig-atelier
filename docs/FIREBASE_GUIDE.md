# 🔥 Guide de Configuration Firebase - ESIG Atelier

Pour que l'application fonctionne à 100%, suivez ces étapes scrupuleusement.

## 1. Création du Projet
1. Allez sur la [Console Firebase](https://console.firebase.google.com/).
2. Cliquez sur **"Ajouter un projet"** et nommez-le `esig-atelier`.
3. Désactivez Google Analytics (pas nécessaire pour ce projet).
4. Cliquez sur **"Créer un projet"**.

## 2. Configuration de l'Application Web
1. Dans la console, cliquez sur l'icône Web `</>`.
2. Nommez l'app (ex: "ESIG Web").
3. Copiez l'objet `firebaseConfig`.
4. Ouvrez le fichier `app/js/config.js` dans votre code.
5. Remplacez la constante `FIREBASE_CONFIG` par vos valeurs :

```javascript
const FIREBASE_CONFIG = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "esig-atelier.firebaseapp.com",
    projectId: "esig-atelier",
    storageBucket: "esig-atelier.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};
```

## 3. Activation de l'Authentification
1. Dans le menu gauche, cliquez sur **Authentication**.
2. Cliquez sur **Commencer**.
3. Dans l'onglet **Sign-in method**, activez **Adresse e-mail/Mot de passe**.
4. Enregistrez.

## 4. Configuration de Firestore Database
1. Dans le menu gauche, cliquez sur **Firestore Database**.
2. Cliquez sur **Créer une base de données**.
3. Choisissez l'emplacement (ex: `eur3` pour l'Europe).
4. **IMPORTANT** : Choisissez **"Commencer en mode test"** pour le développement (ou configurez les règles de sécurité ci-dessous).

### Règles de Sécurité (Recommandées)
Allez dans l'onglet **Règles** de Firestore et collez ceci pour sécuriser votre app :

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Fonction helper pour vérifier si l'utilisateur est admin
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Règles pour les utilisateurs
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && (request.auth.uid == userId || isAdmin());
    }
    
    // Règles pour les TP, Machines, Stock
    match /{collection}/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && isAdmin();
    }
  }
}
```

## 5. Création du Compte Admin "Pré-installé"
Pour créer le premier compte administrateur sans effort :
1. Lancez votre site (ouvrez `login.html` dans le navigateur).
2. Changez l'URL pour aller sur `setup-admin.html`.
3. Cliquez sur **"Créer le compte Admin"**.
   - Email par défaut : `admin@esig.tg`
   - Mot de passe par défaut : `Esig2026`
4. Une fois créé, retournez sur `login.html` et connectez-vous.

## 6. Vérification
- Connectez-vous avec `admin@esig.tg`.
- Vous devriez être redirigé vers `admin.html`.
- Si vous voyez le Dashboard, tout fonctionne !

---
**Besoin d'aide ?** Vérifiez la console du navigateur (F12) pour les erreurs rouges.
