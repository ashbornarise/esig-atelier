/**
 * ESIG Atelier - Configuration Firebase
 * À personnaliser avec vos données Firebase
 */

// ⚠️ ATTENTION : À REMPLACER avec vos vraies identifiants Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAea4DBzfIOs8vNqPu2e3lJKQLNq9wvgDI",
  authDomain: "esig-atelier-64235.firebaseapp.com",
  projectId: "esig-atelier-64235",
  storageBucket: "esig-atelier-64235.firebasestorage.app",
  messagingSenderId: "396237846057",
  appId: "1:396237846057:web:f79ebfc3fa80ab91564e38",
  measurementId: "G-STBRS9H0C4"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Références aux services
const auth = firebase.auth();
const db = firebase.firestore();

// Activer persistence locale (offline support)
db.enablePersistence().catch((err) => {
    console.warn('Persistence unavailable:', err);
});

/**
 * MODULE DE GESTION UTILISATEURS
 */
const AuthManager = {
    /**
     * Inscription utilisateur
     */
    async register(email, password, userData) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;

            // Sauvegarder les données utilisateur
            await db.collection('users').doc(uid).set({
                email: email,
                nom: userData.nom || '',
                prenom: userData.prenom || '',
                role: userData.role || 'etudiant',
                niveau: userData.niveau || '',
                groupe: userData.groupe || '',
                dateCreation: new Date(),
                actif: true,
                photoURL: null,
                phone: userData.phone || '',
                adresse: userData.adresse || ''
            });

            console.log('✅ Inscription réussie:', uid);
            return { success: true, uid };
        } catch (error) {
            console.error('❌ Erreur inscription:', error.message);
            return { success: false, error: error.message };
        }
    },

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('✅ Connexion réussie:', userCredential.user.email);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('❌ Erreur connexion:', error.message);
            return { success: false, error: error.message };
        }
    },

    /**
     * Déconnexion
     */
    async logout() {
        try {
            await auth.signOut();
            console.log('✅ Déconnexion réussie');
            return { success: true };
        } catch (error) {
            console.error('❌ Erreur déconnexion:', error.message);
            return { success: false, error: error.message };
        }
    },

    /**
     * Obtenir l'utilisateur connecté
     */
    getCurrentUser() {
        return auth.currentUser;
    },

    /**
     * Écouter les changements d'authentification
     */
    onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(callback);
    },

    /**
     * Obtenir les données de l'utilisateur connecté
     */
    async getCurrentUserData() {
        const user = auth.currentUser;
        if (!user) return null;

        const docSnap = await db.collection('users').doc(user.uid).get();
        return docSnap.exists ? { uid: user.uid, ...docSnap.data() } : null;
    },

    /**
     * Obtenir le rôle de l'utilisateur
     */
    async getUserRole(uid) {
        try {
            const docSnap = await db.collection('users').doc(uid).get();
            if (docSnap.exists) {
                return docSnap.data().role;
            }
            return null;
        } catch (error) {
            console.error('Erreur lors de la lecture du rôle:', error);
            return null;
        }
    }
};

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

                const docRef = await db.collection('tp').add({
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
                let query = db.collection('tp');

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
                const docSnap = await db.collection('tp').doc(tpId).get();
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
                await db.collection('tp').doc(tpId).update({
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

                await db.collection('tp').doc(tpId).delete();
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
        return db.collection('tp').orderBy('dateCreation', 'desc')
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

console.log('✅ Firebase Config Loaded');
