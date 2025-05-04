import React, { useState } from 'react';
import '../styles/LoginModal.css';

function LoginModal({ isOpen, onClose, onLoginSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ username, password });
    onClose();
    setUsername('');
    setPassword('');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">Log in / Masuk</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Nomor HP / Email</label>
            <input
              type="text"
              placeholder="Masukkan Nomor HP / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-input"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleShowPassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i> // Ikon mata dicoret (regular/outlined)
                ) : (
                  <i className="far fa-eye"></i> // Ikon mata (regular/outlined)
                )}
              </button>
            </div>
          </div>
          <button type="submit" className="gold-button">Login</button>
        </form>
        <p className="forgot-password">Lupa Password</p>
        <p className="register-text">
          Belum punya akun? <span className="register-link">Daftar</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
