import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png'; // Ganti dengan path logo Anda

function Header({ onLoginClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Efek samping untuk mengatur class pada body saat menu mobile terbuka/tertutup
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        // Cleanup function
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isMobileMenuOpen]);


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

     const handleNavLinkClick = () => {
        closeMobileMenu(); // Tutup menu setelah klik link
        // Tambahkan logika navigasi atau scroll di sini jika diperlukan
    };


    return (
        <header className="app-header">
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <img src={logo} alt="LakuShop.id Logo" />
                </div>

                {/* Navigasi Utama (disembunyikan di mobile oleh CSS) */}
                {/* Menu Mobile (muncul di mobile dengan class 'open') */}
                <nav className={'navigation' + (isMobileMenuOpen ? ' open' : '')}>
                     {/* Tombol Tutup Menu Mobile */}
                    {isMobileMenuOpen && (
                        <button className="mobile-menu-close" onClick={toggleMobileMenu} aria-label="Close Mobile Menu">
                             &times;
                        </button>
                    )}
                    <ul>
                        <li><a href="#home" onClick={handleNavLinkClick}>Home</a></li>
                        <li><a href="#products" onClick={handleNavLinkClick}>Products</a></li>
                         {/* Contoh link login di menu mobile (opsional): */}
                         {/* <li><button className="mobile-login-button" onClick={() => { onLoginClick(); closeMobileMenu(); }}>Login</button></li> */}
                    </ul>
                </nav>

                {/* Ikon di sisi kanan + Tombol Hamburger (dipindahkan ke sini) */}
                <div className="header-icons">
                    {/* Tombol Hamburger (disembunyikan di desktop, muncul di mobile oleh CSS) */}
                    <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
                         <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                         {/* Atau pakai Font Awesome: <i className="fas fa-bars"></i> */}
                    </button>

                    <button className="icon-button" aria-label="Shopping Cart">
                        {/* Icon Keranjang */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                         {/* Atau pakai Font Awesome: <i className="fas fa-shopping-cart"></i> */}
                    </button>

                    {/* Tombol/Icon Login */}
                    <button className="icon-button" onClick={onLoginClick} aria-label="Login">
                        {/* Icon User */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                         {/* Atau pakai Font Awesome: <i className="fas fa-user"></i> */}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;