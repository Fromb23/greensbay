import express from "express";
import pool from "../config/db";

const router = express.Router();

router.get("/check-user-table", async (req, res) => {
  try {
    const [rows]: any = await pool.query("SHOW TABLES LIKE 'users'");

    if (Array.isArray(rows) && rows.length > 0) {
      res.json({ exists: true, table: rows });
    } else {
      res.json({ exists: false, table: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;