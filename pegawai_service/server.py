from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
from fastapi.responses import JSONResponse
from db import db_instance, Pegawai
import jwt

app = FastAPI()
JWT_SECRET = "your-secret-key"
security = HTTPBearer()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/api/pegawai")
async def list_pegawai(
    search: Optional[str] = Query(None),
    page: int = 1,
    size: int = 10,
    token=Depends(verify_token)
):
    filtered_db = db_instance.search(search)
    total_data = len(filtered_db)
    start = (page - 1) * size
    end = start + size
    paginated_data = filtered_db[start:end]
    last_page = (total_data + size - 1) // size  # Calculate total pages
    # Convert Pydantic models to dictionaries
    paginated_data_dicts = [item.dict() for item in paginated_data]
    return JSONResponse(content={"data": paginated_data_dicts, "last_row": total_data, "last_page": last_page})

@app.post("/api/pegawai", response_model=Pegawai)
async def create_pegawai(item: Pegawai, token=Depends(verify_token)):
    return db_instance.add(item)

@app.put("/api/pegawai/{item_id}", response_model=Pegawai)
async def update_pegawai(item_id: int, item: Pegawai, token=Depends(verify_token)):
    return db_instance.update(item_id, item)

@app.delete("/api/pegawai/{item_id}")
async def delete_pegawai(item_id: int, token=Depends(verify_token)):
    return db_instance.delete(item_id)