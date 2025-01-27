import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; // Correct import
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from '../redux/slice/profileSlice'; // Pastikan path-nya benar
import './styles/AccountPage.css'; // Correct import for CSS

const AccountPage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user data from API and set to Redux state
    const fetchUserData = async () => {
      // Example of API call
      const userData = {
        email: "wallet@nutech.com",
        firstName: "Kristanto",
        lastName: "Wibowo",
      };
      dispatch(setProfile(userData)); // Dispatch the profile data to Redux store
    };
    fetchUserData();
  }, [dispatch]);

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo">SIMS PPOB</h1>
        <nav className="nav">
          <Link to="/topup" className="nav-link">Top Up</Link>
          <Link to="/transaction" className="nav-link">Transaction</Link>
          <Link to="/account" className="nav-link active">Akun</Link>
        </nav>
      </header>
      <main className="main">
        <div className="avatar-container">
          <img src="https://via.placeholder.com/100" alt="User Avatar" className="avatar" />
          <button className="edit-button">✏️</button>
        </div>
        <h2 className="username">{profile.firstName} {profile.lastName}</h2>

        <form className="form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              className="form-input"
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nama Depan</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Nama Belakang</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">Simpan</button>
        </form>
      </main>
    </div>
  );
};

export default AccountPage;
