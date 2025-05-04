import React from 'react';
import useAuthStore from '../store/authStore'; 
import '../styles/LoginModal.css'; 

function LogoutConfirmModal({ isOpen, onClose }) {

    const logoutUser = useAuthStore((state) => state.logout);

    if (!isOpen) return null;

    const handleLogout = () => {
        logoutUser(); 
        onClose(); 
    };

    const handleOverlayClick = (e) => {
    
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">Konfirmasi Logout</h2>
                <p className="modal-message">Apakah Anda yakin ingin keluar dari akun Anda?</p>
                <div className="modal-actions">
                    <button className="button secondary-button" onClick={onClose}>Batal</button>
                    <button className="button primary-button" onClick={handleLogout}>Ya, Logout</button>
                </div>
            </div>
        </div>
    );
}

export default LogoutConfirmModal;