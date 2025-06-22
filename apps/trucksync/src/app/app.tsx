import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiList,
  FiHome,
  FiTruck,
  FiCreditCard,
  FiStar,
  FiBarChart2,
} from 'react-icons/fi';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';

import TruckOwnerHome from './TruckOwnerHome';
import SignUpPage from './SignUpPage';
import BookingPage from './BookingPage';
import OwnerDashboard from './OwnerDashboard';
import RatingsSupportPage from './RatingsSupportPage';
import TripDetailsPage from './TripDetailsPage';
import TripHistoryPage from './TripHistoryPage';
import WelcomePage from './WelcomePage';
import UserProfilePage from './UserProfilePage';
import TruckOwnerHomePage from './TruckOwnerHomePage';
import AuthWrapper from './AuthWrapper';
import 'leaflet/dist/leaflet.css';

export function App() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role;

  if (!userRole) {
    return <div>Loading user role...</div>;
  }

  const links = [
    { to: '/', label: 'Welcome', icon: <FiHome />, roles: ['admin', 'owner'] },
    { to: '/home', label: 'Profile', icon: <FiUser />, roles: ['admin', 'owner'] },
    { to: '/login', label: 'Sign Up', icon: <FiUser />, roles: ['admin', 'owner'] },
    { to: '/book', label: 'Booking', icon: <FiCreditCard />, roles: ['admin', 'owner'] },
    { to: '/payment-success', label: 'Trip Detail', icon: <FiList />, roles: ['admin', 'owner'] },
    { to: '/dashboard', label: 'Dashboard', icon: <FiBarChart2 />, roles: ['admin'] },
    { to: '/rating', label: 'Ratings', icon: <FiStar />, roles: ['admin', 'owner'] },
    { to: '/trip-history', label: 'Trip History', icon: <FiList />, roles: ['admin', 'owner'] },
    { to: '/ownerhome', label: 'Owner Home', icon: <FiTruck />, roles: ['owner'] },
    { to: '/ownerhomepage', label: 'Owner Homepage', icon: <FiTruck />, roles: ['owner'] },
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} relative min-h-screen flex flex-col`}>
      {/* HEADER */}
      <div className={`flex justify-between items-center p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <h1 className="text-xl font-bold">Truck Sync</h1>
        <div className="flex items-center space-x-4">
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`text-gray-600 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MAIN ROUTES */}
      <div className="flex-1 p-4">
        <Routes>
          <Route
            path="/"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <WelcomePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/home"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <UserProfilePage />
              </AuthWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <SignUpPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/book"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <BookingPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/payment-success"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TripDetailsPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin']}>
                <OwnerDashboard />
              </AuthWrapper>
            }
          />
          <Route
            path="/rating"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <RatingsSupportPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/trip-history"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TripHistoryPage role={userRole} />
              </AuthWrapper>
            }
          />
          <Route
            path="/trip/:id"
            element={
              <AuthWrapper role={userRole} allowedRoles={['admin', 'owner']}>
                <TripDetailsPage />
              </AuthWrapper>
            }
          />
          <Route
            path="/ownerhome"
            element={
              <AuthWrapper role={userRole} allowedRoles={['owner']}>
                <TruckOwnerHome />
              </AuthWrapper>
            }
          />
          <Route
            path="/ownerhomepage"
            element={
              <AuthWrapper role={userRole} allowedRoles={['owner']}>
                <TruckOwnerHomePage />
              </AuthWrapper>
            }
          />
        </Routes>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col p-4 space-y-4 z-50`}
      >
        <h3 className="text-lg font-bold border-b pb-2">Menu</h3>
        {links.filter((link) => link.roles.includes(userRole)).map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 p-2 rounded hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} text-gray-700 dark:text-gray-300 hover:text-blue-600`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </div>
  );
}

export default App;
