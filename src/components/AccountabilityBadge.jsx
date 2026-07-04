// src/components/AccountabilityBadge.jsx
import React from 'react';

export default function AccountabilityBadge({ balance, runway }) {
  
  // High-performance configuration object mapping states to visual profiles
  const getBadgeConfig = () => {
    if (balance < 0 || runway === 0) {
      return {
        title: "Instant Noodle Diet",
        status: "Financial Crisis Mode",
        icon: "🦴",
        classNames: "badge-crisis badge-crisis-bg"
      };
    }
    if (runway > 90) {
      return {
        title: "Wealth Overlord",
        status: "Absolute Safe Zone",
        icon: "👑",
        classNames: "badge-overlord badge-overlord-bg"
      };
    }
    if (runway >= 30) {
      return {
        title: "Smart Survivor",
        status: "Balanced Horizon",
        icon: "⚔️",
        classNames: "badge-survivor badge-survivor-bg"
      };
    }
    return {
      title: "Living on the Edge",
      status: "High Risk Threshold",
      icon: "🚨",
      classNames: "badge-edge badge-edge-bg"
    };
  };

  const badge = getBadgeConfig();

  return (
    <div className="badge-container">
      <div className={`badge-icon-frame ${badge.classNames.split(' ')[1]}`}>
        {badge.icon}
      </div>
      <div className="badge-info">
        <h4>Financial Rank</h4>
        <p className={`badge-title ${badge.classNames.split(' ')[0]}`}>
          {badge.title} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>— {badge.status}</span>
        </p>
      </div>
    </div>
  );
}