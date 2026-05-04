import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeConsultations } from '../../data/fakeData';

const CATEGORIES = ['Toutes', 'Infrastructure', 'Education', 'Santé', 'Environnement', 'Économie'];
const STATUS_MAP = { OUVERTE: { label: 'Active', cls: 'green' }, FERMEE: { label: 'Clôturée', cls: 'gray' }, ARCHIVEE: { label: 'Archivée', cls: 'orange' } };

export default function Propositions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Toutes');

  const filtered = fakeConsultations.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === 'Toutes' || c.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar title="Toutes les propositions" />
        <div className="cv-content">

          {/* Barre de recherche */}
          <div className="cv-search-bar">
            <div className="cv-search-input-wrap">
              <span className="cv-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                type="text" className="cv-input" placeholder="Rechercher une proposition…"
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="cv-select" style={{ width: 160 }} value={cat} onChange={e => setCat(e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Table */}
          <div className="cv-card" style={{ padding: 0 }}>
            <div className="cv-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titre de la proposition</th>
                    <th>Catégorie</th>
                    <th>Posté le</th>
                    <th>Échéance</th>
                    <th>POUR</th>
                    <th>CONTRE</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Aucune proposition trouvée</td></tr>
                  ) : filtered.map((c, i) => {
                    const s = STATUS_MAP[c.status];
                    return (
                      <tr key={c.id}>
                        <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                        <td style={{ fontWeight: 500 }}>{c.title}</td>
                        <td><span className="cv-badge blue">{c.category}</span></td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{c.createdAt}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{new Date(c.deadline).toLocaleDateString('fr-FR')}</td>
                        <td className="pour">{c.votesFor.toLocaleString('fr-FR')}</td>
                        <td className="contre">{c.votesAgainst.toLocaleString('fr-FR')}</td>
                        <td><span className={`cv-badge ${s.cls}`}>{s.label}</span></td>
                        <td>
                          <button className="cv-btn cv-btn-primary cv-btn-sm" onClick={() => navigate(`/propositions/${c.id}`)}>
                            Voir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
