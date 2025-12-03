// Configuration de l'application ESIG Global Success
// Modifiez ce fichier pour personnaliser votre installation

const ESIG_CONFIG = {
  // INFORMATIONS DE L'ÉTABLISSEMENT
  etablissement: {
    nom: "ESIG Global Success",
    nomComplet: "École Supérieure d'Ingénierie et de Gestion",
    devise: "Vocatio Excellentiae",
    ville: "Lomé",
    pays: "Togo",
    email: "atelier@esig-globalsuccess.tg",
    telephone: "+228 XX XX XX XX",
    siteWeb: "https://esig-globalsuccess.tg"
  },

  // CONFIGURATION GOOGLE SHEETS
  googleSheets: {
    enabled: false, // Mettre à true après configuration
    spreadsheetId: "", // À remplir avec votre ID Google Sheet
    apiKey: "", // Optionnel au début
    sheetsNames: {
      tp: "TP",
      machines: "Machines",
      stock: "Stock",
      maintenance: "Maintenance",
      users: "Utilisateurs"
    }
  },

  // PARAMÈTRES DE L'APPLICATION
  app: {
    version: "1.0.0",
    nom: "ESIG Atelier",
    description: "Application de gestion d'atelier",
    langue: "fr",
    timezone: "Africa/Lome"
  },

  // LIMITES ET RESTRICTIONS
  limites: {
    maxTPDuration: 4, // Durée maximale d'un TP en heures
    maxMembresParGroupe: 6,
    minStockAlert: 0.5, // Alerter quand le stock est à 50% du minimum
    autoSaveInterval: 300000 // Auto-sauvegarde toutes les 5 minutes (en ms)
  },

  // COULEURS DE L'INTERFACE
  theme: {
    primary: "#1a365d",
    secondary: "#2563eb",
    accent: "#f59e0b",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    light: "#f3f4f6",
    dark: "#1f2937"
  },

  // CATÉGORIES DE STOCK
  categoriesStock: [
    { value: "outils", label: "Outils" },
    { value: "materiaux", label: "Matériaux" },
    { value: "consommables", label: "Consommables" },
    { value: "epi", label: "Équipements de Protection Individuelle (EPI)" },
    { value: "pieces", label: "Pièces de rechange" }
  ],

  // TYPES DE TRAVAUX PRATIQUES
  typesTP: [
    { value: "usinage", label: "Usinage" },
    { value: "tournage", label: "Tournage" },
    { value: "fraisage", label: "Fraisage" },
    { value: "soudure", label: "Soudure" },
    { value: "montage", label: "Montage/Assemblage" },
    { value: "maintenance", label: "Maintenance" },
    { value: "cao", label: "CAO/DAO" },
    { value: "automatisme", label: "Automatisme" }
  ],

  // TYPES DE MAINTENANCE
  typesMaintenance: [
    { value: "quotidienne", label: "Quotidienne", couleur: "#10b981" },
    { value: "hebdo", label: "Hebdomadaire", couleur: "#2563eb" },
    { value: "mensuelle", label: "Mensuelle", couleur: "#f59e0b" },
    { value: "trimestrielle", label: "Trimestrielle", couleur: "#8b5cf6" },
    { value: "annuelle", label: "Annuelle", couleur: "#ef4444" },
    { value: "corrective", label: "Corrective", couleur: "#dc2626" }
  ],

  // ÉQUIPEMENTS DE PROTECTION INDIVIDUELLE
  epiDisponibles: [
    { value: "casque", label: "Casque de sécurité", obligatoire: true },
    { value: "lunettes", label: "Lunettes de protection", obligatoire: true },
    { value: "gants", label: "Gants anti-coupure", obligatoire: true },
    { value: "chaussures", label: "Chaussures de sécurité", obligatoire: true },
    { value: "blouse", label: "Blouse de travail", obligatoire: true },
    { value: "masque", label: "Masque respiratoire", obligatoire: false },
    { value: "bouchons", label: "Bouchons d'oreille", obligatoire: false },
    { value: "gilet", label: "Gilet haute visibilité", obligatoire: false }
  ],

  // NIVEAUX D'ÉTUDES
  niveauxEtudes: [
    { value: "licence1", label: "Licence 1" },
    { value: "licence2", label: "Licence 2" },
    { value: "licence3", label: "Licence 3" },
    { value: "master1", label: "Master 1" },
    { value: "master2", label: "Master 2" },
    { value: "doctorat", label: "Doctorat" }
  ],

  // RÔLES UTILISATEURS
  roles: [
    { value: "etudiant", label: "Étudiant" },
    { value: "enseignant", label: "Enseignant" },
    { value: "technicien", label: "Technicien" },
    { value: "admin", label: "Administrateur" }
  ],

  // NOTIFICATIONS
  notifications: {
    enabled: true,
    stockBas: true,
    maintenanceProche: true,
    nouveauTP: false,
    rapportMensuel: true
  },

  // BACKUP AUTOMATIQUE
  backup: {
    enabled: true,
    frequence: "hebdomadaire", // quotidien, hebdomadaire, mensuel
    retention: 30 // Nombre de jours de rétention
  },

  // FONCTIONNALITÉS
  features: {
    reservationMachine: true,
    gestionStock: true,
    planningMaintenance: true,
    rapportsStatistiques: true,
    exportDonnees: true,
    modeHorsLigne: true,
    installationPWA: true,
    multiLangue: false // À développer
  },

  // API ENDPOINTS (si vous développez une API backend)
  api: {
    baseUrl: "", // URL de votre API si nécessaire
    endpoints: {
      tp: "/api/tp",
      machines: "/api/machines",
      stock: "/api/stock",
      maintenance: "/api/maintenance",
      users: "/api/users",
      auth: "/api/auth"
    }
  },

  // DÉVELOPPEMENT
  dev: {
    debug: false, // Mettre à true pour voir les logs détaillés
    mockData: false, // Utiliser des données de test
    skipAuth: false // Désactiver l'authentification (dev seulement)
  }
};

// Fonction pour obtenir une configuration
function getConfig(path) {
  const keys = path.split('.');
  let value = ESIG_CONFIG;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return null;
  }
  
  return value;
}

// Fonction pour mettre à jour une configuration
function updateConfig(path, newValue) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let obj = ESIG_CONFIG;
  
  for (const key of keys) {
    obj = obj[key];
  }
  
  obj[lastKey] = newValue;
  
  // Sauvegarder dans localStorage
  localStorage.setItem('esig_config', JSON.stringify(ESIG_CONFIG));
  
  return true;
}

// Charger la configuration personnalisée depuis localStorage
function loadCustomConfig() {
  const savedConfig = localStorage.getItem('esig_config');
  if (savedConfig) {
    try {
      const customConfig = JSON.parse(savedConfig);
      // Fusionner avec la configuration par défaut
      Object.assign(ESIG_CONFIG, customConfig);
    } catch (e) {
      console.error('Erreur lors du chargement de la configuration:', e);
    }
  }
}

// Initialiser la configuration au chargement
loadCustomConfig();

// Exporter la configuration pour utilisation dans l'application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ESIG_CONFIG, getConfig, updateConfig };
}

// Log de la version
console.log(`🎓 ESIG Global Success - Application Atelier v${ESIG_CONFIG.app.version}`);
console.log(`📍 ${ESIG_CONFIG.etablissement.ville}, ${ESIG_CONFIG.etablissement.pays}`);
if (ESIG_CONFIG.dev.debug) {
  console.log('🔧 Mode DEBUG activé');
  console.log('Configuration:', ESIG_CONFIG);
}
