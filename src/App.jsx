// src/App.jsx
import React, { useState, useEffect } from 'react';
import DashboardCards from './components/DashboardCards';
import TransactionForm from './components/TransactionForm';
import TransactionLedger from './components/TransactionLedger';
import AccountabilityBadge from './components/AccountabilityBadge'; // 1. Import Badge Component
import './App.css';

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('smart_saver_v2');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('smart_saver_v2', JSON.stringify(transactions));
  }, [transactions]);

  // --- ENGINE MATHEMATICS ---
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter((t) => t.amount < 0);
  const totalExpense = Math.abs(expenses.reduce((acc, t) => acc + t.amount, 0));
  
  const dailyBurn = totalExpense / 30;
  const runway = dailyBurn > 0 && balance > 0 ? Math.floor(balance / dailyBurn) : 0;

  const handleAddTransaction = (newTx) => {
    const completeTransaction = {
      ...newTx,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [...prev, completeTransaction]);
  };

  const handleClearData = () => {
    if (window.confirm('Are you completely sure you want to clear your local ledger metrics?')) {
      setTransactions([]);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Smart<span>Saver</span></h1>
        <p>A Conversational Runway Forecast Simulator for College Students</p>
      </header>

      {/* 2. Insert Badge Component under the Header */}
      <AccountabilityBadge balance={balance} runway={runway} />

      <DashboardCards balance={balance} dailyBurn={dailyBurn} runway={runway} />

      <div className="main-content">
        <TransactionForm 
          onAddTransaction={handleAddTransaction} 
          onClearData={handleClearData} 
          currentBalance={balance}
          dailyBurn={dailyBurn}
          currentRunway={runway}
        />
        <TransactionLedger transactions={transactions} />
      </div>
    </div>
  );
}