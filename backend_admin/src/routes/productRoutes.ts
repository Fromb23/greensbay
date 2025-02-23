import express from "express";
import { Request, Response } from "express";
import pool from "../config/db";

const router = express.Router();

// Fetch all products
router.get("/fetch-products", async (req: Request, res: Response) => {
  const [products] = await pool.execute("SELECT * FROM products");
  res.json(products);
});

// Create a product
router.post("/create-product", async (req: Request, res: Response) => {
  const { name, image, units_left, stock, discount_price, actual_price, category } = req.body;
  await pool.execute(
    "INSERT INTO products (name, image, units_left, stock, discount_price, actual_price, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, image, units_left, stock, discount_price, actual_price, category]
  );
  res.json({ message: "Product added successfully" });
});

// Delete a product
router.delete("/remove-product/:id", async (req: Request, res: Response) => {
  await pool.execute("DELETE FROM products WHERE id = ?", [req.params.id]);
  res.json({ message: "Product deleted successfully" });
});

export default router;