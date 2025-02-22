import express, { Request, Response } from "express";
import pool from "../config/db";
import { RowDataPacket } from "mysql2/promise";

const router = express.Router();

interface Product {
    id?: number;
    name: string;
    image: string;
    unitsLeft: number;
    discountPrice: number;
    actualPrice: number;
    stock: number;
    category: string;
}

router.get("/:id", async (req: Request, res: Response): Promise<any>=> {
    const { id } = req.params;

    try {
        const [rows] = await pool.execute<Product[] & RowDataPacket[]>(
            "SELECT * FROM products WHERE id = ?", [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error", details: (error as Error).message });
    }
});

router.post("/", async (req: Request<{}, {}, Product>, res: Response): Promise<any>=> {
    const { name, image, unitsLeft, discountPrice, actualPrice, stock, category } = req.body;

    if (!name || !image || !unitsLeft || !discountPrice || !actualPrice || !stock || !category) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const [result]: any = await pool.execute(
            "INSERT INTO products (name, image, unitsLeft, discountPrice, actualPrice, stock, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, image, unitsLeft, discountPrice, actualPrice, stock, category]
        );

        res.status(201).json({ message: "Product created successfully", productId: result.insertId });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error", details: (error as Error).message });
    }
});

export default router;