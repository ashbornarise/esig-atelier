/* ============================================
   ESIG ATELIER - Configuration Firebase
   ============================================ */

/**
 * Configuration Firebase - VRAIES CLÉS
 * Source : Firebase Console - Projet esig-atelier-64235
 */

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAea4DBzfIOs8vNqPu2e3lJKQLNq9wvgDI",
    authDomain: "esig-atelier-64235.firebaseapp.com",
    projectId: "esig-atelier-64235",
    storageBucket: "esig-atelier-64235.firebasestorage.app",
    messagingSenderId: "396237846057",
    appId: "1:396237846057:web:f79ebfc3fa80ab91564e38",
    measurementId: "G-STBRS9H0C4"
};

/**
 * Configuration de l'application
 */
const APP_CONFIG = {
    // Informations de l'établissement
    institution: {
        nom: "ESIG Global Success",
        nomComplet: "École Supérieure d'Ingénierie et de Gestion",
        devise: "Vocatio Excellentiae",
        ville: "Lomé",
        pays: "Togo",
        email: "atelier@esig-globalsuccess.tg",
        telephone: "+228 XX XX XX XX",
        siteWeb: "https://esig-globalsuccess.tg",
        domaineEmail: "@esig-globalsuccess.tg"
    },

    // Version de l'application
    version: "2.0.0",

    // Limites
    limites: {
        maxTPDuration: 4,           // Heures max par TP
        maxMembresGroupe: 6,        // Membres max par groupe
        minStockAlerte: 0.5,        // Seuil d'alerte stock (50%)
        sessionTimeout: 3600000     // Timeout session (1h)
    },

    // Rôles utilisateurs
    roles: {
        ETUDIANT: 'etudiant',
        ENSEIGNANT: 'enseignant',
        TECHNICIEN: 'technicien',
        ADMIN: 'admin'
    },

    // Types de TP
    typesTP: [
        { id: 'usinage', label: 'Usinage' },
        { id: 'tournage', label: 'Tournage' },
        { id: 'fraisage', label: 'Fraisage' },
        { id: 'soudure', label: 'Soudure' },
        { id: 'montage', label: 'Montage' },
        { id: 'maintenance', label: 'Maintenance' },
        { id: 'electronique', label: 'Électronique' },
        { id: 'autre', label: 'Autre' }
    ],

    // Types de maintenance
    typesMaintenance: [
        { id: 'quotidienne', label: 'Quotidienne' },
        { id: 'hebdomadaire', label: 'Hebdomadaire' },
        { id: 'mensuelle', label: 'Mensuelle' },
        { id: 'trimestrielle', label: 'Trimestrielle' },
        { id: 'corrective', label: 'Corrective' },
        { id: 'preventive', label: 'Préventive' }
    ],

    // Catégories de stock
    categoriesStock: [
        { id: 'outils', label: 'Outils' },
        { id: 'materiaux', label: 'Matériaux' },
        { id: 'consommables', label: 'Consommables' },
        { id: 'epi', label: 'EPI' },
        { id: 'pieces', label: 'Pièces détachées' }
    ],

    // Équipements de protection
    epiDisponibles: [
        { id: 'lunettes', label: 'Lunettes de protection', icon: 'fa-glasses' },
        { id: 'gants', label: 'Gants', icon: 'fa-hand' },
        { id: 'casque', label: 'Casque', icon: 'fa-hard-hat' },
        { id: 'chaussures', label: 'Chaussures de sécurité', icon: 'fa-shoe-prints' },
        { id: 'blouse', label: 'Blouse', icon: 'fa-shirt' },
        { id: 'masque', label: 'Masque', icon: 'fa-head-side-mask' },
        { id: 'bouchons', label: 'Bouchons d\'oreilles', icon: 'fa-ear-listen' },
        { id: 'tablier', label: 'Tablier', icon: 'fa-vest' }
    ],

    // Niveaux d'études
    niveauxEtudes: [
        { id: 'l1', label: 'Licence 1' },
        { id: 'l2', label: 'Licence 2' },
        { id: 'l3', label: 'Licence 3' },
        { id: 'm1', label: 'Master 1' },
        { id: 'm2', label: 'Master 2' },
        { id: 'doctorat', label: 'Doctorat' }
    ],

    // Statuts machines
    statutsMachine: {
        DISPONIBLE: 'disponible',
        OCCUPEE: 'occupee',
        MAINTENANCE: 'maintenance',
        HORS_SERVICE: 'hors_service'
    },

    // Statuts TP
    statutsTP: {
        EN_COURS: 'en_cours',
        TERMINE: 'termine',
        INCOMPLET: 'incomplet'
    }
};

/**
 * Collections Firestore
 */
const COLLECTIONS = {
    USERS: 'users',
    TP: 'TP',
    MACHINES: 'machines',
    STOCKS: 'stocks',
    MAINTENANCE: 'maintenance'
};

/**
 * Messages d'erreur
 */
const ERROR_MESSAGES = {
    'auth/user-not-found': 'Aucun compte trouvé avec cet email.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/email-already-in-use': 'Cet email est déjà utilisé.',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
    'auth/invalid-email': 'Adresse email invalide.',
    'auth/network-request-failed': 'Erreur de connexion. Vérifiez votre connexion internet.',
    'permission-denied': 'Vous n\'avez pas les permissions nécessaires.',
    'default': 'Une erreur est survenue. Veuillez réessayer.'
};

/**
 * Obtenir le message d'erreur traduit
 */
function getErrorMessage(errorCode) {
    return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES['default'];
}

// Export pour utilisation dans les autres modules
window.FIREBASE_CONFIG = FIREBASE_CONFIG;
window.APP_CONFIG = APP_CONFIG;
window.COLLECTIONS = COLLECTIONS;
window.getErrorMessage = getErrorMessage;
/**
 * MODULE DE GESTION UTILISATEURS
 */


/**
 * MODULE DE GESTION DES DONNÉES
 */
const DataManager = {
    /**
     * TRAVAUX PRATIQUES (TP)
     */
    tp: {
        /**
         * Créer un nouveau TP
         */
        async create(tpData) {
            try {
                const user = AuthManager.getCurrentUser();
                if (!user) throw new Error('Utilisateur non connecté');

                const docRef = await db.collection('TP').add({
                    ...tpData,
                    createdBy: user.uid,
                    dateCreation: new Date(),
                    statut: 'planifie',
                    membres: tpData.membres || [user.uid],
                    machinesUtilisees: tpData.machinesUtilisees || [],
                    remarques: tpData.remarques || ''
                });

                console.log('✅ TP créé:', docRef.id);
                return { success: true, id: docRef.id };
            } catch (error) {
                console.error('❌ Erreur création TP:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Obtenir tous les TP (avec filtre optionnel)
         */
        async getAll(filterByUser = false) {
            try {
                let query = db.collection('TP');

                if (filterByUser) {
                    const user = AuthManager.getCurrentUser();
                    if (!user) throw new Error('Utilisateur non connecté');
                    query = query.where('createdBy', '==', user.uid);
                }

                const snapshot = await query.orderBy('dateDebut', 'desc').get();
                const tpList = [];

                snapshot.forEach(doc => {
                    tpList.push({ id: doc.id, ...doc.data() });
                });

                return { success: true, data: tpList };
            } catch (error) {
                console.error('❌ Erreur lecture TP:', error.message);
                return { success: false, error: error.message, data: [] };
            }
        },

        /**
         * Obtenir un TP spécifique
         */
        async getById(tpId) {
            try {
                const docSnap = await db.collection('TP').doc(tpId).get();
                if (!docSnap.exists) {
                    throw new Error('TP non trouvé');
                }
                return { success: true, data: { id: tpId, ...docSnap.data() } };
            } catch (error) {
                console.error('❌ Erreur lecture TP:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Mettre à jour un TP
         */
        async update(tpId, tpData) {
            try {
                await db.collection('TP').doc(tpId).update({
                    ...tpData,
                    dateModification: new Date()
                });

                console.log('✅ TP mis à jour:', tpId);
                return { success: true };
            } catch (error) {
                console.error('❌ Erreur mise à jour TP:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Supprimer un TP (admin seulement)
         */
        async delete(tpId) {
            try {
                const user = AuthManager.getCurrentUser();
                const userData = await AuthManager.getCurrentUserData();

                if (userData.role !== 'admin') {
                    throw new Error('Permission refusée');
                }

                await db.collection('TP').doc(tpId).delete();
                console.log('✅ TP supprimé:', tpId);
                return { success: true };
            } catch (error) {
                console.error('❌ Erreur suppression TP:', error.message);
                return { success: false, error: error.message };
            }
        }
    },

    /**
     * MACHINES
     */
    machines: {
        /**
         * Obtenir toutes les machines
         */
        async getAll() {
            try {
                const snapshot = await db.collection('machines').get();
                const machines = [];

                snapshot.forEach(doc => {
                    machines.push({ id: doc.id, ...doc.data() });
                });

                return { success: true, data: machines };
            } catch (error) {
                console.error('❌ Erreur lecture machines:', error.message);
                return { success: false, error: error.message, data: [] };
            }
        },

        /**
         * Créer une machine (admin)
         */
        async create(machineData) {
            try {
                const userData = await AuthManager.getCurrentUserData();
                if (userData.role !== 'admin') {
                    throw new Error('Permission refusée');
                }

                const docRef = await db.collection('machines').add({
                    ...machineData,
                    dateCreation: new Date(),
                    nombreHeuresUtilisation: 0
                });

                return { success: true, id: docRef.id };
            } catch (error) {
                console.error('❌ Erreur création machine:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Mettre à jour le statut d'une machine
         */
        async updateStatus(machineId, newStatus) {
            try {
                await db.collection('machines').doc(machineId).update({
                    statut: newStatus,
                    dateModification: new Date()
                });

                console.log('✅ Statut machine mis à jour:', machineId);
                return { success: true };
            } catch (error) {
                console.error('❌ Erreur mise à jour statut:', error.message);
                return { success: false, error: error.message };
            }
        }
    },

    /**
     * STOCKS
     */
    stocks: {
        /**
         * Obtenir tous les stocks
         */
        async getAll() {
            try {
                const snapshot = await db.collection('stocks').get();
                const stocks = [];

                snapshot.forEach(doc => {
                    stocks.push({ id: doc.id, ...doc.data() });
                });

                return { success: true, data: stocks };
            } catch (error) {
                console.error('❌ Erreur lecture stocks:', error.message);
                return { success: false, error: error.message, data: [] };
            }
        },

        /**
         * Créer un article de stock
         */
        async create(stockData) {
            try {
                const docRef = await db.collection('stocks').add({
                    ...stockData,
                    dateAjout: new Date()
                });

                return { success: true, id: docRef.id };
            } catch (error) {
                console.error('❌ Erreur création stock:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Mettre à jour la quantité
         */
        async updateQuantity(stockId, newQuantity) {
            try {
                await db.collection('stocks').doc(stockId).update({
                    quantite: newQuantity,
                    dateModification: new Date()
                });

                return { success: true };
            } catch (error) {
                console.error('❌ Erreur mise à jour quantité:', error.message);
                return { success: false, error: error.message };
            }
        }
    },

    /**
     * MAINTENANCE
     */
    maintenance: {
        /**
         * Obtenir toutes les tâches de maintenance
         */
        async getAll() {
            try {
                const snapshot = await db.collection('maintenance')
                    .orderBy('datePrevu', 'asc')
                    .get();
                const tasks = [];

                snapshot.forEach(doc => {
                    tasks.push({ id: doc.id, ...doc.data() });
                });

                return { success: true, data: tasks };
            } catch (error) {
                console.error('❌ Erreur lecture maintenance:', error.message);
                return { success: false, error: error.message, data: [] };
            }
        },

        /**
         * Créer une tâche de maintenance
         */
        async create(maintenanceData) {
            try {
                const docRef = await db.collection('maintenance').add({
                    ...maintenanceData,
                    dateCreation: new Date(),
                    statut: 'planifie'
                });

                return { success: true, id: docRef.id };
            } catch (error) {
                console.error('❌ Erreur création maintenance:', error.message);
                return { success: false, error: error.message };
            }
        },

        /**
         * Marquer comme complétée
         */
        async complete(maintenanceId, notes = '') {
            try {
                await db.collection('maintenance').doc(maintenanceId).update({
                    statut: 'termine',
                    dateRealisation: new Date(),
                    notes: notes
                });

                return { success: true };
            } catch (error) {
                console.error('❌ Erreur completion maintenance:', error.message);
                return { success: false, error: error.message };
            }
        }
    },

    /**
     * UTILISATEURS
     */
    users: {
        /**
         * Obtenir tous les utilisateurs (admin)
         */
        async getAll() {
            try {
                const userData = await AuthManager.getCurrentUserData();
                if (userData.role !== 'admin') {
                    throw new Error('Permission refusée');
                }

                const snapshot = await db.collection('users').get();
                const users = [];

                snapshot.forEach(doc => {
                    users.push({ id: doc.id, uid: doc.id, ...doc.data() });
                });

                return { success: true, data: users };
            } catch (error) {
                console.error('❌ Erreur lecture utilisateurs:', error.message);
                return { success: false, error: error.message, data: [] };
            }
        },

        /**
         * Obtenir un utilisateur par ID
         */
        async getById(uid) {
            try {
                const docSnap = await db.collection('users').doc(uid).get();
                if (docSnap.exists) {
                    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
                }
                return { success: false, error: 'Utilisateur non trouvé', data: null };
            } catch (error) {
                console.error('❌ Erreur lecture utilisateur:', error.message);
                return { success: false, error: error.message, data: null };
            }
        },

        /**
         * Mettre à jour un utilisateur (admin)
         */
        async update(uid, userData) {
            try {
                const currentUser = await AuthManager.getCurrentUserData();
                if (currentUser.role !== 'admin') {
                    throw new Error('Permission refusée');
                }

                await db.collection('users').doc(uid).update(userData);
                return { success: true };
            } catch (error) {
                console.error('❌ Erreur mise à jour utilisateur:', error.message);
                return { success: false, error: error.message };
            }
        }
    }
};

/**
 * Écouter les changements en temps réel (listener)
 */
const RealtimeListener = {
    /**
     * Écouter les changements de TP
     */
    onTPChange(callback) {
        return db.collection('TP').orderBy('dateCreation', 'desc')
            .onSnapshot(snapshot => {
                const tpList = [];
                snapshot.forEach(doc => {
                    tpList.push({ id: doc.id, ...doc.data() });
                });
                callback(tpList);
            });
    },

    /**
     * Écouter les changements de machines
     */
    onMachinesChange(callback) {
        return db.collection('machines')
            .onSnapshot(snapshot => {
                const machines = [];
                snapshot.forEach(doc => {
                    machines.push({ id: doc.id, ...doc.data() });
                });
                callback(machines);
            });
    },

    /**
     * Écouter les changements de stocks
     */
    onStocksChange(callback) {
        return db.collection('stocks')
            .onSnapshot(snapshot => {
                const stocks = [];
                snapshot.forEach(doc => {
                    stocks.push({ id: doc.id, ...doc.data() });
                });
                callback(stocks);
            });
    }
};

// Make Globally Available
window.DataManager = DataManager;
window.RealtimeListener = RealtimeListener;

console.log('✅ Firebase Config Loaded');