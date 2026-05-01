# Rancangan High-Level: Undangan Pernikahan Digital Islami (Single Page)

Rancangan ini disusun sebagai panduan komprehensif bagi Programmer untuk mengembangkan website undangan pernikahan digital bertema Islami yang elegan dan modern. Website akan dibangun murni menggunakan **HTML, CSS (termasuk animasi), dan JavaScript Vanilla** (tanpa framework/library tambahan).

Website ini dirancang untuk di-hosting secara gratis (misal: di **GitHub Pages**) dan tetap memiliki fitur dinamis penuh meski tanpa database server konvensional (MySQL/PostgreSQL).

---

## 1. Arsitektur & Struktur Direktori

Proyek ini akan memiliki struktur yang sederhana dan terorganisir untuk memudahkan maintenance dan skalabilitas ringan.

```text
/undangan-jannah
├── CNAME               # File konfigurasi custom domain GitHub Pages
├── index.html          # File utama (Single Page)
├── css/
│   ├── style.css       # Styling utama (variabel, reset, tipografi)
│   ├── layout.css      # Grid, Flexbox, & Floating Menu
│   ├── animations.css  # Definisi keyframes animasi (fade, slide, pulse)
│   └── responsive.css  # Media queries (Mobile, Tablet, Desktop, Ultrawide)
├── js/
│   ├── main.js         # Logika utama, navigasi scroll, & UI interactions
│   ├── data-loader.js  # Script khusus fetch data dari data.json
│   └── rsvp.js         # Script penanganan form ucapan & RSVP (integrasi pihak ke-3)
├── data/
│   └── data.json       # Pusat informasi (nama mempelai, acara, quotes, path aset)
└── assets/
    ├── images/         # Background masjid, ornamen Islami, icon (SVG)
    ├── audio/          # Backsound Islami/instrumental
    └── fonts/          # Custom font lokal (jika ada)
```

---

## 2. Konfigurasi GitHub Pages & Custom Domain

Website akan dihosting di GitHub Pages dengan custom domain yang sudah disiapkan: **`jannah-abi.afhprojects.web.id`**.

1. **Pembuatan File CNAME:** Pastikan terdapat file bernama `CNAME` (tanpa ekstensi) di root folder proyek yang hanya berisi teks:
   ```text
   jannah-abi.afhprojects.web.id
   ```
2. **Setting di Repositori GitHub:**
   - Masuk ke tab **Settings** di repositori GitHub.
   - Buka menu **Pages** di *sidebar* sebelah kiri.
   - Pastikan **Source** mengarah ke branch `main` atau `master` (folder `/root`).
   - Pada kolom **Custom domain**, pastikan `jannah-abi.afhprojects.web.id` sudah terisi (seharusnya terisi otomatis jika file `CNAME` di-push). Centang "Enforce HTTPS" jika sertifikat SSL sudah berhasil di-*provision* oleh GitHub.

---

## 3. Alur Kerja Git (Git Workflow)

Pengerjaan website ini harus menggunakan pendekatan versi kontrol (Git) yang rapi, modular, dan terstruktur. Instruksi untuk programmer:

1. **Branching:**
   - Branch utama adalah `main` (hanya untuk kode yang sudah siap rilis/produksi).
   - Buat branch baru untuk setiap fitur atau seksi yang sedang dikerjakan.
   - *Contoh pembuatan branch:*
     ```bash
     git checkout -b feature/setup-struktur-awal
     git checkout -b feature/ui-layar-pembuka
     git checkout -b feature/section-mempelai
     git checkout -b feature/integrasi-rsvp
     ```
2. **Commits (Atomic Commits):**
   - Lakukan commit secara berkala untuk setiap perubahan kecil yang bermakna (*atomic*).
   - Gunakan format pesan commit yang jelas (contoh menggunakan standar *Conventional Commits*):
     ```bash
     git add .
     git commit -m "feat: tambahkan layout layar pembuka"
     git commit -m "style: sesuaikan warna font menjadi gold"
     git commit -m "fix: perbaiki error saat memutar audio"
     ```
3. **Pushing & Pulling:**
   - Secara berkala *push* branch fitur ke *remote repository*.
     ```bash
     git push origin feature/ui-layar-pembuka
     ```
   - Lakukan *Pull Request* (PR) atau *Merge* dari branch fitur ke branch `main` jika pengerjaan suatu seksi sudah selesai dan teruji jalan dengan baik.
   - Jangan lupa untuk sering melakukan `git pull origin main` jika terdapat perubahan dari tim/rekan lain sebelum membuat branch fitur baru.

---

## 4. Solusi RSVP & Ucapan Tanpa Database (GitHub Pages)

Karena GitHub Pages hanya mendukung file statis (HTML/CSS/JS), kita tidak bisa menyimpan data ke database server secara langsung. Berikut adalah solusi yang akan diimplementasikan:

### A. Untuk Ucapan Publik (Bisa dilihat pengunjung lain)
Menggunakan **Google Sheets & Google Apps Script (Gratis)**.
1. **Cara Kerja:** Kita membuat sebuah file Google Sheets. Lalu kita membuat Google Apps Script kecil yang bertindak sebagai API (menerima HTTP POST dan GET).
2. **Kirim Ucapan:** Saat user men-submit form ucapan di HTML, `rsvp.js` akan melakukan `fetch(POST)` data form tersebut ke URL Google Apps Script. Script tersebut akan menulis baris baru di Google Sheets.
3. **Tampilkan Ucapan:** Saat web diload, `rsvp.js` akan melakukan `fetch(GET)` ke URL Google Apps Script, mengambil data dari Sheets dalam format JSON, lalu merendernya sebagai daftar komentar (scrollable) di HTML.

### B. Untuk RSVP (Konfirmasi Kehadiran Spesifik)
Menggunakan integrasi **Direct WhatsApp (wa.me)**.
1. **Cara Kerja:** Form RSVP memiliki input (Nama, Kehadiran: Ya/Tidak, Jumlah Orang).
2. Saat tombol diklik, JS akan memformat input tersebut menjadi teks, lalu membuka link: `https://wa.me/[NomorWA]?text=Assalamu'alaikum...`.
3. Keuntungannya adalah mempelai langsung menerima konfirmasi di WhatsApp mereka sendiri tanpa perantara.

---

## 5. Desain UI/UX & Komponen Layar

Desain akan mengusung tema **Dark-Elegant** atau **Soft-Minimalist** dengan perpaduan warna *Gold* dan ornamen Islami. Tidak ada foto mempelai, fokus pada tipografi elegan dan *background* siluet masjid.

### A. Responsivitas Universal (Cross-Device)
Website ini harus terlihat proporsional di SEMUA layar. Strategi yang digunakan:
1. Menggunakan satuan **`rem`** untuk font dan **`vh`/`vw`/`%`** untuk dimensi layout.
2. Menggunakan **CSS Flexbox & CSS Grid** agar komponen otomatis menyesuaikan lebar (Fluid Design).
3. **Media Queries:**
   - `< 576px` (Mobile portrait)
   - `576px - 768px` (Mobile landscape / Tablet kecil)
   - `769px - 992px` (Tablet)
   - `993px - 1200px` (Laptop / Desktop kecil)
   - `> 1200px` (Layar Lebar / Ultrawide) - *Max-width wrapper akan diterapkan agar konten tidak terlalu memanjang ke samping, dan tetap terpusat di tengah dengan background full-width.*

### B. Komponen Layar

1. **Layar Pembuka (Hero / Cover Screen)**
   - Layar penuh (`100vh`), background masjid digelapkan. Animasi *fade-in*.
   - Sapaan nama tamu dinamis via parameter URL (`?to=NamaTamu`).
   - Tombol "Buka Undangan" (memulai *backsound* musik dan transisi ke isi undangan).

2. **Konten Utama (Terbagi dalam beberapa `<section id="...">`)**
   - **#mukadimah:** Ayat Al-Qur'an (Ar-Rum 21) & Kaligrafi.
   - **#mempelai:** Nama mempelai dan orang tua.
   - **#acara:** Info Akad & Resepsi + Tombol Google Maps.
   - **#amplop:** Fitur amplop digital (tombol Salin Rekening via `navigator.clipboard`).
   - **#ucapan:** Form RSVP & Buku Tamu (Terintegrasi ke Google Sheets & WA).

### C. Menu Navigasi Mengambang (Floating Bottom Menu)
Untuk memudahkan navigasi, akan ditambahkan menu navigasi *sticky/fixed* di bagian bawah layar.
- **Posisi:** Melayang (fixed) di posisi tengah-bawah (`bottom: 20px`).
- **Desain:** Berbentuk pill/kapsul transparan dengan efek *glassmorphism* (blur background).
- **Isi:** Icon-icon minimalis yang mewakili setiap seksi:
  1. Icon Home (Scroll ke Cover/#mukadimah)
  2. Icon Cincin/Pasangan (Scroll ke #mempelai)
  3. Icon Kalender (Scroll ke #acara)
  4. Icon Amplop (Scroll ke #amplop)
  5. Icon Pesan (Scroll ke #ucapan)
- **Fungsi:** Ketika di-klik, JS akan menggunakan `element.scrollIntoView({ behavior: "smooth" })` untuk menuju ke bagian yang relevan dengan mulus.

---

## 6. Skema Data (data.json)

```json
{
  "general": {
    "title": "Walimatul 'Ursy - Fulan & Fulanah",
    "theme_color": { "primary": "#d4af37", "bg_dark": "#0f2027" },
    "background_image": "./assets/images/bg-masjid-elegant.jpg",
    "backsound": "./assets/audio/instrumental-islami.mp3"
  },
  "couple": {
    "groom": "Fulan bin Fulan",
    "bride": "Fulanah binti Fulan"
  },
  "events": [
    {
      "id": "akad",
      "type": "Akad Nikah",
      "date": "Sabtu, 12 Desember 2026",
      "location": "Masjid Raya Bintaro",
      "maps_link": "https://g.page/..."
    }
  ],
  "api": {
    "google_script_url": "https://script.google.com/macros/s/xxxx/exec",
    "whatsapp_number": "6281234567890"
  }
}
```

## 7. Instruksi Pengembangan Tambahan
1. **Animasi Scroll (Intersection Observer):** Elemen HTML diatur dengan `opacity: 0` dan `transform: translateY(30px)`. JS observer akan menambahkan class `is-visible` saat elemen masuk viewport, memicu CSS transition (*fade-up*).
2. **Audio Button:** Tambahkan icon *disk* atau nada kecil berputar di pojok kanan atas untuk memutar/memberhentikan musik.
3. **Font:** Disarankan menggunakan kombinasi font *Playfair Display* (atau serif klasik) untuk judul, dan *Inter / Poppins* untuk teks informasi.

---
*Dokumen ini siap dieksekusi oleh developer untuk langsung masuk ke tahap koding (HTML/CSS/JS).*
