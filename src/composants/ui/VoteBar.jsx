// Barre de vote POUR / CONTRE
export default function VoteBar({ votesFor, votesAgainst, totalVotes }) {
  const pctFor     = totalVotes > 0 ? Math.round((votesFor / totalVotes) * 100) : 0;
  const pctAgainst = totalVotes > 0 ? Math.round((votesAgainst / totalVotes) * 100) : 0;
  return (
    <div className="cv-vote-section">
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Vote total : <strong>{totalVotes.toLocaleString('fr-FR')}</strong></span>
      </div>
      <div className="cv-vote-row">
        <span className="cv-vote-row__label" style={{ color: 'var(--secondary)' }}>POUR</span>
        <div className="cv-vote-row__bar-wrap"><div className="cv-vote-row__bar pour" style={{ width: pctFor + '%' }} /></div>
        <span className="cv-vote-row__count">{votesFor.toLocaleString('fr-FR')} ({pctFor}%)</span>
      </div>
      <div className="cv-vote-row">
        <span className="cv-vote-row__label" style={{ color: 'var(--danger)' }}>CONTRE</span>
        <div className="cv-vote-row__bar-wrap"><div className="cv-vote-row__bar contre" style={{ width: pctAgainst + '%' }} /></div>
        <span className="cv-vote-row__count">{votesAgainst.toLocaleString('fr-FR')} ({pctAgainst}%)</span>
      </div>
    </div>
  );
}
