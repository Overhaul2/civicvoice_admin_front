import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeConsultations, participationTrend, statsCitoyen } from '../../data/fakeData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CitoyenDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myVotes = JSON.parse(localStorage.getItem('cv_votes') || '[]');
  const activeConsultations = fakeConsultations.filter(c => c.status === 'OUVERTE');

  const stats = [
    { label: 'Propositions actives',   value: activeConsultations.length, cls: 'blue' },
    { label: 'Nombre total de votes',  value: statsCitoyen.totalVotesCast.toLocaleString('fr-FR'), cls: '' },
    { label: 'Taux de participation',  value: statsCitoyen.participationRate + '%', cls: 'green' },
    { label: 'Vos votes',              value: myVotes.length || statsCitoyen.myVotesCount, cls: 'orange' },
  ];

  // Max jours pour les barres
  const maxDays = Math.max(...activeConsultations.map(c => c.daysLeft), 1);

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar />
        <div className="cv-content">

          {/* Stats */}
          <div className="cv-stats">
            {stats.map(s => (
              <div key={s.label} className="cv-stat">
                <div className="cv-stat__label">{s.label}</div>
                <div className={`cv-stat__value ${s.cls}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="cv-grid-2">
            {/* Propositions actives */}
            <div className="cv-card">
              <div className="cv-section-title">Propositions actives</div>
              <div className="cv-active-list">
                {activeConsultations.map(c => (
                  <div key={c.id} className="cv-active-item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/propositions/${c.id}`)}>
                    <span className="cv-active-item__title">{c.title}</span>
                    <div className="cv-active-item__bar-wrap">
                      <div className="cv-active-item__bar" style={{ width: Math.min(100, (c.daysLeft / maxDays) * 100) + '%' }} />
                    </div>
                    <span className="cv-active-item__days">{c.daysLeft} jours restants</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <button className="cv-btn cv-btn-outline cv-btn-sm" onClick={() => navigate('/propositions')}>
                  Voir toutes les propositions actives →
                </button>
              </div>
            </div>

            {/* Graphique participation */}
            <div className="cv-card">
              <div className="cv-section-title">Évolution de participation (30 derniers jours)</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={participationTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={2} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#1A4B84" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cv-cta">
            🗳️ Votre voix compte ! Votez sur les propositions et aidez à construire une meilleure communauté.
          </div>
        </div>
      </main>
    </div>
  );
}
