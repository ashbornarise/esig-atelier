# 🚀 DÉMARRAGE RAPIDE - APPLICATION ESIG ATELIER

## ⚡ Installation en 10 Minutes

### Étape 1 : Créer un compte GitHub (2 min)
1. Allez sur [github.com](https://github.com)
2. Cliquez "Sign up" et créez votre compte

### Étape 2 : Créer le repository (2 min)
1. Cliquez sur "+" → "New repository"
2. Nom : `esig-atelier`
3. Cochez "Public" + "Add README"
4. Cliquez "Create repository"

### Étape 3 : Télécharger les fichiers (3 min)
1. Dans votre repository : "Add file" → "Upload files"
2. Glissez-déposez TOUS les fichiers :
   - ✅ index.html
   - ✅ admin.html
   - ✅ manifest.json
   - ✅ sw.js
   - ✅ config.js
   - ✅ logo-esig.png
   - ✅ README.md
3. Cliquez "Commit changes"

### Étape 4 : Activer GitHub Pages (2 min)
1. Settings → Pages
2. Source : "main"
3. Save
4. Attendez 2 minutes ⏱️

### Étape 5 : Accédez à votre app ! (1 min)
```
https://votre-nom-utilisateur.github.io/esig-atelier/
```

## ✅ C'EST TOUT !

Votre application est en ligne ! 🎉

---

## 🔑 Connexion Admin

Pour accéder au panneau d'administration :

**URL** : `votre-url/admin.html`

**Identifiants par défaut** :
- Utilisateur : `admin`
- Mot de passe : `esig2025`

⚠️ **IMPORTANT** : Changez le mot de passe après la première connexion !

---

## 📊 Configuration Google Sheets (Optionnelle)

### Création rapide (5 min)

1. **Créer le Sheet**
   - Allez sur [sheets.google.com](https://sheets.google.com)
   - Nouveau tableur → "ESIG - Données Atelier"

2. **Créer 5 onglets**
   - TP
   - Machines
   - Stock
   - Maintenance
   - Utilisateurs

3. **Obtenir l'ID**
   - Dans l'URL : `https://docs.google.com/spreadsheets/d/[VOTRE_ID]/edit`
   - Copiez l'ID

4. **Configurer dans l'app**
   - Admin → Paramètres
   - Collez l'ID
   - Enregistrer

### En-têtes des colonnes

**TP** :
```
ID | Date | Heure Début | Heure Fin | Machine | Type TP | Membres | EPI | Description | État | Timestamp
```

**Machines** :
```
ID | Nom | Référence | Puissance | Statut | Heures Utilisation | Dernière Maintenance
```

**Stock** :
```
ID | Article | Minimum | Actuel | Catégorie | Urgent | Dernière MAJ
```

**Maintenance** :
```
ID | Machine | Date Prévue | Type | Responsable | Description | Statut | Date Effective
```

**Utilisateurs** :
```
ID | Nom | Email | Niveau | Dernière Connexion | Role
```

---

## 📱 Installation Mobile

### Sur Android
1. Ouvrir l'app dans Chrome
2. Menu (⋮) → "Installer l'application"
3. ✅ App installée !

### Sur iOS
1. Ouvrir dans Safari
2. Partage (📤) → "Sur l'écran d'accueil"
3. ✅ App installée !

---

## 🎯 Premiers Pas

### 1. Ajouter des machines
1. Admin → Onglet "🏭 Machines"
2. "➕ Ajouter une machine"
3. Remplir les informations

### 2. Ajouter du stock
1. Admin → Onglet "📦 Stock"
2. "➕ Ajouter un article"
3. Définir minimum et quantité actuelle

### 3. Enregistrer un TP
1. Application principale → "📝 TP"
2. Remplir le formulaire
3. Ajouter les membres
4. Enregistrer

---

## 🆘 Aide Rapide

### Problème : L'app ne s'affiche pas
- Attendez 5 minutes après activation
- Videz le cache : Ctrl + F5

### Problème : Mot de passe admin oublié
1. Ouvrez `admin.html` sur GitHub
2. Cliquez "Edit" (✏️)
3. Changez le mot de passe ligne ~600
4. Commit changes

### Problème : Données perdues
- Les données sont dans localStorage du navigateur
- Exportez régulièrement : Admin → Paramètres → Export

---

## 📞 Besoin d'aide ?

**Email** : atelier@esig-globalsuccess.tg

**Documentation complète** : Voir README.md

---

## 🎉 Félicitations !

Votre application ESIG est prête à l'emploi !

**Bonne utilisation ! 🚀**

---

**ESIG Global Success**
*Vocatio Excellentiae*
Lomé, Togo
