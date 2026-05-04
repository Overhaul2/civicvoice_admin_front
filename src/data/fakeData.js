// ============================================================
// DONNÉES SIMULÉES — CivicVote Mali
// Ces données remplacent les appels API au backend.
// Pour connecter le vrai backend, remplacer par des fetch() dans services/api.js
// ============================================================

export const fakeUsers = [
  { id: 'u1', name: 'Souleymane Traoré', email: 'souleymane@civicvote.ml', phone: '70XXXXXXX', role: 'USER',  status: 'Actif',   joinedAt: '12 Avr 2026' },
  { id: 'u2', name: 'Ibrahim Coulibaly',  email: 'ibore@civicvote.ml',       phone: '76XXXXXXX', role: 'ADMIN', status: 'Actif',   joinedAt: '18 Avr 2026' },
  { id: 'u3', name: 'Fatoumata Keïta',   email: 'fkeita@civicvote.ml',      phone: '79XXXXXXX', role: 'USER',  status: 'Actif',   joinedAt: '15 Avr 2026' },
  { id: 'u4', name: 'Boubacar Diallo',   email: 'bdiallo@civicvote.ml',     phone: '78XXXXXXX', role: 'USER',  status: 'Actif',   joinedAt: '18 Avr 2026' },
  { id: 'u5', name: 'Mariam Sissoko',    email: 'msissoko@civicvote.ml',    phone: '66XXXXXXX', role: 'USER',  status: 'Inactif', joinedAt: '20 Avr 2026' },
  { id: 'u6', name: 'Souleymane Koné',   email: 'skone@civicvote.ml',       phone: '77XXXXXXX', role: 'USER',  status: 'Actif',   joinedAt: '05 Avr 2026' },
];

export const fakeConsultations = [
  {
    id: 'c1',
    title: 'Construction de route vers Yirimadio',
    description: 'Ce projet a pour but la construction d\'une route bitumée reliant Yirimadio au centre de la commune IV, facilitant ainsi l\'accès aux services de base pour plus de 15 000 habitants.',
    category: 'Infrastructure',
    status: 'OUVERTE',
    postedBy: 'Mairie de la Commune IV',
    createdAt: '02 Mai 2026',
    deadline: '2026-05-20T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c1-pour',   label: 'POUR' },
      { id: 'c1-contre', label: 'CONTRE' },
    ],
    votesFor: 2390, votesAgainst: 1290, totalVotes: 3680,
    daysLeft: 8,
  },
  {
    id: 'c2',
    title: 'Construction d\'école publique à Banconi',
    description: 'Projet de construction d\'une nouvelle école fondamentale de 12 classes dans le quartier de Banconi pour accueillir 600 élèves supplémentaires chaque année.',
    category: 'Education',
    status: 'OUVERTE',
    postedBy: 'Ministère de l\'Education',
    createdAt: '28 Avr 2026',
    deadline: '2026-05-18T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c2-pour',   label: 'POUR' },
      { id: 'c2-contre', label: 'CONTRE' },
    ],
    votesFor: 1880, votesAgainst: 1100, totalVotes: 2980,
    daysLeft: 5,
  },
  {
    id: 'c3',
    title: 'Réparation route de Koulouba',
    description: 'Réhabilitation complète de la route principale menant à Koulouba, incluant la pose d\'un nouveau revêtement et l\'installation d\'éclairage public sur 4 km.',
    category: 'Infrastructure',
    status: 'OUVERTE',
    postedBy: 'Ministère des Transports',
    createdAt: '30 Avr 2026',
    deadline: '2026-06-25T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c3-pour',   label: 'POUR' },
      { id: 'c3-contre', label: 'CONTRE' },
    ],
    votesFor: 3210, votesAgainst: 1540, totalVotes: 4750,
    daysLeft: 12,
  },
  {
    id: 'c4',
    title: 'Nouveau forage à Sébenikoro',
    description: 'Installation d\'un nouveau forage pour améliorer l\'accès à l\'eau potable dans le quartier de Sébenikoro et environs.',
    category: 'Environnement',
    status: 'FERMEE',
    postedBy: 'Ministère de l\'Energie et de l\'Eau',
    createdAt: '01 Avr 2026',
    deadline: '2026-04-30T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c4-pour',   label: 'POUR' },
      { id: 'c4-contre', label: 'CONTRE' },
    ],
    votesFor: 4560, votesAgainst: 890, totalVotes: 5450,
    daysLeft: 0,
  },
  {
    id: 'c5',
    title: 'Centre de Santé Communautaire à Koulikoro',
    description: 'Construction d\'un centre de santé communautaire de 20 lits incluant une maternité, une salle d\'urgences et une pharmacie communautaire.',
    category: 'Santé',
    status: 'OUVERTE',
    postedBy: 'Ministère de la Santé',
    createdAt: '25 Avr 2026',
    deadline: '2026-05-30T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c5-pour',   label: 'POUR' },
      { id: 'c5-contre', label: 'CONTRE' },
    ],
    votesFor: 1650, votesAgainst: 410, totalVotes: 2060,
    daysLeft: 15,
  },
  {
    id: 'c6',
    title: 'Énergie solaire pour villages ruraux',
    description: 'Installation de panneaux solaires dans 8 villages ruraux de la région de Ségou pour assurer l\'accès à l\'électricité aux populations non desservies.',
    category: 'Environnement',
    status: 'OUVERTE',
    postedBy: 'Ministère de l\'Energie',
    createdAt: '30 Avr 2026',
    deadline: '2026-05-15T23:59:00',
    imageUrl: null,
    options: [
      { id: 'c6-pour',   label: 'POUR' },
      { id: 'c6-contre', label: 'CONTRE' },
    ],
    votesFor: 950, votesAgainst: 380, totalVotes: 1330,
    daysLeft: 3,
  },
];

export const fakeEngagements = [
  { id: 'e1', title: 'Démarrage des travaux de route', description: 'Les travaux de construction de la route de Yirimadio commenceront 30 jours après la clôture du vote.', consultationId: 'c1', consultationTitle: 'Construction de route vers Yirimadio', status: 'EN_COURS', author: 'Mairie de la Commune IV', createdAt: '01 Mai 2026' },
  { id: 'e2', title: 'Appel d\'offres pour l\'école', description: 'Un appel d\'offres public sera lancé dans les 60 jours pour le marché de construction de l\'école de Banconi.', consultationId: 'c2', consultationTitle: 'Construction d\'école publique à Banconi', status: 'EN_ATTENTE', author: 'Ministère de l\'Education', createdAt: '29 Avr 2026' },
  { id: 'e3', title: 'Réhabilitation route Koulouba terminée', description: 'Les travaux de réhabilitation de la route de Koulouba ont été réalisés dans les délais impartis.', consultationId: 'c4', consultationTitle: 'Réparation route de Koulouba', status: 'TERMINE', author: 'Ministère des Transports', createdAt: '15 Avr 2026' },
];

// Votes par défaut de Souleymane (complétés par localStorage en live)
export const defaultMyVotes = [
  { consultationId: 'c1', optionLabel: 'POUR',   votedAt: '03 Mai 2026 10:23', status: 'Compté' },
  { consultationId: 'c2', optionLabel: 'CONTRE',  votedAt: '29 Avr 2026 14:10', status: 'Compté' },
];

// Tendance de participation (30 derniers jours)
export const participationTrend = [
  { date: '10 Avr', votes: 120 }, { date: '12 Avr', votes: 145 }, { date: '14 Avr', votes: 160 },
  { date: '16 Avr', votes: 198 }, { date: '18 Avr', votes: 210 }, { date: '20 Avr', votes: 245 },
  { date: '22 Avr', votes: 280 }, { date: '24 Avr', votes: 310 }, { date: '26 Avr', votes: 340 },
  { date: '28 Avr', votes: 390 }, { date: '30 Avr', votes: 420 }, { date: '01 Mai', votes: 480 },
  { date: '02 Mai', votes: 510 }, { date: '03 Mai', votes: 560 },
];

export const categoryStats = [
  { category: 'Infrastructure', pct: 68 },
  { category: 'Santé',          pct: 64 },
  { category: 'Education',      pct: 59 },
  { category: 'Environnement',  pct: 58 },
  { category: 'Économie',       pct: 55 },
];

export const statsAdmin = {
  totalUsers: 12458,
  totalVotes: 28765,
  activeConsultations: 5,
  closedConsultations: 1,
};

export const statsCitoyen = {
  activeProposals: 5,
  totalVotesCast: 4286,
  participationRate: 41,
  myVotesCount: 2, // mis à jour dynamiquement
};

export const recentActivity = [
  { text: 'Nouvelle consultation "Énergie solaire" ajoutée par Ministère de l\'Energie', time: '2 min' },
  { text: 'Utilisateur Fatoumata Keïta inscrite', time: '30 min' },
  { text: 'Consultation "Forage Sébenikoro" clôturée', time: '1h' },
];

export const fakeComments = [
  { id: 'cm1', author: 'Amadou T.', date: '03 Mai 2026', text: 'Ce projet est indispensable pour notre quartier. Nous attendons depuis 5 ans une route correcte !', likes: 24 },
  { id: 'cm2', author: 'Kadiatou S.', date: '02 Mai 2026', text: 'Je suis pour, mais j\'espère que les travaux seront réalisés dans les délais cette fois-ci.', likes: 12 },
  { id: 'cm3', author: 'Moussa D.', date: '01 Mai 2026', text: 'Pourquoi ne pas commencer par les routes secondaires qui sont dans un état catastrophique ?', likes: 8 },
];
