# Himmah NWDI Lebak Bulus

Website publik dan area editor sederhana untuk Himmah NWDI Lebak Bulus.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Konfigurasi Admin (MVP)

Area editor ada di `/admin/editor`. Untuk autentikasi sederhana, set environment variable berikut saat menjalankan aplikasi:

```bash
ADMIN_PASSWORD=yourpassword npm run dev
```

## Data Artikel

Data artikel disimpan di `data/articles.json` agar cepat untuk MVP. Status artikel:

- `pending`: Menunggu review editor
- `published`: Ditampilkan di halaman `/artikel`
- `rejected`: Ditolak (tidak tampil di publik)

## Halaman Publik

- `/` (Beranda)
- `/profil`
- `/pengumuman`
- `/program`
- `/artikel`
- `/kirim-artikel`
- `/kontak`
