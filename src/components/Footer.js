import React from 'react';
import '../styles/Footer.css';
import appstoreBadge from '../assets/appstore.png';
import googleplayBadge from '../assets/googleplay.png';
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-column logo-address">
          <img src={logo} alt="Lakushop Logo" style={{ height: 70, marginBottom: 10 }} />
          <p>
            Synthesis Square 10th Floor. Jalan Gatot Subroto Kav 64<br />
            No.177A, Jakarta – Selatan 12870.
          </p>
        </div>
        <div className="footer-column follow-us">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <h4>Available On</h4>
          <div className="app-badges horizontal">
            <a href="#"><img src={appstoreBadge} alt="Download on the App Store" /></a>
            <a href="#"><img src={googleplayBadge} alt="Get it on Google Play" /></a>
          </div>
        </div>
        <div className="footer-column links">
          <h4>Lakushop.id</h4>
          <ul>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Keranjang</a></li>
            <li><a href="#">Transaksi</a></li>
            <li><a href="#">Product</a></li>
          </ul>
        </div>
        <div className="footer-column contact">
          <h4>Contact</h4>
          <p>support@lakuemas.com</p>
          <p>(021) 21243873</p>
          <p><a href="#">Syarat & Ketentuan</a></p>
          <p><a href="#">Kebijakan Privasi</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>LAKUEMAS - © 2025. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}

export default Footer;
