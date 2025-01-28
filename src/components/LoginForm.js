import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import './styles/LoginForm.css';
import illustrator from './assets/illustrator.png';

// Komponen untuk menampilkan banner
const BannerComponent = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://take-home-test-api.nutech-integrasi.com/banner', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 0 && data.data) {
            setBanners(data.data);
          } else {
            setError('No banners available');
          }
        } else {
          setError('Failed to load banners');
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError('Error fetching banners');
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="bannerContainer">
      {error && <p>{error}</p>}
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <div key={index} className="bannerItem">
            <img src={banner.banner_image} alt={banner.banner_name} className="bannerImage" />
            <h3>{banner.banner_name}</h3>
            <p>{banner.description}</p>
          </div>
        ))
      ) : (
        <p>No banners available</p>
      )}
    </div>
  );
};

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek jika email atau password kosong
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const data = { email, password };

    try {
      // Request login ke API
      const response = await fetch('https://take-home-test-api.nutech-integrasi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Jika login berhasil (status 200)
      if (response.ok) {
        const result = await response.json();
        if (result && result.data && result.data.token) {
          console.log('Login berhasil:', result);

          // Simpan token di localStorage
          localStorage.setItem('token', result.data.token); 
          localStorage.setItem('isLoggedIn', 'true'); // Set login status ke true
          
          setIsLoggedIn(true); // Update state login
          
          // Navigasi ke halaman home setelah login berhasil
          navigate('/home');
        } else {
          console.error('Token tidak ditemukan dalam respons');
          setError('Login failed, token not found.');
        }
      } else {
        // Jika response tidak oke (misalnya status 400 atau 500)
        const errorData = await response.json();
        setError(errorData.message || 'Terjadi kesalahan saat login');
      }
    } catch (error) {
      // Tangani error jika ada masalah dengan request
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
          {error && <p className="error">{error}</p>} {/* Tampilkan pesan error jika ada */}
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

      {/* Menambahkan komponen BannerComponent untuk menampilkan banner */}
      <BannerComponent />
    </div>
  );
};

export default LoginForm;
