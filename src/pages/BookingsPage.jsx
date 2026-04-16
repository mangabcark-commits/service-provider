import { useEffect, useState } from 'react';
import api from '../api/api';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const loadBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel and delete this booking?')) return;
    
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete booking');
    }
  };

  return (
    <div className="container">
      <div className="card hero-card">
        <h1>My Bookings</h1>
        <p>All booked service requests are shown here.</p>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      <div className="booking-list">
        {bookings.length === 0 ? (
          <div className="card"><p>No bookings found in database.</p></div>
        ) : (
          bookings.map((booking) => (
            <div className="card booking-card" key={booking._id} style={{ position: 'relative' }}>
              <h3>{booking.serviceName}</h3>
              <p><strong>Worker:</strong> {booking.workerName}</p>
              <p><strong>City:</strong> {booking.city}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {booking.notes ? <p><strong>Notes:</strong> {booking.notes}</p> : null}
              
              <button 
                onClick={() => handleDelete(booking._id)} 
                className="secondary-btn" 
                style={{ marginTop: '10px', backgroundColor: '#dc3545', color: '#fff' }}>
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
