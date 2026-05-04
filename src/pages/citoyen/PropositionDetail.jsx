import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import VoteBar from '../../composants/ui/VoteBar';
import CountdownTimer from '../../composants/ui/CountdownTimer';
import { fakeConsultations, fakeComments } from '../../data/fakeData';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00913E', '#E53E3E'];

export default function PropositionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('calendrier');
  const consultation = fakeConsultations.find(c => c.id === id);

  // Votes persistés en localStorage
  const savedVotes = JSON.parse(localStorage.getItem('cv_votes') || '[]');
  const myVoteForThis = savedVotes.find(v => v.consultationId === id);
  const [voted, setVoted] = useState(myVoteForThis?.optionLabel || null);
  const [localFor, setLocalFor] = useState(consultation?.votesFor || 0);
  const [localAgainst, setLocalAgainst] = useState(consultation?.votesAgainst || 0);

  if (!consultation) return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar />
        <div className="cv-content"><div className="cv-empty"><div className="cv-empty__icon">🔍</div><div className="cv-empty__text">Proposition introuvable.</div></div></div>
      </main>
    </div>
  );

  function handleVote(choice) {
    if (voted || consultation.status !== 'OUVERTE') return;
    const newVotes = [...savedVotes, { consultationId: id, optionLabel: choice, votedAt: new Date().toLocaleString('fr-FR'), status: 'Compté' }];
    localStorage.setItem('cv_votes', JSON.stringify(newVotes));
    setVoted(choice);
    if (choice === 'POUR') setLocalFor(f => f + 1);
    else setLocalAgainst(a => a + 1);
  }

  const totalVotes = localFor + localAgainst;
  const pieData = [
    { name: 'POUR', value: localFor },
    { name: 'CONTRE', value: localAgainst },
  ];

  const statusBadge = consultation.status === 'OUVERTE'
    ? <span className="cv-badge green">● Active</span>
    : <span className="cv-badge gray">Clôturée</span>;

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar />
        <div className="cv-content">
          <button className="cv-back-btn" onClick={() => navigate('/propositions')}>
            ← Retour aux propositions
          </button>

          {/* Header */}
          <div className="cv-card" style={{ marginBottom: 18 }}>
            <div className="cv-detail-header">
              <div style={{ flex: 1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                  <h1 className="cv-detail-title">{consultation.title}</h1>
                  {statusBadge}
                </div>
                <div className="cv-detail-meta">
                  Posté par : <strong>{consultation.postedBy}</strong> &nbsp;|&nbsp; Posté le : {consultation.createdAt}
                </div>
                <span className="cv-badge blue">{consultation.category}</span>
              </div>
              {consultation.status === 'OUVERTE' && (
                <CountdownTimer deadline={consultation.deadline} />
              )}
            </div>

            {/* Description */}
            <div style={{ marginTop: 18, padding: '16px', background: '#f8fafc', borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Description</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>{consultation.description}</p>
            </div>
          </div>

          <div className="cv-grid-2" style={{ alignItems: 'start' }}>
            {/* Résultats */}
            <div className="cv-card">
              <div className="cv-section-title">Résultats actuels</div>
              <VoteBar votesFor={localFor} votesAgainst={localAgainst} totalVotes={totalVotes} />

              {/* Pie chart */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                <ResponsiveContainer width={220} height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => v.toLocaleString('fr-FR')} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Boutons vote */}
              {consultation.status === 'OUVERTE' && !voted && (
                <>
                  <div className="cv-vote-btns">
                    <button className="cv-btn cv-btn-secondary cv-btn-lg" onClick={() => handleVote('POUR')}>👍 Voter POUR</button>
                    <button className="cv-btn cv-btn-danger cv-btn-lg" onClick={() => handleVote('CONTRE')}>👎 Voter CONTRE</button>
                  </div>
                  <div className="cv-vote-disclaimer">Il n'est possible de voter qu'une seule fois.</div>
                </>
              )}
              {voted && (
                <div className={`cv-voted-notice ${voted.toLowerCase()}`}>
                  ✅ Vous avez voté <strong>{voted}</strong> sur cette proposition.
                </div>
              )}
              {consultation.status !== 'OUVERTE' && (
                <div className="cv-voted-notice" style={{ background: '#f1f5f9', color: 'var(--text-muted)' }}>
                  Cette consultation est clôturée.
                </div>
              )}
            </div>

            {/* Tabs: calendrier / commentaires / documents */}
            <div className="cv-card">
              <div className="cv-tabs">
                <button className={`cv-tab ${tab === 'calendrier' ? 'active' : ''}`} onClick={() => setTab('calendrier')}>Calendrier</button>
                <button className={`cv-tab ${tab === 'commentaires' ? 'active' : ''}`} onClick={() => setTab('commentaires')}>Commentaires ({fakeComments.length})</button>
                <button className={`cv-tab ${tab === 'documents' ? 'active' : ''}`} onClick={() => setTab('documents')}>Documents (3)</button>
              </div>

              {tab === 'calendrier' && (
                <div style={{ fontSize: 13.5 }}>
                  {[
                    { date: consultation.createdAt, label: 'Proposition postée' },
                    { date: 'En cours',              label: 'Vote en cours' },
                    { date: new Date(consultation.deadline).toLocaleDateString('fr-FR'), label: 'Clôture des votes' },
                  ].map((item, i) => (
                    <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:14 }}>
                      <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--primary)', marginTop:4, flexShrink:0 }}/>
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.label}</div>
                        <div style={{ color:'var(--text-muted)', fontSize:12 }}>{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'commentaires' && (
                <div>
                  {fakeComments.map(cm => (
                    <div key={cm.id} className="cv-comment">
                      <div className="cv-comment__header">
                        <span className="cv-comment__author">{cm.author}</span>
                        <span className="cv-comment__date">{cm.date}</span>
                      </div>
                      <div className="cv-comment__text">{cm.text}</div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'documents' && (
                <div style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>
                  {['Plan technique du projet.pdf', 'Budget prévisionnel 2026.xlsx', 'Rapport d\'impact environnemental.pdf'].map((doc, i) => (
                    <div key={i} style={{ padding:'10px 0', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
                      <span>📄</span> {doc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
