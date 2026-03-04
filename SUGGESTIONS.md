# SUGGESTIONS D'AMÉLIORATIONS — ESIG Atelier
> Fichier de référence pour les prochaines sessions de développement.
> Mis à jour : mars 2026

---

## PRIORITÉ HAUTE

### A — Notifications Push PWA
**Objectif :** Envoyer des alertes de sécurité directement sur le téléphone des étudiants.
**Technique :** Firebase Cloud Messaging (FCM) + Service Worker
**Effort :** 3–4h
**Valeur :** Critique pour la sécurité atelier — l'étudiant est prévenu même hors du site
**Fichiers concernés :** `sw.js`, `manifest.json`, `admin.html` (envoi), `index.html` (réception)

---

### B — Scanner QR Code Machine
**Objectif :** Chaque machine a un QR code imprimé. L'étudiant scanne → fiche machine + consignes sécurité affichées.
**Technique :** Bibliothèque `html5-qrcode` (CDN gratuit) + URL de type `index.html?machine=ID`
**Effort :** 2–3h
**Valeur :** UX majeure en atelier, zéro friction pour consulter les consignes
**Fichiers concernés :** `index.html`, `admin.html` (génération QR)

---

### C — Mode Hors-Ligne Complet (PWA)
**Objectif :** Consignes de sécurité, machines et documents accessibles sans internet.
**Technique :** Service Worker avec stratégie Cache-First pour les données critiques
**Effort :** 2–3h
**Valeur :** Essentiel pour un atelier (Wi-Fi souvent instable)
**Fichiers concernés :** `sw.js`

---

### D — Signature Numérique des TP
**Objectif :** L'enseignant valide un TP d'un clic → l'étudiant reçoit une confirmation, le TP passe en statut "Validé".
**Technique :** Champ `validatedBy`, `validatedAt` dans collection `TP` + bouton admin + notification in-app
**Effort :** 2h
**Valeur :** Workflow pédagogique complet, traçabilité des validations
**Fichiers concernés :** `admin.html`, `index.html`

---

## PRIORITÉ MOYENNE

### E — Tableau de Bord Temps Réel
**Objectif :** Compteur machines actuellement en usage, alertes stock bas automatiques, dernières activités live.
**Technique :** Firestore `onSnapshot()` pour listeners temps réel
**Effort :** 3h
**Valeur :** Visibilité opérationnelle pour l'admin et les techniciens
**Fichiers concernés :** `admin.html`, `index.html`

---

### F — Historique des Interventions Machine
**Objectif :** Chaque maintenance/panne laisse une trace horodatée, avec commentaire et optionnellement une photo.
**Technique :** Sous-collection `machines/{id}/interventions` dans Firestore
**Effort :** 2–3h
**Valeur :** Traçabilité complète, aide au diagnostic préventif
**Fichiers concernés :** `admin.html`

---

### G — Export Excel / PDF des Rapports
**Objectif :** L'admin exporte la liste des TP, des stocks ou des machines en fichier Excel ou PDF.
**Technique :** Bibliothèque `SheetJS` (Excel, CDN gratuit) ou `jsPDF` (PDF, CDN gratuit)
**Effort :** 2h
**Valeur :** Administration et reporting pour la direction
**Fichiers concernés :** `admin.html`

---

### H — Calendrier des TP et Réservations Machines
**Objectif :** Vue calendrier pour les TP programmés + système de réservation de machine par créneau.
**Technique :** Bibliothèque `FullCalendar` (gratuit) + collection `reservations` dans Firestore
**Effort :** 4–5h
**Valeur :** Planification atelier, évite les conflits d'utilisation
**Fichiers concernés :** `admin.html`, `index.html`

---

## PRIORITÉ BASSE

### I — Thème Sombre (Dark Mode)
**Objectif :** Basculer entre thème clair et sombre pour le confort visuel.
**Technique :** Le CSS est déjà prêt (`[data-theme="dark"]` dans `variables.css`) — il suffit d'ajouter le toggle
**Effort :** 30 min
**Valeur :** Confort pour travailler le soir
**Fichiers concernés :** `index.html`, `admin.html`

---

### J — Multi-Langue (FR / EN)
**Objectif :** Interface disponible en français et en anglais pour les étudiants internationaux.
**Technique :** Fichiers JSON de traductions + fonction `t('key')` simple
**Effort :** 4–6h (selon profondeur)
**Valeur :** Accessibilité pour les étudiants non-francophones
**Fichiers concernés :** Tous les fichiers HTML

---

### K — Messagerie Interne
**Objectif :** Les étudiants peuvent envoyer un message à leur enseignant ou au technicien directement depuis l'app.
**Technique :** Collection `messages` dans Firestore + badge de notification
**Effort :** 3–4h
**Valeur :** Communication centralisée, moins d'emails/WhatsApp
**Fichiers concernés :** `admin.html`, `index.html`

---

### L — Galerie Photos Machines / Atelier
**Objectif :** Photos des machines, zones de travail et montages visibles par tous.
**Technique :** URLs images (Google Drive ou externe) stockées dans Firestore, galerie lightbox simple
**Effort :** 2h
**Valeur :** Documentation visuelle utile pour les nouveaux étudiants
**Fichiers concernés :** `admin.html`, `index.html`

---

## OPTIMISATIONS TECHNIQUES

### T1 — Firebase Storage (si Blaze activé)
**Objectif :** Permettre l'upload de fichiers > 500 Ko (PDFs lourds, plans, etc.)
**Note :** Nécessite la formule Blaze Firebase (gratuit jusqu'à 5 Go, carte bancaire requise)
**Effort :** 1h (code déjà préparé)

### T2 — Lazy Loading des Sections
**Objectif :** Ne charger les données d'une section que quand l'utilisateur clique dessus (déjà partiellement fait).
**Effort :** 1h
**Valeur :** Chargement initial plus rapide

### T3 — Compression des Images
**Objectif :** Compresser les photos avant stockage pour économiser de l'espace Firestore.
**Technique :** `canvas.toBlob()` côté client avant upload base64
**Effort :** 1h

### T4 — Pagination Firestore
**Objectif :** Pour les grandes listes (TP, activités), charger 20 éléments à la fois avec "Voir plus".
**Technique :** `startAfter()` de Firestore
**Effort :** 2h par section

---

## LÉGENDE PRIORITÉS
- **Haute** : Impact immédiat sur l'usage quotidien, à faire dans les prochaines semaines
- **Moyenne** : Améliore significativement l'expérience, planifier dans le mois
- **Basse** : Confort/bonus, à faire quand le reste est stable
