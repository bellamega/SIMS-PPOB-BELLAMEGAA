import React, { useEffect, useState } from 'react'; // Gunakan useState untuk dropdown
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setBalance, setServices, setBanner, setError } from '../redux/actions';
import axios from 'axios';
import './styles/HomePage.css';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import Logo from '../assets/Logo.png';

const HomePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil state dari Redux store
  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.balance);
  const services = useSelector((state) => state.services);
  const banner = useSelector((state) => state.banner);
  const error = useSelector((state) => state.error);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(setError('Token tidak ditemukan. Silakan login kembali.'));
          return;
        }

        // Mengambil data profile
        const profileResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(setProfile(profileResponse.data.data));

        // Mengambil data saldo
        const balanceResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/balance', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(setBalance(balanceResponse.data.data));

        // Mengambil data layanan
        const servicesResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/services', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(setServices(servicesResponse.data.data));

        // Mengambil data banner
        const bannerResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/banner', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        dispatch(setBanner(bannerResponse.data.data));

      } catch (err) {
        dispatch(setError('Terjadi kesalahan saat mengambil data.'));
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

    return () => {
      dispatch(setError(null)); // Reset error state on cleanup
    };
  }, [dispatch]);

  // Menampilkan error jika ada
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  // Menunggu data profile dimuat
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
      <header>
        <h1 className="logo">
          <img src={Logo} alt="Logo" className="logo-img" />
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            SIMS PPOB
          </Link>
        </h1>
        <nav>
          <ul>
            <li><Link to="/topup">Top Up</Link></li>
            <li><Link to="/transaction">Transaction</Link></li>
            {/* Dropdown Menu */}
            <li className="dropdown">
              <button onClick={toggleDropdown} className="dropdown-btn">
                Akun
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li><a href="/profile">Profile</a></li>
                  <li><a href="/settings">Settings</a></li>
                  <li><a href="/logout">Logout</a></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="user-info">
          <div className="profile-container">
            <img
              src={profile.profileImage || ProfilePhoto}
              alt="User Avatar"
              className="avatar"
              onClick={toggleDropdown} // Tambahkan onClick untuk toggle dropdown
            />
            <p>{profile.first_name} {profile.last_name}</p>
          </div>
        </section>

        <section className="saldo">
          <div className="saldo-container">
            <p>Saldo Anda</p>
            <p className="saldo-amount">
              {balance ? balance.amount : 'Saldo tidak tersedia'}
            </p>
            <button onClick={() => navigate('/saldo')}>Lihat Saldo</button>
          </div>
        </section>

        {/* Menampilkan Banner */}
        <section className="banner">
          {banner ? (
            <img src={banner.imageUrl} alt="Banner" className="banner-img" />
          ) : (
            <p>Tidak ada banner saat ini.</p>
          )}
        </section>

        {/* Layanan */}
        <section className="services">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div key={index} className="service-item">
                <img src={service.icon} alt={`${service.name} Icon`} className="service-icon" />
                <p>{service.name}</p>
              </div>
            ))
          ) : (
            <p>Tidak ada layanan saat ini.</p>
          )}
        </section>
      </main>

      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default HomePage;
