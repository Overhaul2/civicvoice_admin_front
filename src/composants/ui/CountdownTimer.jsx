import { useEffect, useState } from 'react';

function calcTimeLeft(deadline) {
  const diff = new Date(deadline) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer({ deadline }) {
  const [t, setT] = useState(calcTimeLeft(deadline));
  useEffect(() => {
    const id = setInterval(() => setT(calcTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', textAlign: 'right' }}>Temps restant</div>
      <div className="cv-countdown">
        <div className="cv-countdown__block"><span className="cv-countdown__num">{pad(t.days)}</span><span className="cv-countdown__label">jours</span></div>
        <div className="cv-countdown__sep">:</div>
        <div className="cv-countdown__block"><span className="cv-countdown__num">{pad(t.hours)}</span><span className="cv-countdown__label">heures</span></div>
        <div className="cv-countdown__sep">:</div>
        <div className="cv-countdown__block"><span className="cv-countdown__num">{pad(t.mins)}</span><span className="cv-countdown__label">min</span></div>
        <div className="cv-countdown__sep">:</div>
        <div className="cv-countdown__block"><span className="cv-countdown__num">{pad(t.secs)}</span><span className="cv-countdown__label">sec</span></div>
      </div>
    </div>
  );
}
