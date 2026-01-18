# 🚀 GUIDE COMPLET DE DÉPLOIEMENT - ESIG Atelier 2.0

## 📋 TABLE DES MATIÈRES
1. [Prérequis](#prérequis)
2. [Configuration Firebase](#configuration-firebase)
3. [Déployer sur GitHub Pages](#déployer-sur-github-pages)
4. [Tester les données](#tester-les-données)
5. [Gestion de la sécurité](#gestion-de-la-sécurité)
6. [Dépannage](#dépannage)

---

## ✅ PRÉREQUIS

Vous aurez besoin de :
- Un compte **Google** (pour Firebase)
- Un compte **GitHub** (pour Pages)
- Git installé sur votre ordinateur
- Un navigateur web moderne

---

## 🔥 CONFIGURATION FIREBASE

### **ÉTAPE 1 : Créer un projet Firebase**

1. Allez sur [https://console.firebase.google.com](https://console.firebase.google.com)
2. Cliquez sur **"Ajouter un projet"**
3. Nommez le projet : `esig-atelier`
4. Acceptez les termes et créez le projet
5. Attendez 1-2 minutes

### **ÉTAPE 2 : Activer l'authentification**

1. Dans le menu de gauche, allez dans **"Authentification"**
2. Cliquez sur **"Démarrer"**
3. Activez le **Email/Password** :
   - Cliquez sur "Email/Mot de passe"
   - Activez les deux options
   - Cliquez "Enregistrer"
4. Allez dans l'onglet **"Utilisateurs"** et créez un compte admin :
   - Email : `admin@esig.tg`
   - Mot de passe : `password` (à changer après)

### **ÉTAPE 3 : Créer la base de données Firestore**

1. Dans le menu, allez dans **"Firestore Database"**
2. Cliquez **"Créer une base de données"**
3. Sélectionnez **"Mode test"** (pour commencer)
4. Région : **`europe-west1`** (ou votre région)
5. Créez la base

### **ÉTAPE 4 : Obtenir vos identifiants Firebase**

1. Allez dans **"Paramètres du projet"** (roue cog en haut à gauche)
2. Cliquez sur **"Vos applications"**
3. Cliquez sur **Web** ou créez une nouvelle application
4. Copiez la configuration Firebase :

```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIza...",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-projet-id",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "...",
    appId: "..."
};
```

### **ÉTAPE 5 : Ajouter les règles de sécurité Firestore**

1. Dans **Firestore**, onglet **"Règles"**
2. Remplacez le contenu par ceci :

```firestore
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Utilisateurs - lecture seule par le propriétaire
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid || 
                           (request.auth != null && 
                            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // TP - lecture/écriture pour créateur, lecture pour tous
    match /tp/{docId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.createdBy || 
                               (request.auth != null && 
                                get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Machines - lecture pour tous, write pour admin
    match /machines/{docId} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth != null && 
                                        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Stocks - lecture pour tous, write pour admin
    match /stocks/{docId} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth != null && 
                                        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Maintenance - lecture pour tous, write pour admin
    match /maintenance/{docId} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth != null && 
                                        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

3. Cliquez **"Publier"**

---

## 📦 DÉPLOYER SUR GITHUB PAGES

### **ÉTAPE 1 : Mettre à jour firebase-config.js**

Ouvrez `firebase-config.js` et remplacez les valeurs :

```javascript
const FIREBASE_CONFIG = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-projet-id",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "VOTRE_MESSAGING_ID",
    appId: "VOTRE_APP_ID"
};
```

### **ÉTAPE 2 : Mettre à jour les références HTML**

Dans votre `index.html` ou créer une nouvelle page d'accueil, assurez-vous que :

```html
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>
<script src="firebase-config.js"></script>
```

### **ÉTAPE 3 : Ajouter à GitHub**

```bash
# Aller dans votre dossier du projet
cd "c:\Users\Clement AGBALENYO\Documents\GitHub\esig-atelier"

# Initialiser git si nécessaire
git init

# Ajouter les fichiers
git add .

# Commit
git commit -m "feat: Add Firebase backend and new UI"

# Push
git push origin main
```

### **ÉTAPE 4 : Activer GitHub Pages**

1. Allez dans votre repo GitHub
2. **Settings** → **Pages**
3. Sous "Branch", sélectionnez **`main`** et **/root**
4. Cliquez **Save**
5. Attendez 1-2 minutes
6. Votre site est disponible à : `https://votreusername.github.io/esig-atelier`

---

## 🧪 TESTER LES DONNÉES

### **TEST 1 : Vérifier la connexion Firebase**

1. Ouvrez la page **login-new.html** dans votre navigateur
2. Ouvrez la console (F12)
3. Vous devez voir : `✅ Firebase Config Loaded`

### **TEST 2 : Inscription utilisateur**

1. Cliquez sur **"Inscription"**
2. Remplissez le formulaire :
   - Email : `test@esig.tg`
   - Mot de passe : `password123`
   - Prénom : `Jean`
   - Nom : `Dupont`
   - Niveau : `L2`
3. Cliquez "S'inscrire"
4. Allez dans **Firebase Console** → **Authentification** → **Utilisateurs**
5. Vous devez voir l'utilisateur créé ✅

### **TEST 3 : Vérifier les données Firestore**

1. Dans **Firebase Console**, allez dans **Firestore Database**
2. Cliquez sur **"Ajouter une collection"**
3. Nommez-la `users`
4. Ajoutez un document :
   ```
   uid: "test@esig.tg"
   email: "test@esig.tg"
   nom: "Dupont"
   prenom: "Jean"
   role: "etudiant"
   ```

### **TEST 4 : Créer un TP**

1. Connectez-vous avec le nouvel utilisateur
2. Allez dans **Accueil** → **Créer un TP**
3. Remplissez le formulaire
4. Cliquez **"Enregistrer le TP"**
5. Allez dans **Firebase Console** → **Firestore** → **tp collection**
6. Vous devez voir le TP créé ✅

### **TEST 5 : Admin crée des données**

1. Connectez-vous avec `admin@esig.tg` / `password`
2. Accédez à **admin-new.html**
3. Allez dans **Machines** → **Ajouter une machine**
4. Ajoutez une machine :
   - Nom : `Tour CNC-01`
   - Type : `Tournage`
   - Lieu : `Salle A`
5. Cliquez **Enregistrer**
6. Vérifiez dans **Firestore** que le document est créé ✅

### **TEST 6 : Vérifier la persistance**

1. Créez un TP
2. Rafraîchissez la page
3. Allez dans **Mes TP**
4. Le TP doit toujours être là ✅ (les données ne disparaissent pas comme avec localStorage)

---

## 🔒 GESTION DE LA SÉCURITÉ

### **IMPORTANT : Activer la sécurité en production**

#### **Activer Google Sign-in (optionnel)**

Dans **Authentification** → **Fournisseurs** :
1. Cliquez sur **Google**
2. Activez-le
3. Configurez le formulaire de consentement

#### **Limiter l'accès Firebase**

Dans **Paramètres du projet** → **Restrictions d'API** :

1. Activez **Application restrictions**
2. Sélectionnez **HTTP referrers (web sites)**
3. Ajoutez votre domaine GitHub Pages

#### **Règles Firestore strictes**

En production, changez le "Mode test" en "Mode sécurisé" et utilisez les règles ci-dessus.

---

## 🐛 DÉPANNAGE

### **Problème : "Erreur d'authentification Firebase"**

**Solution :**
1. Vérifiez que vous avez copié **exactement** les identifiants Firebase
2. Vérifiez que **Email/Password** est activé dans Authentification
3. Vérifiez que l'utilisateur existe dans Firebase Console

### **Problème : "Les données ne s'enregistrent pas"**

**Solution :**
1. Ouvrez la console (F12) et cherchez les erreurs
2. Vérifiez que **Firestore est créée**
3. Vérifiez que les **règles Firestore** permettent la lecture/écriture
4. Testez directement dans Firebase Console

### **Problème : "Admin ne voit pas les données"**

**Solution :**
1. Vérifiez que l'utilisateur a le rôle `admin` dans Firestore
2. Allez dans **users/{uid}** et mettez à jour : `role: "admin"`
3. Reconnectez-vous

### **Problème : "GitHub Pages affiche une page blanche"**

**Solution :**
1. Vérifiez que les fichiers sont bien dans le bon répertoire
2. Attendez 2-3 minutes après le push
3. Videz le cache du navigateur (Ctrl+Shift+Delete)
4. Vérifiez les Settings → Pages → Branch

---

## 📊 STRUCTURE DE DONNÉES FIREBASE

### **Collection : users**
```
{
  uid: string (clé)
  email: string
  nom: string
  prenom: string
  role: string (etudiant|admin|enseignant|technicien)
  niveau: string (L1|L2|L3|M1|M2)
  groupe: string
  dateCreation: timestamp
  actif: boolean
}
```

### **Collection : tp**
```
{
  titre: string
  type: string
  dateDebut: timestamp
  duree: number
  createdBy: string (uid)
  statut: string (planifie|en_cours|termine)
  description: string
  dateCreation: timestamp
}
```

### **Collection : machines**
```
{
  nom: string
  type: string
  statut: string (disponible|occupee|maintenance)
  lieu: string
  dateCreation: timestamp
}
```

---

## ✅ CHECKLIST FINAL

- [ ] Firebase configuré avec Auth et Firestore
- [ ] identifiants Firebase dans `firebase-config.js`
- [ ] Fichiers déployés sur GitHub
- [ ] GitHub Pages activé
- [ ] Utilisateur admin créé
- [ ] Test d'inscription fonctionnel
- [ ] Test de création TP fonctionnel
- [ ] Admin accès fonctionnel
- [ ] Données visibles dans Firestore
- [ ] Règles de sécurité activées

---

## 💡 PROCHAINES ÉTAPES

1. **Personnaliser les données** : Ajoutez vos machines, stocks, etc.
2. **Mettre à jour les infos** : Changez le nom de l'établissement dans le header
3. **Ajouter des utilisateurs** : Créez des comptes pour les étudiants
4. **Configurer les règles** : Affinez les permissions selon vos besoins
5. **Sauvegarder** : Activez les sauvegardes automatiques

---

**Besoin d'aide ? Vérifiez la console (F12) pour les messages d'erreur détaillés.**
