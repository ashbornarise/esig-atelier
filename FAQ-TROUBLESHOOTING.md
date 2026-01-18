# ❓ FAQ & TROUBLESHOOTING - ESIG Atelier 2.0

## 🎯 QUESTIONS FRÉQUENTES

### **Q1: Comment puis-je déployer rapidement ?**

**R:** 15 minutes suffisent ! Suivez ces étapes :
1. Créer projet Firebase (3 min)
2. Ajouter identifiants dans firebase-config.js (2 min)
3. Tester en local (5 min)
4. Déployer GitHub Pages (3 min)
5. Ajouter les règles Firestore (2 min)

Consultez GUIDE-DEPLOIEMENT.md pour les instructions détaillées.

---

### **Q2: Puis-je conserver mon ancien index.html ?**

**R:** Oui, vous avez le choix :

**Option 1 - Remplacer complètement** (Recommandé)
```bash
# Sauvegarder les anciens
mv index.html index-OLD.html
mv login.html login-OLD.html

# Utiliser les nouveaux
mv index-new.html index.html
mv login-new.html login.html
```

**Option 2 - Garder les deux**
- Conservez les fichiers originaux
- Testez d'abord les nouveaux en local
- Basculez quand prêt

---

### **Q3: Où trouver mes identifiants Firebase ?**

**R:** Dans Firebase Console :

1. Allez dans [console.firebase.google.com](https://console.firebase.google.com)
2. Sélectionnez votre projet
3. Roue cog (Paramètres) en haut à gauche
4. **Vos applications** → **Web**
5. Copiez la config dans **COPY TO CLIPBOARD**

Exemple de ce que vous copierez :
```javascript
const FIREBASE_CONFIG = {
    apiKey: "AIzaSy...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456...",
    appId: "1:123456..."
};
```

---

### **Q4: Combien ça coûte ?**

**R:** Complètement gratuit pour une école !

- **Stockage:** Gratuit jusqu'à 5GB
- **Lectures:** 50K gratuites/jour
- **Écritures:** 20K gratuites/jour
- **Suppressions:** 20K gratuites/jour
- **GitHub Pages:** Gratuit
- **Domaine:** Gratuit (username.github.io)

**TOTAL:** 0€ pour votre établissement

---

### **Q5: Les données sont-elles sécurisées ?**

**R:** Oui, très sécurisées !

1. **Chiffrage au transit:** HTTPS (automatique GitHub Pages)
2. **Chiffrage au repos:** Firebase Cloud Storage (Google)
3. **Authentification:** Firebase Auth (cryptage des mots de passe)
4. **Autorisation:** Règles Firestore granulaires
5. **Audit:** Logs disponibles dans Firebase Console

---

### **Q6: Puis-je exporter les données ?**

**R:** Oui, plusieurs façons :

```javascript
// Exporter en JSON
async function exporterDonnees() {
    const tp = await db.collection('tp').get();
    const data = tp.docs.map(d => d.data());
    
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'donnees-esig.json';
    a.click();
}
```

Ou dans Firebase Console → Firestore → Options → Exporter

---

### **Q7: Comment ajouter plus d'utilisateurs ?**

**R:** Deux méthodes :

**Méthode 1 : Auto-inscription**
- Utilisateurs vont sur login.html
- Cliquez "Inscription"
- Remplissent le formulaire
- Account créé automatiquement

**Méthode 2 : Admin crée directement**
- Firebase Console → Authentification → Utilisateurs
- Cliquez "Ajouter un utilisateur"
- Email + Mot de passe
- Le compte est créé

---

### **Q8: Comment changer les couleurs ?**

**R:** Cherchez `:root` dans les fichiers HTML :

```css
:root {
    --primary: #667eea;      /* Changez cette couleur */
    --secondary: #764ba2;    /* Et celle-ci */
    --success: #10b981;      /* Etc. */
    --danger: #ef4444;
}
```

Ou dans les fichiers CSS :
```css
background: linear-gradient(135deg, #667eea, #764ba2);
                             ^^^^^^^      ^^^^^^^
                             Changez ces couleurs hex
```

---

### **Q9: Comment ajouter mon logo ?**

**R:** Remplacez l'icône dans le header :

```html
<!-- Cherchez cette ligne -->
<i class="fas fa-cogs"></i>

<!-- Changez "fa-cogs" par une autre icône Font Awesome -->
<!-- Voir: https://fontawesome.com/icons -->
<i class="fas fa-toolbox"></i>

<!-- Ou mettez votre image -->
<img src="path/to/your-logo.png" style="width: 50px;">
```

---

### **Q10: Puis-je ajouter du contenu personnalisé ?**

**R:** Bien sûr ! Les fichiers HTML sont modifiables :

```html
<!-- Cherchez la section et modifiez -->
<h1>ESIG Atelier</h1>  <!-- Changez le nom -->
<p class="subtitle">Gestion d'atelier universitaire</p>  <!-- Changez la description -->
```

Les données (TP, machines) se synchronisent automatiquement avec Firestore.

---

## 🐛 TROUBLESHOOTING

### **❌ ERREUR: "Firebase is not defined"**

**Cause:** Les scripts Firebase ne sont pas chargés

**Solution:**
```html
<!-- Vérifiez dans votre HTML -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>
<script src="firebase-config.js"></script>  <!-- DOIT être EN DERNIER -->
```

---

### **❌ ERREUR: "PERMISSION_DENIED"**

**Cause:** Les règles Firestore ne sont pas configurées

**Solution:**
1. Allez dans Firebase Console → Firestore Database → Règles
2. Remplacez le contenu par les règles du GUIDE-DEPLOIEMENT.md
3. Cliquez **Publier**
4. Attendez 30 secondes
5. Réessayez

---

### **❌ ERREUR: "User not found"**

**Cause:** L'utilisateur n'existe pas dans Firebase Auth

**Solution:**
1. Allez dans Firebase Console → Authentification → Utilisateurs
2. Vérifiez que l'email existe
3. Si non, créez-le manuellement ou utilisez l'inscription

---

### **❌ ERREUR: "Network error"**

**Cause:** Problème de connexion Internet

**Solution:**
1. Vérifiez votre connexion Internet
2. Vérifiez que Firebase est accessible
3. Videz le cache du navigateur (Ctrl+Shift+Del)
4. Réessayez

---

### **❌ ERREUR: "Invalid API key"**

**Cause:** Les identifiants Firebase ne sont pas corrects

**Solution:**
1. Allez dans Firebase Console
2. Récupérez la bonne configuration
3. Remplacez dans firebase-config.js
4. Rechargez la page

---

### **❌ PAGE BLANCHE SUR GITHUB PAGES**

**Cause:** Généralement le cache ou les fichiers mal poussés

**Solution:**
```bash
# Vérifiez que les fichiers sont bien présents
git status

# Forcez le rafraîchissement dans le navigateur
Ctrl + Shift + R  (hard refresh)

# Attendez 2-3 minutes (GitHub Pages met à jour lentement)

# Vérifiez dans Settings → Pages que le bon branch est activé
```

---

### **❌ LES DONNÉES NE S'ENREGISTRENT PAS**

**Causes possibles:**

1. **firebase-config.js vide**
   → Remplissez avec vos identifiants

2. **Firestore n'existe pas**
   → Créez-la dans Firebase Console

3. **Règles Firestore bloquent**
   → Vérifiez les règles publiées

4. **Pas d'authentification**
   → L'utilisateur doit être connecté

**Solution:**
```javascript
// Ouvrez la console (F12) et vérifiez les erreurs
// Cherchez les messages d'erreur en rouge
// Cliquez sur l'erreur pour plus de détails

// Testez la connexion Firebase
console.log(firebase.auth().currentUser);  // Doit afficher l'utilisateur

// Testez la création d'une donnée
await DataManager.tp.create({ titre: "Test" });
// Vérifiez dans Firestore Console que c'est créé
```

---

### **❌ ADMIN NE VOIT PAS LES DONNÉES**

**Cause:** L'utilisateur n'a pas le rôle `admin`

**Solution:**
1. Allez dans Firebase Console → Firestore Database
2. Allez dans la collection `users`
3. Trouvez le document avec le UID de l'admin
4. Modifiez le champ `role` : `admin`
5. Sauvegardez
6. Reconnectez-vous

---

### **❌ TP CRÉÉ N'APPARAÎT PAS DANS LA LISTE**

**Cause:** Le listener n'est pas activé ou les données ne sont pas chargées

**Solution:**
1. Rafraîchissez la page (F5)
2. Attendez quelques secondes
3. Vérifiez dans Firestore Console que le TP est créé
4. Vérifiez dans la console (F12) qu'il n'y a pas d'erreurs

---

### **❌ AUTHENTIFICATION NE MARCHE PAS**

**Cause:** Email/Password pas activé dans Firebase

**Solution:**
1. Allez dans Firebase Console → Authentification
2. Cliquez sur **Fournisseurs**
3. Cherchez **Email/Password**
4. Cliquez dessus
5. Activez les deux options
6. Cliquez **Enregistrer**
7. Réessayez

---

## ✅ TESTS À FAIRE

### **Test 1: Configuration Firebase**
```javascript
// Ouvrez la console (F12) et exécutez:
console.log(firebase);
console.log(db);
console.log(auth);

// Vous devez voir 3 objets valides (pas d'erreur)
```

### **Test 2: Authentification**
```javascript
// Vérifiez l'utilisateur connecté
firebase.auth().onAuthStateChanged(user => {
    console.log('Utilisateur:', user ? user.email : 'Non connecté');
});
```

### **Test 3: Créer une donnée**
```javascript
// Testez la création d'une donnée
await DataManager.machines.create({
    nom: "Test Machine",
    type: "Test",
    statut: "disponible",
    lieu: "Test"
});

// Allez dans Firestore Console → machines
// Vous devez voir la machine créée
```

### **Test 4: Lectures et écritures**
```javascript
// Vérifiez que les opérations CRUD fonctionnent
const result = await DataManager.machines.getAll();
console.log('Machines:', result.data.length);  // Doit afficher un nombre > 0
```

---

## 📞 SUPPORT

### **Je suis bloqué, que faire ?**

1. **Vérifiez la console** (F12) pour voir les erreurs exactes
2. **Relisez GUIDE-DEPLOIEMENT.md** (le détail y est souvent)
3. **Consultez EXEMPLES-AVANCES.js** pour voir comment faire
4. **Testez dans Firestore Console** directement
5. **Posez une question sur Stack Overflow** (tag `firebase`)

### **Comment obtenir de l'aide ?**

- **Documentation Firebase:** [firebase.google.com/docs](https://firebase.google.com/docs)
- **Stack Overflow:** Cherchez le tag `firebase`
- **GitHub Issues:** Si c'est un bug du code fourni
- **Firebase Console Support:** Pour les problèmes Firebase

---

## 📋 CHECKLIST DE DÉPANNAGE

- [ ] firebase-config.js rempli ?
- [ ] Firebase projet créé ?
- [ ] Auth activée ?
- [ ] Firestore créée ?
- [ ] Règles Firestore publiées ?
- [ ] Pas d'erreur en console (F12) ?
- [ ] Utilisateur créé dans Auth ?
- [ ] Utilisateur a le rôle admin ?
- [ ] Fichiers bien nommés (pas -new) ?
- [ ] Données visibles dans Firestore Console ?

---

## 🎯 PROCHAINES ÉTAPES SI TOUT FONCTIONNE

1. ✅ Ajouter vos données réelles (machines, stocks)
2. ✅ Créer des comptes utilisateurs
3. ✅ Tester avec de vrais utilisateurs
4. ✅ Personnaliser les couleurs/logo
5. ✅ Configurer les règles strictes
6. ✅ Mettre en production

---

**Vous avez d'autres questions ? Consultez les guides ou ouvrez un issue GitHub !**
