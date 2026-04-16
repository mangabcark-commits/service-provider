import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const LocationPage = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCities = async () => {
      try {
        const { data } = await api.get('/services/cities');
        setCities(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load cities');
      }
    };

    loadCities();
  }, []);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()));
  }, [cities, search]);

  const handleContinue = () => {
    if (!selectedCity) return;
    localStorage.setItem('selectedCity', selectedCity);
    navigate('/services');
  };

  return (
    <div className="container">
      <div className="card hero-card">
        <h1>Select Your City</h1>
        <p>After login, choose location. Then all services will be shown for that city.</p>
        <input
          type="text"
          placeholder="Search city in India"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="city-grid">
        {filteredCities.map((city) => (
          <button
            key={city}
            className={`city-btn ${selectedCity === city ? 'active' : ''}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <button className="primary-btn" onClick={handleContinue} disabled={!selectedCity}>
        Continue to Services
      </button>
    </div>
  );
};

export default LocationPage;
