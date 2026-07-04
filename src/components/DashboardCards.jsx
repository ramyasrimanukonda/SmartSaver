// src/components/DashboardCards.jsx
import React from 'react';

export default function DashboardCards({ balance, dailyBurn, runway }) {
  
  // Logic determining active risk color tiers
  const getRunwayColor = () => {
    if (balance < 0) return 'var(--zone-danger)';
    if (runway > 60) return 'var(--zone-safe)';
    if (runway >= 15) return 'var(--zone-steady)';
    return 'var(--zone-warning)';
  };

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <h3>Current Survival Fund</h3>
        <p style={{ color: balance < 0 ? 'var(--zone-danger)' : 'var(--text-main)' }}>
          {formatCurrency(balance)}
        </p>
        <small>Your immediate safety net</small>
      </div>

      <div className="stat-card">
        <h3>Daily Speed Limit</h3>
        <p style={{ color: 'var(--text-main)' }}>{formatCurrency(dailyBurn)}</p>
        <small>Avg. money drained per day</small>
      </div>

      <div className="stat-card">
        <h3>Days Until Broke</h3>
        <p style={{ color: getRunwayColor() }}>
          {balance < 0 ? 'Runout!' : `${runway} Days`}
        </p>
        <small>{balance < 0 ? '⚠️ In active debt status' : 'Your estimated timeline'}</small>
      </div>
    </section>
  );
}