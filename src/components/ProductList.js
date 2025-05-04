import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';

import product1Image from '../assets/product1.png';
import product2Image from '../assets/product2.png';
import product3Image from '../assets/product3.png';
import product4Image from '../assets/product4.png';
import product5Image from '../assets/product5.png';

const allProducts = [
  {
    id: 1,
    image: product1Image,
    label: 'LAKUEMAS TINY GOLD',
    labelPrice: 100000,
    title: 'LAKUEMAS - E-VOUCHER EMAS Nominal 100 Ribu',
    oldPrice: 110000,
    price: 104000
  },
  {
    id: 2,
    image: product2Image,
    label: 'GOLD NOMINAL',
    labelPrice: 500000,
    title: 'LAKUEMAS - E-VOUCHER EMAS Nominal 500 Ribu',
    oldPrice: 520000,
    price: 510000
  },
  {
    id: 3,
    image: product3Image,
    label: 'GOLD NOMINAL',
    labelPrice: 1000000,
    title: 'LAKUEMAS - E-VOUCHER EMAS Nominal 1 Juta',
    oldPrice: 1030000,
    price: 1017000
  },
  {
    id: 4,
    image: product4Image,
    label: 'GOLD NOMINAL',
    labelPrice: 3000000,
    title: 'LAKUEMAS - E-VOUCHER EMAS Nominal 3 Juta',
    oldPrice: 3080000,
    price: 3046000
  },
  {
    id: 5,
    image: product5Image,
    label: 'GOLD NOMINAL',
    labelPrice: 5000000,
    title: 'LAKUEMAS - E-VOUCHER EMAS Nominal 5 Juta',
    oldPrice: 5150000,
    price: 5075000
  },
];

function ProductList() {
  return (
    <section className="product-section">
      <div className="product-list-container">
        <div className="product-list-header">
          <h2>Produk Terbaru untuk kamu</h2>
          <a href="#all-products" className="view-all-link">LIHAT SEMUA</a>
        </div>

        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
          className="product-swiper"
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20, freeMode: false },
            768: { slidesPerView: 3, spaceBetween: 25, freeMode: false },
            1024: { slidesPerView: 4, spaceBetween: 30, freeMode: false },
          }}
        >
          {allProducts.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                image={product.image}
                label={product.label}
                labelPrice={product.labelPrice}
                title={product.title}
                oldPrice={product.oldPrice}
                price={product.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default ProductList;
