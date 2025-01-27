import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputField from './InputField';
import './styles/RegisterForm.css';
import illustration from './assets/illustrator.png';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error messages
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Format email tidak valid.');
      return;
    }
  
    // Validate password length
    if (password.length < 8) {
      setError('Password harus memiliki panjang minimal 8 karakter.');
      return;
    }
  
    // Validate first and last name
    if (!firstName.trim() || !lastName.trim()) {
      setError('Nama depan dan nama belakang tidak boleh kosong.');
      return;
    }
  
    // Validate confirm password
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
  
    // If all validations pass, send data to API
    const requestData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };
  
    console.log(requestData); // Check data being sent
  
    // Corrected API URL
    fetch("https://take-home-test-api.nutech-integrasi.com/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Send requestData as JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal melakukan registrasi.");
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        console.log(data); // Check API response
        if (data.status === 0) {
          alert("Registrasi berhasil silahkan login");
          navigate("/login"); // Redirect to login after successful registration
        } else if (data.status === 102) {
          setError("Email sudah terdaftar. Silakan coba email lain.");
        } else {
          setError(data.message || "Registrasi gagal. Coba lagi.");
        }
      })
      .catch((error) => {
        setError("Terjadi kesalahan. Silakan coba lagi.");
        console.error("Error:", error);
      });
  };
  

  return (
    <div className="registerContainer">
      <div className="formContainer">
        <h1>SIMS PPOB</h1>
        <p>Lengkap data untuk membuat akun</p>
        {error && <p className="error">{error}</p>} {/* Tampilkan error jika ada */}
        <form onSubmit={handleSubmit}>
          <InputField label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Nama Depan" type="text" placeholder="Nama Depan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputField label="Nama Belakang" type="text" placeholder="Nama Belakang" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <InputField label="Buat Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Konfirmasi Password" type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button
            type="submit"
            className="button-red"
            disabled={ !email || !firstName || !lastName || password.length < 8 || password !== confirmPassword }
          >
            Registrasi
          </button>
        </form>
        <p>Sudah punya akun? <a href="/">Login di sini</a></p>
      </div>
      <div className="illustrationContainer">
        <img src={illustration} alt="Illustration" className="illustration" />
      </div>
    </div>
  );
};

export default RegisterForm;
