const { v4: uuidv4 } = require("uuid");

class Perkara {
    constructor(id, judul, tanggal, status) {
        this.id = id || uuidv4();
        this.judul = judul;
        this.tanggal = tanggal;
        this.status = status;
    }
}

class InMemoryDB {
    constructor() {
        this.db = [
            new Perkara(null, "Perkara 1", "2025-10-01", "aktif"),
            new Perkara(null, "Perkara 2", "2025-10-05", "selesai"),
        ];
    }

    getAll() {
        return this.db;
    }

    search(query) {
        if (query) {
            return this.db.filter((item) =>
                item.judul.toLowerCase().includes(query.toLowerCase())
            );
        }
        return this.db;
    }

    add(item) {
        const newItem = new Perkara(null, item.judul, item.tanggal, item.status);
        this.db.push(newItem);
        return newItem;
    }

    update(id, updatedItem) {
        const index = this.db.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Item not found");
        }
        this.db[index] = { ...this.db[index], ...updatedItem };
        return this.db[index];
    }

    delete(id) {
        const index = this.db.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Item not found");
        }
        this.db.splice(index, 1);
        return { ok: true };
    }
}

module.exports = new InMemoryDB();