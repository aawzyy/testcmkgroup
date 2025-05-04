import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/Hero.css';

// Import pustaka color-thief
import ColorThief from 'color-thief-browser';

// Import gambar Anda
import image1 from '../assets/carousel-1.png';
import image2 from '../assets/carousel-2.png';
import image3 from '../assets/carousel-3.png';

const carouselImages = [
  { src: image1, alt: 'Deskripsi Gambar 1' },
  { src: image2, alt: 'Deskripsi Gambar 2' },
  { src: image3, alt: 'Deskripsi Gambar 3' },
];

// Inisialisasi ColorThief di luar fungsi untuk efisiensi
const colorThief = new ColorThief();

function Hero() {
  // State untuk menyimpan warna latar belakang
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa'); // Default color

  // Refs untuk mengakses elemen DOM gambar (kita akan ref div slide-nya)
  const slideRefs = useRef([]); // Ganti nama ref agar lebih jelas mengacu pada div slide

  // Fungsi untuk menganalisis warna dominan dari elemen gambar
  const analyzeImageColor = (imgElement) => {
    if (!imgElement || !imgElement.complete) {
       // console.log('analyzeImageColor: Gambar belum dimuat atau elemen img tidak ditemukan.');
      return null; // Kembalikan null jika gambar belum siap
    }

    try {
      // console.log('analyzeImageColor: Menganalisis warna untuk gambar:', imgElement.src);
      const dominantColor = colorThief.getColor(imgElement); // Mendapatkan warna dominan [R, G, B]
      const colorString = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
      // console.log('analyzeImageColor: Warna dominan terdeteksi:', colorString);
      return colorString;
    } catch (error) {
      console.error("analyzeImageColor: Error menganalisis warna gambar:", error);
      // Cek tab Network di browser dev tools untuk error terkait gambar atau CORS
      return null; // Kembalikan null jika terjadi error
    }
  };

  // Fungsi untuk memperbarui warna latar belakang berdasarkan slide saat ini
  const updateBackgroundColor = (index, reason) => { // Tambahkan 'reason' untuk logging
    // console.log(`updateBackgroundColor dipanggil untuk index ${index} karena: ${reason}`);

    // Pastikan ref untuk index ini ada
    const slideElement = slideRefs.current[index];

    if (slideElement) {
      // console.log(`updateBackgroundColor: Slide element ditemukan untuk index ${index}`, slideElement);
      // Cari elemen img di dalam slide element (struktur react-responsive-carousel adalah div.slide > img)
      const imgElement = slideElement.querySelector('img');

      if (imgElement) {
        // console.log(`updateBackgroundColor: Elemen img ditemukan untuk index ${index}`, imgElement);
        // console.log(`updateBackgroundColor: imgElement.complete: ${imgElement.complete}`);

        // Tunggu gambar selesai dimuat sebelum menganalisis warna
        if (imgElement.complete) {
          const color = analyzeImageColor(imgElement);
          if (color) {
            setBackgroundColor(color);
            // console.log(`updateBackgroundColor: State backgroundColor diupdate menjadi ${color}`);
          } else {
             // console.log('updateBackgroundColor: analyzeImageColor mengembalikan null. Tidak ada perubahan warna.');
          }
        } else {
          // Jika gambar belum dimuat, tambahkan event listener
          // console.log('updateBackgroundColor: Gambar belum selesai dimuat. Menunggu event load...');
          imgElement.onload = () => {
            // console.log(`updateBackgroundColor: Gambar dimuat untuk index ${index}. Menganalisis warna...`);
            const color = analyzeImageColor(imgElement);
            if (color) {
              setBackgroundColor(color);
              // console.log(`updateBackgroundColor: State backgroundColor diupdate setelah gambar dimuat: ${color}`);
            } else {
               // console.log('updateBackgroundColor: analyzeImageColor mengembalikan null setelah load. Tidak ada perubahan warna.');
            }
             // Pastikan event listener hanya berjalan sekali jika gambar sudah di-cache/dimuat ulang
            imgElement.onload = null;
          };
           // Tambahkan error handler jika gambar gagal dimuat
           imgElement.onerror = () => {
               console.error(`updateBackgroundColor: Gagal memuat gambar untuk index ${index}: ${imgElement.src}`);
               imgElement.onerror = null; // Hapus handler
           }
        }
      } else {
          console.warn(`updateBackgroundColor: Elemen img tidak ditemukan di dalam slide element untuk index ${index}.`);
          // Periksa struktur DOM di browser dev tools!
      }
    } else {
        console.warn(`updateBackgroundColor: Slide element ref tidak ditemukan untuk index ${index}.`);
         // Periksa apakah slideRefs.current terisi
         // console.log('slideRefs.current saat ini:', slideRefs.current);
    }
  };

  // Effect untuk menjalankan analisis warna pada slide pertama saat komponen dimuat
  useEffect(() => {
    // console.log('useEffect: Komponen dimuat. Memicu update untuk slide 0...');
    // Beri sedikit jeda untuk memastikan carousel dan gambar dirender dan refs terisi
    const timer = setTimeout(() => {
        // console.log('useEffect: Jeda selesai, memanggil updateBackgroundColor(0)...');
        updateBackgroundColor(0, 'initial mount'); // Analisis warna gambar pertama (index 0)
    }, 200); // Menaikkan jeda sedikit, sesuaikan jika perlu

    return () => {
        // console.log('useEffect: Membersihkan timer...');
        clearTimeout(timer); // Cleanup timer
    };
  }, []); // Array dependency kosong, hanya berjalan sekali saat mount

  // Debugging: Log state warna setiap kali berubah (bisa dihapus setelah debugging selesai)
  /*
  useEffect(() => {
      console.log('backgroundColor state berubah menjadi:', backgroundColor);
  }, [backgroundColor]);
  */

  return (
    <section
      className="hero-section carousel-hero"
      style={{ backgroundColor: backgroundColor }} // Terapkan warna dari state
    >
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false} // <-- Ubah ini menjadi false untuk menyembunyikan dots
        interval={5000}
        transitionTime={600}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
        className="main-carousel" // Gunakan class ini untuk styling tambahan jika perlu
        onChange={(index) => updateBackgroundColor(index, 'carousel change')} // Panggil fungsi update warna saat slide berubah
      >
        {carouselImages.map((image, index) => (
          // Attach ref to the div wrapping the image (this is the .slide div)
          <div
            key={index}
            className="carousel-slide-item"
            ref={el => {
                slideRefs.current[index] = el;
            }}
          >
            {/* Struktur react-responsive-carousel adalah div.slide > img */}
            <img src={image.src} alt={image.alt} />
            {/* ... legend atau konten lain di sini jika ada */}
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default Hero;