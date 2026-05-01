# Dokumentasi Fitur Tambahan (Share & Rekening)

Dokumen ini mencatat penambahan fitur-fitur baru yang dilakukan di luar rancangan awal, sebagai *log* (catatan sejarah) pengembangan.

## 1. Fitur Bagikan (Share Buttons)
Website kini dilengkapi dengan fitur bagikan (*share*) untuk memudahkan tamu dan mempelai menyebarkan undangan:
- **Di Halaman Utama (`index.html`)**: Terdapat seksi baru "Bagikan Kabar Bahagia" di bagian paling bawah (sebelum footer). Memiliki tombol khusus untuk WhatsApp, Telegram, dan tombol "Lainnya" yang memanggil *Web Share API* bawaan HP (untuk membagikan ke aplikasi lain seperti IG Stories, Line, dll).
- **Di Generator Link (`generator.html`)**: Ditambahkan tombol aksi cepat. Setelah nama tamu diketik, selain menyalin teks, mempelai bisa langsung menekan tombol "Kirim ke WA" atau "Kirim ke Telegram" yang akan otomatis membuka aplikasi *chatting* dengan teks yang sudah jadi.

## 2. Penambahan Kado Digital (SeaBank)
Data JSON telah diperbarui untuk mengakomodasi multi-rekening.
- Pada `data.json`, di dalam array `digital_envelope`, ditambahkan *object* baru untuk Bank **SeaBank**.
- Skrip *loader* otomatis membaca dan membuatkan kartu rekening tambahan di halaman "Kado Digital", lengkap dengan tombol salin otomatis untuk rekening SeaBank tersebut.

## 3. Animasi Melayang (Continuous Animation)
Untuk meningkatkan *User Experience* (UX) dan estetika:
- Ditambahkan *keyframes* CSS `@keyframes floating` dan `@keyframes soft-float` di `css/animations.css`.
- Animasi ini diterapkan pada **Menu Navigasi Mengambang** dan **Tombol Audio** agar terlihat bergerak pelan (seolah-olah melayang bernapas) secara terus-menerus tanpa henti.
