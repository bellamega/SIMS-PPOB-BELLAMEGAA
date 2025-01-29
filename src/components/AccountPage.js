import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../redux/slice/profileSlice";
import "./styles/AccountPage.css";
import Logo from '../assets/Logo.png';

console.log(Logo); // Cek apakah path benar

const AccountPage = () => {
  const profile = useSelector((state) => state.profile); // Ambil data profile dari Redux
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    avatar: profile.avatar || "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        email: "wallet@nutech.com",
        firstName: "Kristanto",
        lastName: "Wibowo",
        avatar: "https://via.placeholder.com/100", // Tambahkan avatar awal
      };
      dispatch(setProfile(userData)); // Update Redux state dengan data yang didapat
    };
    fetchUserData();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logika untuk mengganti avatar, bisa mengupload ke server atau menggunakan URL
      setFormState((prevState) => ({
        ...prevState,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setProfile(formState)); // Kirim data baru ke Redux
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            SIMS PPOB
          </Link>
        </h1>
        <nav className="nav">
          <Link to="/topup" className="nav-link">Top Up</Link>
          <Link to="/transaction" className="nav-link">Transaction</Link>
          <Link to="/account" className="nav-link active">Akun</Link>
        </nav>
      </header>

      <main className="main">
        <div className="avatar-container">
          <img
            src={formState.avatar || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="avatar"
          />
          <input 
            type="file" 
            className="edit-avatar-button" 
            onChange={handleAvatarChange}
          />
        </div>

        <h2 className="username">
          {formState.firstName} {formState.lastName}
        </h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="form-input"
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
};

export default AccountPage;
