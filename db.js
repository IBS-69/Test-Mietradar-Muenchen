// db.js - Verbindung zur PostgreSQL-Datenbank "Mietradar" mit SSL

import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // WICHTIG: SSL aktivieren, weil der Server keine unverschlüsselten Verbindungen zulässt
  ssl: {
    rejectUnauthorized: false, // bei selbstsignierten Zertifikaten nötig
  },
});
