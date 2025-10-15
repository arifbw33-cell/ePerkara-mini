# ePerkara Mini - Sistem Pencatatan Kasus Ringan
### [Microservices Application]

This is a simple microservices-based application consisting of:
- Frontend Web Application
- Auth Service (Node.js)
- Perkara Service (Node.js)
- Pegawai Service (Python/FastAPI)

         ┌────────────────────────────────┐
         │   Frontend (HTML + Vue 1)      │
         └──────────────┬─────────────────┘
                        │
                 ┌──────▼──────┐
                 │ API Gateway │  ← Node.js
                 └──────┬──────┘
                        │
       ┌────────────────┼────────────────┐
       ▼                ▼                ▼
   Auth Service   Pegawai Service   Perkara Service
   (NodeJS)          (FastAPI)         (Node.js)


## Services Architecture
- Frontend: Static HTML/Vue.js (port 80/8080)
- Auth Service: Node.js/Express (port 8003)
- Perkara Service: Node.js/Express (port 8001)
- Pegawai Service: Python/FastAPI (port 8000)

## Quick Start
1. Clone this repository
2. Install and run each service following their respective README.md files
3. Open frontend/index.html in your browser
4. Login with default credentials:
   - Username: admin
   - Password: admin123

## Default Ports
- Frontend: Serve via any static file server
- Auth Service: http://localhost:8003
- Perkara Service: http://localhost:8001
- Pegawai Service: http://localhost:8000


## Exposing Local APIs with Ngrok

To simulate a real-world microservices environment, each team is required to expose their local service using Ngrok. This will allow the services to be integrated and accessed by the frontend application.

### Steps to Expose Your Service with Ngrok
1. **Download and Install Ngrok**:
   - Visit [Ngrok's official website](https://ngrok.com/download) and download the appropriate version for your operating system.
   - Unzip the downloaded file and add it to your system's PATH.

2. **Authenticate Ngrok**:
   - Sign up for a free Ngrok account at [Ngrok Signup](https://dashboard.ngrok.com/signup).
   - After signing in, copy your authentication token from the [Ngrok Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken).
   - Run the following command to authenticate:
     ```bash
     ngrok config add-authtoken <your_auth_token>
     ```

3. **Expose Your Service**:
   - Open a terminal in the directory of your service.
   - Start your service locally (e.g., `npm start` or `uvicorn main:app --reload`).
   - Run Ngrok to expose the service. Replace `<port>` with the port your service is running on:
     ```bash
     ngrok http <port>
     ```
   - Example for Auth Service:
     ```bash
     ngrok http 8003
     ```

4. **Share the Public URL**:
   - After running the Ngrok command, you will see a public URL (e.g., `https://<random-subdomain>.ngrok.io`).
   - Share this URL with the team for integration.

### Integration with Frontend
- Replace the local API URLs in the frontend application with the Ngrok public URLs for each service.
- Example:
  ```javascript
  const API_GATEWAY_URL = "https://<ngrok-subdomain>.ngrok.io";
  ```

By following these steps, all services will be accessible via public URLs, enabling seamless integration during the training session.



# 🧩 Challenge Pelatihan Microservice

**ePerkara Mini – Sistem Pencatatan Kasus Ringan**
Mode: Tiap tim mengerjakan di lokal laptop masing-masing, lalu integrasi antar-service via **ngrok** di akhir sesi.

---

## 🚀 Challenge Akhir (Integrasi Semua Tim)

**Skenario:** Semua tim sudah menjalankan service-nya di lokal laptop masing-masing, lalu expose endpoint-nya menggunakan **ngrok** agar bisa diakses tim lain.

### 🔗 Tujuan Integrasi:

1. **Auth Service** memberikan endpoint `POST /login` dan `GET /verify-token`.
2. **Pegawai Service** dan **Perkara Service** wajib memvalidasi JWT dari Auth Service.
3. **Frontend** menggunakan URL dari ngrok untuk setiap service (Auth, Pegawai, Perkara).
4. Pengguna bisa:

   * Login dengan akun dari Auth Service.
   * Melihat daftar pegawai (dari Pegawai Service).
   * Melihat daftar perkara (dari Perkara Service).
   * Melihat stats total kasus, kasus aktif, kasus selesai, & presentasi selesai

### 🏁 Output Akhir:

* Semua tim berhasil **mengintegrasikan antar-service secara real** walau berjalan di laptop berbeda.
* Frontend menampilkan data real dari dua service yang berbeda.
* Semua service berjalan modular, memiliki logging, validasi token, dan koneksi database masing-masing.
