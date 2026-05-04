import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../composants/layout/AdminSidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeConsultations } from '../../data/fakeData';

const STATUS_MAP = {
  OUVERTE:  { label: 'Active',     cls: 'green' },
  FERMEE:   { label: 'Clôturée',   cls: 'gray' },
  ARCHIVEE: { label: 'Archivée',   cls: 'orange' },
};

export default function AdminPropositions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [consultations, setConsultations] = useState(fakeConsultations);

  const filtered = consultations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(id) {
    if (window.confirm('Supprimer cette consultation ?')) {
      setConsultations(prev => prev.filter(c => c.id !== id));
    }
  }

  function handleToggleStatus(id) {
    setConsultations(prev => prev.map(c => {
      if (c.id !== id) return c;
      return { ...c, status: c.status === 'OUVERTE' ? 'FERMEE' : 'OUVERTE' };
    }));
  }

  return (
    <div className="cv-layout">
      <AdminSidebar />
      <main className="cv-main">
        <Topbar title="Gestion des propositions" />
        <div className="cv-content">

          <div className="cv-admin-actions">
            <div className="cv-search-input-wrap">
              <span className="cv-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                type="text" className="cv-input" placeholder="Rechercher une proposition…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <button className="cv-btn cv-btn-secondary" onClick={() => navigate('/admin/nouvelle-consultation')}>
              + Nouvelle proposition
            </button>
          </div>

          <div className="cv-card" style={{ padding: 0 }}>
            <div className="cv-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Posté par</th>
                    <th>Créé le</th>
                    <th>Échéance</th>
                    <th>Votes</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} style={{ textAlign:'center', padding:40, color:'var(--text-muted)' }}>Aucune proposition</td></tr>
                  ) : filtered.map((c, i) => {
                    const s = STATUS_MAP[c.status];
                    return (
                      <tr key={c.id}>
                        <td style={{ color:'var(--text-muted)' }}>{i + 1}</td>
                        <td style={{ fontWeight:500, maxWidth:200 }}>{c.title}</td>
                        <td><span className="cv-badge blue">{c.category}</span></td>
                        <td style={{ fontSize:13, color:'var(--text-muted)' }}>{c.postedBy}</td>
                        <td style={{ fontSize:13, color:'var(--text-muted)' }}>{c.createdAt}</td>
                        <td style={{ fontSize:13, color:'var(--text-muted)' }}>{new Date(c.deadline).toLocaleDateString('fr-FR')}</td>
                        <td style={{ fontSize:13 }}>{c.totalVotes.toLocaleString('fr-FR')}</td>
                        <td><span className={`cv-badge ${s.cls}`}>{s.label}</span></td>
                        <td>
                          <div className="cv-action-btns">
                            <button className="cv-action-btn" title="Modifier" onClick={() => navigate(`/admin/nouvelle-consultation?edit=${c.id}`)}>✏️</button>
                            <button className="cv-action-btn" title="Voir" onClick={() => navigate(`/propositions/${c.id}`)}>👁️</button>
                            <button className="cv-action-btn" title={c.status === 'OUVERTE' ? 'Clôturer' : 'Rouvrir'} onClick={() => handleToggleStatus(c.id)}>
                              {c.status === 'OUVERTE' ? '🔒' : '🔓'}
                            </button>
                            <button className="cv-action-btn" title="Supprimer" onClick={() => handleDelete(c.id)} style={{ color:'var(--danger)' }}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding:'12px 20px', borderTop:'1px solid var(--border)', fontSize:13, color:'var(--text-muted)' }}>
              Affichage {filtered.length} sur {consultations.length} propositions
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
