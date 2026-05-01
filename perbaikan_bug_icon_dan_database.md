# Dokumentasi Perbaikan Bug (Ikon & Database Ucapan)

Dokumen ini mencatat perbaikan kritis (*bug fixes*) yang dilakukan pada website undangan untuk memastikan semua fitur berjalan sempurna di berbagai browser dan integrasi Google Sheets berhasil.

## 1. Perbaikan Ikon SVG ("Ikon Tidak Jalan")
**Masalah:** Beberapa ikon SVG (seperti ikon bank, navigasi, dan WhatsApp) tidak muncul di *browser* meskipun file fisiknya ada.
**Penyebab:** Pada pembuatan (*generate*) file SVG sebelumnya menggunakan *command line/echo* Windows, sistem menyimpannya dengan format *encoding* **UTF-16LE**. *Browser* modern membutuhkan file SVG murni dengan format *encoding* **UTF-8** agar bisa dipanggil melalui tag `<img>`.
**Solusi & Perbaikan:**
- Seluruh 10 file SVG (`bank.svg`, `wa.svg`, `home.svg`, dll) telah ditulis ulang (*re-written*) menggunakan program dengan *encoding UTF-8 murni*.
- Ikon sekarang dijamin akan langsung muncul di *browser* HP maupun PC tanpa harus dimuat (*refresh*) berulang kali.

## 2. Perbaikan Integrasi Google Sheets ("Pesan Tidak Tersimpan & Terload")
**Masalah:** Form ucapan seolah berhasil dikirim, tetapi data tidak masuk ke Google Sheets (Database), dan saat website di-refresh, daftar ucapan kosong/gagal memuat (*error*).
**Penyebab:** 
- **CORS Preflight (Untuk Simpan):** Sistem awal mencoba mengirim data JSON (POST) menggunakan mode pengiriman `no-cors` dengan *header* `Content-Type: application/json`. Aturan standar Google Apps Script memblokir atau membuang data ini karena mode keamanan *browser*.
- **Otentikasi Apps Script:** Terkadang, pengaturan hak akses di Google Script belum di-set ke *"Anyone"* (Semua orang).
**Solusi & Perbaikan:**
- Di dalam file `js/rsvp.js`, metode *fetch()* telah diubah. Kode pengiriman (POST) kini menggunakan *header* `Content-Type: text/plain;charset=utf-8`. 
- Dengan dikirim sebagai *teks biasa* (meskipun isinya berformat JSON), *browser* tidak akan memicu *CORS Preflight Check* (yang sering diblokir Google), dan Google Apps Script akan dengan senang hati menerima, lalu mem-parsing JSON tersebut secara sempurna dengan perintah `JSON.parse(e.postData.contents)`.
- **Note untuk Owner:** Pastikan saat Anda mengklik "Deploy" di Google Apps Script, opsi **"Who has access" (Siapa yang memiliki akses)** sudah dipilih **"Anyone" (Semua orang)**. Jika tidak, proses pemuatan data (GET) akan diblokir dengan status `401 Unauthorized`.

---
*Status: Kedua *bug* di atas telah beres dan disinkronkan ke dalam kode.*
