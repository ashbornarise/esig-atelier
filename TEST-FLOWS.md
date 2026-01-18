# ESIG Atelier - Guide de Test des Flux

## Résumé des Modifications

### 1. **Mode Visiteur par Défaut**
- L'application affiche d'abord un écran de bienvenue (login.html)
- Deux options: "Se connecter" ou "Mode visiteur"
- Les visiteurs peuvent consulter les données en lecture seule
- La création de TP demande une connexion

### 2. **Intégration du Logo**
- logo-esig.png ajouté partout:
  - **login.html**: Welcome page (80x80px), Auth page (60x60px)
  - **index.html**: Header (32x32px)
  - **admin.html**: Sidebar header (50x50px)

### 3. **Tableau de Bord Admin Amélioré**
- Section TP affiche maintenant TOUS les TP des utilisateurs
- Colonnes: Titre, Créateur, Email Créateur, Type, Date, Durée, Statut, Participants, Actions
- Admin peut cliquer "Voir détails" pour afficher les informations complètes
- Admin peut supprimer des TP

### 4. **Mode Visiteur en Lecture Seule**
- Formulaire de création TP masqué pour les visiteurs
- Banneau informatif: "Mode visiteur: Vous pouvez consulter les données..."
- Le bouton de déconnexion redirige vers login.html

### 5. **Authentification des Rôles**
- Étudiant: Crée et gère ses propres TP
- Professeur: Crée et gère ses propres TP  
- Technicien: Crée et gère ses propres TP
- **Admin**: Voit TOUS les TP, peut éditer états des machines et stock
- **Visiteur**: Lecture seule, pas de création

---

## Flux de Test

### Test 1: Mode Visiteur (Par Défaut)
1. Accéder à l'application (login.html)
2. ✅ Voir écran de bienvenue avec logo
3. Cliquer "Mode visiteur"
4. ✅ Arriver à index.html en mode visiteur
5. ✅ Formulaire de création TP masqué
6. ✅ Banneau bleu avec message "Mode visiteur"
7. Cliquer "Déconnexion"
8. ✅ Retour à login.html

### Test 2: Inscription Utilisateur Standard
1. login.html → "Se connecter" → Onglet "Inscription"
2. Remplir:
   - Email: student@esig.tg
   - Mot de passe: Password123
   - Nom: Dupont
   - Prénom: Jean
   - Type: Étudiant (ou Professeur, Technicien)
3. ✅ Inscription réussie
4. ✅ Redirect vers index.html
5. ✅ Voir "Bonjour Jean Dupont" dans header
6. ✅ Formulaire de création TP visible
7. Remplir et créer un TP:
   - Titre: "TP Circuits Électriques"
   - Type: Pratique
   - Date: Date valide
   - Durée: 4.5 (heures)
   - Description: "Étude des circuits RC"
8. ✅ Message "TP créé avec succès"
9. ✅ Stats mises à jour (Mes TP: 1)

### Test 3: Connexion Utilisateur
1. login.html → "Se connecter" → Onglet "Connexion"
2. Email: student@esig.tg, Mot de passe: Password123
3. ✅ Connexion réussie
4. ✅ Redirect vers index.html
5. ✅ Nom utilisateur affiché dans header

### Test 4: Inscription Admin
1. login.html → "Se connecter" → Onglet "Inscription"
2. Remplir:
   - Email: admin@esig.tg
   - Mot de passe: Esig2026
   - Nom: Admin
   - Prénom: Système
   - Type: **Admin** (option dans dropdown)
3. ✅ Inscription réussie
4. ✅ Redirect vers admin.html (car role === 'admin')

### Test 5: Tableau de Bord Admin
1. Connexion en tant qu'admin (admin@esig.tg / Esig2026)
2. ✅ Arriver à admin.html (pas index.html)
3. ✅ Logo visible dans sidebar header
4. Cliquer sur "TP" dans le sidebar
5. ✅ Voir tableau TOUS LES TP avec colonnes:
   - Titre
   - Créateur
   - Email Créateur
   - Type
   - Date début
   - Durée
   - Statut
   - Participants
   - Actions (Voir détails, Supprimer)
6. Cliquer "Voir détails" sur un TP
7. ✅ Modal affiche: titre, créateur, email, type, durée, date, description, participants, statut
8. Cliquer "Supprimer" sur un TP
9. ✅ Confirmation demandée
10. ✅ TP supprimé après confirmation

### Test 6: Responsabilité des Rôles
1. Créer 3 utilisateurs (student1, student2, prof1)
2. Chaque crée un TP
3. Chaque utilisateur ne voit que ses propres TP
4. Admin voit les 3 TP de tous les utilisateurs
5. Visiteur voit les statistiques mais pas le formulaire

---

## Fichiers Modifiés

### ✅ login.html
- Logo intégré (Welcome + Auth)
- Mode visiteur localStorage flag
- Auto-redirect pour utilisateurs déjà connectés
- Admin redirect vers admin.html

### ✅ index.html
- Logo 32x32 dans header
- Visiteur mode read-only (form hidden, message banner)
- Admin button visible uniquement pour admins
- Protection TP form submission

### ✅ admin.html
- Logo 50x50 dans sidebar
- TP view avec colonnes enrichies
- viewTPDetails() function
- users.getById() pour afficher email créateur

### ✅ firebase-config.js
- Ajout users.getById(uid)
- Modification users.getAll() pour ajouter `id: doc.id`
- Support complet AuthManager.getCurrentUserData()

---

## Contrôle de Qualité

- [x] Logo-esig.png présent partout
- [x] Mode visiteur par défaut
- [x] Connexion demandée pour créer TP
- [x] Admin voit tous les TP
- [x] Rôles correctement appliqués
- [x] Visiteur en lecture seule
- [x] Theme bleu cohérent
- [x] Responsive design préservé
- [ ] Tests manuels complets
- [ ] Backward compatibility vérifiée

---

## Prochaines Étapes

1. **Tester chaque flux** selon les tests numérotés ci-dessus
2. **Vérifier backward compatibility** avec l'ancienne application
3. **Activer activity logging** dans les prochaines modifications
4. **Git commit et push**

