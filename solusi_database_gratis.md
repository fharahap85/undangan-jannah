# Rancangan Solusi Database Gratis & Generator Link Dinamis

Dokumen ini adalah panduan implementasi teknis (*blueprint*) yang ditujukan untuk Junior Programmer atau AI Assistant selanjutnya guna menambahkan fitur **Database Gratis (Google Sheets)** dan **Generator Link Nama Tamu Dinamis** pada website undangan digital berbasis GitHub Pages ini.

---

## BAGIAN 1: Menyimpan Ucapan & RSVP Menggunakan Google Sheets

Karena GitHub Pages hanya melayani file statis, kita tidak bisa menggunakan MySQL/PostgreSQL. Solusi terbaik, gratis, dan sangat andal adalah menggunakan **Google Sheets + Google Apps Script** sebagai *API (Application Programming Interface)*.

### Langkah-Langkah Implementasi (Untuk Programmer):

**1. Persiapan Google Sheets**
1. Buat Spreadsheet baru di Google Drive (misal: "Database Undangan Jannah & Abi").
2. Buat header di baris pertama, persis dengan urutan berikut:
   - Kolom A: `timestamp`
   - Kolom B: `nama`
   - Kolom C: `kehadiran`
   - Kolom D: `ucapan`

**2. Membuat Google Apps Script (Sebagai API)**
1. Di Google Sheets, klik menu **Ekstensi > Apps Script**.
2. Hapus semua kode bawaan, lalu salin dan tempel kode *Backend* berikut:

```javascript
const SHEET_NAME = 'Sheet1'; // Ganti jika nama sheet berbeda

// Fungsi untuk menangani request GET (menampilkan data ucapan di web)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  // Return JSON
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

// Fungsi untuk menangani request POST (menyimpan form dari web)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const body = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    body.timestamp || new Date().toISOString(),
    body.nama,
    body.kehadiran,
    body.ucapan
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
}
```

**3. Deploy sebagai Web App**
1. Klik tombol biru **Terapkan (Deploy) > Deployment Baru**.
2. Pilih jenis: **Aplikasi Web (Web App)**.
3. Deskripsi: `API Undangan V1`.
4. Jalankan sebagai: `Saya (Email Anda)`.
5. Siapa yang memiliki akses: **Semua Orang (Anyone)**.
6. Klik **Terapkan**, berikan otorisasi akses.
7. Anda akan mendapatkan **URL Web App** (berakhiran `/exec`). Copy URL tersebut.

**4. Integrasi ke Website**
- Buka file `data/data.json` di proyek undangan.
- Cari `"google_script_url"` dan ganti nilainya dengan **URL Web App** yang baru saja Anda salin.
- (Catatan: File `js/rsvp.js` di proyek ini sudah diprogram untuk mengirim data ke URL tersebut secara otomatis jika URL-nya sudah diisi).

---

## BAGIAN 2: Membuat Halaman Generator Link Nama Tamu Dinamis

Untuk memudahkan mempelai membagikan undangan dengan nama tamu yang spesifik (misal: "Kepada Yth. Budi Santoso"), kita akan membuat satu halaman kecil (internal tool) yang hanya diakses oleh mempelai.

### Langkah-Langkah Implementasi (Untuk Programmer):

**1. Buat File `generator.html`**
Buat file baru di root folder proyek bernama `generator.html`. Halaman ini sengaja dipisah agar tidak terlihat oleh tamu umum.

**2. Struktur HTML & CSS Sederhana**
Gunakan kode berikut sebagai referensi pembuatan antarmuka (UI):

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generator Link Undangan</title>
    <style>
        body { font-family: sans-serif; padding: 40px; max-width: 600px; margin: auto; background: #f4f4f4; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        input, textarea, button { width: 100%; margin-bottom: 15px; padding: 10px; box-sizing: border-box; }
        button { background: #d4af37; border: none; font-weight: bold; cursor: pointer; }
        .result-box { display: none; background: #eef; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Buat Link Undangan</h2>
        <label>Nama Tamu (Bisa pakai gelar):</label>
        <input type="text" id="guestName" placeholder="Contoh: Bapak Budi S.Kom">
        
        <button onclick="generateLink()">Buat Pesan WA & Link</button>

        <div id="resultBox" class="result-box">
            <label>Hasil Teks untuk di-Copy ke WA:</label>
            <textarea id="resultText" rows="10"></textarea>
            <button onclick="copyToClipboard()">Salin Teks</button>
        </div>
    </div>

    <script>
        const baseUrl = "https://jannah-abi.afhprojects.web.id/"; // Ganti jika domain berbeda
        
        function generateLink() {
            const name = document.getElementById('guestName').value;
            if (!name) return alert('Nama tamu harus diisi!');
            
            // Format nama agar aman di URL (mengubah spasi menjadi %20 atau +)
            const encodedName = encodeURIComponent(name);
            const finalUrl = `${baseUrl}?to=${encodedName}`;
            
            // Template kalimat undangan WA
            const waTemplate = `Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i:\n*${name}*\n\nUntuk hadir dan memberikan doa restu pada acara pernikahan kami. Detail acara dapat dilihat pada tautan undangan digital berikut:\n\n${finalUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia ini.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nKami yang berbahagia,\nAbi & Jannah`;
            
            document.getElementById('resultText').value = waTemplate;
            document.getElementById('resultBox').style.display = 'block';
        }

        function copyToClipboard() {
            const copyText = document.getElementById("resultText");
            copyText.select();
            document.execCommand("copy");
            alert("Teks dan Link berhasil disalin! Silakan paste di WhatsApp.");
        }
    </script>
</body>
</html>
```

**3. Cara Penggunaan (Oleh Mempelai)**
1. Setelah file di-*push* ke GitHub, mempelai cukup membuka URL: `https://jannah-abi.afhprojects.web.id/generator.html`
2. Mempelai mengetik nama tamu, misal: "Bapak Budi".
3. Klik tombol, lalu sistem akan otomatis membuat kalimat sapaan formal beserta link `https://jannah-abi.afhprojects.web.id/?to=Bapak%20Budi`.
4. Klik tombol Salin, lalu *Paste* ke WhatsApp tujuan.
5. Selesai! Saat Bapak Budi membuka link tersebut, halaman depan undangan akan langsung tertulis "Kepada Yth. Bapak Budi".

---
*Catatan untuk Programmer selanjutnya: Pastikan Anda mengikuti instruksi penamaan variabel pada Google Apps Script agar sinkron dengan fungsi `fetch()` yang sudah disiapkan di file `js/rsvp.js`.*
