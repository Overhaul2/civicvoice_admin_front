import AdminSidebar from '../../composants/layout/AdminSidebar';
import Topbar from '../../composants/layout/Topbar';
import { fakeConsultations, statsAdmin, participationTrend, recentActivity, categoryStats } from '../../data/fakeData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS_PIE = ['#1A4B84', '#00913E', '#F59E0B', '#E53E3E', '#607D8B'];

export default function AdminDashboard() {
  const topByVotes = [...fakeConsultations].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 3);

  const stats = [
    { label: 'Total utilisateurs',       value: statsAdmin.totalUsers.toLocaleString('fr-FR'),  icon: '👥' },
    { label: 'Total votes',              value: statsAdmin.totalVotes.toLocaleString('fr-FR'),  icon: '🗳️' },
    { label: 'Consultations actives',    value: statsAdmin.activeConsultations,                  icon: '📋', cls: 'green' },
    { label: 'Consultations clôturées',  value: statsAdmin.closedConsultations,                  icon: '🔒', cls: 'orange' },
  ];

  const pieData = categoryStats.map(c => ({ name: c.category, value: c.pct }));

  return (
    <div className="cv-layout">
      <AdminSidebar />
      <main className="cv-main">
        <Topbar title="Tableau de bord Admin" subtitle={new Date().toLocaleDateString('fr-FR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })} />
        <div className="cv-content">

          {/* Stats */}
          <div className="cv-stats">
            {stats.map(s => (
              <div key={s.label} className="cv-stat">
                <div className="cv-stat__label">{s.icon} {s.label}</div>
                <div className={`cv-stat__value ${s.cls || ''}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="cv-grid-2">
            {/* Votes (30 jours) */}
            <div className="cv-card">
              <div className="cv-section-title">Votes — 30 derniers jours</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={participationTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={2} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="votes" stroke="#1A4B84" strokeWidth={2.5} dot={false} name="Votes" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Votes par catégorie */}
            <div className="cv-card">
              <div className="cv-section-title">Votes par catégorie</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS_PIE[i % COLORS_PIE.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="cv-grid-2" style={{ marginTop: 18 }}>
            {/* Activité récente */}
            <div className="cv-card">
              <div className="cv-section-title">Activité récente</div>
              <div className="cv-activity">
                {recentActivity.map((a, i) => (
                  <div key={i} className="cv-activity-item">
                    <div className="cv-activity-dot" />
                    <span style={{ flex: 1 }}>{a.text}</span>
                    <span className="cv-activity-time">il y a {a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top propositions */}
            <div className="cv-card">
              <div className="cv-section-title">Top propositions par votes</div>
              {topByVotes.map((c, i) => (
                <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <span style={{ width:24, height:24, borderRadius:'50%', background:'var(--primary)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{i + 1}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13.5, fontWeight:600 }}>{c.title}</div>
                    <div style={{ fontSize:12, color:'var(--text-muted)' }}>{c.totalVotes.toLocaleString('fr-FR')} votes</div>
                  </div>
                  <span className={`cv-badge ${c.status === 'OUVERTE' ? 'green' : 'gray'}`}>{c.status === 'OUVERTE' ? 'Active' : 'Clôturée'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
