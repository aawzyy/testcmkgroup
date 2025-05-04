import React from 'react';
import Header from './Header';
import Hero from './Hero';
import ProductList from './ProductList';
import Footer from './Footer';

// Homescreen sekarang hanya merakit bagian-bagian lain
// dan meneruskan onLoginClick ke Header
function Homescreen({ onLoginClick }) {
  return (
    <div className="homescreen">
      <Header onLoginClick={onLoginClick} />
      <main>
        <Hero />
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default Homescreen;