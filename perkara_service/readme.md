# Perkara Service

Case management service for ePerkara Mini application.

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

The service will run on http://localhost:8001

## API Endpoints
- GET /api/perkara - List all cases
- POST /api/perkara - Create new case
- PUT /api/perkara/:id - Update case
- DELETE /api/perkara/:id - Delete case
- GET /api/perkara/stats - Get case statistics

## Environment Variables
- PORT (default: 8001)
- JWT_SECRET (default: "your-secret-key")


## Swagger Documentation

To use Swagger for API documentation, follow these steps:

1. Install Swagger dependencies:
```bash
npm install swagger-ui-express swagger-jsdoc
```

2. Add Swagger setup in your application. Example:
```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Perkara Service API',
            version: '1.0.0',
            description: 'API documentation for Perkara Service',
        },
    },
    apis: ['./server.js'], // Adjust the path to your route files
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

3. Access the Swagger UI at:
```
http://localhost:8001/api-docs
```

## ⚖️ Challenge Tim Perkara Service (Node + Express)

Tugas utama: Menyediakan CRUD data perkara.

### 🎯 Challenge List:

1. Migrasikan penyimpanan dari array ke **database sungguhan**.
   * Tabel: `perkara` (id, judul, tanggal, status).
2. Implementasikan CRUD ke database.
3. Tambahkan **validasi input** dengan middleware (`express-validator`).
4. Buat endpoint `/health` untuk monitoring status.
5. Catat setiap aktivitas CRUD ke tabel `logs_perkara`.
6. Dokumentasikan endpoint agar mudah diintegrasikan oleh tim frontend.
7. Pastikan semua endpoint sudah bisa diakses via ngrok.

---