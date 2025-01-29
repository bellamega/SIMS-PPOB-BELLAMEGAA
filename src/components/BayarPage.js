import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBalance, setError, setSuccessMessage } from "./redux/actions";

const BayarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { balance, error, successMessage } = useSelector((state) => state);
  const token = localStorage.getItem("jwtToken");

  // Ambil data jumlah bayar dari state yang dikirim dari TopUpPage
  const topUpAmount = location.state?.topUpAmount || 0;

  const handlePayment = async () => {
    if (!token) {
      dispatch(setError("Token tidak ditemukan. Silakan login terlebih dahulu."));
      return;
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/pay",
        { amount: Number(topUpAmount) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setSuccessMessage("Pembayaran berhasil!"));
      dispatch(setBalance(balance - Number(topUpAmount)));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      dispatch(setError("Pembayaran gagal, silakan coba lagi."));
    }
  };

  return (
    <div className="bayar-container">
      <h2>Konfirmasi Pembayaran</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <div className="payment-info">
        <p><strong>Nama:</strong> Kristanto Wibowo</p>
        <p><strong>Saldo Anda:</strong> Rp {balance.toLocaleString()}</p>
        <p><strong>Jumlah Bayar:</strong> Rp {Number(topUpAmount).toLocaleString()}</p>
      </div>

      <button onClick={handlePayment} disabled={Number(topUpAmount) > balance}>
        Bayar
      </button>

      <button onClick={() => navigate("/topup")}>Batal</button>
    </div>
  );
};

export default BayarPage;
