import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTopUpAmount, setBalance, setError, setSuccessMessage } from './redux/actions';

const handleNavigateToBayar = () => {
  if (!topUpAmount || Number(topUpAmount) <= 0) {
    dispatch(setError("Masukkan nominal yang valid."));
    return;
  }

  navigate("/bayar", { state: { topUpAmount } });
};


const TopUpPage = () => {
  const dispatch = useDispatch();
  const { topUpAmount, balance, error, successMessage } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      dispatch(setError("Token tidak ditemukan. Silakan login terlebih dahulu."));
      return;
    }

    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "https://take-home-test-api.nutech-integrasi.com/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setBalance(response.data.balance));
      } catch (err) {
        dispatch(setError("Gagal mengambil saldo."));
      }
    };

    fetchBalance();
  }, [token, dispatch]);

  const handleTopUpAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      dispatch(setTopUpAmount(value));
      dispatch(setError(""));
      dispatch(setSuccessMessage(""));
    }
  };

  const handleTopUpSubmit = async () => {
    if (!topUpAmount || Number(topUpAmount) <= 0) {
      dispatch(setError("Nominal top up harus lebih dari 0"));
      return;
    }

    if (!token) {
      dispatch(setError("Token tidak ditemukan. Silakan login terlebih dahulu."));
      return;
    }

    try {
      setLoading(true);
      dispatch(setError(""));
      dispatch(setSuccessMessage(""));

      await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        { top_up_amount: Number(topUpAmount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setSuccessMessage(
        `Top Up berhasil! Saldo Anda bertambah sebesar Rp${Number(topUpAmount).toLocaleString()}.`
      ));
      dispatch(setBalance(balance + Number(topUpAmount)));
      dispatch(setTopUpAmount(""));
    } catch (err) {
      if (err.response) {
        dispatch(setError(`Top Up gagal: ${err.response.data.message || "Terjadi kesalahan"}`));
      } else {
        dispatch(setError("Top Up gagal: Tidak dapat terhubung ke server."));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-up-container">
      <div className="top-up-content">
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
          <button onClick={handleNavigateToBayar}>
          Beli
          </button>

            {loading ? "Proses..." : "Top Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
