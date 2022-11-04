import React, { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';

// Components
import Layout from './components/Layout';
import { authActions } from './store/auth';

let logoutTimer;

export default function App() {
  const auth = useSelector(st => st.auth);
  const { token } = auth;
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());
    clearInterval(logoutTimer);
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem('expiration') - Date.now();
      if (timeLeft <= 0) {
        logoutHandler();
      } else {
        logoutTimer = setTimeout(logoutHandler, timeLeft);
      }
    }
  }, [token, logoutHandler]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {auth.isLoggedIn ? (
          <>
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="login" element={<LoginPage />} />
            <Route path="home" element={<Navigate to="/login" replace />} />
            <Route path="perfil" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Route>
    </Routes>
  );
}