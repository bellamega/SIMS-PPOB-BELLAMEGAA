import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile, setBalance, setServices, setBanner, setError } from '../redux/actions';
import './styles/HomePage.css';
import ProfilePhoto from '../assets/ProfilePhoto.png';
import PBBIcon from '../assets/PBB.png';
import ListrikIcon from '../assets/Listrik.png';
import PulsaIcon from '../assets/Pulsa.png';
import PDAMIcon from '../assets/PDAM.png';
import PGNIcon from '../assets/PGN.png';
import TelevisiIcon from '../assets/Televisi.png';
import MusikIcon from '../assets/Musik.png';
import VoucherGameIcon from '../assets/Game.png';
import VoucherMakananIcon from '../assets/VoucherMakanan.png';
import KurbanIcon from '../assets/Kurban.png';
import ZakatIcon from '../assets/Zakat.png';
import PaketDataIcon from '../assets/PaketData.png';
import Logo from '../assets/Logo.png';

const HomePage = () => {
  const servicesListRef = useRef(); // Untuk referensi services list

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const balance = useSelector((state) => state.balance);
  const services = useSelector((state) => state.services);
  const error = useSelector((state) => state.error);

  // Fetching data on component mount
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
            'Authorization': `Bearer ${token}`  // Tambahkan token di header
          },
        });

        if (!profileResponse.ok) {
          const errorData = await profileResponse.json();
          dispatch(setError(`Terjadi kesalahan saat mengambil profile: ${errorData.message || 'Unknown error'}`));
          return;
        }

        const profileData = await profileResponse.json();
        dispatch(setProfile(profileData));

        // Fetch Balance
        const balanceResponse = await fetch('https://take-home-test-api.nutech-integrasi.com/balance', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!balanceResponse.ok) {
          const errorData = await balanceResponse.json();
          dispatch(setError(`Terjadi kesalahan saat mengambil saldo: ${errorData.message || 'Unknown error'}`));
          return;
        }
        const balanceData = await balanceResponse.json();
        dispatch(setBalance(balanceData));

        // Fetch Services
        const servicesResponse = await fetch('https://take-home-test-api.nutech-integrasi.com/services', {
          headers: { 
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        if (!servicesResponse.ok) {
          const errorData = await servicesResponse.json();
          dispatch(setError(`Terjadi kesalahan saat mengambil services: ${errorData.message || 'Unknown error'}`));
          return;
        }
        const servicesData = await servicesResponse.json();
        dispatch(setServices(servicesData));

        // Fetch Banner (Public API - no token needed)
        const bannerResponse = await fetch('https://take-home-test-api.nutech-integrasi.com/banner', {
          headers: { 'Accept': 'application/json' },
        });

        if (!bannerResponse.ok) {
          const errorData = await bannerResponse.json();
          dispatch(setError(`Terjadi kesalahan saat mengambil banner: ${errorData.message || 'Unknown error'}`));
          return;
        }

        const bannerData = await bannerResponse.json();
        dispatch(setBanner(bannerData.data));  // Menyimpan banner data yang diambil dari API
      } catch (err) {
        dispatch(setError('Terjadi kesalahan saat mengambil data.'));
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

    // Cleanup function to reset error when component unmounts
    return () => {
      dispatch(setError(null)); // Reset error state on cleanup
    };
  }, [dispatch]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>; // Display loading state while profile is being fetched
  }

  const servicesList = [
    { name: 'PBB', icon: PBBIcon },
    { name: 'Listrik', icon: ListrikIcon },
    { name: 'Pulsa', icon: PulsaIcon },
    { name: 'PDAM', icon: PDAMIcon },
    { name: 'PGN', icon: PGNIcon },
    { name: 'Televisi', icon: TelevisiIcon },
    { name: 'Musik', icon: MusikIcon },
    { name: 'Voucher Game', icon: VoucherGameIcon },
    { name: 'Voucher Makanan', icon: VoucherMakananIcon },
    { name: 'Kurban', icon: KurbanIcon },
    { name: 'Zakat', icon: ZakatIcon },
    { name: 'Paket Data', icon: PaketDataIcon },
  ];

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
          <img
            src={profile.profileImage || ProfilePhoto}
            alt="User Avatar"
            className="avatar"
          />
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

        <div className="services-container">
          <div className="services-list" ref={servicesListRef}>
            {servicesList.map((service, index) => (
              <div key={index} className="service-item">
                <img src={service.icon} alt={service.name} />
                <p>{service.name}</p>
              </div>
            ))}
          </div>
        </div>

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
