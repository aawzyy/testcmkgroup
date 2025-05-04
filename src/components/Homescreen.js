import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductList from './ProductList';
import Footer from './Footer';

// Homescreen sekarang merakit bagian-bagian lain
// dan meneruskan onLoginClick serta onLogoutClick ke Header
// Halaman lain di Homescreen tidak perlu tahu tentang login/logout
function Homescreen({ onLoginClick, onLogoutClick }) { // <<< Tambahkan onLogoutClick di sini
  return (
    <div className="homescreen">
      {/* Teruskan onLoginClick dan onLogoutClick ke Header */}
      <Header
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick} // <<< Teruskan prop onLogoutClick ke Header
      />
      <main>
        <Hero />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default Homescreen;