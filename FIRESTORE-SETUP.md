# 🔐 Firebase Security Rules Setup

## ⚠️ IMPORTANT - À FAIRE D'ABORD

Pour que `setup-admin.html` fonctionne, vous DEVEZ configurer les règles Firestore.

## 📋 Étapes

### 1. Accédez à Firebase Console
- Allez à: https://console.firebase.google.com
- Sélectionnez votre projet: `esig-atelier-64235`

### 2. Ouvrez Firestore Database
- Menu de gauche: **Firestore Database**
- Cliquez sur l'onglet: **Rules**

### 3. Remplacez les Règles
- Sélectionnez TOUT le contenu actuel
- Supprimez-le
- Copiez le contenu de `FIRESTORE-RULES.txt`
- Collez-le dans l'éditeur Firebase

### 4. Publiez les Règles
- Cliquez le bouton bleu: **"Publish"**
- Attendez la confirmation (environ 1 minute)

---

## ✅ Vérification

Une fois les règles publiées:
1. Allez à `setup-admin.html`
2. Cliquez: "Créer le compte Admin"
3. Vous devriez voir ✅ "Compte admin créé avec succès!"

---

## 🔍 Ce que les Règles Autorisent

### Collection `users`
- ✅ **Lecture**: Utilisateurs authentifiés
- ✅ **Création**: Pendant l'inscription (utilisateur s'authentifie)
- ✅ **Modification**: Soi-même ou admins

### Collection `tp`
- ✅ **Lecture**: Utilisateurs authentifiés
- ✅ **Création**: Tous les utilisateurs
- ✅ **Modification**: Créateur ou admin
- ✅ **Suppression**: Créateur ou admin

### Collections `machines`, `stocks`, `maintenance`
- ✅ **Lecture**: Tous les utilisateurs authentifiés
- ✅ **Création**: Tous les utilisateurs
- ✅ **Modification/Suppression**: Admins uniquement

### Collection `activities`
- ✅ **Lecture**: Admins uniquement
- ✅ **Création**: Tous les utilisateurs

---

## 🆘 Problème?

Si vous avez toujours l'erreur "Missing or insufficient permissions":

1. **Vérifiez que vous avez copié les règles correctement**
   - Pas d'espaces supplémentaires
   - Pas de lignes manquantes

2. **Attendez 1-2 minutes après "Publish"**
   - Firebase peut être lent à propager les règles

3. **Rechargez la page**
   - Ctrl+F5 (ou Cmd+Shift+R sur Mac)

4. **Vérifiez la console pour les erreurs**
   - Appuyez sur F12 pour ouvrir l'inspecteur
   - Onglet "Console"
   - Regardez s'il y a d'autres messages d'erreur

---

## 📝 Notes

- Ces règles permettent une sécurité de base
- Les admins peuvent tout faire
- Les utilisateurs ne peuvent modifier que leurs propres données
- Vous pouvez affiner les règles plus tard selon vos besoins

