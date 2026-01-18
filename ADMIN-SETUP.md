# 🔑 Configuration Admin - ESIG Atelier

## Setup Initial (À Faire UNE SEULE FOIS)

### Étape 1: Créer le Compte Admin

1. **Accédez à:** `setup-admin.html`
2. **Cliquez:** "Créer le compte Admin"
3. **Attendez:** Le message de confirmation ✅

Le compte admin sera créé avec:
- **Email:** `admin@esig.tg`
- **Mot de passe:** `Esig2026`

### Étape 2: Se Connecter en Tant qu'Admin

1. **Allez à:** `login.html`
2. **Onglet:** "Connexion"
3. **Identifiants:**
   ```
   Email:       admin@esig.tg
   Mot de passe: Esig2026
   ```
4. **Cliquez:** "Se connecter"
5. **Résultat:** Redirect automatique vers `admin.html`

---

## ✅ Important

### Inscription (Pour les Utilisateurs Normaux)

- ✅ Étudiant
- ✅ Professeur  
- ✅ Technicien
- ❌ **Admin SUPPRIMÉ** (pas dans le dropdown)

**Les gens ne peuvent plus créer des comptes admin!**

### Connexion (Pour Tous)

- Tout le monde peut se connecter avec son compte
- L'admin se connecte avec `admin@esig.tg`

---

## 🎯 Flux

```
PREMIER DÉMARRAGE:
1. setup-admin.html → Créer compte admin
2. login.html → Se connecter (admin@esig.tg / Esig2026)
3. admin.html → Panneau admin

UTILISATEUR NORMAL:
1. login.html → Onglet "Inscription"
2. S'inscrire (Étudiant/Prof/Technicien)
3. index.html → Dashboard
```

---

## ⚙️ Détails Techniques

### Fichiers Modifiés:
- **login.html** - Removed "Admin" option from registration dropdown
- **setup-admin.html** - New admin account creation page

### Processus de Création:
1. Check if admin account already exists
2. Create Firebase Auth user (admin@esig.tg)
3. Create Firestore document with role="admin"
4. Sign out and redirect to login

### Sécurité:
- Admin account pré-défini
- Pas de création admin par inscription
- Only one admin account possible

---

## 🔄 Si Vous Oubliez le Mot de Passe Admin

1. Allez à `login.html`
2. Onglet "Connexion"
3. Cliquez "Mot de passe oublié?"
4. Entrez: `admin@esig.tg`
5. Vérifiez votre email

---

## 📌 Rappel

Le compte admin **doit être créé une fois** via `setup-admin.html` avant de pouvoir se connecter!

