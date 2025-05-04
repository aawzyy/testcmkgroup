import React, { useState } from 'react';
import '../styles/LoginModal.css'; // Pastikan path ini benar

function LoginModal({ isOpen, onClose, onLoginSubmit }) { // onLoginSubmit mungkin tidak lagi dibutuhkan jika API menangani semuanya
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // Jika modal tidak terbuka, jangan render apa pun
  if (!isOpen) return null;

  const handleSubmit = async (e) => { // Gunakan async di sini
    e.preventDefault();
    setError(null); // Bersihkan error sebelumnya
    setIsLoading(true); // Set loading menjadi true

    try {
      const response = await fetch('https://cmkgrouptest.free.beeceptor.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Jika API memerlukan header lain (misalnya Authorization), tambahkan di sini
        },
        body: JSON.stringify({
          username: username, // Sesuaikan nama field jika API mengharapkan nama lain (misal: email, phone)
          password: password,
        }),
      });

      // Beeceptor akan selalu mengembalikan respons sukses (status 200)
      // Namun dalam aplikasi nyata, Anda akan memeriksa response.ok
      // atau response.status (misalnya if (response.status === 200))

      // Dalam contoh nyata, Anda akan memeriksa response.ok atau status code
      // if (!response.ok) {
      //   const errorData = await response.json(); // Coba baca pesan error dari body
      //   throw new Error(errorData.message || 'Login failed'); // Lempar error
      // }

      const data = await response.json(); // Baca response body (untuk logging atau pemrosesan data sukses)
      console.log('Login successful:', data); // Log data response

      // Jika login sukses (dalam kasus nyata, Anda akan memproses token atau info user di sini)
      // Anda bisa memanggil onLoginSubmit atau prop lain untuk memberi tahu parent
      // if (onLoginSubmit) {
      //    onLoginSubmit(data); // Kirim data response sukses ke parent jika perlu
      // }

      // Tutup modal dan reset form setelah sukses
      onClose();
      setUsername('');
      setPassword('');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Terjadi kesalahan saat mencoba login. Silakan coba lagi.'); // Set pesan error
      // Jangan tutup modal jika terjadi error, biarkan user mencoba lagi
    } finally {
      setIsLoading(false); // Set loading menjadi false setelah selesai (baik sukses maupun error)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // Tutup modal hanya jika mengklik overlay
      onClose();
      // Opsional: reset form dan error saat menutup via overlay
      setUsername('');
      setPassword('');
      setError(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Stop propagation agar klik di konten tidak menutup modal */}
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
              disabled={isLoading} // Nonaktifkan input saat loading
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
                disabled={isLoading} // Nonaktifkan input saat loading
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleShowPassword}
                aria-label="Toggle password visibility"
                disabled={isLoading} // Nonaktifkan tombol toggle saat loading
              >
                {showPassword ? (
                  <i className="far fa-eye-slash"></i>
                ) : (
                  <i className="far fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          {/* Tampilkan pesan error jika ada */}
          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="gold-button"
            disabled={isLoading} // Nonaktifkan tombol saat loading
          >
            {isLoading ? 'Loading...' : 'Login'} {/* Tampilkan teks loading */}
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