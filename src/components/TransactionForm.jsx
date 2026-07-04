// src/components/TransactionForm.jsx
import React, { useState } from 'react';

export default function TransactionForm({ onAddTransaction, onClearData, currentBalance, dailyBurn, currentRunway }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  
  // Simulator Local State
  const [simAmount, setSimAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc || !amount) return;

    // Convert to absolute positive if income, keep negative if expense
    const parsedAmount = parseFloat(amount);

    onAddTransaction({
      desc: `[${category}] ${desc}`,
      amount: parsedAmount,
    });

    setDesc('');
    setAmount('');
  };

  // Live Simulator Logic calculation
  const getSimulatedImpact = () => {
    const cost = parseFloat(simAmount);
    if (!cost || cost <= 0 || dailyBurn === 0) return null;
    
    const newSimulatedBalance = currentBalance - cost;
    if (newSimulatedBalance < 0) return "⚠️ Warning: This will put you into immediate debt!";
    
    const newSimulatedRunway = Math.floor(newSimulatedBalance / dailyBurn);
    const daysLost = currentRunway - newSimulatedRunway;

    return daysLost > 0 
      ? `Buying this cuts your survival window by ${daysLost} days (Down to ${newSimulatedRunway} days left).`
      : `Minimal impact on current window timeline.`;
  };

  const simResult = getSimulatedImpact();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <section className="panel">
        <h3>Track Cash Flow</h3>
        <form onSubmit={handleSubmit}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">🍔 Food & Chai</option>
            <option value="Travel">🚗 Travel / Commute</option>
            <option value="Stipend">💼 Income / Stipend</option>
            <option value="Sub">📺 Subscriptions / Fees</option>
            <option value="Misc">📦 Miscellaneous</option>
          </select>

          <input
            type="text"
            placeholder="Where did the money go/come from?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount (Use minus '-' for expenses)"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit">Update Survival Fund</button>
          <button
            type="button"
            onClick={onClearData}
            style={{ marginTop: '10px', backgroundColor: '#cbd5e1', color: '#1e293b' }}
          >
            Reset Ledger Data
          </button>
        </form>
      </section>

      {/* UNIQUE INTERVIEW FEATURE: INTUITIVE SIMULATOR BOX */}
      <section className="panel" style={{ border: '1px dashed #ec4899' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#db2777' }}>✨ "Can I Afford This?" Tester</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '5px 0 15px 0' }}>
          Test an expense scenario before checking out.
        </p>
        <input 
          type="number" 
          placeholder="Enter cost price (e.g. 1500)" 
          value={simAmount}
          onChange={(e) => setSimAmount(e.target.value)}
        />
        {simResult && (
          <div className="simulator-box">
            <p className="simulator-alert">{simResult}</p>
          </div>
        )}
      </section>
    </div>
  );
}