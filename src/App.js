import React, { useState } from 'react';
import Homescreen from './components/Homescreen';
import LoginModal from './components/LoginModal';
import LogoutConfirmModal from './components/LogoutConfirmModal'; // Import modal logout
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Ganti nama state agar lebih jelas
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // State baru untuk modal logout

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    // Mungkin perlu reset state lain jika ada, seperti form login di modal itu sendiri
  };

  // Handler baru untuk modal logout
  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Prop handleLogin (onLoginSubmit) di App tidak lagi digunakan
  // karena LoginModal sudah menangani login API dan update Zustand.
  // Ini bisa dihapus atau dibiarkan sebagai placeholder.
  // const handleLogin = (loginData) => {
  //   console.log("Data login diterima di App (tidak lagi digunakan langsung):", loginData);
  //   // ... logika lain jika perlu SETELAH login sukses di modal ...
  // };

  return (
    <div className="App">
      {/* Homescreen harus menerima onLoginClick dan onLogoutClick
          dan meneruskannya ke komponen Header di dalamnya */}
      <Homescreen
        onLoginClick={handleOpenLoginModal}
        onLogoutClick={handleOpenLogoutModal} // Teruskan handler pembuka modal logout
      />

      {/* LoginModal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        // onLoginSubmit props dari parent (App.js) tidak lagi dipanggil di sini
        // onLoginSubmit={handleLogin} // Prop ini bisa dihapus jika tidak digunakan di LoginModal
      />

      {/* Tambahkan LogoutConfirmModal di sini */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
      />

      {/* ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;