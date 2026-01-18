#!/bin/bash
# CONFIGURATION RAPIDE - ESIG ATELIER 2.0
# À exécuter pour mettre en place rapidement l'application

echo "🚀 ESIG ATELIER 2.0 - CONFIGURATION RAPIDE"
echo "==========================================="
echo ""

echo "📝 ÉTAPE 1 : VÉRIFIER LES FICHIERS"
echo "✓ firebase-config.js"
echo "✓ login-new.html"
echo "✓ index-new.html"
echo "✓ admin-new.html"
echo ""

echo "🔥 ÉTAPE 2 : CONFIGURER FIREBASE"
echo "1. Allez sur https://console.firebase.google.com"
echo "2. Créez un nouveau projet : 'esig-atelier'"
echo "3. Activez Authentication (Email/Password)"
echo "4. Créez une base Firestore"
echo "5. Copiez vos identifiants dans firebase-config.js"
echo ""

echo "👤 ÉTAPE 3 : CRÉER L'UTILISATEUR ADMIN"
echo "Email : admin@esig.tg"
echo "Password : password (à changer !)"
echo ""

echo "🔐 ÉTAPE 4 : CONFIGURER LES RÈGLES FIRESTORE"
echo "Copier-coller les règles du GUIDE-DEPLOIEMENT.md"
echo ""

echo "📦 ÉTAPE 5 : DÉPLOYER SUR GITHUB PAGES"
echo "$ git add ."
echo "$ git commit -m 'feat: Firebase backend'"
echo "$ git push origin main"
echo ""

echo "✅ ÉTAPE 6 : TESTER"
echo "1. Ouvrir login-new.html"
echo "2. S'inscrire ou se connecter"
echo "3. Créer un TP"
echo "4. Vérifier dans Firestore Console"
echo ""

echo "🎉 Configuration terminée !"
