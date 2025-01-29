import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../redux/slice/profileSlice";
import "./styles/AccountPage.css";

const AccountPage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = {
        email: "wallet@nutech.com",
        firstName: "Kristanto",
        lastName: "Wibowo",
      };
      dispatch(setProfile(userData));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setProfile(formState));
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
        <img src="/src/assets/Logo.png" alt="Logo" />
        </div>
        <nav className="nav">
          <Link to="/topup" className="nav-link">
            Top Up
          </Link>
          <Link to="/transaction" className="nav-link">
            Transaction
          </Link>
          <Link to="/account" className="nav-link active">
            Akun
          </Link>
        </nav>
      </header>
      <main className="main">
        <div className="avatar-container">
          <img
            src={profile.avatar || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="avatar"
          />
          <button className="edit-button">✏️</button>
        </div>
        <h2 className="username">
          {profile.firstName} {profile.lastName}
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
