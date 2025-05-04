import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/LoginModal.css';
import useAuthStore from '../store/authStore'; // Import store Zustand

function LoginModal({ isOpen, onClose }) { // Hapus onLoginSubmit jika tidak lagi dibutuhkan parent
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil action 'login' dari store Zustand
  const loginUser = useAuthStore((state) => state.login);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('https://cmktest.free.beeceptor.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });


      if (!response.ok) {
        // Jika tidak berhasil (misal: 401 Unauthorized, 404 Not Found, dll.)
        // Coba baca body respons untuk pesan error dari server (opsional)
        let errorData = {};
        try {
          // Jika server mengembalikan JSON berisi pesan error
          errorData = await response.json();
        } catch (parseError) {
          // Jika body bukan JSON atau kosong, gunakan status text
          errorData.message = response.statusText || 'Login failed';
        }
        // Lempar Error agar ditangkap di block catch
        throw new Error(errorData.message || 'Login failed');
      }

      // Jika respons berhasil (response.ok adalah true), parse body-nya sebagai JSON
      const apiResponse = await response.json(); // <<< INI YANG PENTING: Parsing JSON
      // >>> Akhir SIMULASI <<<


      console.log('Login successful (Simulated):', apiResponse);

      // Panggil action login dari store Zustand
      loginUser(apiResponse); // Kirim data user yang didapat/disimulasikan dari API

      toast.success("Berhasil Login!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onClose();
      setUsername('');
      setPassword('');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Terjadi kesalahan saat mencoba login. Silakan coba lagi.');
       toast.error(err.message || 'Login gagal!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setUsername('');
      setPassword('');
      setError(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              disabled={isLoading}
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
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleShowPassword}
                aria-label="Toggle password visibility"
                disabled={isLoading}
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="gold-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </button>
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