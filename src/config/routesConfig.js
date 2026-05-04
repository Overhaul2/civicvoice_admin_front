// ============================================================
// FICHIER DE CONFIGURATION DES PAGES
// Pour activer/désactiver une page dans la démo :
//   enabled: true  → la page apparaît dans le menu et est accessible
//   enabled: false → la page est cachée 
// ============================================================

export const routesConfig = {
  citoyen: {
    // --- TOUJOURS ACTIVES (core de la démo) ---
    dashboard:    { enabled: true,  path: '/dashboard',    label: 'Tableau de bord', icon: 'grid' },
    propositions: { enabled: true,  path: '/propositions', label: 'Propositions',    icon: 'file-text' },
    mesVotes:     { enabled: true,  path: '/mes-votes',    label: 'Mes Votes',       icon: 'check-square' },

    // --- OPTIONNELLES (changer enabled: false → true pour afficher) ---
    resultats:    { enabled: true, path: '/resultats',    label: 'Résultats',       icon: 'bar-chart-2' },
    engagements:  { enabled: false, path: '/engagements',  label: 'Engagements',     icon: 'award' },
    commentaires: { enabled: false, path: '/commentaires', label: 'Commentaires',    icon: 'message-circle' },
    profil:       { enabled: true, path: '/profil',       label: 'Profil',          icon: 'user' },
    notifications:{ enabled: true, path: '/notifications',label: 'Notifications',   icon: 'bell' },
    aide:         { enabled: true, path: '/aide',         label: 'Aide',            icon: 'help-circle' },
  },
  admin: {
    // --- TOUJOURS ACTIVES ---
    dashboard:           { enabled: true,  path: '/admin',                      label: 'Tableau de bord',    icon: 'grid' },
    propositions:        { enabled: true,  path: '/admin/propositions',         label: 'Propositions',       icon: 'file-text' },
    nouvelleConsultation:{ enabled: true,  path: '/admin/nouvelle-consultation',label: 'Nouvelle Consultation', icon: 'plus-circle' },

    // --- OPTIONNELLES ---
    users:     { enabled: true, path: '/admin/users',    label: 'Utilisateurs', icon: 'users' },
    rapports:  { enabled: true, path: '/admin/rapports', label: 'Rapports',     icon: 'bar-chart-2' },
    auditLog:  { enabled: false, path: '/admin/audit',    label: 'Audit Log',    icon: 'activity' },
    parametres:{ enabled: false, path: '/admin/settings', label: 'Paramètres',   icon: 'settings' },
  },
};
