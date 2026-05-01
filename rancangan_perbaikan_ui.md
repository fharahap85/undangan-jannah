# Rancangan Perbaikan UI/UX Undangan Digital

Dokumen ini berisi panduan *high-level* untuk programmer junior atau AI asisten lainnya untuk melakukan perbaikan pada antarmuka (UI) dan pengalaman pengguna (UX) pada proyek undangan digital ini.

## 1. Penyesuaian Kecepatan Animasi

**Masalah:** Animasi kemunculan elemen di setiap halaman terlalu cepat, sehingga kurang terasa elegan dan premium.

**Solusi:**
Ubah durasi transisi dan animasi di file `css/animations.css`. Durasi yang lebih lambat (sekitar 1.5s - 2s) ditambah dengan kurva *easing* yang lebih halus (seperti `cubic-bezier` atau `ease-in-out`) akan memberikan kesan yang lebih natural.

**Tugas Implementasi:**
1. Buka file `css/animations.css`.
2. Cari kelas `.reveal` dan ubah `transition`:
   ```css
   .reveal {
       /* Sebelumnya: transition: all 1.2s ease-out; */
       transition: all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
   }
   ```
3. Cari `.content-wrapper` dan ubah `transition`:
   ```css
   .content-wrapper {
       /* Sebelumnya: transition: opacity 1.5s ease; */
       transition: opacity 2s ease-in-out;
   }
   ```

## 2. Penambahan Animasi Latar Belakang (Background Assets)

**Masalah:** Ruang kosong (*negative space*) pada latar belakang terlalu dominan, membuat desain terkesan sepi.

**Solusi:**
Tambahkan elemen dekoratif yang bergerak halus di latar belakang. Ada beberapa pendekatan yang bisa digunakan:

**Opsi A: Menggunakan Pure CSS (Direkomendasikan - Ringan)**
Membuat partikel debu emas (*gold dust*) atau bintang yang melayang menggunakan CSS murni (seperti `box-shadow` berlapis yang dianimasikan).
*   **Implementasi:** Buat div kosong dengan id `#particles-bg` di dalam `<body>`, lalu gunakan CSS `@keyframes` untuk menggerakkannya dari bawah ke atas secara perlahan (durasi 15s - 20s).

**Opsi B: Menggunakan Aset Gambar SVG/PNG Transparan**
Menggunakan gambar daun (*leaves*), bunga, atau ornamen mandala transparan di sudut-sudut layar yang memiliki animasi melayang pelan (`soft-float`).
*   **Implementasi:** Tambahkan elemen `<img>` dengan `position: fixed` atau `absolute` di pojok kiri atas dan kanan bawah, lalu beri kelas `.soft-float` atau buat animasi rotasi perlahan.

**Opsi C: Menggunakan Library CDN (Contoh: Particles.js)**
Jika ingin efek interaktif, gunakan library eksternal.
*   **Implementasi:** Tambahkan `<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>`, buat `<div id="particles-js"></div>` dengan `position: fixed; z-index: -1`, dan inisialisasi di JavaScript.

## 3. Penyesuaian Jarak Atas dan Bawah (Padding/Margin)

**Masalah:** Konten di bagian paling atas tertutup oleh ikon musik (`#audio-container`), dan konten di bagian paling bawah (footer) tertutup oleh menu navigasi mengambang (`#floating-menu`), terutama di layar mobile.

**Solusi:**
Berikan ruang ekstra (padding/margin) pada elemen terluar pembungkus konten agar tidak tumpang tindih dengan elemen yang di-set *fixed* atau *absolute*.

**Tugas Implementasi:**

**Penyesuaian Atas (Mengakomodasi Ikon Musik):**
1. Buka `css/style.css`.
2. Pada elemen `.section-padding`, atau secara spesifik pada elemen `<section>` pertama setelah *hero/opening* (yaitu `#mukadimah`), tambahkan `padding-top` ekstra.
   ```css
   /* Tambahkan di css/layout.css atau css/style.css */
   #mukadimah {
       padding-top: 100px; /* Menghindari bentrok dengan tombol musik di pojok kanan atas */
   }
   ```

**Penyesuaian Bawah (Mengakomodasi Floating Menu):**
1. Menu mengambang biasanya mengambil ruang sekitar 60-80px di bagian bawah.
2. Buka `css/layout.css` dan periksa bagian `footer`.
3. Pastikan `footer` atau bagian terbawah elemen `<main>` memiliki ruang ekstra.
   ```css
   /* Di css/layout.css */
   .footer {
       /* Tambahkan padding bawah yang cukup besar */
       padding-bottom: 120px !important; 
   }
   ```
   *Catatan: Saat ini di `layout.css` baris 280 sudah ada deklarasi `padding-bottom: 120px !important;` namun mungkin ada salah ketik/syntax error (terlihat berantakan di akhir file), perbaiki syntax error tersebut.*

---
**Instruksi Eksekusi:** Silakan eksekusi poin 1, 2, dan 3 di atas satu per satu dan lakukan pengujian (*testing*) di browser, terutama menggunakan mode *Device Toolbar* (Inspect Element) untuk melihat tampilannya di layar *mobile*.
