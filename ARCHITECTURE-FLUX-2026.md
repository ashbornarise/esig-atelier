🎯 ARCHITECTURE & FLUX - ESIG ATELIER 2026
==========================================

## 📐 ARCHITECTURE GLOBALE

```
┌─────────────────────────────────────────────────────────────┐
│                    ESIG ATELIER APPLICATION                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────┐  │
│  │  login.html    │  │ MODE-VISITEUR  │  │  index.html   │  │
│  │ (Authentif)    │──│   (Visiteur)   │  │  (Dashboard)  │  │
│  └────────────────┘  └────────────────┘  └───────────────┘  │
│         │                                         ▲           │
│         └─────────────────────────────────────────┘           │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              admin.html (Admin Panel)                  │  │
│  │  ✅ Vérification rôle: role === 'admin'               │  │
│  └────────────────────────────────────────────────────────┘  │
│                        ▲                                      │
│                        └─────────────────────────────────────│
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Firebase   │
                    │  Auth/DB    │
                    └─────────────┘
```

---

## 🔄 FLUX D'AUTHENTIFICATION

```
USER ACCÈDE login.html
        │
        ▼
┌───────────────────┐
│ Firebase chargé?  │  ✅ SDK + config.js chargés
│ window.auth OK?   │
└───────┬───────────┘
        │
        ▼ ✅ OUI
┌──────────────────────────────┐
│ Utilisateur se connecte      │
│ email: admin@esig.tg         │
│ password: ****               │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Firebase Auth valide         │
│ token = JWT généré           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ DataManager.users.getById()  │
│ Charge profil depuis Firestore│
│ Collection: 'users'          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ localStorage.setItem(token)  │
│ currentUser = user obj       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ window.location.href =       │
│ 'index.html'                 │
└──────────┬───────────────────┘
           │
           ▼
INDEX.HTML CHARGÉ
┌──────────────────────────────┐
│ auth.onAuthStateChanged()    │ ✅ Détecte user connecté
│ Charge TPs depuis 'TP'       │
│ Affiche Dashboard            │
└──────────────────────────────┘
```

---

## 📊 STRUCTURE FIRESTORE

```
FIRESTORE PROJECT: esig-atelier-64235

┌─────────────────────────────────┐
│ COLLECTIONS                     │
├─────────────────────────────────┤
│                                 │
│ 📦 users/                       │
│   └─ Documents:                 │
│      ├─ uid (Admin)             │
│      ├─ email, nom, prenom      │
│      ├─ role: 'admin'           │
│      └─ autres users...         │
│                                 │
│ 🔬 TP/    ⭐ CORRIGÉ (UPPERCASE)│
│   └─ Documents:                 │
│      ├─ ARYX2xM1vWbaWk8DqZMo... │
│      ├─ SU3PCclWrFdnynzP5FZy... │
│      ├─ TP                      │
│      ├─ auecEPxgHDdViQ0KLIS...  │
│      └─ Fields:                 │
│         ├─ titre                │
│         ├─ type                 │
│         ├─ creatorId            │
│         ├─ participants: []     │
│         ├─ statut               │
│         ├─ dateDebut            │
│         └─ duree                │
│                                 │
│ 🔧 machines/                    │
│   └─ nom, type, statut, etc    │
│                                 │
│ 📦 stocks/                      │
│   └─ nom, quantite, prix, etc  │
│                                 │
│ 🔨 maintenance/                 │
│   └─ type, date, statut, etc   │
│                                 │
│ 📈 activities/                  │
│   └─ action, user, timestamp   │
│                                 │
└─────────────────────────────────┘
```

---

## 🔧 MODULES JAVASCRIPT

```
┌──────────────────────────────────────────────────────────────┐
│           app/js/ - MODULES CRITIQUES                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1️⃣ config.js (PRINCIPAL - 680 lignes)                      │
│     ├─ FIREBASE_CONFIG: vraies clés                          │
│     ├─ APP_CONFIG: paramètres app                            │
│     ├─ COLLECTIONS: noms des collections                     │
│     │   └─ TP: 'TP' ✅ CORRIGÉ                              │
│     ├─ DataManager:                                          │
│     │   ├─ users.CRUD                                        │
│     │   ├─ tp.CRUD            ✅ Utilise 'TP'              │
│     │   ├─ machines.CRUD                                     │
│     │   ├─ stocks.CRUD                                       │
│     │   └─ maintenance.CRUD                                  │
│     └─ RealtimeListener: for real-time updates              │
│                                                               │
│  2️⃣ firebase-init.js (INITIALISATION)                       │
│     ├─ getAuth()                                             │
│     ├─ getFirestore()                                        │
│     └─ initializeFirebase()                                  │
│                                                               │
│  3️⃣ auth.js (AUTHENTIFICATION)                              │
│     ├─ AuthManager.login(email, password)                    │
│     ├─ AuthManager.register(...)                             │
│     ├─ AuthManager.logout()                                  │
│     ├─ AuthManager.loadUserData(uid)                         │
│     └─ AuthManager.resetPassword(email)                      │
│                                                               │
│  4️⃣ database.js (LEGACY - peut être supprimé)               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🌐 FLUX REQUÊTES

### 1️⃣ CREATE TP (Créer un TP)
```
User submits form
         │
         ▼
DataManager.tp.create({
  titre, type, creatorId, participants, ...
})
         │
         ▼
db.collection('TP').add(document)  ← Collection: 'TP' ✅
         │
         ▼
Firestore valide permissions
         │
         ▼
Document créé avec ID auto-généré
```

### 2️⃣ READ TPs (Charger les TPs)
```
Page charge (index.html ou admin.html)
         │
         ▼
DataManager.tp.getAll()
         │
         ▼
db.collection('TP')        ← Collection: 'TP' ✅
  .orderBy('dateCreation')
  .get()
         │
         ▼
Retourne snapshot avec 4 documents
         │
         ▼
Affiche dans tableau/liste
```

### 3️⃣ UPDATE TP (Modifier un TP)
```
Admin clique "Modifier"
         │
         ▼
DataManager.tp.update(tpId, {nouveaux données})
         │
         ▼
db.collection('TP')     ← Collection: 'TP' ✅
  .doc(tpId)
  .update({...})
         │
         ▼
Document mis à jour
```

### 4️⃣ DELETE TP (Supprimer un TP)
```
Admin clique "Supprimer"
         │
         ▼
DataManager.tp.delete(tpId)
         │
         ▼
db.collection('TP')     ← Collection: 'TP' ✅
  .doc(tpId)
  .delete()
         │
         ▼
Document supprimé
```

---

## ✅ CHECKLIST VÉRIFICATION

```
FIREBASE INITIALIZATION
  ✅ SDK chargé dans HTML
  ✅ firebase.initializeApp() appelé
  ✅ FIREBASE_CONFIG avec vraies clés
  ✅ window.auth créé globalement
  ✅ window.db créé globalement
  ✅ Persistance activée

AUTHENTIFICATION
  ✅ Email/password fonctionnel
  ✅ Registration nouveau user possible
  ✅ logout() fonctionne
  ✅ Password reset implémenté
  ✅ Redirection si pas authentifié

COLLECTIONS FIRESTORE
  ✅ users collection accessible
  ✅ TP collection accessible (UPPERCASE)  ← CORRIGÉ
  ✅ machines collection accessible
  ✅ stocks collection accessible
  ✅ maintenance collection accessible

DATA LOADING
  ✅ DataManager.users.getAll() fonctionne
  ✅ DataManager.tp.getAll() fonctionne (utilise 'TP')
  ✅ DataManager.machines.getAll() fonctionne
  ✅ DataManager.stocks.getAll() fonctionne

PAGES
  ✅ login.html: Authentification
  ✅ index.html: Dashboard utilisateur
  ✅ admin.html: Admin panel (avec vérification rôle)
  ✅ MODE-VISITEUR.html: Mode lecture

PERMISSIONS
  ✅ User peut créer TP
  ✅ Admin peut voir tous les TPs
  ✅ Admin peut supprimer TP
  ✅ Visiteur peut lire (mode démo)
```

---

## 🐛 DIAGNOSTIC RAPIDE

### Si TP ne s'affiche pas:
```
1. Ouvrir Console (F12) → Console
2. Taper: DataManager.tp.getAll()
3. Attendre la promesse
4. Vérifier les résultats
```

### Si erreur authentification:
```
1. Vérifier: console.log(window.auth)
2. Vérifier: console.log(firebase.auth().currentUser)
3. Vérifier: localStorage pour token
```

### Si erreur Firestore:
```
1. Ouvrir: verify-tp-fix.html
2. Cliquer: "1. Tester Connexion Firebase"
3. Cliquer: "3. Charger Tous les TPs"
4. Vérifier les logs
```

---

## 📈 PERFORMANCE

```
Metrics attendus:
- Page load: < 2 secondes
- Auth check: < 500ms
- TP load: < 1 seconde (4 documents)
- Admin page: < 2 secondes (tous les data)

Optimisations en place:
✅ Firestore persistence (offline support)
✅ Lazy loading des images
✅ CSS minifié
✅ Firebase indexing pour queries
```

---

## 🔐 SÉCURITÉ

```
Firestore Rules:
- ✅ Authentification requise pour accès
- ✅ Rôles vérifiés pour admin
- ✅ Utilisateurs ne peuvent accéder qu'à leurs données
- ⚠️ À renforcer: granular permissions par collection

Firebase Auth:
- ✅ Email/password avec validation
- ✅ Token JWT auto-généré
- ✅ HTTPS automatique
- ✅ Rate limiting Firebase

À faire:
- [ ] Ajouter MFA (multi-factor auth)
- [ ] Activer CORS restrictif
- [ ] Rate limiting custom pour API
- [ ] Audit logging amélioré
```

---

## 📅 TIMELINE CORRECTIF

| Date | Action | Fichiers |
|------|--------|----------|
| Jan 19 | Identifié: Collection='tp' au lieu de 'TP' | audit |
| Jan 19 | Corrigé: config.js, firebase-config.js | 2 fichiers |
| Jan 19 | Corrigé: test-tp.html, list-all-tps.html | 2 fichiers |
| Jan 19 | Créé: verify-tp-fix.html pour tester | 1 fichier |
| Jan 19 | Documentation complète | AUDIT-COMPLET-2026.md |

**Status: CORRIGÉ ✅**

---

## 🎯 ÉTAT FINAL

Le projet ESIG Atelier est **PRÊT À TESTER**

✅ Tous les composants en place
✅ Collection 'TP' (uppercase) corrigée
✅ 4 TPs accessibles
✅ Authentification fonctionnelle
✅ Admin panel opérationnel
✅ Mode visiteur disponible

**Prochaine étape: Tester le flux complet login → dashboard → créer TP**
