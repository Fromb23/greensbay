import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const [rows]: any = await pool.query("SELECT 1 + 1 AS result");
    res.json({ message: "Database connected!", result: rows[0] });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Database connection failed!" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Admin Server running on http://localhost:${PORT}`);
});