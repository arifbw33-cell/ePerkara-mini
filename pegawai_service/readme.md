# Pegawai Service

Employee management service for ePerkara Mini application.

## Requirements
- Python 3.8+
- pip

## Installation
1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the service:
```bash
uvicorn server:app --reload --port 8000
```

The service will run on http://localhost:8000

## API Endpoints
- GET /api/pegawai - List all employees
- POST /api/pegawai - Create new employee
- PUT /api/pegawai/:id - Update employee
- DELETE /api/pegawai/:id - Delete employee

## API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc


## Swagger Documentation Tutorial

To generate and view Swagger documentation for the Pegawai Service, follow these steps:

1. **Install FastAPI and dependencies** (if not already installed):
    ```bash
    pip install fastapi uvicorn pydantic
    ```

2. **Define API Models**:
    Use Pydantic models to define request and response schemas. For example:
    ```python
    from pydantic import BaseModel

    class Employee(BaseModel):
         id: int
         name: str
         position: str
    ```

3. **Add API Routes**:
    Use FastAPI decorators to define endpoints. For example:
    ```python
    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/api/pegawai", response_model=List[Employee])
    def list_employees():
         return []
    ```

4. **Access Swagger UI**:
    Start the service and navigate to [http://localhost:8000/docs](http://localhost:8000/docs) to view the interactive Swagger UI.

5. **Access ReDoc**:
    Alternatively, view the API documentation in ReDoc format at [http://localhost:8000/redoc](http://localhost:8000/redoc).


## 👨‍💼 Challenge Tim Pegawai Service (Python + FastAPI)

Tugas utama: Menyediakan CRUD data pegawai.

### 🎯 Challenge List:

1. Migrasikan penyimpanan dari in-memory ke **database sungguhan** (SQLite, MySQL atau PostgreSQL).
   * Tabel: `pegawai` (id, nama, umur, gender).
2. Update seluruh endpoint CRUD agar menggunakan database.
3. Buat validasi input (nama, umur, gender wajib diisi).
4. Tambahkan **error handling proper** (404 jika data tidak ditemukan).
5. Tambahkan endpoint `/health` untuk memeriksa status service.
6. Tambahkan log aktivitas CRUD ke file/log console.
7. Siapkan dokumentasi endpoint (boleh pakai FastAPI docs bawaan).

---