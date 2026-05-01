# Review dan Panduan Perbaikan (Undangan Digital)

## 1. Analisis Masalah ("Belum Jalan Sempurna")
Jika website terasa kosong, tombol "Buka Undangan" tidak merespons, atau data tidak muncul, penyebab utamanya adalah **aturan keamanan browser (CORS)**.

Sistem kita dirancang untuk mengambil data secara terpusat dari file `data/data.json` menggunakan perintah JavaScript `fetch()`. Browser modern akan **memblokir** perintah ini jika Anda membuka file `index.html` secara langsung dengan melakukan klik ganda (menggunakan protokol `file:///`). Saat pengambilan data gagal, sisa program JavaScript otomatis terhenti.

### Solusi:
*   **Cara Lokal:** Buka folder proyek ini menggunakan **Local Server**. Jika Anda memakai **VS Code**, instal ekstensi **Live Server**, klik kanan pada `index.html`, lalu pilih *Open with Live Server*.
*   **Cara Online:** Abaikan kendala di komputer lokal dan **langsung kirim (push) ke GitHub**. Saat berjalan di GitHub Pages (`https://`), sistem pengambilan data akan langsung berfungsi sempurna.

---

## 2. Alur Kerja Git (Update Berkala ke GitHub)
Karena Anda sudah menghubungkan proyek ini ke repositori `https://github.com/fharahap85/undangan-jannah.git`, ikuti 3 perintah berurutan ini di Terminal/CMD setiap kali Anda selesai melakukan pengeditan file:

1. **Menandai semua perubahan file:**
   ```bash
   git add .
   ```
2. **Menyimpan perubahan dengan pesan singkat:**
   ```bash
   git commit -m "fix: update isi undangan dan perbaikan tampilan"
   ```
3. **Mengunggah (push) kode ke GitHub:**
   ```bash
   git push -u origin master
   ```
   *(Catatan: Jika branch utama Anda bernama `main`, ubah kata `master` di atas menjadi `main`)*

---

## 3. Konfigurasi Custom Domain URL
File `CNAME` sudah saya siapkan di dalam kode, sehingga pengaturan URL `jannah-abi.afhprojects.web.id` di GitHub akan sangat praktis:

1. Buka repositori Anda di web GitHub.
2. Klik tab **Settings** (Pengaturan), lalu temukan menu **Pages** di panel sebelah kiri.
3. Pada bagian **Build and deployment**:
   *   **Source**: Biarkan `Deploy from a branch`.
   *   **Branch**: Pilih branch `master` (atau `main`), pilih folder `/(root)`, lalu tekan tombol **Save**.
4. Pada bagian **Custom domain**:
   *   Pastikan tulisan `jannah-abi.afhprojects.web.id` sudah ada.
   *   Sistem GitHub akan melakukan *DNS check* (pastikan A/CNAME record di panel domain Anda sudah mengarah ke GitHub IP/fharahap85.github.io).
   *   Tunggu hingga pengecekan selesai (bisa memakan waktu beberapa menit), lalu centang **Enforce HTTPS** agar website Anda memiliki gembok aman.

Terapkan alur Git di atas untuk mengirim kode pertama kali, lalu lakukan setting GitHub Pages. Website undangan Anda akan langsung live!
