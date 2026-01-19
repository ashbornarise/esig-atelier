# Guide Firebase Complet - ESIG Atelier

> Guide spécifique pour le projet ESIG Atelier - Mis à jour Janvier 2026

---

## Table des matières
1. [Configuration initiale](#1-configuration-initiale)
2. [Authentification](#2-authentification)
3. [Base de données Firestore](#3-base-de-données-firestore)
4. [Règles de sécurité](#4-règles-de-sécurité)
5. [Déploiement GitHub Pages](#5-déploiement-github-pages)
6. [Dépannage](#6-dépannage)
7. [Bonnes pratiques](#7-bonnes-pratiques)

---

## 1. Configuration initiale

### 1.1 Projet Firebase existant

Votre projet Firebase est déjà configuré :
- **Project ID** : `esig-atelier-64235`
- **Console** : https://console.firebase.google.com/project/esig-atelier-64235

### 1.2 Fichiers de configuration

La configuration Firebase se trouve dans `app/js/config.js` :

```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAea4DBzfIOs8vNqPu2e3lJKQLNq9wvgDI",
    authDomain: "esig-atelier-64235.firebaseapp.com",
    projectId: "esig-atelier-64235",
    storageBucket: "esig-atelier-64235.firebasestorage.app",
    messagingSenderId: "396237846057",
    appId: "1:396237846057:web:f79ebfc3fa80ab91564e38"
};
```

### 1.3 SDK Firebase utilisé

Le projet utilise la version **8.10.0** du SDK Firebase (compat mode) :
```html
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
```

---

## 2. Authentification

### 2.1 Activer l'authentification par email

1. Aller dans [Firebase Console](https://console.firebase.google.com/project/esig-atelier-64235/authentication)
2. Cliquer sur **Authentication** > **Sign-in method**
3. Activer **Email/Password**
4. Sauvegarder

### 2.2 Créer le premier administrateur

**Méthode 1 : Via l'interface (Recommandée)**
1. Ouvrir `create-admin.html` dans un navigateur
2. Remplir le formulaire avec les informations admin :
   - Email : `admin@esig.tg`
   - Mot de passe : `Esig2026` (minimum 6 caractères)
3. Le compte sera créé avec le rôle `admin`

**Méthode 2 : Via la console Firebase**
1. Aller dans Authentication > Users
2. Cliquer "Add user"
3. Entrer email et mot de passe
4. Noter l'UID généré
5. Aller dans Firestore > users
6. Créer un document avec l'UID comme ID :
```json
{
  "email": "admin@esig.tg",
  "nom": "Admin",
  "prenom": "ESIG",
  "role": "admin",
  "actif": true,
  "dateCreation": "2024-01-01T00:00:00.000Z"
}
```

### 2.3 Rôles disponibles

| Rôle | Description | Permissions |
|------|-------------|-------------|
| `etudiant` | Étudiant | Créer/modifier ses TP, voir machines/stock |
| `enseignant` | Professeur | Comme étudiant + superviser les TP |
| `technicien` | Technicien | Gérer machines, stock, maintenance |
| `admin` | Administrateur | Accès complet à tout |

---

## 3. Base de données Firestore

### 3.1 Créer la base de données

1. Aller dans Firebase Console > Firestore Database
2. Cliquer "Create database"
3. Choisir la localisation (ex: `eur3` pour Europe)
4. Choisir "Start in test mode" (on appliquera les règles après)

### 3.2 Structure des collections

```
esig-atelier-64235/
│
├── users/                    # Profils utilisateurs
│   └── {uid}/
│       ├── email: string
│       ├── nom: string
│       ├── prenom: string
│       ├── role: string      # 'etudiant'|'enseignant'|'technicien'|'admin'
│       ├── niveau: string    # L1, L2, L3, M1, M2
│       ├── groupe: string
│       ├── actif: boolean
│       ├── dateCreation: timestamp
│       └── derniereConnexion: timestamp
│
├── TP/                       # Travaux pratiques (MAJUSCULE!)
│   └── {tpId}/
│       ├── titre: string
│       ├── type: string      # usinage, tournage, fraisage, soudure...
│       ├── description: string
│       ├── dateDebut: timestamp
│       ├── duree: number     # en jours
│       ├── createdBy: string # uid du créateur
│       ├── creatorName: string
│       ├── membres: array    # liste des uid participants
│       ├── machinesUtilisees: array
│       ├── statut: string    # planifie, en_cours, termine
│       ├── remarques: string
│       └── dateCreation: timestamp
│
├── machines/                 # Équipements de l'atelier
│   └── {machineId}/
│       ├── nom: string
│       ├── type: string      # tour, fraiseuse, perceuse...
│       ├── statut: string    # disponible, occupee, maintenance, hors_service
│       ├── lieu: string      # emplacement dans l'atelier
│       ├── nombreHeuresUtilisation: number
│       ├── dateCreation: timestamp
│       └── dateModification: timestamp
│
├── stocks/                   # Inventaire matériel
│   └── {stockId}/
│       ├── nom: string
│       ├── categorie: string # outils, materiaux, consommables, epi, pieces
│       ├── quantite: number
│       ├── quantiteMinimale: number  # seuil d'alerte
│       ├── prix: number
│       ├── dateAjout: timestamp
│       └── dateModification: timestamp
│
├── maintenance/              # Tâches de maintenance
│   └── {maintenanceId}/
│       ├── machineId: string
│       ├── machineName: string
│       ├── type: string      # quotidienne, hebdomadaire, corrective...
│       ├── description: string
│       ├── datePrevu: timestamp
│       ├── dateRealisation: timestamp
│       ├── statut: string    # planifie, termine
│       ├── notes: string
│       ├── createdBy: string
│       └── dateCreation: timestamp
│
└── activities/               # Journal d'audit (admin seulement)
    └── {activityId}/
        ├── action: string    # create, update, delete, login...
        ├── userId: string
        ├── userName: string
        ├── type: string      # TP, machine, stock, user...
        ├── details: string
        └── timestamp: timestamp
```

### 3.3 Créer les index Firestore

Les requêtes avec `where` + `orderBy` nécessitent des index composites.

**Index requis :**

| Collection | Champ 1 | Champ 2 | Portée |
|------------|---------|---------|--------|
| `TP` | `createdBy` (Asc) | `dateDebut` (Desc) | Collection |
| `TP` | `createdBy` (Asc) | `dateCreation` (Desc) | Collection |
| `maintenance` | `datePrevu` (Asc) | - | Collection |
| `activities` | `timestamp` (Desc) | - | Collection |

**Pour créer un index :**
1. Aller dans Firebase Console > Firestore > Indexes
2. Cliquer "Create index"
3. Remplir les champs requis
4. Attendre que l'index soit "Enabled"

**Méthode alternative :** Exécuter l'application, et quand une erreur d'index apparaît dans la console, cliquer sur le lien fourni pour créer l'index automatiquement.

---

## 4. Règles de sécurité

### 4.1 Appliquer les règles

1. Aller dans Firebase Console > Firestore > Rules
2. Copier le contenu du fichier `FIRESTORE-RULES.txt` (à la racine du projet)
3. Coller dans l'éditeur de règles
4. Cliquer "Publish"

### 4.2 Résumé des permissions

| Collection | Lecture | Création | Modification | Suppression |
|------------|---------|----------|--------------|-------------|
| `users` | Auth | Auth (own) | Owner/Admin | Admin |
| `TP` | **Public** | Auth | Owner/Admin | Owner/Admin |
| `machines` | **Public** | Tech/Admin | Tech/Admin | Tech/Admin |
| `stocks` | **Public** | Tech/Admin | Tech/Admin | Tech/Admin |
| `maintenance` | Auth | Auth | Owner/Tech/Admin | Owner/Tech/Admin |
| `activities` | Admin | Auth | Admin | Admin |

**Note importante :** Les collections `TP`, `machines` et `stocks` sont lisibles publiquement pour permettre le **mode visiteur**.

### 4.3 Points critiques

1. **Collection TP en MAJUSCULE** : Le code utilise `db.collection('TP')`, donc les règles doivent matcher `/TP/{tpId}` (pas `/tp/`)

2. **Lecture publique** : `machines` et `stocks` sont lisibles sans authentification pour le mode visiteur

3. **Techniciens** : Peuvent gérer machines, stocks et maintenance

---

## 5. Déploiement GitHub Pages

### 5.1 Activer GitHub Pages

1. Aller dans votre repo GitHub > Settings > Pages
2. Source : "Deploy from a branch"
3. Branch : `main` (ou `master`)
4. Folder : `/ (root)`
5. Cliquer "Save"

### 5.2 URL de déploiement

Votre site sera accessible à :
```
https://[votre-username].github.io/esig-atelier/
```

Attendre 2-5 minutes pour le premier déploiement.

### 5.3 Configurer le domaine autorisé dans Firebase

**Très important pour que l'authentification fonctionne !**

1. Aller dans Firebase Console > Authentication > Settings
2. Onglet "Authorized domains"
3. Cliquer "Add domain"
4. Ajouter :
   - `[votre-username].github.io`
   - `localhost` (déjà présent normalement)

### 5.4 Vérifier le déploiement

1. Ouvrir l'URL GitHub Pages
2. La page de login doit s'afficher
3. Ouvrir la console (F12) et vérifier qu'il n'y a pas d'erreur Firebase

---

## 6. Dépannage

### 6.1 Erreur "Firebase not initialized"

**Symptôme** : `window.auth is undefined` ou `Cannot read properties of undefined`

**Causes et solutions** :
1. **Ordre de chargement incorrect** : Les scripts Firebase SDK doivent être chargés AVANT `config.js`
   ```html
   <!-- ORDRE CORRECT -->
   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
   <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
   <script src="app/js/config.js"></script>
   ```
2. **Configuration invalide** : Vérifier que `FIREBASE_CONFIG` contient les bonnes clés

### 6.2 Erreur "Missing or insufficient permissions"

**Symptôme** : Erreur lors de lecture/écriture dans Firestore

**Solutions** :
1. Vérifier que l'utilisateur est connecté (`auth.currentUser` non null)
2. Vérifier que les règles Firestore sont publiées
3. Vérifier le rôle de l'utilisateur dans la collection `users`
4. Pour le mode visiteur : vérifier que `allow read: if true;` est présent pour la collection

### 6.3 Les TP ne s'affichent pas

**Causes possibles** :
1. **Nom de collection incorrect** : Le code utilise `'TP'` (majuscule), vérifier que la collection s'appelle bien `TP`
2. **Index manquant** : Créer l'index composite requis (voir section 3.3)
3. **Collection vide** : Créer au moins un TP via l'interface admin

**Diagnostic console** :
```javascript
// Tester la lecture
db.collection('TP').get().then(snap => {
    console.log('Nombre de TP:', snap.size);
    snap.forEach(doc => console.log(doc.id, doc.data()));
}).catch(err => console.error('Erreur:', err));
```

### 6.4 Erreur lors de la connexion

**"auth/network-request-failed"** :
- Vérifier la connexion internet
- Vérifier que le domaine est autorisé dans Firebase Auth

**"auth/user-not-found"** :
- L'email n'existe pas, créer un compte d'abord

**"auth/wrong-password"** :
- Mot de passe incorrect

### 6.5 Le bouton Admin ne s'affiche pas

1. Vérifier que l'utilisateur a bien `role: 'admin'` dans Firestore
2. Ouvrir la console et vérifier les logs de `currentUserData`
3. Le bouton admin a `style="display:none"` par défaut et devient visible après vérification du rôle

### 6.6 Mode visiteur ne fonctionne pas

1. Vérifier que les règles Firestore autorisent la lecture publique pour `TP`, `machines`, `stocks`
2. Vérifier que le paramètre `?mode=visitor` est dans l'URL ou que `localStorage.getItem('visitorMode')` retourne `'true'`

---

## 7. Bonnes pratiques

### 7.1 Sécurité

- **Jamais** de données sensibles dans le code client (mots de passe, tokens secrets)
- **Toujours** valider les données côté serveur (règles Firestore)
- **Limiter** les permissions au strict nécessaire
- **Utiliser** HTTPS (GitHub Pages le force automatiquement)

### 7.2 Performance

- **Activer** la persistance offline :
  ```javascript
  db.enablePersistence().catch(err => console.warn(err));
  ```
- **Utiliser** `.limit()` pour les grandes collections
- **Préférer** les listeners temps réel (`onSnapshot`) aux requêtes répétées (`get`)

### 7.3 Structure des données

- **Éviter** les documents > 1 MB
- **Dénormaliser** si nécessaire (stocker `creatorName` en plus de `createdBy`)
- **Utiliser** des timestamps Firestore pour les dates

### 7.4 Quotas Firebase (Plan Gratuit Spark)

| Ressource | Limite gratuite |
|-----------|-----------------|
| Firestore reads | 50,000/jour |
| Firestore writes | 20,000/jour |
| Firestore deletes | 20,000/jour |
| Storage | 1 GB |
| Auth | Illimité |

---

## Checklist de déploiement

- [ ] Firebase Authentication activé (Email/Password)
- [ ] Premier compte admin créé
- [ ] Règles Firestore publiées (copier `FIRESTORE-RULES.txt`)
- [ ] Index Firestore créés
- [ ] Domaine GitHub Pages autorisé dans Firebase Auth
- [ ] Test connexion admin réussi
- [ ] Test création de TP réussi
- [ ] Test mode visiteur fonctionnel
- [ ] Test dashboard admin temps réel

---

## Contacts et ressources

- **Documentation Firebase** : https://firebase.google.com/docs
- **Console Firebase** : https://console.firebase.google.com/project/esig-atelier-64235
- **GitHub du projet** : Votre repository
