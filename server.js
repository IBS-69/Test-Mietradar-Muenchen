// server.js - einfacher Express-Server mit DB-Test

import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
const PORT = 4000; // Backend läuft auf http://localhost:4000

app.use(cors());
app.use(express.json());

// === Route 1: Testet nur, ob die DB erreichbar ist ===
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS now");
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    console.error("DB-Fehler:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// === Beispiel-Route für später (wenn wir Tabellen haben) ===
app.get("/api/wohnungen", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wohnungen LIMIT 50;");
    res.json(result.rows);
  } catch (err) {
    console.error("DB-Fehler:", err);
    res.status(500).json({ error: "Fehler beim Laden der Wohnungen" });
  }
});

app.listen(PORT, () => {
  console.log(`API läuft auf http://localhost:${PORT}`);
});
