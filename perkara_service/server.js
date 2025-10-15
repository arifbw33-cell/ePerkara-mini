const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();
const PORT = 8001;
const JWT_SECRET = "your-secret-key";

app.use(cors());
app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Routes
app.get("/api/perkara", authenticateToken, (req, res) => {
    const { search, page = 1, size = 10 } = req.query;
    const filteredData = db.search(search);
    const totalData = filteredData.length;
    const start = (page - 1) * size;
    const end = start + parseInt(size);
    const paginatedData = filteredData.slice(start, end);
    const lastPage = Math.ceil(totalData / size);

    res.json({
        data: paginatedData,
        last_row: totalData,
        last_page: lastPage,
    });
});

app.post("/api/perkara", authenticateToken, (req, res) => {
    const newItem = db.add(req.body);
    res.status(201).json(newItem);
});

app.put("/api/perkara/:id", authenticateToken, (req, res) => {
    try {
        const updatedItem = db.update(req.params.id, req.body);
        res.json(updatedItem);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.delete("/api/perkara/:id", authenticateToken, (req, res) => {
    try {
        const result = db.delete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Perkara service is running on http://localhost:${PORT}`);
});

app.get("/api/perkara/stats", authenticateToken, (req, res) => {
    try {
        const totalKasus = db.getAll().length;
        const kasusAktif = db.getAll().filter(item => item.status === "aktif").length;
        const kasusSelesai = db.getAll().filter(item => item.status === "selesai").length;
        const persentasePenyelesaian = totalKasus > 0 ? Math.round((kasusSelesai / totalKasus) * 100) : 0;

        const data = {
            totalKasus,
            kasusAktif,
            kasusSelesai,
            persentasePenyelesaian
        };

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});