import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png'; // Ganti dengan path logo Anda
import useAuthStore from '../store/authStore'; // Import store Zustand

// Header sekarang menerima onLoginClick dan onLogoutClick dari App
function Header({ onLoginClick, onLogoutClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user, isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

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
        closeMobileMenu(); 
    };

    const handleUserAreaClick = () => {
        if (isLoggedIn) {
            
            onLogoutClick();
        } else {
            
            onLoginClick();
        }
        closeMobileMenu(); 
    };


    return (
        <header className="app-header">
            <div className="header-container">
      
                <div className="logo">
                    <img src={logo} alt="LakuShop.id Logo" />
                </div>

                <nav className={'navigation' + (isMobileMenuOpen ? ' open' : '')}>
      
                    {isMobileMenuOpen && (
                        <button className="mobile-menu-close" onClick={toggleMobileMenu} aria-label="Close Mobile Menu">
                             &times;
                        </button>
                    )}
                    <ul>
                        <li><a href="#home" onClick={handleNavLinkClick}>Home</a></li>
                        <li><a href="#products" onClick={handleNavLinkClick}>Products</a></li>
                    </ul>
                </nav>

                <div className="header-icons">

                    <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                    </button>

                    <button className="icon-button" aria-label="Shopping Cart">
                     
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </button>

                   
                     <div className="user-profile-area" onClick={handleUserAreaClick} role="button" tabIndex={0} aria-label={isLoggedIn ? `User Profile: ${user?.name}` : 'Login'}>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>

                        {isLoggedIn && user && (
                            <span className="user-name">{user.name}</span>
                        )}
                        
                     </div>
                </div>
            </div>
        </header>
    );
}

export default Header;