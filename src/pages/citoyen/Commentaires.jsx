import { useState } from 'react';
import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeComments, fakeConsultations } from '../../data/fakeData';

export default function Commentaires() {
  const [selected, setSelected] = useState(fakeConsultations[0].id);
  const [newComment, setNewComment] = useState('');

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar title="Commentaires" subtitle="Partagez votre avis sur les propositions" />
        <div className="cv-content">
          <div className="cv-form-group" style={{ maxWidth: 320 }}>
            <label className="cv-label">Proposition</label>
            <select className="cv-select" value={selected} onChange={e => setSelected(e.target.value)}>
              {fakeConsultations.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          <div className="cv-card" style={{ marginBottom: 18 }}>
            <div className="cv-section-title">Ajouter un commentaire</div>
            <div className="cv-form-group">
              <textarea
                className="cv-textarea"
                placeholder="Partagez votre avis sur cette proposition…"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                rows={4}
              />
            </div>
            <button className="cv-btn cv-btn-primary" onClick={() => setNewComment('')}>
              Publier le commentaire
            </button>
          </div>

          <div className="cv-card">
            <div className="cv-section-title">Commentaires ({fakeComments.length})</div>
            {fakeComments.map(cm => (
              <div key={cm.id} className="cv-comment">
                <div className="cv-comment__header">
                  <span className="cv-comment__author">{cm.author}</span>
                  <span className="cv-comment__date">{cm.date}</span>
                </div>
                <div className="cv-comment__text">{cm.text}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                  👍 {cm.likes} personnes ont trouvé cela utile
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
