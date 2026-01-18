/* ============================================
   ESIG ATELIER - Module Base de données
   ============================================ */

/**
 * Gestionnaire de données pour les TP
 */
const TPManager = {
    /**
     * Créer un nouveau TP
     */
    async create(tpData) {
        try {
            const db = getFirestore();
            const user = AuthManager.getCurrentUser();

            const tp = {
                date: tpData.date,
                heureDebut: tpData.heureDebut,
                heureFin: tpData.heureFin,
                machineId: tpData.machineId,
                machineName: tpData.machineName || '',
                typeTP: tpData.typeTP,
                membres: tpData.membres || [],
                epi: tpData.epi || [],
                description: tpData.description || '',
                statut: tpData.statut || APP_CONFIG.statutsTP.EN_COURS,
                createdBy: user?.uid || 'anonymous',
                createdByName: AuthManager.getDisplayName(),
                dateCreation: new Date().toISOString(),
                dateModification: new Date().toISOString()
            };

            const docRef = await db.collection(COLLECTIONS.TP).add(tp);
            return { success: true, id: docRef.id, data: tp };

        } catch (error) {
            console.error('Erreur création TP:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Obtenir tous les TP
     */
    async getAll(options = {}) {
        try {
            const db = getFirestore();
            let query = db.collection(COLLECTIONS.TP);

            // Filtrer par utilisateur si demandé
            if (options.userId) {
                query = query.where('createdBy', '==', options.userId);
            }

            // Filtrer par date
            if (options.dateDebut) {
                query = query.where('date', '>=', options.dateDebut);
            }
            if (options.dateFin) {
                query = query.where('date', '<=', options.dateFin);
            }

            const snapshot = await query.get();
            const tps = [];

            snapshot.forEach(doc => {
                tps.push({ id: doc.id, ...doc.data() });
            });

            // Trier par date décroissante
            tps.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));

            return { success: true, data: tps };

        } catch (error) {
            console.error('Erreur récupération TP:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Obtenir un TP par ID
     */
    async getById(id) {
        try {
            const db = getFirestore();
            const doc = await db.collection(COLLECTIONS.TP).doc(id).get();

            if (!doc.exists) {
                return { success: false, error: 'TP non trouvé' };
            }

            return { success: true, data: { id: doc.id, ...doc.data() } };

        } catch (error) {
            console.error('Erreur récupération TP:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mettre à jour un TP
     */
    async update(id, tpData) {
        try {
            const db = getFirestore();
            const updateData = {
                ...tpData,
                dateModification: new Date().toISOString()
            };

            await db.collection(COLLECTIONS.TP).doc(id).update(updateData);
            return { success: true };

        } catch (error) {
            console.error('Erreur mise à jour TP:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Supprimer un TP
     */
    async delete(id) {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.TP).doc(id).delete();
            return { success: true };

        } catch (error) {
            console.error('Erreur suppression TP:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Écouter les changements en temps réel
     */
    onSnapshot(callback, options = {}) {
        const db = getFirestore();
        let query = db.collection(COLLECTIONS.TP);

        if (options.userId) {
            query = query.where('createdBy', '==', options.userId);
        }

        return query.onSnapshot(snapshot => {
            const tps = [];
            snapshot.forEach(doc => {
                tps.push({ id: doc.id, ...doc.data() });
            });
            tps.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation));
            callback(tps);
        });
    }
};

/**
 * Gestionnaire de données pour les Machines
 */
const MachineManager = {
    /**
     * Créer une nouvelle machine
     */
    async create(machineData) {
        try {
            const db = getFirestore();

            const machine = {
                nom: machineData.nom,
                reference: machineData.reference || '',
                puissance: machineData.puissance || '',
                statut: machineData.statut || APP_CONFIG.statutsMachine.DISPONIBLE,
                heuresUtilisation: machineData.heuresUtilisation || 0,
                description: machineData.description || '',
                dateCreation: new Date().toISOString(),
                dateModification: new Date().toISOString()
            };

            const docRef = await db.collection(COLLECTIONS.MACHINES).add(machine);
            return { success: true, id: docRef.id, data: machine };

        } catch (error) {
            console.error('Erreur création machine:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Obtenir toutes les machines
     */
    async getAll() {
        try {
            const db = getFirestore();
            const snapshot = await db.collection(COLLECTIONS.MACHINES).get();
            const machines = [];

            snapshot.forEach(doc => {
                machines.push({ id: doc.id, ...doc.data() });
            });

            machines.sort((a, b) => a.nom.localeCompare(b.nom));
            return { success: true, data: machines };

        } catch (error) {
            console.error('Erreur récupération machines:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Mettre à jour une machine
     */
    async update(id, machineData) {
        try {
            const db = getFirestore();
            const updateData = {
                ...machineData,
                dateModification: new Date().toISOString()
            };

            await db.collection(COLLECTIONS.MACHINES).doc(id).update(updateData);
            return { success: true };

        } catch (error) {
            console.error('Erreur mise à jour machine:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Changer le statut d'une machine
     */
    async updateStatus(id, statut) {
        return this.update(id, { statut });
    },

    /**
     * Supprimer une machine
     */
    async delete(id) {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.MACHINES).doc(id).delete();
            return { success: true };

        } catch (error) {
            console.error('Erreur suppression machine:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Écouter les changements en temps réel
     */
    onSnapshot(callback) {
        const db = getFirestore();
        return db.collection(COLLECTIONS.MACHINES).onSnapshot(snapshot => {
            const machines = [];
            snapshot.forEach(doc => {
                machines.push({ id: doc.id, ...doc.data() });
            });
            machines.sort((a, b) => a.nom.localeCompare(b.nom));
            callback(machines);
        });
    }
};

/**
 * Gestionnaire de données pour les Stocks
 */
const StockManager = {
    /**
     * Créer un nouvel article
     */
    async create(stockData) {
        try {
            const db = getFirestore();

            const stock = {
                nom: stockData.nom,
                quantite: stockData.quantite || 0,
                quantiteMin: stockData.quantiteMin || 0,
                categorie: stockData.categorie || 'autres',
                unite: stockData.unite || 'unité',
                description: stockData.description || '',
                dateCreation: new Date().toISOString(),
                dateModification: new Date().toISOString()
            };

            const docRef = await db.collection(COLLECTIONS.STOCKS).add(stock);
            return { success: true, id: docRef.id, data: stock };

        } catch (error) {
            console.error('Erreur création stock:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Obtenir tout le stock
     */
    async getAll() {
        try {
            const db = getFirestore();
            const snapshot = await db.collection(COLLECTIONS.STOCKS).get();
            const stocks = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                // Calculer le statut d'urgence
                const ratio = data.quantite / (data.quantiteMin || 1);
                let statut = 'ok';
                if (ratio <= 0.5) statut = 'urgent';
                else if (ratio <= 1) statut = 'faible';

                stocks.push({ id: doc.id, ...data, statut });
            });

            stocks.sort((a, b) => a.nom.localeCompare(b.nom));
            return { success: true, data: stocks };

        } catch (error) {
            console.error('Erreur récupération stock:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Mettre à jour un article
     */
    async update(id, stockData) {
        try {
            const db = getFirestore();
            const updateData = {
                ...stockData,
                dateModification: new Date().toISOString()
            };

            await db.collection(COLLECTIONS.STOCKS).doc(id).update(updateData);
            return { success: true };

        } catch (error) {
            console.error('Erreur mise à jour stock:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mettre à jour la quantité
     */
    async updateQuantity(id, quantite) {
        return this.update(id, { quantite });
    },

    /**
     * Supprimer un article
     */
    async delete(id) {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.STOCKS).doc(id).delete();
            return { success: true };

        } catch (error) {
            console.error('Erreur suppression stock:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Écouter les changements en temps réel
     */
    onSnapshot(callback) {
        const db = getFirestore();
        return db.collection(COLLECTIONS.STOCKS).onSnapshot(snapshot => {
            const stocks = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const ratio = data.quantite / (data.quantiteMin || 1);
                let statut = 'ok';
                if (ratio <= 0.5) statut = 'urgent';
                else if (ratio <= 1) statut = 'faible';
                stocks.push({ id: doc.id, ...data, statut });
            });
            stocks.sort((a, b) => a.nom.localeCompare(b.nom));
            callback(stocks);
        });
    }
};

/**
 * Gestionnaire de données pour la Maintenance
 */
const MaintenanceManager = {
    /**
     * Créer une nouvelle tâche
     */
    async create(maintenanceData) {
        try {
            const db = getFirestore();

            const maintenance = {
                machineId: maintenanceData.machineId,
                machineName: maintenanceData.machineName || '',
                type: maintenanceData.type,
                description: maintenanceData.description || '',
                responsable: maintenanceData.responsable || '',
                datePlanifiee: maintenanceData.datePlanifiee,
                statut: 'planifie',
                dateCreation: new Date().toISOString(),
                dateModification: new Date().toISOString()
            };

            const docRef = await db.collection(COLLECTIONS.MAINTENANCE).add(maintenance);
            return { success: true, id: docRef.id, data: maintenance };

        } catch (error) {
            console.error('Erreur création maintenance:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Obtenir toutes les tâches
     */
    async getAll() {
        try {
            const db = getFirestore();
            const snapshot = await db.collection(COLLECTIONS.MAINTENANCE).get();
            const tasks = [];

            snapshot.forEach(doc => {
                tasks.push({ id: doc.id, ...doc.data() });
            });

            tasks.sort((a, b) => new Date(b.datePlanifiee) - new Date(a.datePlanifiee));
            return { success: true, data: tasks };

        } catch (error) {
            console.error('Erreur récupération maintenance:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Marquer comme effectuée
     */
    async complete(id, notes = '') {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.MAINTENANCE).doc(id).update({
                statut: 'effectue',
                notes: notes,
                dateRealisation: new Date().toISOString(),
                dateModification: new Date().toISOString()
            });
            return { success: true };

        } catch (error) {
            console.error('Erreur complétion maintenance:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Supprimer une tâche
     */
    async delete(id) {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.MAINTENANCE).doc(id).delete();
            return { success: true };

        } catch (error) {
            console.error('Erreur suppression maintenance:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Écouter les changements en temps réel
     */
    onSnapshot(callback) {
        const db = getFirestore();
        return db.collection(COLLECTIONS.MAINTENANCE).onSnapshot(snapshot => {
            const tasks = [];
            snapshot.forEach(doc => {
                tasks.push({ id: doc.id, ...doc.data() });
            });
            tasks.sort((a, b) => new Date(b.datePlanifiee) - new Date(a.datePlanifiee));
            callback(tasks);
        });
    }
};

/**
 * Gestionnaire des utilisateurs (admin uniquement)
 */
const UserManager = {
    /**
     * Obtenir tous les utilisateurs
     */
    async getAll() {
        try {
            const db = getFirestore();
            const snapshot = await db.collection(COLLECTIONS.USERS).get();
            const users = [];

            snapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });

            users.sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
            return { success: true, data: users };

        } catch (error) {
            console.error('Erreur récupération utilisateurs:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    /**
     * Mettre à jour un utilisateur
     */
    async update(id, userData) {
        try {
            const db = getFirestore();
            await db.collection(COLLECTIONS.USERS).doc(id).update(userData);
            return { success: true };

        } catch (error) {
            console.error('Erreur mise à jour utilisateur:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Désactiver un utilisateur
     */
    async disable(id) {
        return this.update(id, { actif: false });
    },

    /**
     * Activer un utilisateur
     */
    async enable(id) {
        return this.update(id, { actif: true });
    },

    /**
     * Changer le rôle
     */
    async setRole(id, role) {
        return this.update(id, { role });
    },

    /**
     * Écouter les changements en temps réel
     */
    onSnapshot(callback) {
        const db = getFirestore();
        return db.collection(COLLECTIONS.USERS).onSnapshot(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });
            users.sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
            callback(users);
        });
    }
};

// Exposer globalement
window.TPManager = TPManager;
window.MachineManager = MachineManager;
window.StockManager = StockManager;
window.MaintenanceManager = MaintenanceManager;
window.UserManager = UserManager;
