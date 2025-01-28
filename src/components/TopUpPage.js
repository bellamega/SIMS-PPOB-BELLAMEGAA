import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles/TopUpPage.css";
import Logo from '../assets/Logo.png';

const TopUpPage = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true); // For toggling balance visibility
  const [userName, setUserName] = useState("Kristanto Wibowo"); // Default, can be fetched from localStorage
  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    // Pastikan token tersedia sebelum memulai pengambilan data saldo
    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      return;
    }

    // Fetch user name from localStorage if exists
    const fetchedUserName = localStorage.getItem("userName");
    if (fetchedUserName) setUserName(fetchedUserName);

    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Menambahkan token ke header
            },
          }
        );
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError("Gagal mengambil saldo.");
      }
    };

    fetchBalance();
  }, [token]);

  const handleTopUpAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTopUpAmount(value);
      setError("");
      setSuccessMessage("");
    }
  };

  const handlePredefinedAmountClick = (amount) => {
    setTopUpAmount(amount);
    setError("");
    setSuccessMessage("");
  };

  const handleTopUpSubmit = async () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) {
      setError("Nominal top up harus lebih dari 0");
      return;
    }

    if (!token) {
      setError("Token tidak ditemukan. Silakan login terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        { top_up_amount: Number(topUpAmount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Menambahkan token ke header
          },
        }
      );

      setSuccessMessage(
        `Top Up berhasil! Saldo Anda bertambah sebesar Rp${Number(
          topUpAmount
        ).toLocaleString()}.`
      );
      setBalance(balance + Number(topUpAmount));
      setTopUpAmount("");
      navigate("/transaction");
    } catch (err) {
      if (err.response) {
        setError(
          `Top Up gagal: ${err.response.data.message || "Terjadi kesalahan"}`
        );
      } else {
        setError("Top Up gagal: Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="top-up-container">
      <Header />

      <div className="top-up-content">
        <BalanceSection balance={balance} isVisible={isBalanceVisible} toggleVisibility={toggleBalanceVisibility} />

        <div className="user-greeting">
          <h3>Selamat datang,</h3>
          <h2>{userName}</h2>
          <p>Silahkan masukkan</p>
        </div>

        <h3 className="top-up-title">Nominal Top Up</h3>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="top-up-form">
          <input
            type="number"
            placeholder="Masukkan nominal Top Up"
            value={topUpAmount}
            onChange={handleTopUpAmountChange}
            disabled={loading}
          />
          <button
            className="top-up-button"
            onClick={handleTopUpSubmit}
            disabled={loading || Number(topUpAmount) <= 0}
          >
            {loading ? "Proses..." : "Top Up"}
          </button>
        </div>

        <PredefinedAmounts
          onAmountClick={handlePredefinedAmountClick}
          disabled={loading}
        />
      </div>
    </div>
  );
};

const Header = () => (
  <header className="top-up-header">
    <h1>
      <img src={Logo} alt="Logo" className="logo-img" />
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        SIMS PPOB
      </Link>
    </h1>
    <nav>
      <Link to="/topup">Top Up</Link>
      <Link to="/transaction">Transaction</Link>
      <Link to="/account">Akun</Link>
    </nav>
  </header>
);

const BalanceSection = ({ balance, isVisible, toggleVisibility }) => (
  <div className="top-up-balance">
    <h2>Saldo Anda</h2>
    {isVisible ? (
      <p className="balance-amount">Rp {balance.toLocaleString()}</p>
    ) : (
      <p className="balance-amount">*****</p>
    )}
    <button className="hide-balance" onClick={toggleVisibility}>
      {isVisible ? "Tutup Saldo 👁" : "Lihat Saldo 👁"}
    </button>
  </div>
);

const PredefinedAmounts = ({ onAmountClick, disabled }) => {
  const amounts = [10000, 20000, 50000, 100000, 250000, 500000];
  return (
    <div className="predefined-amounts">
      {amounts.map((amount) => (
        <button
          key={amount}
          onClick={() => onAmountClick(amount)}
          disabled={disabled}
        >
          {`Rp${amount.toLocaleString()}`}
        </button>
      ))}
    </div>
  );
};

export default TopUpPage;
