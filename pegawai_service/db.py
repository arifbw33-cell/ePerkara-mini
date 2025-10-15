from typing import List, Optional
from pydantic import BaseModel
from fastapi import HTTPException

# Define the mode for the database
mode = "in_memory"  # Options: "in_memory", "mysql", "mongodb", etc.

# Data model
class Pegawai(BaseModel):
    id: Optional[int] = None
    name: str
    age: int
    gender: str

# In-memory "database"
class InMemoryDB:
    def __init__(self):
        self.db: List[Pegawai] = [
            Pegawai(id=1, name="John Doe", age=28, gender="Male"),
            Pegawai(id=2, name="Jane Smith", age=34, gender="Female"),
        ]

    def get_all(self):
        return self.db

    def search(self, search: Optional[str]):
        if search:
            return [item for item in self.db if search.lower() in item.name.lower()]
        return self.db

    def get_next_id(self):
        if self.db:
            return max(item.id for item in self.db) + 1
        return 1

    def add(self, item: Pegawai):
        item.id = self.get_next_id()
        self.db.append(item)
        return item

    def update(self, item_id: int, item: Pegawai):
        for idx, existing in enumerate(self.db):
            if existing.id == item_id:
                item.id = item_id
                self.db[idx] = item
                return item
        raise HTTPException(status_code=404, detail="Item not found")

    def delete(self, item_id: int):
        for idx, existing in enumerate(self.db):
            if existing.id == item_id:
                self.db.pop(idx)
                return {"ok": True}
        raise HTTPException(status_code=404, detail="Item not found")

# Initialize the database based on the mode
if mode == "in_memory":
    db_instance = InMemoryDB()
elif mode == "mysql":
    # Placeholder for MySQL implementation
    raise NotImplementedError("MySQL mode is not implemented yet.")
elif mode == "mongodb":
    # Placeholder for MongoDB implementation
    raise NotImplementedError("MongoDB mode is not implemented yet.")
else:
    raise ValueError(f"Unsupported mode: {mode}")