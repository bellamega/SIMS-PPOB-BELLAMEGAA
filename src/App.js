import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import TopUpPage from './components/TopUpPage';
import Transaction from './components/Transaction';
import AccountPage from './components/AccountPage';
import { setIsLoggedIn } from './redux/authSlice'; // Import action setIsLoggedIn

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Ambil state isLoggedIn dari Redux

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    dispatch(setIsLoggedIn(loggedIn)); // Update state Redux dengan status login
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/topup" element={isLoggedIn ? <TopUpPage /> : <Navigate to="/login" />} />
        <Route path="/transaction" element={isLoggedIn ? <Transaction /> : <Navigate to="/login" />} />
        <Route path="/account" element={isLoggedIn ? <AccountPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
