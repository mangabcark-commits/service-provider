import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  password: '',
  city: ''
};

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const payload = isRegister ? form : { email: form.email, password: form.password };
      const { data } = await api.post(endpoint, payload);
      login(data);
      if (data.user.city) {
        localStorage.setItem('selectedCity', data.user.city);
      }
      setSuccess(data.message);
      navigate('/locations');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card card">
        <h1>{isRegister ? 'Create Account' : 'Login'}</h1>
        <p>Login first, then select your city and view all services and workers.</p>

        <form onSubmit={handleSubmit} className="form-grid">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {isRegister && (
            <input
              type="text"
              name="city"
              placeholder="Optional default city"
              value={form.city}
              onChange={handleChange}
            />
          )}

          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
          <p style={{ fontSize: '13px', color: '#475569' }}>Use local MongoDB Compass connection: <strong>mongodb://127.0.0.1:27017</strong></p>
        </form>

        {error ? <p className="error-text">{error}</p> : null}
        {success ? <p className="success-text">{success}</p> : null}

        <button className="link-btn" onClick={() => setIsRegister((prev) => !prev)}>
          {isRegister ? 'Already have an account? Login' : 'New user? Register'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
