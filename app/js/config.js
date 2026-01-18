/* ============================================
   ESIG ATELIER - Configuration Firebase
   ============================================ */

/**
 * IMPORTANT : Remplacez ces valeurs par vos propres clés Firebase
 *
 * Pour obtenir ces valeurs :
 * 1. Allez sur https://console.firebase.google.com/
 * 2. Créez un nouveau projet ou sélectionnez "esig-atelier"
 * 3. Allez dans Paramètres du projet > Général
 * 4. Faites défiler jusqu'à "Vos applications"
 * 5. Cliquez sur l'icône Web (</>)
 * 6. Copiez les valeurs de firebaseConfig
 */

const FIREBASE_CONFIG = {
    apiKey: "VOTRE_API_KEY",
    authDomain: "esig-atelier.firebaseapp.com",
    projectId: "esig-atelier",
    storageBucket: "esig-atelier.appspot.com",
    messagingSenderId: "VOTRE_SENDER_ID",
    appId: "VOTRE_APP_ID"
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
    TP: 'tp',
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
