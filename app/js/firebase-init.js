/* ============================================
   ESIG ATELIER - Initialisation Firebase
   ============================================ */

/**
 * Ce fichier initialise Firebase et expose les services
 * nécessaires à l'application.
 */

// Variables globales pour les services Firebase
let db = null;
let auth = null;
let firebaseInitialized = false;

/**
 * Initialiser Firebase
 */
async function initializeFirebase() {
    if (firebaseInitialized) {
        return { db, auth };
    }

    try {
        // Vérifier que Firebase est chargé
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK non chargé');
        }

        // Vérifier que la configuration est valide
        if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'VOTRE_API_KEY') {
            console.warn('Configuration Firebase non définie. Mode démo activé.');
            return initializeDemoMode();
        }

        // Initialiser Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }

        // Obtenir les références des services
        db = firebase.firestore();
        auth = firebase.auth();

        // Configurer la persistance Firestore
        await db.enablePersistence({ synchronizeTabs: true })
            .catch(err => {
                if (err.code === 'failed-precondition') {
                    console.warn('Persistance impossible : plusieurs onglets ouverts');
                } else if (err.code === 'unimplemented') {
                    console.warn('Persistance non supportée par ce navigateur');
                }
            });

        // Configurer la persistance Auth
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        firebaseInitialized = true;
        console.log('Firebase initialisé avec succès');

        return { db, auth };

    } catch (error) {
        console.error('Erreur initialisation Firebase:', error);
        return initializeDemoMode();
    }
}

/**
 * Mode démo (sans Firebase)
 * Utilise localStorage comme fallback
 */
function initializeDemoMode() {
    console.log('Mode démo activé - Données stockées localement');

    // Créer des objets simulant Firebase
    db = createDemoFirestore();
    auth = createDemoAuth();

    firebaseInitialized = true;
    window.DEMO_MODE = true;

    return { db, auth };
}

/**
 * Créer un Firestore simulé
 */
function createDemoFirestore() {
    const getCollection = (name) => {
        const data = JSON.parse(localStorage.getItem(`esig_${name}`) || '[]');
        return data;
    };

    const saveCollection = (name, data) => {
        localStorage.setItem(`esig_${name}`, JSON.stringify(data));
    };

    return {
        collection: (name) => ({
            // Ajouter un document
            add: async (data) => {
                const items = getCollection(name);
                const id = 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                const newDoc = { ...data, id, createdAt: new Date().toISOString() };
                items.push(newDoc);
                saveCollection(name, items);
                return { id };
            },

            // Obtenir un document par ID
            doc: (id) => ({
                get: async () => {
                    const items = getCollection(name);
                    const item = items.find(i => i.id === id);
                    return {
                        exists: !!item,
                        id,
                        data: () => item
                    };
                },
                set: async (data, options = {}) => {
                    const items = getCollection(name);
                    const index = items.findIndex(i => i.id === id);
                    if (index >= 0) {
                        items[index] = options.merge ? { ...items[index], ...data } : { ...data, id };
                    } else {
                        items.push({ ...data, id });
                    }
                    saveCollection(name, items);
                },
                update: async (data) => {
                    const items = getCollection(name);
                    const index = items.findIndex(i => i.id === id);
                    if (index >= 0) {
                        items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
                        saveCollection(name, items);
                    }
                },
                delete: async () => {
                    const items = getCollection(name);
                    const filtered = items.filter(i => i.id !== id);
                    saveCollection(name, filtered);
                },
                onSnapshot: (callback) => {
                    const items = getCollection(name);
                    const item = items.find(i => i.id === id);
                    callback({
                        exists: !!item,
                        id,
                        data: () => item
                    });
                    return () => {}; // unsubscribe
                }
            }),

            // Obtenir tous les documents
            get: async () => {
                const items = getCollection(name);
                return {
                    docs: items.map(item => ({
                        id: item.id,
                        data: () => item
                    })),
                    forEach: (fn) => items.forEach((item, i) => fn({
                        id: item.id,
                        data: () => item
                    }))
                };
            },

            // Requête where
            where: (field, operator, value) => ({
                get: async () => {
                    const items = getCollection(name);
                    const filtered = items.filter(item => {
                        const fieldValue = item[field];
                        switch (operator) {
                            case '==': return fieldValue === value;
                            case '!=': return fieldValue !== value;
                            case '>': return fieldValue > value;
                            case '>=': return fieldValue >= value;
                            case '<': return fieldValue < value;
                            case '<=': return fieldValue <= value;
                            case 'array-contains': return Array.isArray(fieldValue) && fieldValue.includes(value);
                            default: return true;
                        }
                    });
                    return {
                        docs: filtered.map(item => ({
                            id: item.id,
                            data: () => item
                        }))
                    };
                },
                where: function(field2, operator2, value2) {
                    return this; // Simplification pour le mode démo
                },
                orderBy: function() { return this; },
                limit: function() { return this; },
                onSnapshot: (callback) => {
                    const items = getCollection(name);
                    callback({
                        docs: items.map(item => ({
                            id: item.id,
                            data: () => item
                        }))
                    });
                    return () => {};
                }
            }),

            // Écouter les changements
            onSnapshot: (callback) => {
                const items = getCollection(name);
                callback({
                    docs: items.map(item => ({
                        id: item.id,
                        data: () => item
                    }))
                });
                // En mode démo, pas de vraie écoute temps réel
                return () => {};
            },

            orderBy: function() { return this; },
            limit: function() { return this; }
        })
    };
}

/**
 * Créer un Auth simulé
 */
function createDemoAuth() {
    let currentUser = JSON.parse(localStorage.getItem('esig_current_user') || 'null');
    const authStateListeners = [];

    return {
        currentUser,

        // Créer un compte
        createUserWithEmailAndPassword: async (email, password) => {
            const users = JSON.parse(localStorage.getItem('esig_users') || '[]');

            if (users.find(u => u.email === email)) {
                throw { code: 'auth/email-already-in-use' };
            }

            const uid = 'user_' + Date.now();
            const user = { uid, email };
            users.push({ ...user, password }); // Note: En prod, ne jamais stocker le mdp en clair!
            localStorage.setItem('esig_users', JSON.stringify(users));

            currentUser = user;
            localStorage.setItem('esig_current_user', JSON.stringify(user));
            authStateListeners.forEach(fn => fn(user));

            return { user };
        },

        // Connexion
        signInWithEmailAndPassword: async (email, password) => {
            const users = JSON.parse(localStorage.getItem('esig_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                throw { code: 'auth/wrong-password' };
            }

            currentUser = { uid: user.uid, email: user.email };
            localStorage.setItem('esig_current_user', JSON.stringify(currentUser));
            authStateListeners.forEach(fn => fn(currentUser));

            return { user: currentUser };
        },

        // Déconnexion
        signOut: async () => {
            currentUser = null;
            localStorage.removeItem('esig_current_user');
            authStateListeners.forEach(fn => fn(null));
        },

        // Écouter les changements d'état
        onAuthStateChanged: (callback) => {
            authStateListeners.push(callback);
            callback(currentUser);
            return () => {
                const index = authStateListeners.indexOf(callback);
                if (index > -1) authStateListeners.splice(index, 1);
            };
        },

        // Réinitialiser le mot de passe
        sendPasswordResetEmail: async (email) => {
            console.log('Email de réinitialisation envoyé à:', email);
            // En mode démo, on simule juste l'envoi
        }
    };
}

/**
 * Obtenir l'instance Firestore
 */
function getFirestore() {
    return db;
}

/**
 * Obtenir l'instance Auth
 */
function getAuth() {
    return auth;
}

// Exposer les fonctions globalement
window.initializeFirebase = initializeFirebase;
window.getFirestore = getFirestore;
window.getAuth = getAuth;
