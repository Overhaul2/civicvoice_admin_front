import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../composants/layout/AdminSidebar';
import Topbar from '../../composants/layout/Topbar';

const CATEGORIES = ['Infrastructure', 'Education', 'Santé', 'Environnement', 'Économie'];

export default function NouvelleConsultation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: 'Infrastructure',
    postedBy: '', deadline: '', status: 'OUVERTE',
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: connecter à l'API → POST /consultations
    setSaved(true);
    setTimeout(() => navigate('/admin/propositions'), 1500);
  }

  return (
    <div className="cv-layout">
      <AdminSidebar />
      <main className="cv-main">
        <Topbar title="Nouvelle consultation" subtitle="Créer une nouvelle proposition de vote" />
        <div className="cv-content">
          <button className="cv-back-btn" onClick={() => navigate('/admin/propositions')}>
            ← Retour aux propositions
          </button>

          {saved && (
            <div style={{ background:'#d4edda', border:'1px solid #c3e6cb', color:'#1a6b35', padding:'12px 18px', borderRadius:8, marginBottom:18, fontWeight:600 }}>
              ✅ Proposition créée avec succès ! Redirection…
            </div>
          )}

          <div className="cv-card" style={{ maxWidth: 700 }}>
            <form onSubmit={handleSubmit}>
              <div className="cv-form-group">
                <label className="cv-label" htmlFor="title">Titre de la consultation *</label>
                <input id="title" name="title" type="text" className="cv-input"
                  placeholder="Ex: Construction d'une école à Bamako…"
                  value={form.title} onChange={handleChange} required />
              </div>

              <div className="cv-form-group">
                <label className="cv-label" htmlFor="description">Description *</label>
                <textarea id="description" name="description" className="cv-textarea"
                  placeholder="Décrivez en détail l'objet de cette consultation…"
                  value={form.description} onChange={handleChange} rows={5} required />
              </div>

              <div className="cv-grid-2">
                <div className="cv-form-group">
                  <label className="cv-label" htmlFor="category">Catégorie *</label>
                  <select id="category" name="category" className="cv-select"
                    value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="cv-form-group">
                  <label className="cv-label" htmlFor="postedBy">Publié par *</label>
                  <input id="postedBy" name="postedBy" type="text" className="cv-input"
                    placeholder="Ex: Mairie de la Commune IV"
                    value={form.postedBy} onChange={handleChange} required />
                </div>
              </div>

              <div className="cv-grid-2">
                <div className="cv-form-group">
                  <label className="cv-label" htmlFor="deadline">Date de clôture *</label>
                  <input id="deadline" name="deadline" type="date" className="cv-input"
                    value={form.deadline} onChange={handleChange} required />
                </div>
                <div className="cv-form-group">
                  <label className="cv-label" htmlFor="status">Statut initial</label>
                  <select id="status" name="status" className="cv-select"
                    value={form.status} onChange={handleChange}>
                    <option value="OUVERTE">Ouverte (active immédiatement)</option>
                    <option value="FERMEE">Fermée (brouillon)</option>
                  </select>
                </div>
              </div>

              <div style={{ background:'#f8fafc', border:'1px solid var(--border)', borderRadius:8, padding:'14px 16px', marginBottom:18 }}>
                <div style={{ fontWeight:600, fontSize:13, marginBottom:8 }}>Options de vote</div>
                <div style={{ display:'flex', gap:10 }}>
                  <div style={{ flex:1, padding:'10px', background:'#d4edda', borderRadius:6, textAlign:'center', fontWeight:700, color:'#1a6b35' }}>👍 POUR</div>
                  <div style={{ flex:1, padding:'10px', background:'#fde8e8', borderRadius:6, textAlign:'center', fontWeight:700, color:'#c53030' }}>👎 CONTRE</div>
                </div>
                <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:8 }}>
                  Le vote binaire POUR/CONTRE est utilisé par défaut.
                </div>
              </div>

              <div style={{ display:'flex', gap:12 }}>
                <button type="submit" className="cv-btn cv-btn-secondary">
                  ✅ Publier la consultation
                </button>
                <button type="button" className="cv-btn cv-btn-outline" onClick={() => navigate('/admin/propositions')}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
