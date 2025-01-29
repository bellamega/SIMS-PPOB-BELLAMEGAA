import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Transaction.css";
import Logo from '../assets/Logo.png';

const transactions = [
  { amount: "+ Rp10.000", date: "17 Agustus 2023 13:10 WIB", type: "Top Up Saldo" },
  { amount: "- Rp40.000", date: "17 Agustus 2023 12:10 WIB", type: "Pulsa Prabayar" },
  { amount: "- Rp10.000", date: "17 Agustus 2023 11:10 WIB", type: "Listrik Pascabayar" },
  { amount: "+ Rp50.000", date: "17 Agustus 2023 10:10 WIB", type: "Top Up Saldo" },
  { amount: "+ Rp50.000", date: "17 Agustus 2023 10:10 WIB", type: "Top Up Saldo" },
];

const TransactionPage = () => {
  const [displayedTransactions, setDisplayedTransactions] = useState(
    transactions.slice(0, 5)
  );
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
    setDisplayedTransactions(transactions);
  };

  return (
    <div className="transaction-container">
      <header className="header">
      <h1 className="logo">
    <div className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
          </div>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>SIMS PPOB</Link>
        </h1>
        <nav>
          <ul className="nav-links">
          <li>
              <Link to="/topup">Top Up</Link>
            </li>
            <li>
              <Link to="/transaction">Transaction</Link>
            </li>
            <li>Akun</li>
          </ul>
        </nav>
      </header>

      <div className="welcome-section">
        <h2>Selamat datang,</h2>
        <h1>Kristanto Wibowo</h1>
      </div>

      <div className="balance-card">
        <h3>Saldo anda</h3>
        <p className="balance">Rp 0</p> {/* Menampilkan saldo 0 */}
        <button className="view-balance">Lihat Saldo</button>
      </div>

      <div className="transaction-section">
        <h2>Semua Transaksi</h2>
        <ul className="transaction-list">
          {displayedTransactions.map((transaction, index) => (
            <li className="transaction-item" key={index}>
              <div
                className={`transaction-amount ${
                  transaction.amount.startsWith("-") ? "negative" : "positive"
                }`}
              >
                {transaction.amount}
              </div>
              <div className="transaction-details">
                <p className="transaction-date">{transaction.date}</p>
                <p className="transaction-type">{transaction.type}</p>
              </div>
            </li>
          ))}
        </ul>

        {!showAll && displayedTransactions.length < transactions.length && (
          <button className="show-more" onClick={handleShowMore}>
            Tampilkan Semua
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
