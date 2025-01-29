import React, { useEffect, useRef, useState } from 'react'; // Import useState
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setBalance, setServices, setBanner, setError } from '../redux/actions';
import './styles/HomePage.css';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import Logo from '../assets/Logo.png';

const HomePage = () => {
  const servicesListRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk dropdown

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.balance);
  const services = useSelector((state) => state.services);
  const banner = useSelector((state) => state.banner);
  const error = useSelector((state) => state.error);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(setError('Token tidak ditemukan. Silakan login kembali.'));
          return;
        }

        // Fetch Profile with Token
        const profileResponse = await fetch('https://take-home-test-api.nutech-integrasi.com/profile', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        // Lanjutkan dengan kode fetching data yang lain (balance, services, etc.)

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

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

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
            <li><Link to="/account">Akun</Link></li>
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
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <i className="icon messages"></i> Messages
                </div>
                <div className="dropdown-item">
                  <i className="icon favorites"></i> Favorites
                </div>
                <div className="dropdown-item">
                  <i className="icon add-people"></i> Add People
                </div>
                <div className="dropdown-item">
                  <i className="icon settings"></i> Settings
                </div>
                <div className="dropdown-item">
                  <i className="icon downloads"></i> Downloads
                </div>
                <div className="dropdown-item">
                  <i className="icon logout"></i> Log Out
                </div>
              </div>
            )}
          </div>
          <p>Selamat datang, {profile.name}</p>
        </section>

        <section className="saldo">
          <div className="saldo-container">
            <p>Saldo Anda</p>
            <p className="saldo-amount">
              {balance && balance.amount ? balance.amount : 'Saldo tidak tersedia'}
            </p>
            <button onClick={() => navigate('/saldo')}>Lihat Saldo</button>
          </div>
        </section>

        {/* Menampilkan Banner */}
        <section className="banner">
          {banner && banner.imageUrl ? (
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
