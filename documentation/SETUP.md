# Panduan Menjalankan Proyek - MAN3 Agro-Ecosystem Platform

## 1. Menjalankan di Komputer Lokal (Development)

1. Buka terminal di folder project (`code/`).
2. Jalankan perintah:
   ```bash
   npm run dev
   ```
3. Buka browser dan akses alamat:
   ```
   http://localhost:3000
   ```

## 2. Pengujian Responsif (Layar Desktop, Tablet, Mobile)
* **Desktop (>= 1200px):** Navigasi penuh di bilah atas, layout multi-kolom 12-grid, tabel alokasi batch penuh.
* **Tablet (768px - 1199px):** Layout adaptif 8-grid, kartu produk 2-kolom, kartu zonasi rapi.
* **Mobile (<= 767px):** Menu navigasi hamburger dengan drawer animasi geser, kartu produk 1-kolom, tabel alokasi dengan horizontal-scroll yang nyaman.

## 3. Daftar Halaman Utama & Khusus
1. **Landing Page (`/`):** Hero, About, Directory 7 Halaman, Produk, Berita, Formulir Kontak, dan Embed Google Maps.
2. **Detail Produk (`/produk/daging-sapi-pasture-fed`):** Spesifikasi cuts, rasio marbling MB 4-6, kalkulator batch pesanan.
3. **Ekosistem Konservasi (`/ekosistem-konservasi`):** 4 Zonasi 1.200 Ha dan matriks fauna langka (Elang Jawa, Owa Jawa).
4. **Kemitraan B2B (`/kemitraan-b2b`):** Standar pasokan dapur profesional, SLA 04:30 WIB, formulir kemitraan.
5. **Corporate Profile (`/corporate-profile`):** Tata kelola korporat dengan tombol beralih bahasa (ID/EN) dan 4 metrik empiris.
6. **Bio-Conservation Science (`/bio-conservation`):** Manifesto Organic Modernism & pengenalan design tokens.
7. **Portal Mitra Pemesanan (`/portal-mitra`):** Entry point portal B2B terautentikasi; katalog dan pesanan dikelola melalui area mitra setelah login.
8. **Why Choose MAN3 (`/why-choose-man3`):** Tabel komparasi independen dan 6 pilar keunggulan.

## 4. Login dan Dashboard CMS lama

Login CMS lama (`/dashboard`) tetap menggunakan autentikasi legacy bcrypt/JWT dan penyimpanan Apps Script atau JSON untuk pengguna CMS, role, berita, dan konten lama. Fitur tersebut terpisah dari Portal B2B baru. Jangan gunakan akun CMS lama sebagai akun mitra atau anggap database JSON/Sheets sebagai database portal.

## 5. Portal Mitra & Admin (browser-only)

Portal demo tidak memakai Supabase, API autentikasi, atau database server. Klik **Masuk Portal** pada navigasi situs untuk membuka `/login`, lalu gunakan salah satu akun contoh berikut:

- Admin: `admin@demo.man3` / `demo123`
- Mitra: `mitra@demo.man3` / `demo123`
- Mitra kedua: `rina@demo.man3` / `demo123`
- Mitra ketiga: `budi@demo.man3` / `demo123`

Pengguna dapat mendaftar akun mitra demo tambahan di `/register`; admin demo dapat meninjau dan mengaktifkan akun tersebut. Katalog, pemesanan, status pesanan, profil, laporan, dan log dapat dicoba di portal. Sesi, akun baru, dan perubahan data hanya tersimpan di `localStorage` browser yang sedang dipakai, tidak disinkronkan ke perangkat lain, dan dapat diatur ulang pada menu Pengaturan. Tidak ada perubahan yang dikirim ke MAN3. Password lokal tidak dienkripsi; jangan gunakan email, password, atau informasi pribadi sungguhan.

### Menghubungkan Google Spreadsheet (CMS lama)

Browser hanya berkomunikasi dengan API Next.js. Server Next.js yang meneruskan permintaan ke Apps Script memakai secret bersama, sehingga URL Spreadsheet dan secret tidak dikirim ke browser.

1. Buat atau buka Google Spreadsheet yang akan digunakan.
2. Di Spreadsheet, pilih **Extensions > Apps Script**.
3. Salin isi [`code.gs`](../code.gs) ke editor Apps Script dan simpan.
4. Salin isi [`setup.gs`](../setup.gs) ke file script kedua dan simpan.
5. Pada Apps Script, buka **Project Settings > Script Properties > Add script property**. Tambahkan `APPS_SCRIPT_SECRET` dengan nilai rahasia acak.
6. Buat folder khusus thumbnail di Google Drive. Salin folder ID dari URL Drive, lalu tambahkan Script Property `UPLOAD_FOLDER_ID` dengan ID tersebut.
7. Pilih fungsi `initTables` di editor lalu klik **Run** dan berikan izin yang diminta. Fungsi ini membuat sheet `Roles`, `Users`, `News`, dan `Orders`; aman dijalankan ulang tanpa menimpa data yang ada. Sheet `Orders` baru dibuat kosong (tanpa pesanan contoh).
8. Pilih fungsi `authorizeDriveAccess` dan jalankan sekali untuk memberi Apps Script izin akses Drive.
9. Pilih **Deploy > New deployment > Web app**. Pilih **Execute as: Me** dan **Who has access: Anyone**, lalu deploy dan salin URL Web App.
10. Isi `APPS_SCRIPT_URL` dengan URL deployment dan `APPS_SCRIPT_SECRET` dengan secret yang sama di `.env.local`. Restart server setelah mengubah konfigurasi.
11. Jika kode Apps Script berubah, pilih **Deploy > Manage deployments > Edit > New version > Deploy**, lalu pastikan URL deployment tetap sesuai.

Jangan isi contoh URL/secret palsu. Apps Script digunakan oleh CMS lama. Portal mitra/admin berjalan terpisah sebagai pratinjau lokal di browser.

## 6. Upload Media dan Batasan Deploy

Saat Apps Script dikonfigurasi, thumbnail JPG, PNG, dan WEBP diunggah ke folder Google Drive melalui server Next.js. File dibagikan sebagai **Anyone with the link — Viewer** agar dapat tampil di halaman berita publik. Server memvalidasi signature gambar, membuat nama file acak, dan membatasi ukuran menjadi 3 MB. Penghapusan berita juga memindahkan thumbnail Drive ke Trash, hanya jika file berada di folder upload yang dikonfigurasi.

Tanpa Apps Script, development lokal menyimpan thumbnail di `public/uploads/` dengan batas 5 MB. Upload lokal tidak digunakan sebagai fallback di production. Pastikan folder Drive mengizinkan berbagi tautan; jika kebijakan akun Google membatasi akses publik, gambar tidak akan dapat ditampilkan di situs.

## 7. Deploy ke Vercel

1. Pastikan aplikasi dan Spreadsheet sudah diuji lokal menggunakan deployment Apps Script versi terbaru.
2. Push source aplikasi ke repository Git pribadi/organisasi dan import repository itu di Vercel.
3. Tambahkan environment variables pada Vercel untuk semua environment yang diperlukan:
   - `JWT_SECRET`: rahasia acak minimal 32 karakter.
   - `APPS_SCRIPT_URL`: URL Web App Apps Script.
   - `APPS_SCRIPT_SECRET`: nilai yang sama dengan Script Property `APPS_SCRIPT_SECRET`.
4. Deploy. Di production, aplikasi menolak memakai JSON database lokal; konfigurasi Apps Script harus tersedia.
5. Portal mitra/admin pada versi ini hanya pratinjau browser lokal, bukan autentikasi atau pengelolaan operasional production.
6. Setelah deploy, uji akses portal demo, CRUD berita, upload dan penghapusan thumbnail, serta halaman publik.
7. Jangan simpan `.env.local`, secret, atau data lokal di repository. Jangan pernah mengisi environment variables dengan nilai contoh.

Deployment langsung belum dijalankan dari workspace ini karena akun Vercel dan Google pemilik belum dikonfigurasi. Jangan kirim secret melalui chat; isi sendiri pada dashboard environment Vercel dan Script Properties Apps Script.
