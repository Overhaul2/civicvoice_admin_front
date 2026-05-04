import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { routesConfig } from './config/routesConfig';

// Pages
import LoginPage               from './pages/LoginPage';
import CitoyenDashboard        from './pages/citoyen/Dashboard';
import Propositions            from './pages/citoyen/Propositions';
import PropositionDetail       from './pages/citoyen/PropositionDetail';
import MesVotes                from './pages/citoyen/MesVotes';
import Resultats               from './pages/citoyen/Resultats';
import Engagements             from './pages/citoyen/Engagements';
import Commentaires            from './pages/citoyen/Commentaires';
import AdminDashboard          from './pages/admin/Dashboard';
import AdminPropositions       from './pages/admin/Propositions';
import NouvelleConsultation    from './pages/admin/NouvelleConsultation';
import AdminUsers              from './pages/admin/Users';

// ---- Route protégée ----
function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }
  return children;
}

function AppRoutes() {
  const cfg = routesConfig;
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<LoginPage />} />

      {/* ==================== CITOYEN ==================== */}
      {/* Toujours actives */}
      <Route path="/dashboard"           element={<ProtectedRoute><CitoyenDashboard /></ProtectedRoute>} />
      <Route path="/propositions"        element={<ProtectedRoute><Propositions /></ProtectedRoute>} />
      <Route path="/propositions/:id"    element={<ProtectedRoute><PropositionDetail /></ProtectedRoute>} />
      <Route path="/mes-votes"           element={<ProtectedRoute><MesVotes /></ProtectedRoute>} />

      {/* Optionnelles — activer dans src/config/routesConfig.js */}
      {cfg.citoyen.resultats.enabled     && <Route path="/resultats"    element={<ProtectedRoute><Resultats /></ProtectedRoute>} />}
      {cfg.citoyen.engagements.enabled   && <Route path="/engagements"  element={<ProtectedRoute><Engagements /></ProtectedRoute>} />}
      {cfg.citoyen.commentaires.enabled  && <Route path="/commentaires" element={<ProtectedRoute><Commentaires /></ProtectedRoute>} />}

      {/* ==================== ADMIN ==================== */}
      {/* Toujours actives */}
      <Route path="/admin"                          element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/propositions"             element={<ProtectedRoute requiredRole="ADMIN"><AdminPropositions /></ProtectedRoute>} />
      <Route path="/admin/nouvelle-consultation"    element={<ProtectedRoute requiredRole="ADMIN"><NouvelleConsultation /></ProtectedRoute>} />

      {/* Optionnelles */}
      {cfg.admin.users.enabled && <Route path="/admin/users" element={<ProtectedRoute requiredRole="ADMIN"><AdminUsers /></ProtectedRoute>} />}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
