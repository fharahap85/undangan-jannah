# Rencana Penambahan Fitur & Penyesuaian Desain (Lanjutan)

Dokumen ini berisi rincian perbaikan UI/UX dan fitur baru yang akan diimplementasikan pada website undangan.

## 1. Perbaikan Jarak Bawah (Footer Padding)
*   **Masalah**: Teks di bagian akhir halaman tertutup oleh *floating menu*.
*   **Solusi**: Menambahkan `padding-bottom: 120px` pada bagian footer di `layout.css`.

## 2. Fitur Hitung Mundur (Countdown)
*   **Lokasi**: Seksi "Waktu & Tempat" (Acara).
*   **Fungsi**: Menampilkan Hari, Jam, Menit, dan Detik hingga waktu acara.
*   **Target**: Mengambil data tanggal dari `data.json`.

## 3. Penambahan Kaligrafi Bismillah
*   **Lokasi**: Bagian paling atas halaman pembuka (*Hero Section*).
*   **Teks**: `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم` (Kaligrafi Arab).

## 4. Perbaikan Navigasi "Home"
*   **Masalah**: Tombol Home di menu mengambang tidak bereaksi/menuju seksi yang tersembunyi.
*   **Solusi**: Mengarahkan tautan Home ke `#mukadimah` (konten pertama setelah undangan dibuka).

## 5. Variasi Desain Antar Seksi
*   **Masalah**: Tampilan terasa monoton karena warna latar belakang seragam.
*   **Solusi**: Menerapkan gaya selang-seling (*zebra styling*) menggunakan kelas `.section-alt` dengan warna latar belakang yang sedikit lebih terang atau bertekstur.

---
*Status: Dalam proses pengerjaan.*
