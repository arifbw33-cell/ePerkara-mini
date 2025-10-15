# ePerkara Mini Frontend

Frontend web application for ePerkara Mini.

## Requirements
- Any static file server (e.g., Python's SimpleHTTPServer, Node's http-server)

## Installation
1. Using Python:
```bash
python -m http.server 8080
```

OR using Node.js:
```bash
npm install -g http-server
http-server -p 8080
```

The frontend will be accessible at http://localhost:8080

## Dependencies (included in /library)
- Vue.js
- Tailwind CSS
- Tabulator

## Configuration
Make sure all backend services are running on their respective ports:
- Auth Service: 8003
- Perkara Service: 8001
- Pegawai Service: 8000


## 💻 Challenge Tim Frontend (HTML + Vue 1 via CDN)

1. Tambahkan **alert / notifikasi** ketika login gagal (contoh: username/password salah).
2. Tambahkan **indikator loading (spinner)** saat request API berlangsung.
3. Buat **validasi form login** agar tidak bisa dikirim kosong.
4. Ubah semua request yang sebelumnya menggunakan `fetch()` menjadi **axios**, dan buat helper `api.js` agar lebih terstruktur.
5. Tambahkan **responsive layout** untuk tampilan di layar kecil (tablet/HP).
6. Tampilkan **alert/error message** jika backend tidak merespons atau token tidak valid.
7. Buat front-end di serve di http-server, lalu expose ke ngrok.
---