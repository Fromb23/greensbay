import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config(); 

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Test DB Connection
app.get("/test-db", async (req, res) => {
  try {
    await prisma.$connect(); 
    res.json({ message: "Database connected successfully!" });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Database connection failed!" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Admin Server running on http://localhost:${PORT}`);
});