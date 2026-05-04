import { useNavigate } from 'react-router-dom';
import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeConsultations, defaultMyVotes } from '../../data/fakeData';

export default function MesVotes() {
  const navigate = useNavigate();
  const lsVotes = JSON.parse(localStorage.getItem('cv_votes') || '[]');
  // Fusionner votes démo + votes live
  const allMyVotes = [...defaultMyVotes, ...lsVotes.filter(v => !defaultMyVotes.find(d => d.consultationId === v.consultationId))];

  function getTitle(id) {
    return fakeConsultations.find(c => c.id === id)?.title || 'Proposition inconnue';
  }

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar title="Mon historique de vote" />
        <div className="cv-content">
          <div className="cv-card" style={{ padding: 0 }}>
            <div className="cv-table-wrap">
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titre de la proposition</th>
                    <th>Mon Vote</th>
                    <th>Voté le</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allMyVotes.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Vous n'avez pas encore voté.</td></tr>
                  ) : allMyVotes.map((v, i) => (
                    <tr key={i}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 500 }}>{getTitle(v.consultationId)}</td>
                      <td>
                        <span className={`cv-badge ${v.optionLabel === 'POUR' ? 'green' : 'red'}`}>
                          {v.optionLabel}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{v.votedAt}</td>
                      <td><span className="cv-badge green">{v.status}</span></td>
                      <td>
                        <button className="cv-btn cv-btn-outline cv-btn-sm" onClick={() => navigate(`/propositions/${v.consultationId}`)}>
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {allMyVotes.length > 0 && (
              <div style={{ textAlign: 'center', padding: '16px', color: 'var(--secondary)', fontSize: 14, fontWeight: 500, borderTop: '1px solid var(--border)' }}>
                Merci pour votre participation ! 🎉
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
