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

## 5. Portal B2B Mitra & Admin (Supabase)

1. Buat project Supabase dan terapkan `supabase/migrations/202611160001_man3_b2b_portal.sql` melalui Supabase SQL Editor (atau Supabase CLI migration workflow).
2. Salin `.env.example` menjadi `.env.local` dan isi `NEXT_PUBLIC_SUPABASE_URL` serta `NEXT_PUBLIC_SUPABASE_ANON_KEY` dari Project Settings > API. Keduanya adalah konfigurasi publik, bukan secret.
3. Jangan pernah menambahkan `SUPABASE_SERVICE_ROLE_KEY` ke variabel `NEXT_PUBLIC_*`, bundle browser, atau route aplikasi. Key service-role hanya diperlukan sementara oleh script seed lokal.
4. Di Supabase Authentication, tambahkan URL callback aplikasi seperti `http://localhost:3000/auth/callback` ke daftar redirect yang diizinkan. Konfigurasikan SMTP provider dan sender email untuk pemulihan password; tanpa SMTP, reset email tidak dapat dikirim.
5. Untuk membuat admin di luar seed demo, buat user melalui Supabase Auth/dashboard, lalu set `role='admin'` dan `account_status='active'` pada row profilnya di lingkungan administrasi database yang tepercaya. Registrasi publik selalu menghasilkan mitra `pending_review`.
6. Jalankan `npm run dev`, lalu kunjungi `/register` atau `/login`. Mitra baru dapat melihat status setelah masuk, namun baru dapat mengirim pesanan setelah admin mengaktifkan akunnya.

### Akun dan data demo lokal

Seed demo memerlukan Supabase project development dan bersifat opt-in. Pada `.env.local`, isi `SUPABASE_SERVICE_ROLE_KEY`, `MAN3_DEMO_SEED=true`, `MAN3_DEMO_ADMIN_PASSWORD=admin123`, dan `MAN3_DEMO_MITRA_PASSWORD=mitra123`, lalu jalankan `npm run seed:demo`.

- Admin: `admin@gmail.com` / `admin123`
- Mitra: `mitra@gmail.com` / `mitra123`
- Password dibaca dari environment, tidak disimpan dalam source code. Supabase Auth menangani hashing.
- Akun serta produk/pesanan/timeline/pergerakan stok sampel ditandai sebagai data demo. Script menolak berjalan di production atau Vercel dan tidak berjalan tanpa `MAN3_DEMO_SEED=true`.
- Script dapat dijalankan ulang untuk menyelaraskan kredensial dan membangun ulang pesanan demo. Jangan menggunakan email/password demo pada production.

Tanpa konfigurasi Supabase, route portal menampilkan status setup dan tidak berpindah diam-diam ke JSON/Google Sheets.

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

Jangan isi contoh URL/secret palsu. Apps Script digunakan untuk data CMS lama; data Portal B2B disimpan di PostgreSQL Supabase. Jika koneksi gagal, aplikasi menampilkan error dan tidak diam-diam beralih ke database lokal.

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
   - `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` untuk portal B2B.
   - Konfigurasikan SMTP/redirect URLs pada Supabase Auth untuk pemulihan email.
4. Deploy. Di production, aplikasi menolak memakai JSON database lokal; konfigurasi Apps Script harus tersedia.
5. Jangan set `MAN3_DEMO_SEED=true` dan jangan tambahkan service-role key ke deployment aplikasi. Buat akun admin production melalui alur administrasi Supabase yang tepercaya.
6. Setelah deploy, uji login portal, pendaftaran/persetujuan mitra, submit pesanan, perubahan status, CRUD berita, upload dan penghapusan thumbnail, serta akses halaman publik.
7. Jangan simpan `.env.local`, secret, atau data lokal di repository. Jangan pernah mengisi environment variables dengan nilai contoh.

Deployment langsung belum dijalankan dari workspace ini karena akun Vercel dan Google pemilik belum dikonfigurasi. Jangan kirim secret melalui chat; isi sendiri pada dashboard environment Vercel dan Script Properties Apps Script.
