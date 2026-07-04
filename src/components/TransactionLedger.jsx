// src/components/TransactionLedger.jsx
import React from 'react';

export default function TransactionLedger({ transactions }) {
  return (
    <section className="panel">
      <h3>Transaction Ledger History</h3>
      <div id="transaction-list">
        {transactions.length === 0 ? (
          <p style={{ opacity: 0.5, textAlign: 'center', padding: '40px 0' }}>
            No transaction records built yet. Clear horizon!
          </p>
        ) : (
          transactions.slice().reverse().map((t) => {
            const isPositive = t.amount > 0;
            return (
              <div key={t.id} className={`history-item ${isPositive ? 'plus' : 'minus'}`}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.desc}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
                <span style={{ color: isPositive ? 'var(--zone-safe)' : 'var(--zone-danger)', fontWeight: '700' }}>
                  {isPositive ? '+' : ''}
                  {t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}