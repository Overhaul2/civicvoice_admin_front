import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result) {
        navigate(result.role === 'ADMIN' ? '/admin' : '/dashboard');
      } else {
        setError('Email ou mot de passe incorrect.');
      }
      setLoading(false);
    }, 600);
  }

  const handleGuestAccess = () => {
    navigate('/dashboard'); 
  };
   const handleGuestAdminAccess = () => {
    navigate('/admin'); 
  };

  return (
    <div className="cv-login-page">
      <div className="cv-login-card">
        <div className="cv-login-logo">
          <div className="cv-login-logo__icon">CV</div>
          <div className="cv-login-logo__title">CIVIC VOTE</div>
          <div className="cv-login-logo__sub">Mali — Vote Participatif</div>
        </div>

        <h2>Connexion à votre compte</h2>
        <p>Entrez vos identifiants pour accéder à la plateforme</p>

        {error && <div className="cv-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="cv-form-group">
            <label className="cv-label" htmlFor="email">Email ou Téléphone</label>
            <input
              id="email" type="email" className="cv-input"
              placeholder="votre@email.ml"
              value={email} onChange={e => setEmail(e.target.value)} required
            />
          </div>
          <div className="cv-form-group">
            <label className="cv-label" htmlFor="password">Mot de passe</label>
            <input
              id="password" type="password" className="cv-input"
              placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required
            />
          </div>
          <button type="submit" className="cv-btn cv-btn-primary cv-btn-full cv-btn-lg" disabled={loading}>
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
          {/* <button 
            type="button" 
            onClick={handleGuestAccess}
            className="cv-btn cv-btn-outline cv-btn-full" 
            style={{ marginTop: '12px', borderColor: '#ccc', color: '#666' }}
          >
            Continuer sans compte
          </button> */}

          <button 
            type="button" 
            onClick={handleGuestAdminAccess}
            className="cv-btn cv-btn-outline cv-btn-full" 
            style={{ marginTop: '12px', borderColor: '#ccc', color: '#666' }}
          >
            Admin sans compte
          </button>
        </form>

        <div className="cv-login-footer">
          <p>Pas encore de compte ? <a href="#">S'inscrire</a></p>
          {/* Comptes démo — retirer en production */}
          <div style={{ marginTop: 16, padding: '10px 14px', background: '#f0f4ff', borderRadius: 8, fontSize: 12, textAlign: 'left' }}>
            <strong>Comptes démo :</strong><br />
            🟦 Citoyen : souleymane@civicvote.ml / Souleymane<br />
            🔴 Admin : ibore@civicvote.ml / Ibrahim
          </div>
        </div>
      </div>
    </div>
  );
}
