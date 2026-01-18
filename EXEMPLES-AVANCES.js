/**
 * EXEMPLES D'UTILISATION AVANCÉE - ESIG ATELIER 2.0
 * Copiez-collez dans la console (F12) ou dans vos scripts
 */

// ================================================================
// 1️⃣ EXEMPLES D'AUTHENTIFICATION
// ================================================================

// Inscription programmée
async function creerUtilisateurTest() {
    const result = await AuthManager.register(
        'test@esig.tg',
        'password123',
        {
            nom: 'Dupont',
            prenom: 'Jean',
            niveau: 'L2',
            groupe: 'A',
            role: 'etudiant'
        }
    );
    
    if (result.success) {
        console.log('✅ Utilisateur créé:', result.uid);
    } else {
        console.error('❌ Erreur:', result.error);
    }
}

// Se connecter programmé
async function seConnecter() {
    const result = await AuthManager.login('admin@esig.tg', 'password');
    console.log(result.success ? '✅ Connecté' : '❌ Erreur: ' + result.error);
}

// Obtenir l'utilisateur courant
async function obtenirUtilisateur() {
    const user = AuthManager.getCurrentUser();
    console.log('Utilisateur courant:', user.email);
    
    const userData = await AuthManager.getCurrentUserData();
    console.log('Données complet:', userData);
}

// ================================================================
// 2️⃣ EXEMPLES TRAVAUX PRATIQUES (TP)
// ================================================================

// Créer un TP complet
async function creerTPComplet() {
    const result = await DataManager.tp.create({
        titre: 'Usinage - Pièce cylindrique',
        type: 'usinage',
        dateDebut: new Date(),
        duree: 2.5,
        description: 'Fabrication d\'une pièce cylindrique sur tour CNC',
        statut: 'planifie',
        machinesUtilisees: [
            { machineId: 'tour-cnc-01', duree: 2 }
        ],
        remarques: 'Attention à la vitesse de rotation'
    });
    
    console.log(result.success ? '✅ TP créé: ' + result.id : '❌ Erreur');
}

// Lister tous les TP
async function listerTP() {
    const result = await DataManager.tp.getAll(false);
    
    result.data.forEach(tp => {
        console.log(`📋 ${tp.titre} (${tp.type}) - Créé par: ${tp.createdBy}`);
    });
}

// Lister mes TP uniquement
async function listerMesTP() {
    const result = await DataManager.tp.getAll(true);
    
    result.data.forEach(tp => {
        console.log(`📋 ${tp.titre} - Durée: ${tp.duree}h`);
    });
}

// Mettre à jour un TP
async function mettreAJourTP(tpId) {
    const result = await DataManager.tp.update(tpId, {
        statut: 'en_cours',
        remarques: 'Travail en progression'
    });
    
    console.log(result.success ? '✅ TP mis à jour' : '❌ Erreur');
}

// ================================================================
// 3️⃣ EXEMPLES MACHINES
// ================================================================

// Créer une machine (admin)
async function creerMachine() {
    const result = await DataManager.machines.create({
        nom: 'Tour parallèle CNC-01',
        type: 'Tournage',
        statut: 'disponible',
        lieu: 'Salle d\'usinage A',
        modele: 'HAAS ST-20Y',
        nombreHeuresUtilisation: 1250,
        notes: 'Révision complète faite en 2025'
    });
    
    console.log(result.success ? '✅ Machine créée' : '❌ Erreur');
}

// Lister les machines
async function listerMachines() {
    const result = await DataManager.machines.getAll();
    
    result.data.forEach(m => {
        const status = {
            'disponible': '🟢',
            'occupee': '🟡',
            'maintenance': '🔴'
        }[m.statut] || '⚪';
        
        console.log(`${status} ${m.nom} (${m.type}) - ${m.lieu}`);
    });
}

// Changer le statut d'une machine
async function changerStatutMachine(machineId, statut) {
    // Statuts: 'disponible', 'occupee', 'maintenance'
    const result = await DataManager.machines.updateStatus(machineId, statut);
    console.log(result.success ? '✅ Statut mis à jour' : '❌ Erreur');
}

// ================================================================
// 4️⃣ EXEMPLES STOCKS
// ================================================================

// Ajouter un article au stock
async function ajouterArticleStock() {
    const result = await DataManager.stocks.create({
        nom: 'Acier inoxydable 304 - Feuille 1mm',
        categorie: 'materiaux',
        quantite: 150,
        quantiteMinimale: 50,
        unite: 'kg',
        prix: 8.50,
        fournisseur: 'ArcelorMittal',
        emplacement: 'Étagère C-12'
    });
    
    console.log(result.success ? '✅ Article ajouté' : '❌ Erreur');
}

// Lister le stock
async function listerStock() {
    const result = await DataManager.stocks.getAll();
    
    result.data.forEach(item => {
        const alert = item.quantite <= item.quantiteMinimale ? '⚠️' : '✅';
        console.log(`${alert} ${item.nom}: ${item.quantite}${item.unite} (min: ${item.quantiteMinimale})`);
    });
}

// Mettre à jour la quantité
async function mettreAJourQuantite(stockId, nouvelleQuantite) {
    const result = await DataManager.stocks.updateQuantity(stockId, nouvelleQuantite);
    console.log(result.success ? '✅ Quantité mise à jour' : '❌ Erreur');
}

// Alerter si stock bas
async function verifierStockBas() {
    const result = await DataManager.stocks.getAll();
    
    const stockBas = result.data.filter(item => item.quantite <= item.quantiteMinimale);
    
    if (stockBas.length > 0) {
        console.log('⚠️ ALERTE STOCK BAS:');
        stockBas.forEach(item => {
            console.log(`  - ${item.nom}: ${item.quantite}/${item.quantiteMinimale} ${item.unite}`);
        });
    }
}

// ================================================================
// 5️⃣ EXEMPLES MAINTENANCE
// ================================================================

// Planifier une maintenance
async function planifierMaintenance() {
    const result = await DataManager.maintenance.create({
        machineId: 'tour-cnc-01',
        type: 'preventive',
        description: 'Changement de l\'huile et vérification du système de refroidissement',
        datePrevu: new Date(Date.now() + 7*24*60*60*1000), // Dans 7 jours
        responsable: 'technicien123',
        heures: 2,
        notes: 'À faire pendant la pause de midi'
    });
    
    console.log(result.success ? '✅ Maintenance planifiée' : '❌ Erreur');
}

// Lister la maintenance
async function listerMaintenance() {
    const result = await DataManager.maintenance.getAll();
    
    result.data.forEach(task => {
        const icone = {
            'planifie': '📅',
            'en_cours': '⏳',
            'termine': '✅'
        }[task.statut] || '❓';
        
        console.log(`${icone} ${task.description} (${task.type})`);
    });
}

// Marquer une maintenance comme complétée
async function terminerMaintenance(maintenanceId) {
    const result = await DataManager.maintenance.complete(maintenanceId, 'Maintenance effectuée avec succès');
    console.log(result.success ? '✅ Maintenance terminée' : '❌ Erreur');
}

// ================================================================
// 6️⃣ EXEMPLES GESTION UTILISATEURS (ADMIN)
// ================================================================

// Lister tous les utilisateurs
async function listerUtilisateurs() {
    const result = await DataManager.users.getAll();
    
    result.data.forEach(user => {
        console.log(`👤 ${user.prenom} ${user.nom} (${user.email}) - Rôle: ${user.role}`);
    });
}

// Promouvoir un utilisateur en admin
async function promouvoirEnAdmin(uid) {
    const result = await DataManager.users.update(uid, {
        role: 'admin'
    });
    
    console.log(result.success ? '✅ Utilisateur promu' : '❌ Erreur');
}

// Activer/Désactiver un utilisateur
async function desactiverUtilisateur(uid) {
    const result = await DataManager.users.update(uid, {
        actif: false
    });
    
    console.log(result.success ? '✅ Utilisateur désactivé' : '❌ Erreur');
}

// ================================================================
// 7️⃣ EXEMPLES TEMPS RÉEL (LISTENERS)
// ================================================================

// Écouter les changements de TP en temps réel
function ecoouterTPChangements() {
    const unsubscribe = RealtimeListener.onTPChange((tpList) => {
        console.log('📡 TP mis à jour:', tpList.length, 'éléments');
        tpList.forEach(tp => {
            console.log(`  - ${tp.titre}`);
        });
    });
    
    // Pour arrêter d'écouter
    // unsubscribe();
    
    return unsubscribe;
}

// Écouter les changements de machines
function ecoouterMachinesChangements() {
    const unsubscribe = RealtimeListener.onMachinesChange((machines) => {
        console.log('📡 Machines mis à jour:', machines.length);
    });
    
    return unsubscribe;
}

// Écouter les changements de stock
function ecoouterStockChangements() {
    const unsubscribe = RealtimeListener.onStocksChange((stocks) => {
        console.log('📡 Stock mis à jour:', stocks.length);
        
        // Alerter si stock bas
        const bas = stocks.filter(s => s.quantite <= s.quantiteMinimale);
        if (bas.length > 0) {
            console.log('⚠️ Articles en stock bas:', bas.map(s => s.nom));
        }
    });
    
    return unsubscribe;
}

// ================================================================
// 8️⃣ FONCTION D'INITIALISATION
// ================================================================

async function initialiserApplication() {
    console.log('🚀 Initialisation ESIG Atelier...');
    
    // Attendre que Firebase soit prêt
    AuthManager.onAuthStateChanged(async (user) => {
        if (!user) {
            console.log('❌ Utilisateur non connecté');
            return;
        }
        
        console.log('✅ Connecté en tant que:', user.email);
        
        // Charger les données
        const tpResult = await DataManager.tp.getAll(true);
        console.log(`📋 Mes TP: ${tpResult.data.length}`);
        
        const machinesResult = await DataManager.machines.getAll();
        console.log(`🔧 Machines: ${machinesResult.data.length}`);
        
        const stockResult = await DataManager.stocks.getAll();
        console.log(`📦 Articles stock: ${stockResult.data.length}`);
        
        // Écouter les changements
        ecoouterTPChangements();
        ecoouterMachinesChangements();
        
        console.log('✅ Application initialisée');
    });
}

// ================================================================
// 9️⃣ DASHBOARD ADMIN
// ================================================================

async function afficherDashboardAdmin() {
    console.clear();
    console.log('═══════════════════════════════════');
    console.log('      DASHBOARD ADMIN - ESIG       ');
    console.log('═══════════════════════════════════');
    
    // TP
    const tp = await DataManager.tp.getAll(false);
    console.log(`\n📋 TRAVAUX PRATIQUES: ${tp.data.length}`);
    const tpParType = {};
    tp.data.forEach(t => {
        tpParType[t.type] = (tpParType[t.type] || 0) + 1;
    });
    Object.entries(tpParType).forEach(([type, count]) => {
        console.log(`  - ${type}: ${count}`);
    });
    
    // Utilisateurs
    const users = await DataManager.users.getAll();
    console.log(`\n👥 UTILISATEURS: ${users.data.length}`);
    const parRole = {};
    users.data.forEach(u => {
        parRole[u.role] = (parRole[u.role] || 0) + 1;
    });
    Object.entries(parRole).forEach(([role, count]) => {
        console.log(`  - ${role}: ${count}`);
    });
    
    // Machines
    const machines = await DataManager.machines.getAll();
    console.log(`\n🔧 MACHINES: ${machines.data.length}`);
    const parStatut = {};
    machines.data.forEach(m => {
        parStatut[m.statut] = (parStatut[m.statut] || 0) + 1;
    });
    Object.entries(parStatut).forEach(([statut, count]) => {
        console.log(`  - ${statut}: ${count}`);
    });
    
    // Stock
    const stock = await DataManager.stocks.getAll();
    const bas = stock.data.filter(s => s.quantite <= s.quantiteMinimale);
    console.log(`\n📦 STOCK: ${stock.data.length} articles (${bas.length} en alerte)`);
    
    // Maintenance
    const maintenance = await DataManager.maintenance.getAll();
    const planifiee = maintenance.data.filter(m => m.statut === 'planifie');
    console.log(`\n🔧 MAINTENANCE: ${maintenance.data.length} tâches (${planifiee.length} planifiées)`);
    
    console.log('\n═══════════════════════════════════\n');
}

// ================================================================
// 🔟 UTILITAIRES
// ================================================================

// Générer des données de test
async function genererDonneesTest() {
    console.log('🧪 Génération de données de test...');
    
    // Créer des machines
    const machines = ['Tour CNC-01', 'Fraiseuse 3D', 'Soudeuse TIG'];
    for (const nom of machines) {
        await DataManager.machines.create({
            nom,
            type: 'Usinage',
            statut: 'disponible',
            lieu: 'Atelier A'
        });
    }
    
    // Créer du stock
    const articles = [
        { nom: 'Acier 5mm', categorie: 'materiaux', quantite: 100, min: 20 },
        { nom: 'Électrodes', categorie: 'consommables', quantite: 50, min: 25 },
        { nom: 'Visserie', categorie: 'outils', quantite: 200, min: 50 }
    ];
    
    for (const article of articles) {
        await DataManager.stocks.create({
            ...article,
            unite: 'kg'
        });
    }
    
    console.log('✅ Données de test créées');
}

// Exporter les données en JSON
async function exporterDonnees() {
    const tp = await DataManager.tp.getAll(false);
    const machines = await DataManager.machines.getAll();
    const stocks = await DataManager.stocks.getAll();
    const maintenance = await DataManager.maintenance.getAll();
    
    const donnees = { tp: tp.data, machines: machines.data, stocks: stocks.data, maintenance: maintenance.data };
    
    console.log(JSON.stringify(donnees, null, 2));
    
    // Télécharger le fichier
    const blob = new Blob([JSON.stringify(donnees, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'esig-atelier-donnees.json';
    a.click();
}

// ================================================================
// COMMANDES RAPIDES
// ================================================================

console.log(`
╔════════════════════════════════════════════════════════╗
║     ESIG ATELIER - EXEMPLES AVANCÉS DISPONIBLES       ║
╚════════════════════════════════════════════════════════╝

AUTHENTIFICATION:
  creerUtilisateurTest()
  seConnecter()
  obtenirUtilisateur()

TP:
  creerTPComplet()
  listerTP()
  listerMesTP()
  mettreAJourTP('tpId')

MACHINES:
  creerMachine()
  listerMachines()
  changerStatutMachine('machineId', 'maintenance')

STOCKS:
  ajouterArticleStock()
  listerStock()
  mettreAJourQuantite('stockId', 100)
  verifierStockBas()

MAINTENANCE:
  planifierMaintenance()
  listerMaintenance()
  terminerMaintenance('maintenanceId')

ADMIN:
  listerUtilisateurs()
  promouvoirEnAdmin('uid')
  desactiverUtilisateur('uid')
  afficherDashboardAdmin()

TEMPS RÉEL:
  ecoouterTPChangements()
  ecoouterMachinesChangements()

UTILITAIRES:
  genererDonneesTest()
  exporterDonnees()
  initialiserApplication()
`);
