import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import BookingsPage from './pages/BookingsPage';
import LocationPage from './pages/LocationPage';
import LoginPage from './pages/LoginPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';
import ServicesPage from './pages/ServicesPage';
import WorkerDetailsPage from './pages/WorkerDetailsPage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <LocationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/:serviceId"
          element={
            <ProtectedRoute>
              <ServiceDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/:serviceId/workers/:workerId"
          element={
            <ProtectedRoute>
              <WorkerDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
