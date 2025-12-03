# 🎓 APPLICATION DE GESTION D'ATELIER ESIG GLOBAL SUCCESS

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Fonctionnalités](#fonctionnalités)
3. [Installation et Déploiement](#installation-et-déploiement)
4. [Configuration Google Sheets](#configuration-google-sheets)
5. [Utilisation](#utilisation)
6. [Administration](#administration)
7. [Support](#support)

---

## 🎯 Vue d'ensemble

Application web progressive (PWA) complète pour la gestion de l'atelier de l'université ESIG Global Success à Lomé, Togo.

### ✨ Caractéristiques principales

- ✅ Application web responsive (mobile, tablette, ordinateur)
- ✅ Installation comme app native sur mobile
- ✅ Fonctionnement hors ligne (PWA)
- ✅ Intégration Google Sheets pour stockage des données
- ✅ Panneau d'administration complet
- ✅ Gestion des machines, stock, TP et maintenance
- ✅ Export de données (Excel, PDF, CSV)
- ✅ Interface moderne et intuitive

---

## 🚀 Fonctionnalités

### Pour les Étudiants

- 📝 **Enregistrement de TP** : Formulaires de travaux pratiques complets
- 🏭 **Réservation de machines** : Voir les machines disponibles et les réserver
- 👥 **Gestion de groupes** : Ajouter des membres à un TP
- 🦺 **EPI** : Validation des équipements de protection
- 📊 **Historique** : Consulter l'historique des TP réalisés

### Pour les Enseignants

- 📊 **Rapports** : Statistiques d'utilisation des machines
- 📋 **Suivi** : Suivi des TP par étudiant
- ⏰ **Planning** : Visualisation du planning d'utilisation

### Pour les Administrateurs

- ⚙️ **Gestion des machines** : Ajout, modification, suppression
- 📦 **Gestion du stock** : Suivi des consommables et outils
- 🔧 **Maintenance** : Planification des maintenances
- 👥 **Utilisateurs** : Gestion des comptes
- 💾 **Sauvegarde** : Export/import des données

---

## 📦 Installation et Déploiement

### Option 1 : GitHub Pages (RECOMMANDÉ - 100% GRATUIT)

#### Étape 1 : Créer un compte GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "Sign up"
3. Créez votre compte avec votre email ESIG

#### Étape 2 : Créer un repository

1. Une fois connecté, cliquez sur le bouton "+" en haut à droite
2. Sélectionnez "New repository"
3. Nom du repository : `esig-atelier`
4. Cochez "Public"
5. Cochez "Add a README file"
6. Cliquez sur "Create repository"

#### Étape 3 : Télécharger les fichiers

1. Téléchargez tous les fichiers de l'application :
   - `index.html`
   - `admin.html`
   - `manifest.json`
   - `sw.js`
   - `logo-esig.png` (le logo fourni)

2. Dans votre repository, cliquez sur "Add file" > "Upload files"
3. Glissez-déposez tous les fichiers
4. Cliquez sur "Commit changes"

#### Étape 4 : Activer GitHub Pages

1. Dans votre repository, allez dans "Settings" (Paramètres)
2. Dans le menu de gauche, cliquez sur "Pages"
3. Sous "Source", sélectionnez "main" (ou "master")
4. Cliquez sur "Save"
5. Attendez 2-3 minutes ⏱️

#### Étape 5 : Accéder à votre application

Votre application sera accessible à :
```
https://votre-nom-utilisateur.github.io/esig-atelier/
```

### Option 2 : Netlify (Alternative gratuite)

1. Allez sur [netlify.com](https://www.netlify.com)
2. Créez un compte (gratuit)
3. Glissez-déposez le dossier contenant tous les fichiers
4. Votre app est en ligne en 30 secondes !

URL : `https://votre-nom.netlify.app`

### Option 3 : Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre repository `esig-atelier`
4. Cliquez sur "Deploy"

---

## 📊 Configuration Google Sheets

### Pourquoi Google Sheets ?

Google Sheets permet de :
- ✅ Sauvegarder automatiquement toutes les données
- ✅ Accéder aux données depuis n'importe où
- ✅ Partager avec plusieurs administrateurs
- ✅ Créer des rapports automatiques
- ✅ GRATUIT et sans limite de stockage

### Étape 1 : Créer le Google Sheet

1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez un nouveau tableur
3. Nommez-le : "ESIG - Données Atelier"

### Étape 2 : Créer les feuilles

Créez 5 feuilles (onglets) avec ces noms EXACTS :

1. **TP** - Pour les travaux pratiques
2. **Machines** - Pour les machines
3. **Stock** - Pour le stock
4. **Maintenance** - Pour les maintenances
5. **Utilisateurs** - Pour les utilisateurs

### Étape 3 : Configurer les en-têtes

#### Feuille "TP"
Dans la première ligne, ajoutez ces colonnes :
```
ID | Date | Heure Début | Heure Fin | Machine | Type TP | Membres | EPI | Description | État | Timestamp
```

#### Feuille "Machines"
```
ID | Nom | Référence | Puissance | Statut | Heures Utilisation | Dernière Maintenance
```

#### Feuille "Stock"
```
ID | Article | Minimum | Actuel | Catégorie | Urgent | Dernière MAJ
```

#### Feuille "Maintenance"
```
ID | Machine | Date Prévue | Type | Responsable | Description | Statut | Date Effective
```

#### Feuille "Utilisateurs"
```
ID | Nom | Email | Niveau | Dernière Connexion | Role
```

### Étape 4 : Partager le Sheet

1. Cliquez sur "Partager" en haut à droite
2. Dans "Obtenir le lien", sélectionnez "Toute personne disposant du lien"
3. Changez le rôle en "Lecteur" (pour la sécurité)

### Étape 5 : Obtenir l'ID du Sheet

L'ID se trouve dans l'URL de votre Google Sheet :
```
https://docs.google.com/spreadsheets/d/[VOTRE_ID_ICI]/edit
```

Copiez cet ID !

### Étape 6 : Configurer l'application

1. Accédez au panneau d'administration de votre app : `votre-url/admin.html`
2. Connectez-vous avec :
   - **Utilisateur** : `admin`
   - **Mot de passe** : `esig2025`
3. Allez dans l'onglet "⚙️ Paramètres"
4. Collez votre Spreadsheet ID
5. Cliquez sur "💾 Enregistrer la configuration"

### Étape 7 : Configuration avancée (optionnelle)

Pour une intégration complète avec l'API Google Sheets :

1. Allez sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créez un nouveau projet : "ESIG Atelier"
3. Activez l'API Google Sheets :
   - Menu > APIs & Services > Library
   - Recherchez "Google Sheets API"
   - Cliquez sur "Enable"
4. Créez une clé API :
   - APIs & Services > Credentials
   - Create Credentials > API Key
5. Copiez la clé API
6. Dans votre app, collez la clé dans "Paramètres"

**Note** : L'API Key est optionnelle pour démarrer. L'app fonctionne avec localStorage en attendant.

---

## 🎨 Personnalisation

### Changer le logo

1. Préparez votre logo ESIG en plusieurs tailles :
   - 72×72, 96×96, 128×128, 144×144, 152×152, 192×192, 384×384, 512×512 pixels
2. Nommez-les : `icon-72.png`, `icon-96.png`, etc.
3. Téléchargez-les dans votre repository

### Changer les couleurs

Modifiez les variables CSS dans `index.html` et `admin.html` :

```css
:root {
    --primary: #1a365d;      /* Bleu foncé principal */
    --secondary: #2563eb;     /* Bleu secondaire */
    --accent: #f59e0b;        /* Orange accent */
    --success: #10b981;       /* Vert succès */
    --danger: #ef4444;        /* Rouge danger */
}
```

### Changer les informations de contact

Dans le panneau d'administration :
1. Allez dans "⚙️ Paramètres"
2. Modifiez :
   - Nom de l'établissement
   - Email de contact
   - Téléphone

---

## 👤 Utilisation

### Pour les Étudiants

#### 1. Accéder à l'application

- Sur mobile : Scanner le QR code affiché dans l'atelier
- Sur ordinateur : Aller sur l'URL de l'app

#### 2. Installer l'app sur mobile

**Android :**
1. Ouvrir l'app dans Chrome
2. Menu (⋮) > "Installer l'application"
3. L'icône apparaît sur l'écran d'accueil

**iOS (iPhone/iPad) :**
1. Ouvrir l'app dans Safari
2. Bouton de partage (📤)
3. "Sur l'écran d'accueil"

#### 3. Enregistrer un TP

1. Cliquez sur l'onglet "📝 TP" en bas
2. Remplissez le formulaire :
   - Date et horaires
   - Machine utilisée
   - Type de TP
   - Ajoutez les membres du groupe
   - Cochez les EPI utilisés
   - Décrivez les travaux
3. Cliquez sur "💾 Enregistrer"

#### 4. Consulter les machines disponibles

1. Onglet "🏠 Accueil"
2. Voir la liste des machines
3. Les machines disponibles sont marquées en vert ✅

#### 5. Voir son historique

1. Onglet "📊 Rapports"
2. Voir tous vos TP passés

### Pour les Administrateurs

#### Connexion au panneau admin

1. Allez sur `votre-url/admin.html`
2. Connectez-vous :
   - **Utilisateur** : `admin`
   - **Mot de passe** : `esig2025`

#### Gérer les machines

1. Onglet "🏭 Machines"
2. Cliquez sur "➕ Ajouter une machine"
3. Remplissez les informations
4. Pour modifier : cliquez sur ✏️
5. Pour supprimer : cliquez sur 🗑️

#### Gérer le stock

1. Onglet "📦 Stock"
2. Ajoutez des articles
3. L'app alerte automatiquement quand le stock est bas

#### Planifier une maintenance

1. Onglet "🏭 Machines" ou "Stock"
2. Cliquez sur "➕ Planifier une maintenance"
3. Sélectionnez la machine
4. Définissez la date et le type

#### Exporter les données

1. Onglet "⚙️ Paramètres"
2. Section "💾 Sauvegarde et Restauration"
3. Cliquez sur "📥 Exporter toutes les données"
4. Un fichier JSON est téléchargé

---

## 🔐 Sécurité

### Changer le mot de passe administrateur

**Important** : Changez le mot de passe par défaut !

1. Ouvrez le fichier `admin.html` dans un éditeur
2. Trouvez cette ligne (vers la ligne 600) :
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'esig2025'
};
```
3. Modifiez le mot de passe
4. Sauvegardez et re-déployez

### Protéger l'accès

Pour restreindre l'accès à l'application :

**Option 1 : Protection par mot de passe simple**

Ajoutez ce code au début de `index.html` (après `<script>`) :

```javascript
const APP_PASSWORD = 'votre_mot_de_passe';

window.onload = function() {
    const savedPassword = sessionStorage.getItem('esig_access');
    if (savedPassword !== APP_PASSWORD) {
        const entered = prompt('Mot de passe requis :');
        if (entered === APP_PASSWORD) {
            sessionStorage.setItem('esig_access', APP_PASSWORD);
        } else {
            alert('Mot de passe incorrect');
            window.location = 'about:blank';
        }
    }
    // ... reste du code
};
```

**Option 2 : Utiliser GitHub Pages avec authentification**

Pour GitHub Pages privé (nécessite compte GitHub Pro)

---

## 📱 Installation comme App Mobile

### Créer un QR Code

1. Allez sur [qr-code-generator.com](https://www.qr-code-generator.com)
2. Entrez l'URL de votre application
3. Téléchargez le QR code
4. Imprimez-le et affichez-le dans l'atelier

Les étudiants pourront scanner le code pour accéder instantanément à l'app !

---

## 🔧 Maintenance et Mises à Jour

### Mettre à jour l'application

**Sur GitHub :**
1. Allez sur votre repository
2. Cliquez sur le fichier à modifier
3. Cliquez sur l'icône ✏️ (Edit)
4. Faites vos modifications
5. Cliquez sur "Commit changes"
6. L'app est mise à jour automatiquement en 1-2 minutes

**Sur Netlify/Vercel :**
1. Modifiez les fichiers localement
2. Glissez-déposez le dossier mis à jour
3. OU utilisez GitHub pour déploiement automatique

### Sauvegardes régulières

1. Exportez les données chaque mois
2. Téléchargez le fichier JSON
3. Conservez-le en lieu sûr

---

## 🆘 Dépannage

### L'application ne s'affiche pas

**Solution :**
- Vérifiez que le fichier principal s'appelle `index.html`
- Attendez 5 minutes après le déploiement
- Videz le cache : Ctrl + F5 (ou Cmd + Shift + R sur Mac)

### Les données ne se sauvegardent pas

**Solution :**
- Vérifiez que JavaScript est activé dans le navigateur
- Vérifiez l'ID du Google Sheet dans les paramètres
- Consultez la console du navigateur (F12) pour voir les erreurs

### L'app est lente

**Solution :**
- Videz le cache de l'application
- Vérifiez votre connexion Internet
- Supprimez les anciennes données (export puis suppression)

### Je ne peux pas me connecter au panneau admin

**Solution :**
- Vérifiez les identifiants :
  - Utilisateur : `admin`
  - Mot de passe : `esig2025`
- Assurez-vous d'être sur `/admin.html`
- Videz le localStorage : F12 > Application > Local Storage > Clear

---

## 💰 Coûts

### Solution 100% GRATUITE (Recommandée)

- ✅ GitHub Pages : **0 FCFA/an**
- ✅ Google Sheets : **0 FCFA/an**
- ✅ Pas de carte bancaire requise
- ✅ Stockage illimité

### Solution PROFESSIONNELLE (Optionnelle)

- Nom de domaine personnalisé : **~8,000 FCFA/an**
  - Exemple : `atelier.esig.tg`
  - Sur [Namecheap](https://www.namecheap.com) ou [GoDaddy](https://www.godaddy.com)

---

## 📞 Support et Assistance

### Ressources

- **Documentation GitHub Pages** : https://docs.github.com/pages
- **Documentation Google Sheets API** : https://developers.google.com/sheets/api
- **Tutoriels vidéo** : Cherchez "GitHub Pages tutorial" sur YouTube

### Communauté Tech Togo

- **GDG Lomé** : Google Developer Group Lomé
- **Tech Togo** : Groupe Facebook des développeurs togolais

### Contact

Pour toute question sur l'application :
- **Email** : atelier@esig-globalsuccess.tg
- **Téléphone** : +228 XX XX XX XX

---

## ✅ Checklist de Déploiement

Avant de mettre en production, vérifiez :

- [ ] Tous les fichiers sont téléchargés
- [ ] Le logo ESIG est en place
- [ ] L'application fonctionne sur mobile
- [ ] L'application fonctionne sur ordinateur
- [ ] Le Google Sheet est créé et configuré
- [ ] Le panneau admin est accessible
- [ ] Le mot de passe admin a été changé
- [ ] Les informations de contact sont à jour
- [ ] Un QR code d'accès est créé
- [ ] Les enseignants sont informés
- [ ] Les étudiants ont le lien
- [ ] Une sauvegarde initiale est faite

---

## 🚀 Prochaines Étapes

Après le déploiement, vous pouvez :

1. **Ajouter des fonctionnalités** :
   - Système de réservation avancé
   - Notifications push pour les alertes
   - Intégration avec le système de l'université

2. **Former les utilisateurs** :
   - Session de formation pour les étudiants
   - Guide d'utilisation pour les enseignants
   - Manuel d'administration

3. **Améliorer l'expérience** :
   - Collecter les retours des utilisateurs
   - Ajouter des fonctionnalités demandées
   - Optimiser la performance

---

## 📄 Licence

© 2025 ESIG Global Success - Lomé, Togo
Tous droits réservés.

Cette application a été développée pour un usage interne à ESIG Global Success.

---

## 🎉 Félicitations !

Votre application de gestion d'atelier est maintenant prête !

**L'équipe ESIG vous souhaite une excellente utilisation ! 🚀**

---

**Version** : 1.0.0
**Date** : Décembre 2025
**Auteur** : ESIG Global Success - IT Department
**Contact** : support@esig-globalsuccess.tg
