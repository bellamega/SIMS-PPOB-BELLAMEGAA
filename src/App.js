import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import TopUpPage from './components/TopUpPage';
import Transaction from './components/Transaction';
import AccountPage from './components/AccountPage'; // Corrected to AccountPage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
        <Route path="/topup" element={isLoggedIn ? <TopUpPage /> : <Navigate to="/login" />} />
        <Route path="/transaction" element={isLoggedIn ? <Transaction /> : <Navigate to="/login" />} />
        <Route path="/account" element={isLoggedIn ? <AccountPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
