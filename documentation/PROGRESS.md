# Progres Proyek - MAN3 (Bio-Agri & Conservation)

Terakhir diperbarui: 2026-11-11
Posisi saat ini: **Step 4 - Deploy & maintenance (persiapan production selesai; menunggu konfigurasi akun dan deployment pemilik)**

## Checklist
- [x] Inisiasi (data usaha & desain terkumpul)
- [x] STEP 1 - Landing page & Halaman Khusus
  - [x] Setup Project (Next.js 15 App Router, Tailwind CSS, TypeScript, Lucide Icons)
  - [x] Ekstraksi Design System (Warna, Tipografi, Spacing, Radius dari `DESIGN.md`)
  - [x] Konfigurasi Terpusat (`src/config/site.ts`)
  - [x] Halaman Utama (Landing Page)
    - [x] Hero Section (Headline editorial, metrik 1.400 mdpl, 100% traceable, CTA ganda)
    - [x] Dedicated Pages Directory (Akses ke 7 modul desain khusus)
    - [x] About Section (3 Pilar Konservasi: Bio-Security, Ethical Husbandry, Regenerasi Humus)
    - [x] Service/Products Showcase (Katalog 4 produk utama dengan spesifikasi harga & asal)
    - [x] Berita/Post (3 artikel warta riset terstruktur siap integrasi database)
    - [x] Contact + Google Maps Embed (Formulir kemitraan interaktif & peta lokasi)
  - [x] 7 Halaman Khusus Sesuai Referensi Desain:
    - [x] 1. Detail Produk (`/produk/daging-sapi-pasture-fed`) - Spesifikasi cuts, kalkulator estimasi batch, lot ID
    - [x] 2. Ekosistem Konservasi (`/ekosistem-konservasi`) - 4 Zonasi spasial 1.200 Ha & matriks keanekaragaman hayati
    - [x] 3. Kemitraan B2B Restoran (`/kemitraan-b2b`) - SLA 04:30 WIB, cold-chain, formulir pra-kualifikasi HoReCa
    - [x] 4. Corporate Profile (`/corporate-profile`) - Profil kelembagaan, bilingual toggle (ID/EN), verifikasi empiris
    - [x] 5. Bio-Conservation Science (`/bio-conservation`) - Manifesto Organic Modernism & token palet warna
    - [x] 6. Portal Kemitraan B2B & Pemesanan Terpadu (`/portal-mitra`) - Tabel kuota live, pemilihan slot dispatch subuh/siang
    - [x] 7. Why Choose MAN3 (`/why-choose-man3`) - Tabel komparasi independen vs pasar induk & 6 pilar mutu
  - [x] Responsif (Desktop 1280px+, Tablet 768px, Mobile 375px dengan mobile drawer)
  - [x] Aksesibilitas (WCAG contrast, label form, semantic headings, skip-link)
  - [x] Verifikasi Build (`npm run build` sukses 100% 11/11 static pages generated)
  - [x] Dikonfirmasi pengguna (pengguna meminta lanjut ke Step 2)
- [ ] STEP 2 - User management & dashboard
  - [x] Source Apps Script (`code.gs`, `setup.gs`) dan `initTables()` idempoten (uji simulasi lulus)
  - [ ] Deploy Web App dan inisialisasi Google Spreadsheet aktual (menunggu setup pemilik)
  - [x] Login & register (login benar/salah, register, dan role default diuji lokal)
  - [x] Role admin & user (proteksi API dan dashboard diuji)
  - [x] Dashboard: manajemen user, manajemen role, CRUD berita (build dan smoke test lokal)
  - [x] Upload media lokal (`public/uploads/`; validasi tipe, simpan, hapus diuji)
  - [x] Berita publik di halaman utama memakai API database (draft tidak ditampilkan)
  - [x] Ganti password admin dari dashboard
  - [ ] Dikonfirmasi pengguna
- [x] STEP 3 - Pemesanan B2B
  - [x] Portal mitra mengirim pesanan ke API dan menyimpan ke Orders
  - [x] Admin dapat melihat pesanan, mengubah status, dan menghapus
  - [x] Ringkasan pesanan pada dashboard
- [ ] STEP 4 - Deploy & maintenance
  - [x] Upload thumbnail menggunakan Google Drive melalui Apps Script
  - [x] Aplikasi production menolak fallback ke database dan upload lokal
  - [x] Panduan environment variables dan deployment Vercel diperbarui
  - [ ] Konfigurasi Google Drive folder, Apps Script deployment, dan Vercel environment oleh pemilik
  - [ ] Deploy dan smoke test production
  - [ ] Dikonfirmasi pengguna

## Struktur Rute Halaman
- `/` : Landing Page Utama
- `/produk/daging-sapi-pasture-fed` : Detail Produk Potongan Presisi & Traceability
- `/ekosistem-konservasi` : Peta Zonasi Spasial 1.200 Ha & Konservasi
- `/kemitraan-b2b` : Program Kemitraan Dapur Restoran & HoReCa
- `/corporate-profile` : Profil Korporasi & Tata Kelola
- `/bio-conservation` : Landasan Sains Bio-Agro & Desain Modernisme Organik
- `/portal-mitra` : entry point portal B2B; pemesanan melalui `/mitra/products`
- `/why-choose-man3` : Komparasi Nilai & 6 Pilar Standar Keunggulan
- `/dashboard` : Ringkasan admin dan ganti password
- `/dashboard/users` : Manajemen akun pengguna
- `/dashboard/roles` : Manajemen role dan permission
- `/dashboard/berita` : CRUD berita dan unggah thumbnail
- `/dashboard/pemesanan` : daftar pesanan dan perubahan status
- `/api/orders` : pesanan hanya dari mitra terautentikasi; harga dan stok dibaca database
- `/api/admin/orders` : pengelolaan pesanan oleh admin
- `/mitra/*`, `/admin/*` : portal B2B dengan Supabase Auth dan RLS

## Cara Menjalankan
Jalankan dev server di terminal:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

Untuk menjalankan build produksi:
```bash
npm run build
npm run start
```

Untuk konfigurasi `.env.local`, database lokal, dan deployment Apps Script, lihat [`SETUP.md`](./SETUP.md).

## Catatan Step 2
- API Next.js memakai Google Apps Script sebagai database bila `APPS_SCRIPT_URL` dan `APPS_SCRIPT_SECRET` diisi. Browser tidak memanggil Apps Script langsung. Tanpa kedua variabel itu, development memakai `data/local-db.json`; bila koneksi Apps Script gagal, aplikasi menampilkan error dan tidak beralih diam-diam ke database lokal.
- Source `code.gs` dan `setup.gs` diabaikan oleh Git. Salin ke editor Apps Script dan lakukan deployment sesuai [`SETUP.md`](./SETUP.md); koneksi ke Spreadsheet pemilik belum dapat diuji dari workspace ini.
- Akun awal `admin@gmail.com` memiliki password `123456`. **Ganti sebelum website dipublikasikan.**
- Upload lokal digunakan untuk development tanpa Apps Script; production memakai Google Drive melalui Apps Script, bukan filesystem sementara Vercel.
- Verifikasi: `npm run build`, `npx tsc --noEmit`, smoke test API autentikasi/otorisasi/CRUD/upload, halaman dashboard di viewport 375 px, dan simulasi idempotensi `initTables()` lulus. `npm run lint` masih membuka prompt interaktif karena konfigurasi ESLint belum tersedia.

## Catatan Step 4
- Upload production diarahkan ke Google Drive melalui Apps Script. Buat folder Drive, isi Script Property `UPLOAD_FOLDER_ID`, lalu jalankan `authorizeDriveAccess()` untuk memberi izin Drive.
- Upload ke Drive maksimal 3 MB dan file dibagikan sebagai tautan publik untuk menampilkan thumbnail. Upload development lokal maksimal 5 MB.
- Tabel `Orders` yang dibuat Apps Script tidak diisi pesanan contoh agar data dummy tidak muncul di production.
- Deployment Vercel masih pending: akun pemilik belum terhubung, dan Google Apps Script/Spreadsheet aktual belum dikonfigurasi. Ikuti [`SETUP.md`](./SETUP.md); jangan memasukkan secrets ke chat atau repository.
- Perubahan kode Apps Script (`code.gs`, `setup.gs`) harus disalin ke project Apps Script dan dideploy ulang sebagai versi baru.

## MAN3 Portal B2B Authentication & Management
- [x] Audit Next.js architecture, existing Apps Script/JSON storage, auth APIs, and legacy B2B order form.
- [x] Documented Supabase Auth/PostgreSQL/RLS decision in [`MAN3_PORTAL_ARCHITECTURE.md`](./MAN3_PORTAL_ARCHITECTURE.md).
- [x] Added Supabase schema, RLS policies, transactional order/status/inventory functions, and append-only operational activity records.
- [x] Added Supabase session-based login, pending partner registration, logout, and recovery/reset flow.
- [x] Added partner dashboard, profile, partnership, order history/tracking, catalog, and server-priced order submission.
- [x] Added admin overview, partner approval, order workflow, product/inventory controls, reports, and activity log views.
- [x] Added opt-in local demo seed script with production/Vercel guard and demo data markers.
- [x] Replaced the old public mock-order API with an authenticated Supabase order request.
- [ ] Apply migration to an owned Supabase project, configure email SMTP, and run seed/auth/RLS integration tests.
- [ ] Configure production Supabase, email provider, and deploy; no external credentials or deployment are available in this workspace.
