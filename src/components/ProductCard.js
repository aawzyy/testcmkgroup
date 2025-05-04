// src/components/ProductCard.js
import React from 'react';
import '../styles/ProductCard.css'; // Import file CSS untuk ProductCard

// Terima data produk, termasuk label, harga label, harga lama, dan harga saat ini
function ProductCard({ image, title, price, oldPrice, label, labelPrice }) {
  // Format harga ke Rupiah
  const formatPrice = (value) => {
    if (value === undefined || value === null) return '';
    // Menggunakan opsi style: 'decimal' karena format di gambar tidak menggunakan simbol 'Rp' di baris label
    // dan menggunakan koma sebagai pemisah ribuan, titik sebagai desimal (standar ID)
    // Serta menambahkan ',-' di akhir.
     if (value === labelPrice) {
         return new Intl.NumberFormat('id-ID', {
             style: 'decimal', // Menggunakan decimal untuk format angka saja
             minimumFractionDigits: 0,
             maximumFractionDigits: 0, // Pastikan tidak ada desimal jika harga bulat
         }).format(value);
     }

    // Format untuk harga biasa dengan simbol Rp
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // Tidak menampilkan desimal untuk harga utama
      maximumFractionDigits: 0,
    }).format(value);
  };


  return (
    <div className="product-card">
      <div className="product-image-container">
        {/* Menggunakan prop 'image' untuk sumber gambar */}
        {/* Menggunakan prop 'title' untuk alt text gambar */}
        {/* Gunakan placeholder jika prop 'image' kosong */}
        <img src={image || "https://via.placeholder.com/200x150.png?text=Produk"} alt={title} />

        {/* Tambahkan area label kuning jika data label atau labelPrice ada */}
       
      </div>

      <div className="product-info">
        {/* Menggunakan prop 'title' untuk judul produk */}
        <h3>{title}</h3>

        {/* Tampilkan harga lama jika ada */}
        {oldPrice !== undefined && <p className="product-old-price">{formatPrice(oldPrice)}</p>}

        {/* Tampilkan harga saat ini */}
        <p className="product-current-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
}

export default ProductCard;