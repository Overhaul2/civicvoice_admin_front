import Sidebar from '../../composants/layout/Sidebar';
import Topbar from '../../composants/layout/Topbar';
import VoteBar from '../../composants/ui/VoteBar';
import { fakeConsultations, categoryStats } from '../../data/fakeData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#00913E', '#E53E3E'];

export default function Resultats() {
  const totalFor     = fakeConsultations.reduce((s, c) => s + c.votesFor, 0);
  const totalAgainst = fakeConsultations.reduce((s, c) => s + c.votesAgainst, 0);
  const totalVotes   = totalFor + totalAgainst;
  const pieData = [{ name: 'POUR', value: totalFor }, { name: 'CONTRE', value: totalAgainst }];

  return (
    <div className="cv-layout">
      <Sidebar />
      <main className="cv-main">
        <Topbar title="Résultats & Statistiques" />
        <div className="cv-content">
          {/* Résumé global */}
          <div className="cv-stats">
            {[
              { label: 'Total propositions',  value: fakeConsultations.length },
              { label: 'Total votes',         value: totalVotes.toLocaleString('fr-FR') },
              { label: 'Votes POUR',          value: totalFor.toLocaleString('fr-FR'),     cls: 'green' },
              { label: 'Votes CONTRE',        value: totalAgainst.toLocaleString('fr-FR'), cls: 'orange' },
            ].map(s => (
              <div key={s.label} className="cv-stat">
                <div className="cv-stat__label">{s.label}</div>
                <div className={`cv-stat__value ${s.cls || ''}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="cv-grid-2">
            {/* Résultats par catégorie */}
            <div className="cv-card">
              <div className="cv-section-title">Participation par catégorie</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryStats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
                  <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={90} />
                  <Tooltip formatter={(v) => v + '%'} />
                  <Bar dataKey="pct" fill="#1A4B84" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie global */}
            <div className="cv-card">
              <div className="cv-section-title">Répartition globale des votes</div>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => v.toLocaleString('fr-FR')} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Détail par proposition */}
          <div className="cv-card" style={{ marginTop: 18 }}>
            <div className="cv-section-title">Détail par proposition</div>
            {fakeConsultations.map(c => (
              <div key={c.id} style={{ marginBottom: 20 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</span>
                  <span className={`cv-badge ${c.status === 'OUVERTE' ? 'green' : 'gray'}`}>{c.status === 'OUVERTE' ? 'Active' : 'Clôturée'}</span>
                </div>
                <VoteBar votesFor={c.votesFor} votesAgainst={c.votesAgainst} totalVotes={c.totalVotes} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
