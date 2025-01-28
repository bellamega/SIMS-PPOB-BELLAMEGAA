import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import './styles/LoginForm.css';
import illustrator from './assets/illustrator.png';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch('https://take-home-test-api.nutech-integrasi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result && result.data && result.data.token) {
          console.log('Login berhasil:', result);
          localStorage.setItem('token', result.data.token); // Save the token
          localStorage.setItem('isLoggedIn', 'true'); // Save login status
          setIsLoggedIn(true); // Update login state
          navigate('/home'); // Navigate to home page
        } else {
          console.error('Token tidak ditemukan dalam respons');
          setError('Login failed, token not found.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Terjadi kesalahan saat login');
      }
    } catch (error) {
      console.error('Error saat login:', error);
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="loginContainer">
      <div className="formContainer">
        <div className="loginForm">
          <h1>SIMS PPOB</h1>
          <p>Masuk atau buat akun untuk memulai</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email:"
              type="email"
              placeholder="masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password:"
              type="password"
              placeholder="masukkan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button-red">
              Masuk
            </button>

            <p>
              Belum punya akun? <a href="/register">Registrasi di sini</a>
            </p>
          </form>
        </div>
      </div>
      <div className="illustrationContainer">
        <img src={illustrator} alt="Illustration" className="illustration" />
      </div>
    </div>
  );
};

export default LoginForm;
