# Auth Service

Authentication service for ePerkara Mini application.

## Requirements
- Node.js 14+
- npm

## Installation
1. Install dependencies:
```bash
npm install
```

2. Start the service:
```bash
npm start
```

The service will run on http://localhost:8003

## API Endpoints
- POST /api/auth/login - Login endpoint
  - Request body: { "username": "admin", "password": "admin123" }
  - Response: { "token": "jwt_token_here" }

## Environment Variables
- PORT (default: 8003)
- JWT_SECRET (default: "your-secret-key")


## Swagger Documentation

To create Swagger documentation for the Auth Service, follow these steps:

1. **Install Swagger Dependencies**:
  Install the required packages:
  ```bash
  npm install swagger-ui-express swagger-jsdoc
  ```

2. **Set Up Swagger in Your Application**:
  Add the following code to your `server.js` or main application file:
  ```javascript
  const swaggerUi = require('swagger-ui-express');
  const swaggerJsdoc = require('swagger-jsdoc');

  const swaggerOptions = {
     definition: {
        openapi: '3.0.0',
        info: {
          title: 'Auth Service API',
          version: '1.0.0',
          description: 'API documentation for the Auth Service',
        },
     },
     apis: ['./server.js'], // Adjust the path to your route files
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  ```

3. **Annotate Your Routes**:
  Add Swagger comments to your route files. For example:
  ```javascript
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login endpoint
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Successful login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   */
  ```

4. **Access Swagger UI**:
  Start your service and navigate to `http://localhost:8003/api-docs` to view the Swagger documentation.


## 🔐 Challenge Tim Auth Service (Node + Express)

Tugas utama: Menyediakan sistem autentikasi dan otorisasi untuk semua service.

### 🎯 Challenge List:

1. Ganti user hardcode menjadi **database sungguhan** (SQLite/MySQL/PostgreSQL).
   * Tabel: `users` (id, username, password_hash).
2. Gunakan **bcrypt** untuk menyimpan password secara aman.
3. Tambahkan **validasi input login** (username & password tidak boleh kosong).
4. Tambahkan **fitur blokir sementara** jika login gagal 5x berturut-turut.
5. Buat **endpoint verifikasi token** (`/verify-token`) agar service lain bisa memvalidasi pengguna.
6. Tambahkan **logging aktivitas login** ke tabel `login_logs` (username, waktu, status).
7. Siapkan endpoint dan dokumentasi untuk diakses tim frontend dan tim lain via ngrok.

---