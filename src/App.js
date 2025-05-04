import React, { useState } from 'react';
import Homescreen from './components/Homescreen';
import LoginModal from './components/LoginModal';
import './styles/App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = (loginData) => {
    console.log("Data login diterima di App:", loginData);
    alert(`Login attempt with Username: ${loginData.username}`);
    // Modal akan ditutup oleh komponen LoginModal
  };

  return (
    <div className="App">
      {/* Pass handleOpenModal ke Homescreen */}
      <Homescreen onLoginClick={handleOpenModal} />

      {/* LoginModal tetap sama */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLoginSubmit={handleLogin}
      />
    </div>
  );
}

export default App;