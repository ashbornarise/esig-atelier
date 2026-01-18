/* ============================================
   ESIG ATELIER - Module d'authentification
   ============================================ */

/**
 * Gestionnaire d'authentification
 */
const AuthManager = {
    currentUser: null,
    currentUserData: null,
    authStateListeners: [],

    /**
     * Initialiser le gestionnaire d'auth
     */
    async init() {
        const { auth } = await initializeFirebase();

        auth.onAuthStateChanged(async (user) => {
            this.currentUser = user;

            if (user) {
                // Charger les données utilisateur depuis Firestore
                await this.loadUserData(user.uid);
            } else {
                this.currentUserData = null;
            }

            // Notifier tous les listeners
            this.authStateListeners.forEach(fn => fn(user, this.currentUserData));
        });
    },

    /**
     * Charger les données utilisateur
     */
    async loadUserData(uid) {
        try {
            const db = getFirestore();
            const docRef = db.collection(COLLECTIONS.USERS).doc(uid);
            const doc = await docRef.get();

            if (doc.exists) {
                this.currentUserData = { id: doc.id, ...doc.data() };
            }

            return this.currentUserData;
        } catch (error) {
            console.error('Erreur chargement données utilisateur:', error);
            return null;
        }
    },

    /**
     * Inscription d'un nouvel utilisateur
     */
    async register(email, password, userData) {
        try {
            const auth = getAuth();
            const db = getFirestore();

            // Créer le compte Firebase Auth
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            // Créer le document utilisateur dans Firestore
            const userDoc = {
                email: email,
                nom: userData.nom || '',
                prenom: userData.prenom || '',
                matricule: userData.matricule || '',
                role: userData.role || APP_CONFIG.roles.ETUDIANT,
                niveau: userData.niveau || '',
                telephone: userData.telephone || '',
                actif: true,
                dateCreation: new Date().toISOString(),
                derniereConnexion: new Date().toISOString()
            };

            await db.collection(COLLECTIONS.USERS).doc(user.uid).set(userDoc);

            // Charger les données
            this.currentUserData = { id: user.uid, ...userDoc };

            return { success: true, user, userData: this.currentUserData };

        } catch (error) {
            console.error('Erreur inscription:', error);
            return { success: false, error: getErrorMessage(error.code) };
        }
    },

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
        try {
            const auth = getAuth();
            const { user } = await auth.signInWithEmailAndPassword(email, password);

            // Mettre à jour la dernière connexion
            const db = getFirestore();
            await db.collection(COLLECTIONS.USERS).doc(user.uid).update({
                derniereConnexion: new Date().toISOString()
            });

            // Charger les données utilisateur
            await this.loadUserData(user.uid);

            return { success: true, user, userData: this.currentUserData };

        } catch (error) {
            console.error('Erreur connexion:', error);
            return { success: false, error: getErrorMessage(error.code) };
        }
    },

    /**
     * Déconnexion
     */
    async logout() {
        try {
            const auth = getAuth();
            await auth.signOut();
            this.currentUser = null;
            this.currentUserData = null;
            return { success: true };
        } catch (error) {
            console.error('Erreur déconnexion:', error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Réinitialiser le mot de passe
     */
    async resetPassword(email) {
        try {
            const auth = getAuth();
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            console.error('Erreur réinitialisation:', error);
            return { success: false, error: getErrorMessage(error.code) };
        }
    },

    /**
     * Vérifier si l'utilisateur est connecté
     */
    isLoggedIn() {
        return !!this.currentUser;
    },

    /**
     * Vérifier si l'utilisateur est admin
     */
    isAdmin() {
        return this.currentUserData?.role === APP_CONFIG.roles.ADMIN;
    },

    /**
     * Vérifier si l'utilisateur a un rôle spécifique
     */
    hasRole(role) {
        return this.currentUserData?.role === role;
    },

    /**
     * Obtenir l'utilisateur actuel
     */
    getCurrentUser() {
        return this.currentUser;
    },

    /**
     * Obtenir les données de l'utilisateur actuel
     */
    getCurrentUserData() {
        return this.currentUserData;
    },

    /**
     * Écouter les changements d'état d'authentification
     */
    onAuthStateChanged(callback) {
        this.authStateListeners.push(callback);

        // Appeler immédiatement avec l'état actuel
        if (this.currentUser !== undefined) {
            callback(this.currentUser, this.currentUserData);
        }

        // Retourner une fonction pour se désabonner
        return () => {
            const index = this.authStateListeners.indexOf(callback);
            if (index > -1) {
                this.authStateListeners.splice(index, 1);
            }
        };
    },

    /**
     * Obtenir le nom complet de l'utilisateur
     */
    getDisplayName() {
        if (!this.currentUserData) return 'Utilisateur';
        const { prenom, nom } = this.currentUserData;
        return `${prenom || ''} ${nom || ''}`.trim() || 'Utilisateur';
    },

    /**
     * Obtenir les initiales de l'utilisateur
     */
    getInitials() {
        if (!this.currentUserData) return 'U';
        const { prenom, nom } = this.currentUserData;
        const p = prenom ? prenom.charAt(0).toUpperCase() : '';
        const n = nom ? nom.charAt(0).toUpperCase() : '';
        return (p + n) || 'U';
    },

    /**
     * Obtenir le label du rôle
     */
    getRoleLabel() {
        const roleLabels = {
            [APP_CONFIG.roles.ETUDIANT]: 'Étudiant',
            [APP_CONFIG.roles.ENSEIGNANT]: 'Enseignant',
            [APP_CONFIG.roles.TECHNICIEN]: 'Technicien',
            [APP_CONFIG.roles.ADMIN]: 'Administrateur'
        };
        return roleLabels[this.currentUserData?.role] || 'Utilisateur';
    }
};

// Exposer globalement
window.AuthManager = AuthManager;
