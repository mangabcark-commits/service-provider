import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const WorkerDetailsPage = () => {
  const { serviceId, workerId } = useParams();
  const navigate = useNavigate();
  const selectedCity = localStorage.getItem('selectedCity') || '';
  const [worker, setWorker] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ date: '', time: '', address: '', notes: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadWorker = async () => {
      try {
        const { data } = await api.get(`/services/${serviceId}/workers/${workerId}`);
        setWorker(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load worker');
      }
    };

    loadWorker();
  }, [serviceId, workerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.post('/bookings', {
        city: selectedCity,
        serviceId,
        serviceName: worker.serviceName,
        workerId,
        workerName: worker.name,
        ...form
      });
      setMessage('Booking created successfully');
      navigate('/bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (error && !worker) return <div className="container"><p className="error-text">{error}</p></div>;
  if (!worker) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container two-column-layout">
      <div className="card">
        <h1>{worker.name}</h1>
        <p><strong>Service:</strong> {worker.serviceName}</p>
        <p><strong>Description:</strong> {worker.serviceDescription}</p>
        <p><strong>Experience:</strong> {worker.experience}</p>
        <p><strong>Rating:</strong> {worker.rating}</p>
        <p><strong>Price:</strong> ₹{worker.price}</p>
        <p><strong>City:</strong> {selectedCity}</p>
        <p><strong>Skills:</strong> {worker.skills.join(', ')}</p>
        <a className="secondary-btn inline-btn" href={`tel:${worker.phone}`}>Call {worker.name}</a>
      </div>

      <div className="card">
        <h2>Book this Worker</h2>
        <form onSubmit={handleBooking} className="form-grid">
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="time" name="time" value={form.time} onChange={handleChange} required />
          <textarea
            name="address"
            placeholder="Enter full address"
            value={form.address}
            onChange={handleChange}
            rows="4"
            required
          />
          <textarea
            name="notes"
            placeholder="Extra notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows="3"
          />
          <button type="submit">Book Now</button>
        </form>
        {error ? <p className="error-text">{error}</p> : null}
        {message ? <p className="success-text">{message}</p> : null}
      </div>
    </div>
  );
};

export default WorkerDetailsPage;
