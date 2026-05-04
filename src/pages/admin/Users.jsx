import { useState } from 'react';
import AdminSidebar from '../../composants/layout/AdminSidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeUsers } from '../../data/fakeData';

const ROLE_MAP = { ADMIN: { label: 'Admin', cls: 'blue' }, USER: { label: 'Citoyen', cls: 'green' } };

export default function AdminUsers() {
  const [users, setUsers] = useState(fakeUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleToggle(id) {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'Actif' ? 'Inactif' : 'Actif' } : u
    ));
  }

  return (
    <div className="cv-layout">
      <AdminSidebar />
      <main className="cv-main">
        <Topbar title="Gestion des utilisateurs" />
        <div className="cv-content">

          <div className="cv-admin-actions">
            <div className="cv-search-input-wrap">
              <span className="cv-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
              <input
                type="text" className="cv-input" placeholder="Rechercher un utilisateur…"
                value={search} onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36 }}
              />
            </div>
            <button className="cv-btn cv-btn-primary">+ Ajouter un utilisateur</button>
          </div>

          <div className="cv-card" style={{ padding: 0 }}>
            <div className="cv-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Email / Téléphone</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th>Inscrit le</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => {
                    const r = ROLE_MAP[u.role];
                    return (
                      <tr key={u.id}>
                        <td style={{ color:'var(--text-muted)' }}>{i + 1}</td>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--primary)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>
                              {u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <span style={{ fontWeight:500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ fontSize:13, color:'var(--text-muted)' }}>
                          <div>{u.email}</div>
                          <div>{u.phone}</div>
                        </td>
                        <td><span className={`cv-badge ${r.cls}`}>{r.label}</span></td>
                        <td>
                          <span className={`cv-badge ${u.status === 'Actif' ? 'green' : 'gray'}`}>{u.status}</span>
                        </td>
                        <td style={{ fontSize:13, color:'var(--text-muted)' }}>{u.joinedAt}</td>
                        <td>
                          <div className="cv-action-btns">
                            <button className="cv-action-btn" title="Modifier">✏️</button>
                            <button className="cv-action-btn" title={u.status === 'Actif' ? 'Désactiver' : 'Activer'} onClick={() => handleToggle(u.id)}>
                              {u.status === 'Actif' ? '🔒' : '✅'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding:'12px 20px', borderTop:'1px solid var(--border)', fontSize:13, color:'var(--text-muted)' }}>
              Affichage {filtered.length} sur {users.length} utilisateurs
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
