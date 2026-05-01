# Panduan Tugas Pengembangan (Untuk Junior Developer / AI Asisten)

Dokumen ini berisi rancangan tingkat tinggi (*High-Level Design*) untuk mengimplementasikan tiga fitur penting pada website undangan digital. Ikuti instruksi di bawah ini langkah demi langkah.

## Tugas 1: Penggunaan Aset Audio Lokal (Backsound)
**Tujuan**: Mengganti ketergantungan *backsound* dari URL eksternal (SoundHelix) menjadi file musik lokal agar bisa diakses *offline* dan mencegah *broken link*.

**Langkah Eksekusi**:
1. **Siapkan Aset**: Siapkan file musik (format `.mp3` atau `.ogg`) ukuran kecil (maksimal 2MB - 3MB agar web cepat dimuat).
2. **Buat Direktori**: Buat folder baru di `assets/audio/`.
3. **Simpan File**: Pindahkan file musik tersebut (misal: `assets/audio/wedding-song.mp3`).
4. **Update Konfigurasi**: Buka `data/data.json`, lalu cari key `"backsound"`. Ganti isinya dari URL eksternal menjadi lokasi file lokal:
   ```json
   "backsound": "assets/audio/wedding-song.mp3"
   ```
5. **Update JS (Opsional)**: Pastikan `js/main.js` atau `js/data-loader.js` memuat URL tersebut dengan benar ke dalam tag `<audio>`.

---

## Tugas 2: Penambahan Meta Tags & Open Graph (Link Preview WhatsApp)
**Tujuan**: Menampilkan *thumbnail* gambar, judul, dan deskripsi yang rapi ketika link undangan dikirim atau ditempel (di-*paste*) di chat WhatsApp, Telegram, atau Facebook.

**Langkah Eksekusi**:
1. **Siapkan Gambar Thumbnail**: Siapkan sebuah gambar rasio 1:1 (persegi) atau 1.91:1 (persegi panjang lebar), misalnya `300x300 px` atau `1200x630 px`. Simpan di `assets/images/thumbnail.jpg`.
2. **Update HTML**: Buka file `index.html` dan tambahkan tag berikut di dalam elemen `<head>`, tepat di bawah `<title>`:
   ```html
   <!-- Meta Tags Utama -->
   <meta name="description" content="Undangan Pernikahan Imam Habibi & Nurjannah. Kamis, 14 Mei 2026.">
   
   <!-- Open Graph / WhatsApp / Facebook -->
   <meta property="og:type" content="website">
   <meta property="og:url" content="https://jannah-abi.afhprojects.web.id/">
   <meta property="og:title" content="Walimatul 'Ursy - Imam & Jannah">
   <meta property="og:description" content="Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.">
   <meta property="og:image" content="https://jannah-abi.afhprojects.web.id/assets/images/thumbnail.jpg">

   <!-- Twitter -->
   <meta property="twitter:card" content="summary_large_image">
   ```
   *(Catatan: Atribut `og:image` WAJIB menggunakan URL lengkap/absolut dengan nama domain agar dibaca oleh WhatsApp, bukan path relatif `./assets/...`)*

---

## Tugas 3: Perombakan (Improvement) Generator Link Undangan
**Tujuan**: Meningkatkan fungsionalitas dan tampilan dari alat `generator.html` agar mempelai lebih mudah mengelola dan mengirim link.

**Rancangan Tampilan (UI/UX)**:
1.  **Desain Layar Penuh (Full-screen Container)**: Ubah CSS agar generator berada di tengah layar layaknya aplikasi SaaS. Gunakan *Glassmorphism* card.
2.  **Preview Box**: Tambahkan kotak simulasi yang memperlihatkan **bagaimana teks chat akan terlihat di layar HP** sebelum dikirim.
3.  **Daftar Tamu Tersimpan (Local Storage)**: Tambahkan fitur simpel menggunakan `localStorage` Javascript untuk mencatat riwayat (sejarah) siapa saja nama yang sudah dibuatkan link sebelumnya.

**Logika Javascript (High-Level)**:
*   Membaca format sapaan default dari *template*.
*   Fungsi `generateLink()`: Menggabungkan Base URL (sekarang memakai parameter `?to=Nama+Orang`) dengan teks statis menjadi format yang ter-*encode* via `encodeURIComponent()`.
*   Fungsi `shareToWA()`: Mengarahkan `window.open('https://wa.me/?text=...')`.
*   **Integrasi QR Code (Pilihan)**: Gunakan *library* ringan seperti `qrcode.js` untuk langsung men-generate gambar QR dari link yang terbuat.

**Instruksi Khusus untuk Junior Developer**:
*   *Keep it simple* (tetap sederhana), gunakan CSS Flexbox untuk *layout* generator.
*   Jangan memuat *library* berat seperti React atau Bootstrap. Tetap gunakan HTML, CSS, JS *native* bawaan proyek ini.
