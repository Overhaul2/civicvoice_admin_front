import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeEngagements } from '../../data/fakeData';

const STATUS_MAP = {
  EN_ATTENTE: { label: 'En attente', cls: 'orange' },
  EN_COURS:   { label: 'En cours',   cls: 'blue' },
  TERMINE:    { label: 'Terminé',    cls: 'green' },
};

export default function Engagements() {
  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar title="Engagements des élus" subtitle="Suivez les promesses et engagements pris suite aux votes" />
        <div className="cv-content">
          <div className="cv-card">
            <div className="cv-section-title">Tous les engagements ({fakeEngagements.length})</div>
            {fakeEngagements.map(e => {
              const s = STATUS_MAP[e.status];
              return (
                <div key={e.id} className="cv-engagement">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div className="cv-engagement__title">{e.title}</div>
                    <span className={`cv-badge ${s.cls}`}>{s.label}</span>
                  </div>
                  <div className="cv-engagement__desc">{e.description}</div>
                  <div className="cv-engagement__meta">
                    <span>📋 {e.consultationTitle}</span>
                    <span>👤 {e.author}</span>
                    <span>📅 {e.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
