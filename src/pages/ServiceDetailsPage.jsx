import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/api';

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadService = async () => {
      try {
        const { data } = await api.get(`/services/${serviceId}`);
        setService(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load service details');
      }
    };

    loadService();
  }, [serviceId]);

  if (error) return <div className="container"><p className="error-text">{error}</p></div>;
  if (!service) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="card hero-card">
        <h1>{service.name}</h1>
        <p>{service.description}</p>
      </div>

      <div className="worker-grid">
        {service.workers.map((worker) => (
          <div className="card worker-card" key={worker.id}>
            <h3>{worker.name}</h3>
            <p><strong>Experience:</strong> {worker.experience}</p>
            <p><strong>Rating:</strong> {worker.rating}</p>
            <p><strong>Starting Price:</strong> ₹{worker.price}</p>
            <p><strong>Skills:</strong> {worker.skills.join(', ')}</p>
            <div className="row-gap">
              <Link className="primary-btn inline-btn" to={`/services/${service.id}/workers/${worker.id}`}>
                Worker Details
              </Link>
              <a className="secondary-btn inline-btn" href={`tel:${worker.phone}`}>
                Call Worker
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
