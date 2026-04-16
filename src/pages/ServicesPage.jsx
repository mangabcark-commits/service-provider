import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../api/api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const selectedCity = localStorage.getItem('selectedCity');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await api.get(`/services?city=${encodeURIComponent(selectedCity || '')}`);
        setServices(data.services || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load services');
      }
    };

    if (selectedCity) {
      loadServices();
    }
  }, [selectedCity]);

  if (!selectedCity) {
    return <Navigate to="/locations" replace />;
  }

  return (
    <div className="container">
      <div className="card hero-card">
        <h1>Services in {selectedCity}</h1>
        <p>Choose one service to view workers and their details.</p>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="service-grid">
        {services.map((service) => (
          <div className="card service-card" key={service.id}>
            <img src={service.image} alt={service.name} />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p><strong>Workers:</strong> {service.workers.length}</p>
            <Link className="primary-btn inline-btn" to={`/services/${service.id}`}>
              View Workers
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
